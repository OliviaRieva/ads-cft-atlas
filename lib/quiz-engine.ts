import { QUIZ_TOPICS, type QuestionProgress, type QuizQuestion, type QuizSettings } from "./quiz-types";

export function parseSettings(value: unknown): QuizSettings {
  if (!value || typeof value !== "object") throw new Error("Choose your test settings first.");
  const v = value as Record<string, unknown>;
  const requestedTopics = Array.isArray(v.topics) ? v.topics : [];
  const topics = QUIZ_TOPICS.filter(t => requestedTopics.includes(t));
  if (!topics.length) throw new Error("Choose at least one topic.");
  if (typeof v.count !== "number" || !Number.isInteger(v.count) || v.count < 1 || v.count > 100) throw new Error("Choose between 1 and 100 questions.");
  return { topics, count: v.count, hardOnly: v.hardOnly === true, mistakesOnly: v.mistakesOnly === true, feedback: v.feedback === "end" ? "end" : "immediate" };
}

export function buildTest(bank: QuizQuestion[], settings: QuizSettings, progress: Record<string, QuestionProgress>, lastQuestionId: string | null, previousIds: string[] = [], random = Math.random) {
  const eligible = bank.filter(q => settings.topics.includes(q.topic) && (!settings.hardOnly || q.difficulty === "Hard") && (!settings.mistakesOnly || (progress[q.id]?.wrong ?? 0) > 0));
  const shuffled = eligible.map(q => {
    const p = progress[q.id];
    // Untaught and still-learning items precede mastered items. Among learning
    // items, troublesome questions receive priority, with a small cooldown for
    // the most recent test. Every question can occur at most once in this test.
    const priority = (p?.streak ?? 0) >= 3 ? 100 : p?.wrong ? -Math.min(10, p.wrong) : p?.attempts ? 10 : 20;
    return { q, rank: priority + (previousIds.includes(q.id) ? 12 : 0) + random() * 10 };
  }).sort((a,b) => a.rank-b.rank);
  const selected = shuffled.slice(0, settings.count).map(x => x.q.id);
  // Avoid an adjacent repeat even across a test boundary. If the filters leave
  // no alternative, ask the learner to broaden them instead of repeating.
  if (eligible.length === 1 && eligible[0].id === lastQuestionId) {
    return { ids: [] as string[], eligible: 1, notice: "Your only matching question was the last one you answered. Add another topic or turn off a filter to answer a different question before revisiting it." };
  }
  if (selected[0] === lastQuestionId) {
    const alternative = shuffled.find(x => x.q.id !== lastQuestionId)?.q.id;
    if (alternative) {
      const index = selected.indexOf(alternative);
      if (index >= 0) [selected[0], selected[index]] = [selected[index], selected[0]];
      else selected[0] = alternative;
    }
  }
  const notice = selected.length < settings.count ? `These filters match ${selected.length} unique questions, so this test contains ${selected.length} instead of ${settings.count}.` : undefined;
  return { ids: selected, notice, eligible: eligible.length };
}

// Store a shuffled snapshot with the test. A later edit to the teaching bank
// cannot change either a pending question or the key used to grade it.
export function snapshotQuestions(bank: QuizQuestion[], ids: string[], random = Math.random): QuizQuestion[] {
  return ids.map(id => {
    const question = bank.find(q => q.id === id)!;
    const order = question.options.map((_, i) => i);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    return { ...question, options: order.map(i => question.options[i]), answer: order.indexOf(question.answer) };
  });
}

export function summarizeAnswers(rows: { question_id: string; id: number; correct: number }[]): Record<string, QuestionProgress> {
  const progress: Record<string, QuestionProgress> = {};
  for (const row of [...rows].sort((a,b) => a.id-b.id)) {
    const p = progress[row.question_id] ?? { attempts: 0, correct: 0, wrong: 0, streak: 0, lastAnswerId: 0 };
    p.attempts++; p.correct += row.correct; p.wrong += 1-row.correct;
    p.streak = row.correct ? p.streak+1 : 0; p.lastAnswerId = row.id;
    progress[row.question_id] = p;
  }
  return progress;
}
