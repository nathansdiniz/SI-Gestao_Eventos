/*
  Warnings:

  - Made the column `data_updated` on table `Funcionarios` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Funcionarios" ALTER COLUMN "data_updated" SET NOT NULL;
