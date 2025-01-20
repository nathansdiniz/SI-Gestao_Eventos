/*
  Warnings:

  - The primary key for the `Eventosme` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `Eventosme` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Eventosme" DROP CONSTRAINT "Eventosme_pkey",
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Eventosme_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Eventosme_id_key" ON "Eventosme"("id");
