export const QUIZ_TOPICS = ["QFT", "Group theory", "CFT", "GR", "AdS", "SUSY", "String theory", "AdS/CFT"] as const;
export type QuizTopic = typeof QUIZ_TOPICS[number];
export type QuizDifficulty = "Foundation" | "Applied" | "Hard";
export type QuizQuestion = {
  id: string; topic: QuizTopic; difficulty: QuizDifficulty;
  prompt: string; options: string[]; answer: number; explanation: string;
  pages: [number, number]; prerequisite?: boolean;
};
export type QuestionProgress = { attempts: number; correct: number; streak: number; lastAnswerId: number; wrong: number };
export type QuizSettings = { topics: QuizTopic[]; count: number; hardOnly: boolean; mistakesOnly: boolean; feedback: "immediate" | "end" };
export type PublicQuestion = Omit<QuizQuestion, "answer" | "explanation"> & { answer?: number; explanation?: string; chosen?: number; correct?: boolean };
export type PublicTest = { id: string; settings: QuizSettings; questions: PublicQuestion[]; answered: number; finished: boolean; createdAt: number; finishedAt: number | null; notice?: string };
export type TopicSummary = { topic: QuizTopic; available: number; attempts: number; correct: number; accuracy: number | null; mastered: number; encountered: number };
export type QuizDashboard = {
  profileId: string;
  totalQuestions: number; hardQuestions: number; attempts: number; correct: number; mastered: number; mistakes: number;
  topics: TopicSummary[]; hasRecovery: boolean; activeTest: PublicTest | null;
  recentTests: { id: string; count: number; correct: number; finishedAt: number }[];
  trouble: { id: string; prompt: string; topic: QuizTopic; wrong: number; streak: number; attempts: number }[];
};
