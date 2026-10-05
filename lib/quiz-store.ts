import { questions } from "../app/content/questions";
import { buildTest, parseSettings, snapshotQuestions, summarizeAnswers } from "./quiz-engine";
import { QUIZ_TOPICS, type PublicTest, type QuizDashboard, type QuizQuestion, type QuizSettings } from "./quiz-types";

// A narrow interface supports D1 at runtime and SQLite in persistence tests.
export type QuizStatement = {
  bind(...values: unknown[]): QuizStatement;
  first<T>(): Promise<T | null>;
  all<T>(): Promise<{ results: T[] }>;
  run(): Promise<unknown>;
};
export type QuizDatabase = { prepare(sql: string): QuizStatement; batch(statements: QuizStatement[]): Promise<unknown> };
export class QuizError extends Error {
  constructor(message: string, public status = 400) { super(message); }
}
type TestRow = { id: string; learner_id: string; settings: string; question_ids: string; snapshot: string; notice: string | null; created_at: number; finished_at: number | null; abandoned_at: number | null };
type AnswerRow = { id: number; question_id: string; chosen: number; correct: number; test_id: string };

export async function hashSecret(secret: string) {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(secret));
  return Array.from(new Uint8Array(bytes), n => n.toString(16).padStart(2, "0")).join("");
}
export function newSecret() {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)), n => n.toString(16).padStart(2, "0")).join("");
}
export async function authenticate(db: QuizDatabase, token: string | undefined) {
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return null;
  const row = await db.prepare("SELECT learner_id FROM learner_tokens WHERE token_hash = ?").bind(await hashSecret(token)).first<{ learner_id: string }>();
  return row?.learner_id ?? null;
}
export async function createLearner(db: QuizDatabase) {
  const id = crypto.randomUUID(), token = newSecret(), now = Date.now();
  await db.batch([
    db.prepare("INSERT INTO learners (id, created_at) VALUES (?, ?)").bind(id, now),
    db.prepare("INSERT INTO learner_tokens (token_hash, learner_id, created_at) VALUES (?, ?, ?)").bind(await hashSecret(token), id, now),
  ]);
  return { id, token };
}
export async function createRecovery(db: QuizDatabase, learnerId: string) {
  const code = newSecret();
  await db.prepare("UPDATE learners SET recovery_hash = ? WHERE id = ?").bind(await hashSecret(code), learnerId).run();
  return `ATLAS-${code.match(/.{8}/g)!.join("-")}`;
}
export async function restoreLearner(db: QuizDatabase, input: unknown) {
  if (typeof input !== "string" || input.length > 100) throw new QuizError("Enter your saved ATLAS recovery code.");
  const code = input.trim().replace(/^ATLAS-/i, "").replace(/-/g, "").toLowerCase();
  if (!/^[a-f0-9]{64}$/.test(code)) throw new QuizError("That recovery code is not valid. Check all eight groups.");
  const learner = await db.prepare("SELECT id FROM learners WHERE recovery_hash = ?").bind(await hashSecret(code)).first<{ id: string }>();
  if (!learner) throw new QuizError("That recovery code was not found. Check it, or use the latest code you saved.");
  const token = newSecret();
  await db.prepare("INSERT INTO learner_tokens (token_hash, learner_id, created_at) VALUES (?, ?, ?)").bind(await hashSecret(token), learner.id, Date.now()).run();
  return { id: learner.id, token };
}
async function getTestRow(db: QuizDatabase, learner: string, id: string) {
  const test = await db.prepare("SELECT * FROM quiz_tests WHERE id = ? AND learner_id = ?").bind(id, learner).first<TestRow>();
  if (!test) throw new QuizError("This test is not part of your progress profile.", 404);
  return test;
}
export async function getPublicTest(db: QuizDatabase, learner: string, id: string): Promise<PublicTest> {
  const test = await getTestRow(db, learner, id);
  const settings = JSON.parse(test.settings) as QuizSettings;
  const snapshot = JSON.parse(test.snapshot) as QuizQuestion[];
  const answers = (await db.prepare("SELECT * FROM quiz_answers WHERE test_id = ? AND learner_id = ? ORDER BY id").bind(id, learner).all<AnswerRow>()).results;
  const finished = test.finished_at !== null;
  return {
    id, settings, createdAt: test.created_at, finishedAt: test.finished_at, answered: answers.length, finished,
    ...(test.notice ? { notice: test.notice } : {}),
    questions: snapshot.map(({ answer, explanation, ...question }) => {
      const attempt = answers.find(a => a.question_id === question.id);
      const reveal = finished || (settings.feedback === "immediate" && !!attempt);
      return { ...question, ...(attempt ? { chosen: attempt.chosen } : {}), ...(reveal ? { answer, explanation, ...(attempt ? { correct: !!attempt.correct } : {}) } : {}) };
    }),
  };
}
export async function startTest(db: QuizDatabase, learner: string, input: unknown) {
  let settings: QuizSettings;
  try { settings = parseSettings(input); } catch (error) { throw new QuizError((error as Error).message); }
  const active = await db.prepare("SELECT id FROM quiz_tests WHERE learner_id = ? AND finished_at IS NULL AND abandoned_at IS NULL").bind(learner).first<{ id: string }>();
  if (active) return getPublicTest(db, learner, active.id);
  const answers = (await db.prepare("SELECT * FROM quiz_answers WHERE learner_id = ? ORDER BY id").bind(learner).all<AnswerRow>()).results;
  const previous = await db.prepare("SELECT question_ids FROM quiz_tests WHERE learner_id = ? ORDER BY created_at DESC LIMIT 1").bind(learner).first<{ question_ids: string }>();
  const selection = buildTest(questions, settings, summarizeAnswers(answers), answers.at(-1)?.question_id ?? null, previous ? JSON.parse(previous.question_ids) : []);
  if (!selection.ids.length) throw new QuizError(selection.notice ?? (settings.mistakesOnly ? "No previously missed questions match these topics and difficulty. Try a regular test first." : "No questions match these filters. Add another topic or turn off hard questions only."));
  const id = crypto.randomUUID();
  // The partial unique index makes concurrent Start clicks converge on one
  // active test. Both windows receive that same saved test.
  await db.prepare("INSERT INTO quiz_tests (id, learner_id, settings, question_ids, snapshot, notice, created_at) VALUES (?, ?, ?, ?, ?, ?, ?) ON CONFLICT DO NOTHING")
    .bind(id, learner, JSON.stringify(settings), JSON.stringify(selection.ids), JSON.stringify(snapshotQuestions(questions, selection.ids)), selection.notice ?? null, Date.now()).run();
  const saved = await db.prepare("SELECT id FROM quiz_tests WHERE learner_id = ? AND finished_at IS NULL AND abandoned_at IS NULL").bind(learner).first<{ id: string }>();
  if (!saved) throw new QuizError("Your test changed in another window. Refresh to continue.", 409);
  return getPublicTest(db, learner, saved.id);
}

export async function answerQuestion(db: QuizDatabase, learner: string, input: Record<string, unknown>) {
  if (typeof input.testId !== "string" || typeof input.questionId !== "string" || !Number.isInteger(input.chosen)) throw new QuizError("Choose one of the listed answers.");
  const test = await getTestRow(db, learner, input.testId);
  if (test.abandoned_at !== null) throw new QuizError("This test has ended. Start a new one.", 409);
  const snapshot = JSON.parse(test.snapshot) as QuizQuestion[];
  const index = snapshot.findIndex(q => q.id === input.questionId);
  const question = snapshot[index];
  if (!question || (input.chosen as number) < 0 || (input.chosen as number) >= question.options.length) throw new QuizError("Choose one of the listed answers.");
  const existing = await db.prepare("SELECT id FROM quiz_answers WHERE test_id = ? AND question_id = ?").bind(test.id, question.id).first<{ id: number }>();
  if (existing) return getPublicTest(db, learner, test.id);
  if (test.finished_at !== null) throw new QuizError("This test is already complete.", 409);
  const now = Date.now();
  // D1 batch is a transaction. The insert both checks the current position and
  // enforces one answer per question; the completion marker commits with it.
  // Clients submit only a choice. Answer keys and correctness stay server-side.
  await db.batch([
    db.prepare(`INSERT INTO quiz_answers (learner_id, test_id, question_id, chosen, correct, answered_at)
      SELECT ?, ?, ?, ?, ?, ? WHERE EXISTS (SELECT 1 FROM quiz_tests WHERE id = ? AND learner_id = ? AND finished_at IS NULL AND abandoned_at IS NULL)
      AND (SELECT COUNT(*) FROM quiz_answers WHERE test_id = ?) = ? ON CONFLICT (test_id, question_id) DO NOTHING`)
      .bind(learner, test.id, question.id, input.chosen, Number(input.chosen === question.answer), now, test.id, learner, test.id, index),
    db.prepare(`UPDATE quiz_tests SET finished_at = ? WHERE id = ? AND learner_id = ? AND finished_at IS NULL AND abandoned_at IS NULL
      AND (SELECT COUNT(*) FROM quiz_answers WHERE test_id = ?) = ?`).bind(now, test.id, learner, test.id, snapshot.length),
  ]);
  const result = await getPublicTest(db, learner, test.id);
  if (result.questions[index].chosen === undefined) throw new QuizError("Finish the current question first, or refresh if another window changed this test.", 409);
  return result;
}
export async function abandonTest(db: QuizDatabase, learner: string, id: unknown) {
  if (typeof id !== "string") throw new QuizError("Choose the test to end.");
  await getTestRow(db, learner, id);
  await db.prepare("UPDATE quiz_tests SET abandoned_at = ? WHERE id = ? AND learner_id = ? AND finished_at IS NULL").bind(Date.now(), id, learner).run();
}

export async function getDashboard(db: QuizDatabase, learner: string): Promise<QuizDashboard> {
  const [answerRows, testRows, profile] = await Promise.all([
    // Pending test scores are excluded so end-of-test mode cannot leak an
    // answer through a changing accuracy percentage in another window.
    db.prepare("SELECT a.* FROM quiz_answers a JOIN quiz_tests t ON t.id = a.test_id WHERE a.learner_id = ? AND (t.finished_at IS NOT NULL OR t.abandoned_at IS NOT NULL) ORDER BY a.id").bind(learner).all<AnswerRow>(),
    db.prepare("SELECT * FROM quiz_tests WHERE learner_id = ? ORDER BY created_at DESC").bind(learner).all<TestRow>(),
    db.prepare("SELECT recovery_hash FROM learners WHERE id = ?").bind(learner).first<{ recovery_hash: string | null }>(),
  ]);
  const progress = summarizeAnswers(answerRows.results), values = Object.values(progress);
  const active = testRows.results.find(t => t.finished_at === null && t.abandoned_at === null);
  const topics = QUIZ_TOPICS.map(topic => {
    const bank = questions.filter(q => q.topic === topic), rows = bank.map(q => progress[q.id]).filter(Boolean);
    const attempts = rows.reduce((s, p) => s + p.attempts, 0), correct = rows.reduce((s, p) => s + p.correct, 0);
    return { topic, available: bank.length, attempts, correct, accuracy: attempts ? Math.round(100 * correct / attempts) : null, mastered: rows.filter(p => p.streak >= 3).length, encountered: rows.length };
  });
  return {
    profileId: learner,
    totalQuestions: questions.length, hardQuestions: questions.filter(q => q.difficulty === "Hard").length,
    attempts: values.reduce((s, p) => s + p.attempts, 0), correct: values.reduce((s, p) => s + p.correct, 0), mastered: values.filter(p => p.streak >= 3).length,
    mistakes: values.filter(p => p.wrong > 0).length, topics, hasRecovery: !!profile?.recovery_hash,
    activeTest: active ? await getPublicTest(db, learner, active.id) : null,
    recentTests: testRows.results.filter(t => t.finished_at !== null).slice(0, 12).map(t => ({ id: t.id, count: (JSON.parse(t.question_ids) as string[]).length, correct: answerRows.results.filter(a => a.test_id === t.id && a.correct).length, finishedAt: t.finished_at! })),
    trouble: questions.filter(q => progress[q.id]?.wrong > 0).map(q => ({ id: q.id, prompt: q.prompt, topic: q.topic, wrong: progress[q.id].wrong, streak: progress[q.id].streak, attempts: progress[q.id].attempts })).sort((a, b) => a.streak >= 3 && b.streak < 3 ? 1 : b.streak >= 3 && a.streak < 3 ? -1 : b.wrong - a.wrong).slice(0, 12),
  };
}
