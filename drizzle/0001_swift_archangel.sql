ALTER TABLE "list_item" RENAME TO "listItem";--> statement-breakpoint
ALTER TABLE "book" RENAME COLUMN "google_book_id" TO "googleBookId";--> statement-breakpoint
ALTER TABLE "listItem" RENAME COLUMN "list_id" TO "listId";--> statement-breakpoint
ALTER TABLE "listItem" RENAME COLUMN "book_id" TO "bookId";--> statement-breakpoint
ALTER TABLE "book" DROP CONSTRAINT "book_google_book_id_unique";--> statement-breakpoint
ALTER TABLE "listItem" DROP CONSTRAINT "list_item_list_id_list_id_fk";
--> statement-breakpoint
ALTER TABLE "listItem" DROP CONSTRAINT "list_item_book_id_book_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "listItem" ADD CONSTRAINT "listItem_listId_list_id_fk" FOREIGN KEY ("listId") REFERENCES "public"."list"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "listItem" ADD CONSTRAINT "listItem_bookId_book_id_fk" FOREIGN KEY ("bookId") REFERENCES "public"."book"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "book" ADD CONSTRAINT "book_googleBookId_unique" UNIQUE("googleBookId");