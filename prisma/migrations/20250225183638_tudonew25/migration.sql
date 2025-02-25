/*
  Warnings:

  - The `periodo_final` column on the `FinanceiroME` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `periodo_final` column on the `financeiroEventos` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "FinanceiroME" DROP COLUMN "periodo_final",
ADD COLUMN     "periodo_final" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "financeiroEventos" DROP COLUMN "periodo_final",
ADD COLUMN     "periodo_final" TIMESTAMP(3);
