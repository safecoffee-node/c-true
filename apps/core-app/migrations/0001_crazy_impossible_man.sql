CREATE TABLE `quotes` (
	`id` text PRIMARY KEY NOT NULL,
	`body` text,
	`statut` text DEFAULT 'attributed',
	`source` text NOT NULL,
	`author` text NOT NULL,
	`nationalite` text NOT NULL,
	`topic_id` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `topics` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `topics_name_unique` ON `topics` (`name`);