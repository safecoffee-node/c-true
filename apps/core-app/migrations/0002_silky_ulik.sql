PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_quotes` (
	`id` text PRIMARY KEY NOT NULL,
	`body` text,
	`statut` text DEFAULT 'attributed',
	`source` text NOT NULL,
	`author` text NOT NULL,
	`nationalite` text NOT NULL,
	`topic_id` text NOT NULL,
	FOREIGN KEY (`topic_id`) REFERENCES `topics`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_quotes`("id", "body", "statut", "source", "author", "nationalite", "topic_id") SELECT "id", "body", "statut", "source", "author", "nationalite", "topic_id" FROM `quotes`;--> statement-breakpoint
DROP TABLE `quotes`;--> statement-breakpoint
ALTER TABLE `__new_quotes` RENAME TO `quotes`;--> statement-breakpoint
PRAGMA foreign_keys=ON;