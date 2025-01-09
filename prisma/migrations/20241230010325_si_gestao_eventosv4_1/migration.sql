/*
  Warnings:

  - You are about to drop the column `bairro` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `bairroPJ` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `celular` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `cepPJ` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `cidadePJ` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `cnpjPJ` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `complementoPJ` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `cpf` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `dataDeExpedicao` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `dataDeNascimento` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `ddiCelular` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `ddiTelefone` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `ddiTelefone2` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `email2` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `enderecoPJ` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `estadoCivil` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `estadoPJ` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `estadual` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `municipal` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `nacionalidade` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `nomeFantasia` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `numero` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `numeroPJ` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `orgaoExpeditor` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `paisPJ` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `pontoReferenciaPJ` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `profissao` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `razaoSocial` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `redeSocial` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `responsavel` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `rg` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `telefone2` on the `Cliente` table. All the data in the column will be lost.
  - Made the column `tipoCadastro` on table `Cliente` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Cliente" DROP COLUMN "bairro",
DROP COLUMN "bairroPJ",
DROP COLUMN "celular",
DROP COLUMN "cepPJ",
DROP COLUMN "cidadePJ",
DROP COLUMN "cnpjPJ",
DROP COLUMN "complementoPJ",
DROP COLUMN "cpf",
DROP COLUMN "dataDeExpedicao",
DROP COLUMN "dataDeNascimento",
DROP COLUMN "ddiCelular",
DROP COLUMN "ddiTelefone",
DROP COLUMN "ddiTelefone2",
DROP COLUMN "email2",
DROP COLUMN "enderecoPJ",
DROP COLUMN "estadoCivil",
DROP COLUMN "estadoPJ",
DROP COLUMN "estadual",
DROP COLUMN "municipal",
DROP COLUMN "nacionalidade",
DROP COLUMN "nomeFantasia",
DROP COLUMN "numero",
DROP COLUMN "numeroPJ",
DROP COLUMN "orgaoExpeditor",
DROP COLUMN "paisPJ",
DROP COLUMN "pontoReferenciaPJ",
DROP COLUMN "profissao",
DROP COLUMN "razaoSocial",
DROP COLUMN "redeSocial",
DROP COLUMN "responsavel",
DROP COLUMN "rg",
DROP COLUMN "telefone2",
ADD COLUMN     "dataCadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "tipoCadastro" SET NOT NULL,
ALTER COLUMN "tipoCadastro" DROP DEFAULT;

-- CreateTable
CREATE TABLE "PessoaFisica" (
    "id" SERIAL NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "cpf" TEXT,
    "rg" TEXT,
    "orgaoExpeditor" TEXT,
    "dataDeNascimento" TIMESTAMP(3),
    "estadoCivil" TEXT,
    "profissao" TEXT,
    "nacionalidade" TEXT,

    CONSTRAINT "PessoaFisica_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PessoaJuridica" (
    "id" SERIAL NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "cnpj" TEXT,
    "razaoSocial" TEXT,
    "nomeFantasia" TEXT,
    "inscricaoMunicipal" TEXT,
    "inscricaoEstadual" TEXT,

    CONSTRAINT "PessoaJuridica_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PessoaFisica_clienteId_key" ON "PessoaFisica"("clienteId");

-- CreateIndex
CREATE UNIQUE INDEX "PessoaFisica_cpf_key" ON "PessoaFisica"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "PessoaJuridica_clienteId_key" ON "PessoaJuridica"("clienteId");

-- CreateIndex
CREATE UNIQUE INDEX "PessoaJuridica_cnpj_key" ON "PessoaJuridica"("cnpj");

-- AddForeignKey
ALTER TABLE "PessoaFisica" ADD CONSTRAINT "PessoaFisica_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PessoaJuridica" ADD CONSTRAINT "PessoaJuridica_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
