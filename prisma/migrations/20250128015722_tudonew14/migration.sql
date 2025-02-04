/*
  Warnings:

  - You are about to drop the column `Pagamentos_id` on the `Funcionarios` table. All the data in the column will be lost.
  - You are about to drop the column `id_celula` on the `Funcionarios` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Funcionarios" DROP COLUMN "Pagamentos_id",
DROP COLUMN "id_celula",
ADD COLUMN     "id_empresa" INTEGER,
ADD COLUMN     "rg" TEXT,
ADD COLUMN     "sexo" TEXT;
