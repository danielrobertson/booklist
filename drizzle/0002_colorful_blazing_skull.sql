ALTER TABLE "book" RENAME COLUMN "uuid2" TO "id";--> statement-breakpoint
ALTER TABLE "list" RENAME COLUMN "uuid2" TO "id";--> statement-breakpoint
ALTER TABLE "list_item" RENAME COLUMN "uuid2" TO "id";--> statement-breakpoint
ALTER TABLE "list_item" DROP CONSTRAINT "list_item_list_id_list_uuid2_fk";
--> statement-breakpoint
ALTER TABLE "list_item" DROP CONSTRAINT "list_item_book_id_book_uuid2_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "list_item" ADD CONSTRAINT "list_item_list_id_list_id_fk" FOREIGN KEY ("list_id") REFERENCES "public"."list"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "list_item" ADD CONSTRAINT "list_item_book_id_book_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."book"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
