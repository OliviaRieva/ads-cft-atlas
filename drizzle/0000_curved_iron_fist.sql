CREATE TABLE `learner_tokens` (
	`token_hash` text PRIMARY KEY NOT NULL,
	`learner_id` text NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`learner_id`) REFERENCES `learners`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `learner_tokens_learner_idx` ON `learner_tokens` (`learner_id`);--> statement-breakpoint
CREATE TABLE `learners` (
	`id` text PRIMARY KEY NOT NULL,
	`recovery_hash` text,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `learners_recovery_idx` ON `learners` (`recovery_hash`);--> statement-breakpoint
CREATE TABLE `quiz_answers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`learner_id` text NOT NULL,
	`test_id` text NOT NULL,
	`question_id` text NOT NULL,
	`chosen` integer NOT NULL,
	`correct` integer NOT NULL,
	`answered_at` integer NOT NULL,
	FOREIGN KEY (`learner_id`) REFERENCES `learners`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`test_id`) REFERENCES `quiz_tests`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `quiz_answers_once_idx` ON `quiz_answers` (`test_id`,`question_id`);--> statement-breakpoint
CREATE INDEX `quiz_answers_learner_question_idx` ON `quiz_answers` (`learner_id`,`question_id`);--> statement-breakpoint
CREATE TABLE `quiz_tests` (
	`id` text PRIMARY KEY NOT NULL,
	`learner_id` text NOT NULL,
	`settings` text NOT NULL,
	`question_ids` text NOT NULL,
	`snapshot` text NOT NULL,
	`notice` text,
	`created_at` integer NOT NULL,
	`finished_at` integer,
	`abandoned_at` integer,
	FOREIGN KEY (`learner_id`) REFERENCES `learners`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `quiz_tests_learner_idx` ON `quiz_tests` (`learner_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `quiz_tests_one_active_idx` ON `quiz_tests` (`learner_id`) WHERE "quiz_tests"."finished_at" is null and "quiz_tests"."abandoned_at" is null;