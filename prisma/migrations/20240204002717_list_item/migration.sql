/*
  Warnings:

  - A unique constraint covering the columns `[list_id,book_id]` on the table `list_item` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "list_item_list_id_book_id_key" ON "list_item"("list_id", "book_id");
