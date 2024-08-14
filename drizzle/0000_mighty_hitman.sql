CREATE TABLE IF NOT EXISTS "book" (
	"uuid2" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"google_book_id" varchar,
	"createdAt" timestamp DEFAULT now(),
	CONSTRAINT "book_google_book_id_unique" UNIQUE("google_book_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "list" (
	"uuid2" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256),
	"description" varchar(256),
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "list_item" (
	"uuid2" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
