/*
  Warnings:

  - Made the column `userID` on table `Empresas` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Empresas" ALTER COLUMN "userID" SET NOT NULL,
ALTER COLUMN "userID" SET DEFAULT 'Indefinido';
