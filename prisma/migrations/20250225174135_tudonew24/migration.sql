-- AlterTable
ALTER TABLE "FinanceiroME" ADD COLUMN     "documentos_anexados" JSONB,
ADD COLUMN     "informacoes_extras" TEXT,
ADD COLUMN     "periodo_final" TEXT,
ADD COLUMN     "recorrencia" TEXT,
ADD COLUMN     "ultima_alteracao_validacao" TEXT,
ADD COLUMN     "validacao" TEXT;
