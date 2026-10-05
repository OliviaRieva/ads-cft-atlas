import { sqliteTable, text, integer, index, uniqueIndex } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const learners = sqliteTable("learners", {
  id: text("id").primaryKey(),
  recoveryHash: text("recovery_hash"),
  createdAt: integer("created_at").notNull(),
}, t => [uniqueIndex("learners_recovery_idx").on(t.recoveryHash)]);

export const learnerTokens = sqliteTable("learner_tokens", {
  tokenHash: text("token_hash").primaryKey(),
  learnerId: text("learner_id").notNull().references(() => learners.id),
  createdAt: integer("created_at").notNull(),
}, t => [index("learner_tokens_learner_idx").on(t.learnerId)]);

export const quizTests = sqliteTable("quiz_tests", {
  id: text("id").primaryKey(),
  learnerId: text("learner_id").notNull().references(() => learners.id),
  settings: text("settings").notNull(),
  questionIds: text("question_ids").notNull(),
  snapshot: text("snapshot").notNull(),
  notice: text("notice"),
  createdAt: integer("created_at").notNull(),
  finishedAt: integer("finished_at"),
  abandonedAt: integer("abandoned_at"),
}, t => [index("quiz_tests_learner_idx").on(t.learnerId), uniqueIndex("quiz_tests_one_active_idx").on(t.learnerId).where(sql`${t.finishedAt} is null and ${t.abandonedAt} is null`)]);

export const quizAnswers = sqliteTable("quiz_answers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  learnerId: text("learner_id").notNull().references(() => learners.id),
  testId: text("test_id").notNull().references(() => quizTests.id),
  questionId: text("question_id").notNull(),
  chosen: integer("chosen").notNull(),
  correct: integer("correct").notNull(),
  answeredAt: integer("answered_at").notNull(),
}, t => [uniqueIndex("quiz_answers_once_idx").on(t.testId, t.questionId), index("quiz_answers_learner_question_idx").on(t.learnerId, t.questionId)]);
