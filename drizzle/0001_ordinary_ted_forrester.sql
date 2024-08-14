ALTER TABLE "list_item" ADD COLUMN "list_id" uuid;--> statement-breakpoint
ALTER TABLE "list_item" ADD COLUMN "book_id" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "list_item" ADD CONSTRAINT "list_item_list_id_list_uuid2_fk" FOREIGN KEY ("list_id") REFERENCES "public"."list"("uuid2") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "list_item" ADD CONSTRAINT "list_item_book_id_book_uuid2_fk" FOREIGN KEY ("book_id") REFERENCES "public"."book"("uuid2") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
