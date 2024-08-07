/*
  Warnings:

  - The primary key for the `list` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "list_item" DROP CONSTRAINT "list_item_list_id_fkey";

-- AlterTable
ALTER TABLE "list" DROP CONSTRAINT "lists_pkey",
ALTER COLUMN "id" SET DEFAULT 'gen_random_uuid()',
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "lists_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "list_id_seq";

-- AlterTable
ALTER TABLE "list_item" ALTER COLUMN "list_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "list_item" ADD CONSTRAINT "list_item_list_id_fkey" FOREIGN KEY ("list_id") REFERENCES "list"("id") ON DELETE CASCADE ON UPDATE CASCADE;
