/*
  Warnings:

  - You are about to alter the column `valor` on the `FinanceiroME` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `juros` on the `FinanceiroME` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `multa` on the `FinanceiroME` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `desconto` on the `FinanceiroME` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - The `datapagamento` column on the `FinanceiroME` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `datacompetencia` column on the `FinanceiroME` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "FinanceiroME" ALTER COLUMN "valor" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "juros" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "multa" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "desconto" SET DATA TYPE DOUBLE PRECISION,
DROP COLUMN "datapagamento",
ADD COLUMN     "datapagamento" TIMESTAMP(3),
DROP COLUMN "datacompetencia",
ADD COLUMN     "datacompetencia" TIMESTAMP(3);
