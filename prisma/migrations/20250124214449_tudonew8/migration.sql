/*
  Warnings:

  - The `datapagamento` column on the `FinanceiroME` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `datacompetencia` column on the `FinanceiroME` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "FinanceiroME" DROP COLUMN "datapagamento",
ADD COLUMN     "datapagamento" TIMESTAMP(3),
DROP COLUMN "datacompetencia",
ADD COLUMN     "datacompetencia" TIMESTAMP(3);
