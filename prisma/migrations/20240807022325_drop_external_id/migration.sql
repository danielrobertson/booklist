/*
  Warnings:

  - You are about to drop the column `external_id` on the `list` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "lists_external_id_key";

-- AlterTable
ALTER TABLE "list" DROP COLUMN "external_id";
