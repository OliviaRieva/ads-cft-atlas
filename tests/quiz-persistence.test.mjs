import { test } from "node:test";
import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import ts from "typescript";

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cache = new Map();
// Exercise the actual TypeScript service and scheduler, without bundler mocks.
function load(relative) {
  const filename = path.resolve(root, relative);
  if (cache.has(filename)) return cache.get(filename);
  const loadedModule = { exports: {} };
  cache.set(filename, loadedModule.exports);
  const js = ts.transpileModule(fs.readFileSync(filename, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const scopedRequire = name => name.startsWith(".") ? load(path.relative(root, path.resolve(path.dirname(filename), `${name}.ts`))) : require(name);
  new Function("require", "module", "exports", js)(scopedRequire, loadedModule, loadedModule.exports);
  cache.set(filename, loadedModule.exports);
  return loadedModule.exports;
}
const engine = load("lib/quiz-engine.ts");
const store = load("lib/quiz-store.ts");
const { questions } = load("app/content/questions.ts");
const { QUIZ_TOPICS } = load("lib/quiz-types.ts");
const defaults = { topics: [...QUIZ_TOPICS], count: 5, hardOnly: false, mistakesOnly: false, feedback: "end" };
function database(filename = ":memory:") {
  const initialize = filename === ":memory:" || !fs.existsSync(filename);
  const sqlite = new DatabaseSync(filename);
  sqlite.exec("PRAGMA foreign_keys = ON");
  if (initialize) for (const file of fs.readdirSync(path.join(root, "drizzle")).filter(n => n.endsWith(".sql")).sort()) sqlite.exec(fs.readFileSync(path.join(root, "drizzle", file), "utf8"));
  class Query {
    constructor(sql, values = []) { this.sql = sql; this.values = values; }
    bind(...values) { return new Query(this.sql, values); }
    async first() { return sqlite.prepare(this.sql).get(...this.values) ?? null; }
    async all() { return { results: sqlite.prepare(this.sql).all(...this.values) }; }
    execute() { return sqlite.prepare(this.sql).run(...this.values); }
    async run() { return this.execute(); }
  }
  const db = {
    prepare: sql => new Query(sql),
    async batch(statements) {
      sqlite.exec("BEGIN");
      try { const result = statements.map(s => s.execute()); sqlite.exec("COMMIT"); return result; }
      catch (error) { sqlite.exec("ROLLBACK"); throw error; }
    },
  };
  return { db, sqlite, close: () => sqlite.close() };
}
const rawTest = (sqlite, id) => JSON.parse(sqlite.prepare("SELECT snapshot FROM quiz_tests WHERE id = ?").get(id).snapshot);

test("question bank has 304 distinct, complete questions across all requested categories", () => {
  assert.equal(questions.length, 304);
  assert.equal(new Set(questions.map(q => q.id)).size, questions.length);
  assert.equal(new Set(questions.map(q => q.prompt)).size, questions.length);
  for (const topic of QUIZ_TOPICS) assert.ok(questions.filter(q => q.topic === topic).length >= 7, topic);
  assert.equal(questions.filter(q => !q.id.startsWith("expand-")).length, 128);
  for (const q of questions) {
    assert.equal(new Set(q.options).size, 4);
    assert.ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.options.length);
    assert.ok(q.explanation.length > 60);
    assert.ok(q.pages[0] >= 1 && q.pages[1] >= q.pages[0] && q.pages[1] <= 98);
  }
});
test("scheduler prioritizes mistakes and learning, enforces filters, and never repeats within a test", () => {
  const progress = {
    "qft-01": { attempts: 6, correct: 3, wrong: 3, streak: 0, lastAnswerId: 6 },
    "qft-03": { attempts: 2, correct: 0, wrong: 2, streak: 0, lastAnswerId: 5 },
    "qft-02": { attempts: 3, correct: 3, wrong: 0, streak: 3, lastAnswerId: 4 },
  };
  const result = engine.buildTest(questions, { ...defaults, topics: ["QFT"], count: 100 }, progress, "qft-01", [], () => .5);
  const available = questions.filter(q => q.topic === "QFT").length;
  assert.equal(result.ids.length, available);
  assert.equal(new Set(result.ids).size, available);
  assert.notEqual(result.ids[0], "qft-01");
  assert.equal(result.ids.at(-1), "qft-02");
  assert.ok(result.notice.includes(String(available)));
  const filtered = engine.buildTest(questions, { ...defaults, topics: ["QFT"], hardOnly: true, mistakesOnly: true }, progress, null, [], () => .5);
  assert.deepEqual(filtered.ids, ["qft-03"]);
  const one = engine.buildTest(questions, { ...defaults, topics: ["QFT"], count: 1 }, progress, "qft-01", [], () => .5);
  assert.notEqual(one.ids[0], "qft-01");
  const blocked = engine.buildTest(questions, { ...defaults, topics: ["QFT"], hardOnly: true, mistakesOnly: true }, progress, "qft-03");
  assert.equal(blocked.ids.length, 0);
  assert.match(blocked.notice, /last one you answered/);
});
test("three successes build mastery and a later mistake resets the streak", () => {
  const rows = [1, 1, 1, 0, 1].map((correct, i) => ({ id: i + 1, question_id: "q", correct }));
  assert.equal(engine.summarizeAnswers(rows.slice(0, 3)).q.streak, 3);
  assert.equal(engine.summarizeAnswers(rows.slice(0, 4)).q.streak, 0);
  assert.deepEqual(engine.summarizeAnswers(rows).q, { attempts: 5, correct: 4, wrong: 1, streak: 1, lastAnswerId: 5 });
});
test("anonymous tokens and recovery secrets are hashed, isolated, and reusable across browsers", async () => {
  const { db, sqlite, close } = database();
  try {
    const learner = await store.createLearner(db);
    assert.equal(await store.authenticate(db, learner.token), learner.id);
    assert.equal(await store.authenticate(db, "f".repeat(64)), null);
    assert.equal(sqlite.prepare("SELECT token_hash FROM learner_tokens").get().token_hash, await store.hashSecret(learner.token));
    const code = await store.createRecovery(db, learner.id);
    assert.ok(code.startsWith("ATLAS-"));
    const restored = await store.restoreLearner(db, code);
    assert.equal(restored.id, learner.id);
    assert.notEqual(restored.token, learner.token);
    assert.equal(await store.authenticate(db, restored.token), learner.id);
    await store.createRecovery(db, learner.id);
    await assert.rejects(store.restoreLearner(db, code), /not found/);
    assert.equal(await store.authenticate(db, learner.token), learner.id);
  } finally { close(); }
});
test("concurrent start creates one active test; keys remain private until the end", async () => {
  const { db, sqlite, close } = database();
  try {
    const learner = await store.createLearner(db);
    const [a, b] = await Promise.all([store.startTest(db, learner.id, defaults), store.startTest(db, learner.id, defaults)]);
    assert.equal(a.id, b.id);
    assert.equal(sqlite.prepare("SELECT COUNT(*) AS n FROM quiz_tests").get().n, 1);
    for (const q of a.questions) { assert.equal(q.answer, undefined); assert.equal(q.explanation, undefined); }
    const original = rawTest(sqlite, a.id);
    const answer = await store.answerQuestion(db, learner.id, { testId: a.id, questionId: original[0].id, chosen: original[0].answer, correct: false });
    assert.equal(answer.answered, 1);
    assert.equal(answer.questions[0].correct, undefined);
    assert.equal(answer.questions[0].answer, undefined);
    assert.equal((await store.getDashboard(db, learner.id)).attempts, 0, "pending end-mode answers cannot leak through stats");
    const reopened = await store.getDashboard(db, learner.id);
    assert.equal(reopened.activeTest.answered, 1);
    assert.equal(reopened.activeTest.id, a.id);
  } finally { close(); }
});
test("answers are sequential, idempotent, graded server-side and atomically completed", async () => {
  const { db, sqlite, close } = database();
  try {
    const learner = await store.createLearner(db), stranger = await store.createLearner(db);
    const started = await store.startTest(db, learner.id, { ...defaults, count: 3 });
    const keys = rawTest(sqlite, started.id);
    await assert.rejects(store.getPublicTest(db, stranger.id, started.id), /not part/);
    await assert.rejects(store.answerQuestion(db, stranger.id, { testId: started.id, questionId: keys[0].id, chosen: 0 }), /not part/);
    await assert.rejects(store.answerQuestion(db, learner.id, { testId: started.id, questionId: keys[2].id, chosen: keys[2].answer }), /current question/);
    const first = { testId: started.id, questionId: keys[0].id, chosen: keys[0].answer };
    await Promise.all([store.answerQuestion(db, learner.id, first), store.answerQuestion(db, learner.id, { ...first, chosen: (first.chosen + 1) % 4 })]);
    assert.equal(sqlite.prepare("SELECT COUNT(*) AS n FROM quiz_answers").get().n, 1);
    await store.answerQuestion(db, learner.id, { testId: started.id, questionId: keys[1].id, chosen: (keys[1].answer + 1) % 4, correct: true });
    const finished = await store.answerQuestion(db, learner.id, { testId: started.id, questionId: keys[2].id, chosen: keys[2].answer });
    assert.equal(finished.finished, true);
    assert.equal(finished.answered, 3);
    assert.equal(finished.questions.filter(q => q.correct).length, 2);
    assert.ok(finished.questions.every(q => q.explanation && q.answer !== undefined));
    await store.answerQuestion(db, learner.id, first);
    const dashboard = await store.getDashboard(db, learner.id);
    assert.equal(dashboard.activeTest, null);
    assert.equal(dashboard.attempts, 3);
    assert.equal(dashboard.correct, 2);
    assert.equal(dashboard.mistakes, 1);
    assert.equal(dashboard.recentTests.length, 1);
    assert.equal(dashboard.recentTests[0].correct, 2);
    const next = await store.startTest(db, learner.id, { ...defaults, count: 1 });
    assert.notEqual(next.questions[0].id, keys[2].id);
  } finally { close(); }
});
test("immediate feedback reveals only answered questions; ending a test preserves partial progress", async () => {
  const { db, sqlite, close } = database();
  try {
    const learner = await store.createLearner(db);
    const started = await store.startTest(db, learner.id, { ...defaults, feedback: "immediate", count: 2 });
    const keys = rawTest(sqlite, started.id);
    const first = await store.answerQuestion(db, learner.id, { testId: started.id, questionId: keys[0].id, chosen: keys[0].answer });
    assert.equal(first.questions[0].correct, true);
    assert.ok(first.questions[0].explanation);
    assert.equal(first.questions[1].answer, undefined);
    await store.abandonTest(db, learner.id, started.id);
    const dashboard = await store.getDashboard(db, learner.id);
    assert.equal(dashboard.attempts, 1);
    assert.equal(dashboard.correct, 1);
    assert.equal(dashboard.activeTest, null);
    await assert.rejects(store.answerQuestion(db, learner.id, { testId: started.id, questionId: keys[1].id, chosen: keys[1].answer }), /ended/);
  } finally { close(); }
});
test("snapshot option shuffling preserves grading and stored questions survive bank edits", async () => {
  const { db, sqlite, close } = database();
  try {
    const learner = await store.createLearner(db);
    const started = await store.startTest(db, learner.id, { ...defaults, count: 1 });
    const [key] = rawTest(sqlite, started.id);
    const bankQuestion = questions.find(q => q.id === key.id);
    assert.equal(key.options[key.answer], bankQuestion.options[bankQuestion.answer]);
    const old = bankQuestion.prompt;
    try { bankQuestion.prompt = "Changed later"; assert.equal((await store.getPublicTest(db, learner.id, started.id)).questions[0].prompt, old); }
    finally { bankQuestion.prompt = old; }
  } finally { close(); }
});
test("progress and pending tests survive a database reopen and recovery from another browser", async () => {
  const folder = fs.mkdtempSync(path.join(os.tmpdir(), "atlas-quiz-persistence-"));
  const filename = path.join(folder, "quiz.sqlite");
  let instance = database(filename);
  try {
    const learner = await store.createLearner(instance.db);
    const code = await store.createRecovery(instance.db, learner.id);
    const started = await store.startTest(instance.db, learner.id, { ...defaults, count: 2 });
    const key = rawTest(instance.sqlite, started.id)[0];
    await store.answerQuestion(instance.db, learner.id, { testId: started.id, questionId: key.id, chosen: key.answer });
    instance.close();
    instance = database(filename);
    assert.equal(await store.authenticate(instance.db, learner.token), learner.id);
    const restored = await store.restoreLearner(instance.db, code);
    const dashboard = await store.getDashboard(instance.db, restored.id);
    assert.equal(dashboard.activeTest.id, started.id);
    assert.equal(dashboard.activeTest.answered, 1);
    assert.equal(dashboard.activeTest.questions[0].chosen, key.answer);
  } finally { instance.close(); fs.rmSync(folder, { recursive: true }); }
});
test("mastery is earned across three separate tests and resets on a subsequent wrong answer", async () => {
  const { db, sqlite, close } = database();
  try {
    const learner = await store.createLearner(db);
    const ids = new Set();
    const available = questions.filter(q => q.topic === "QFT").length;
    for (let round = 0; round < 3; round++) {
      const started = await store.startTest(db, learner.id, { ...defaults, topics: ["QFT"], count: available });
      ids.add(started.id);
      for (const key of rawTest(sqlite, started.id)) await store.answerQuestion(db, learner.id, { testId: started.id, questionId: key.id, chosen: key.answer });
      assert.equal((await store.getDashboard(db, learner.id)).mastered, round === 2 ? available : 0);
    }
    assert.equal(ids.size, 3);
    const next = await store.startTest(db, learner.id, { ...defaults, topics: ["QFT"], count: 1 });
    const key = rawTest(sqlite, next.id)[0];
    await store.answerQuestion(db, learner.id, { testId: next.id, questionId: key.id, chosen: (key.answer + 1) % 4 });
    const dashboard = await store.getDashboard(db, learner.id);
    assert.equal(dashboard.mastered, available - 1);
    assert.equal(dashboard.attempts, 3 * available + 1);
    assert.equal(dashboard.correct, 3 * available);
    assert.equal(dashboard.trouble[0].streak, 0);
  } finally { close(); }
});
