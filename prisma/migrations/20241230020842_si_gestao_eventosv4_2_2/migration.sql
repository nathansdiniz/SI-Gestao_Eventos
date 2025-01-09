/*
  Warnings:

  - Added the required column `id_empresa` to the `Evento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Evento" ADD COLUMN     "id_empresa" INTEGER NOT NULL;
