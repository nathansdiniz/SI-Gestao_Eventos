/*
  Warnings:

  - Made the column `Descricao` on table `HistoricoLogs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `datahora_alteracao` on table `HistoricoLogs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `HistoricoLogscol` on table `HistoricoLogs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userID` on table `HistoricoLogs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `acao_realizada` on table `HistoricoLogs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dados_acao` on table `HistoricoLogs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `HistoricoLogs` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "HistoricoLogs" ALTER COLUMN "Descricao" SET NOT NULL,
ALTER COLUMN "Descricao" SET DATA TYPE TEXT,
ALTER COLUMN "datahora_alteracao" SET NOT NULL,
ALTER COLUMN "HistoricoLogscol" SET NOT NULL,
ALTER COLUMN "HistoricoLogscol" SET DATA TYPE TEXT,
ALTER COLUMN "userID" SET NOT NULL,
ALTER COLUMN "acao_realizada" SET NOT NULL,
ALTER COLUMN "dados_acao" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL;
