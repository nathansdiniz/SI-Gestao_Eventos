-- AlterTable
ALTER TABLE "HistoricoLogs" ADD COLUMN     "acao_realizada" TEXT,
ADD COLUMN     "dados_acao" JSONB,
ADD COLUMN     "status" TEXT;
