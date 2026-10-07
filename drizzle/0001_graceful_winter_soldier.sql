CREATE TABLE `research_checks` (
	`checked_at` text PRIMARY KEY NOT NULL,
	`count` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `research_news` (
	`id` text PRIMARY KEY NOT NULL,
	`data` text NOT NULL,
	`event_date` text NOT NULL,
	`checked_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `research_news_event_idx` ON `research_news` (`event_date`);