/*
  Warnings:

  - Made the column `cpf` on table `Funcionarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nome` on table `Funcionarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `funcao` on table `Funcionarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `Funcionarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `endereco` on table `Funcionarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `telefone` on table `Funcionarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `Funcionarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `data_nascimento` on table `Funcionarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `data_start_funcao` on table `Funcionarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `data_updated_funcao` on table `Funcionarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `data_created` on table `Funcionarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `id_empresa` on table `Funcionarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rg` on table `Funcionarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sexo` on table `Funcionarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `celular` on table `Funcionarios` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Funcionarios" ALTER COLUMN "cpf" SET NOT NULL,
ALTER COLUMN "nome" SET NOT NULL,
ALTER COLUMN "funcao" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "endereco" SET NOT NULL,
ALTER COLUMN "telefone" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "data_nascimento" SET NOT NULL,
ALTER COLUMN "data_start_funcao" SET NOT NULL,
ALTER COLUMN "data_start_funcao" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "data_updated_funcao" SET NOT NULL,
ALTER COLUMN "data_updated_funcao" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "data_created" SET NOT NULL,
ALTER COLUMN "data_created" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "id_empresa" SET NOT NULL,
ALTER COLUMN "rg" SET NOT NULL,
ALTER COLUMN "sexo" SET NOT NULL,
ALTER COLUMN "celular" SET NOT NULL;
