/*
  Warnings:

  - The primary key for the `Orcamentos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `Orcamentos` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Orcamentos" DROP CONSTRAINT "Orcamentos_pkey",
ADD COLUMN     "id_empresa" INTEGER,
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "orcamentos_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Orcamentos_id_key" ON "Orcamentos"("id");
