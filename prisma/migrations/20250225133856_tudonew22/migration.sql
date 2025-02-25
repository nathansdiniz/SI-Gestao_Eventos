-- AlterTable
ALTER TABLE "financeiroEventos" ADD COLUMN     "documentos_anexados" JSONB,
ADD COLUMN     "periodo_final" TEXT,
ADD COLUMN     "recorrencia" TEXT;
