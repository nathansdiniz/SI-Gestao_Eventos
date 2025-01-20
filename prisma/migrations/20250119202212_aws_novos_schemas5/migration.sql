/*
  Warnings:

  - The primary key for the `Cliente` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PessoaFisica` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PessoaJuridica` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `Cliente` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `PessoaFisica` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `PessoaJuridica` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Cliente" DROP CONSTRAINT "Cliente_pkey",
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Cliente_id_seq";

-- AlterTable
ALTER TABLE "PessoaFisica" DROP CONSTRAINT "PessoaFisica_pkey",
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "PessoaFisica_id_seq";

-- AlterTable
ALTER TABLE "PessoaJuridica" DROP CONSTRAINT "PessoaJuridica_pkey",
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "PessoaJuridica_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_id_key" ON "Cliente"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PessoaFisica_id_key" ON "PessoaFisica"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PessoaJuridica_id_key" ON "PessoaJuridica"("id");
