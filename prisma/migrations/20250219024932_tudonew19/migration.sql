-- AlterTable
ALTER TABLE "Saidas" ADD COLUMN     "id_empresa" INTEGER;

-- CreateTable
CREATE TABLE "financeiroEventos" (
    "id" INTEGER NOT NULL,
    "evento" TEXT,
    "datapagamento" TIMESTAMP(3),
    "datacompetencia" TIMESTAMP(3),
    "tipocobranca" TEXT,
    "idrecebidode" TEXT,
    "recebidode" TEXT,
    "informede" TEXT,
    "descricao" TEXT,
    "valor" DOUBLE PRECISION,
    "juros" DOUBLE PRECISION,
    "multa" DOUBLE PRECISION,
    "desconto" DOUBLE PRECISION,
    "pago" TEXT,
    "idconta" TEXT,
    "conta" TEXT,
    "idcategoria" TEXT,
    "categoria" TEXT,
    "idcentrodecusto" TEXT,
    "centrodecusto" TEXT,
    "mododepagamento" TEXT,
    "parcelas" JSONB,
    "idevento" TEXT,
    "id_empresa" INTEGER,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_update" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validacao" TEXT,
    "ultima_alteracao_validacao" TEXT,
    "userID" TEXT
);

-- CreateTable
CREATE TABLE "contasBancarias" (
    "id" SERIAL NOT NULL,
    "nomeConta" TEXT NOT NULL,
    "banco" TEXT NOT NULL,
    "tipo_conta" TEXT NOT NULL,
    "agencia" TEXT NOT NULL,
    "conta" TEXT NOT NULL,
    "saldoBancario" DECIMAL(65,30),
    "totalEntradas" DECIMAL(65,30),
    "totalSaidas" DECIMAL(65,30),
    "ultima_atualizacao_saldo" TIMESTAMP(3) NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,
    "userID" TEXT,
    "id_empresa" INTEGER NOT NULL,

    CONSTRAINT "contasBancarias_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "financeiroEventos_id_key" ON "financeiroEventos"("id");
