/*
  Warnings:

  - You are about to drop the `Eventos` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Clientes" ADD COLUMN     "tipoCadastro" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "Orcamentos" ADD COLUMN     "celular" TEXT,
ADD COLUMN     "codigoInterno" TEXT,
ADD COLUMN     "ddiCelular" TEXT,
ADD COLUMN     "ddiTelefone" TEXT,
ADD COLUMN     "email_cliente" TEXT,
ADD COLUMN     "idLocalEvento" INTEGER,
ADD COLUMN     "nomeDoEvento" TEXT,
ADD COLUMN     "nomeResponsavel" TEXT,
ADD COLUMN     "numeroConvidados" INTEGER,
ADD COLUMN     "obs2" TEXT,
ADD COLUMN     "obs3" TEXT,
ADD COLUMN     "obs4" TEXT,
ADD COLUMN     "observacao" TEXT,
ADD COLUMN     "telefone" TEXT,
ADD COLUMN     "valorInicial" DECIMAL(65,30),
ADD COLUMN     "whatsapp" TEXT;

-- DropTable
DROP TABLE "Eventos";

-- CreateTable
CREATE TABLE "Evento" (
    "id" SERIAL NOT NULL,
    "tipoEvento" TEXT NOT NULL,
    "dataDeCadastro" TIMESTAMP(3) NOT NULL,
    "idOrcamento" INTEGER NOT NULL,
    "idCliente" INTEGER NOT NULL,
    "nomeCliente" TEXT NOT NULL,
    "dataEvento" TIMESTAMP(3) NOT NULL,
    "horaEvento" TEXT NOT NULL,
    "localEvento" TEXT NOT NULL,
    "nomeEvento" TEXT NOT NULL,
    "idLocalEvento" INTEGER NOT NULL,
    "endereco" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "complemento" TEXT,
    "cep" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "informacoes" TEXT,
    "observacao" TEXT,
    "codigoInterno" TEXT,
    "convidados" INTEGER NOT NULL,
    "datasAdicionais" JSONB NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Evento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" SERIAL NOT NULL,
    "tipoCadastro" BOOLEAN DEFAULT false,
    "nome" TEXT NOT NULL,
    "email" TEXT,
    "email2" TEXT,
    "cep" TEXT,
    "endereco" TEXT,
    "numero" TEXT,
    "complemento" TEXT,
    "bairro" TEXT,
    "cidade" TEXT,
    "estado" TEXT,
    "pontoReferencia" TEXT,
    "responsavel" TEXT,
    "anotacoes" TEXT,
    "dataDeNascimento" TIMESTAMP(3),
    "cpf" TEXT,
    "rg" TEXT,
    "orgaoExpeditor" TEXT,
    "dataDeExpedicao" TIMESTAMP(3),
    "pais" TEXT,
    "ddiTelefone" TEXT,
    "telefone" TEXT,
    "ddiTelefone2" TEXT,
    "telefone2" TEXT,
    "ddiCelular" TEXT,
    "celular" TEXT,
    "redeSocial" TEXT,
    "profissao" TEXT,
    "estadoCivil" TEXT,
    "nacionalidade" TEXT,
    "razaoSocial" TEXT,
    "nomeFantasia" TEXT,
    "cnpjPJ" TEXT,
    "municipal" TEXT,
    "estadual" TEXT,
    "cepPJ" TEXT,
    "enderecoPJ" TEXT,
    "numeroPJ" TEXT,
    "complementoPJ" TEXT,
    "bairroPJ" TEXT,
    "cidadePJ" TEXT,
    "estadoPJ" TEXT,
    "paisPJ" TEXT,
    "pontoReferenciaPJ" TEXT,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);
