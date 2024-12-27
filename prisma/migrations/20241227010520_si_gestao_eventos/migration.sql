-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('DEPOSIT', 'EXPENSE', 'INVESTMENT');

-- CreateEnum
CREATE TYPE "TransactionCategory" AS ENUM ('HOUSING', 'TRANSPORTATION', 'FOOD', 'ENTERTAINMENT', 'HEALTH', 'UTILITY', 'SALARY', 'EDUCATION', 'OTHER');

-- CreateEnum
CREATE TYPE "TransactionPaymentMethod" AS ENUM ('CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER', 'BANK_SLIP', 'CASH', 'PIX', 'OTHER');

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "TransactionType" NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "category" "TransactionCategory" NOT NULL,
    "paymentMethod" "TransactionPaymentMethod" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PagtoConfig" (
    "id" SERIAL NOT NULL,
    "tipo_saida" TEXT,
    "tabela_cms" TEXT,
    "periodiciade_pgto" TEXT,
    "data_created" TIMESTAMP(3),
    "data_updated" TIMESTAMP(3),
    "text_informacoes" TEXT,

    CONSTRAINT "PagtoConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserType" (
    "int" SERIAL NOT NULL,
    "name" TEXT,
    "descricao" TEXT,
    "data_created" TIMESTAMP(3),
    "data_updated" TIMESTAMP(3),

    CONSTRAINT "UserType_pkey" PRIMARY KEY ("int")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "cpf" TEXT,
    "usuario" TEXT,
    "senha" TEXT,
    "email" TEXT,
    "id_user_type" INTEGER,
    "data_created" TIMESTAMP(3),
    "data_updated" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Funcionarios" (
    "id" SERIAL NOT NULL,
    "cpf" TEXT,
    "nome" TEXT,
    "funcao" TEXT,
    "status" BOOLEAN,
    "id_celula" INTEGER,
    "endereco" TEXT,
    "telefone" TEXT,
    "email" TEXT,
    "data_nascimento" TIMESTAMP(3),
    "data_start_funcao" TIMESTAMP(3),
    "data_end_funcao" TIMESTAMP(3),
    "data_updated_funcao" TIMESTAMP(3),
    "data_created" TIMESTAMP(3),
    "data_updated" TIMESTAMP(3),
    "Pagamentos_id" INTEGER NOT NULL,
    "User_id" INTEGER NOT NULL,

    CONSTRAINT "Funcionarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Empresas" (
    "int" SERIAL NOT NULL,
    "empresa" TEXT,
    "cnpj" TEXT NOT NULL,
    "ramo_empresa" TEXT,
    "localizacao_empresa" TEXT,
    "data_created" TIMESTAMP(3),
    "data_updated" TIMESTAMP(3),
    "gestor_responsavel" TEXT,

    CONSTRAINT "Empresas_pkey" PRIMARY KEY ("int")
);

-- CreateTable
CREATE TABLE "EntradasEventos" (
    "int" SERIAL NOT NULL,
    "operacao" TEXT,
    "data_principal" TIMESTAMP(3),
    "tipo_receita" TEXT,
    "parcelas" INTEGER,
    "valor" DECIMAL(65,30),
    "troco" DECIMAL(65,30),
    "custo_convenio" INTEGER,
    "segment_convenio" INTEGER,
    "taxa_juros" DECIMAL(65,30),
    "agencia" TEXT,
    "status" TEXT,
    "id_empresa" INTEGER,
    "tipo" INTEGER,
    "banco" TEXT,
    "seq_operador" INTEGER,
    "cod_transacao" TEXT,
    "data_contratada" TIMESTAMP(3),
    "data_cancelada" TIMESTAMP(3),
    "data_proposta" TIMESTAMP(3),
    "data_movimentacao" TIMESTAMP(3),
    "cod_situacao" TEXT,
    "cod_processamento" TEXT,
    "valor_liquido" DECIMAL(65,30),
    "agente_responsavel" TEXT,
    "cpf_cliente" TEXT,
    "nome_cliente" TEXT,
    "validacao" TEXT,
    "ultima_alteracao_validacao" TEXT,

    CONSTRAINT "EntradasEventos_pkey" PRIMARY KEY ("int")
);

-- CreateTable
CREATE TABLE "Producao" (
    "id" SERIAL NOT NULL,
    "produto" TEXT,
    "operacao" TEXT,
    "chavej_operador" TEXT,
    "cpf_cnpj_operador" TEXT,
    "data_created" TIMESTAMP(3),
    "data_updated" TIMESTAMP(3),
    "text_informacoes" TEXT,
    "Funcionarios_id" INTEGER NOT NULL,

    CONSTRAINT "Producao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EntradasAgenda" (
    "int" SERIAL NOT NULL,
    "operacao" TEXT,
    "situacao_operacao" TEXT,
    "valor" DECIMAL(65,30),
    "data_venda" TIMESTAMP(3),
    "vendedor" TEXT,
    "cpf_cnpj_vendedor" TEXT,
    "comprador_cliente" TEXT,
    "cpf_cnpj_comprador" TEXT,
    "data_nasc_comprador" TIMESTAMP(3),
    "data_cancelada" TIMESTAMP(3),
    "data_reativada" TIMESTAMP(3),
    "usuario_portal" TEXT,
    "agencia" TEXT,
    "data_contemplacao" TIMESTAMP(3),
    "cep" TEXT,
    "uf" TEXT,
    "municipio" TEXT,
    "data_created" TIMESTAMP(3),
    "data_updated" TIMESTAMP(3),
    "id_empresa" INTEGER,

    CONSTRAINT "EntradasAgenda_pkey" PRIMARY KEY ("int")
);

-- CreateTable
CREATE TABLE "CustomersContacts" (
    "id" SERIAL NOT NULL,
    "cpf_cnpj" TEXT,
    "ddd1" INTEGER,
    "telefone1" INTEGER,
    "ddd2" INTEGER,
    "telefone2" INTEGER,
    "ddd3" INTEGER,
    "telefone3" INTEGER,
    "ddd4" INTEGER,
    "telefone4" INTEGER,
    "ddd5" INTEGER,
    "telefone5" INTEGER,
    "ddd6" INTEGER,
    "telefone6" INTEGER,

    CONSTRAINT "CustomersContacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Leads" (
    "id" SERIAL NOT NULL,
    "num_campanha" TEXT,
    "campanha" TEXT,
    "origem" TEXT,
    "produto" TEXT,
    "cpf_cnpj_cliente" TEXT,
    "telefone_cliente" TEXT,
    "email_cliente" TEXT,
    "data_primeiro_contato" TIMESTAMP(3),
    "sg_uf" VARCHAR(2),
    "data_created" TIMESTAMP(3),
    "data_updated" TIMESTAMP(3),
    "return_cod_resultado" TEXT,
    "return_data_contato" TIMESTAMP(3),
    "send_data_contact_center" TIMESTAMP(3),

    CONSTRAINT "Leads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customers" (
    "id" SERIAL NOT NULL,
    "cpf_cnpj" TEXT,
    "nome_razao_social" TEXT,
    "data_nasc" TIMESTAMP(3),
    "uf" VARCHAR(2),
    "municipio_endereco" TEXT,
    "nao_pertube" BOOLEAN,
    "sexo" VARCHAR(1),
    "data_updated" TIMESTAMP(3),
    "data_created" TIMESTAMP(3),
    "ContactCustomer_id" INTEGER NOT NULL,
    "Leads_id" INTEGER NOT NULL,

    CONSTRAINT "Customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MetasProducaoConfig" (
    "id" INTEGER NOT NULL,
    "id_celula" INTEGER,
    "produto" TEXT,
    "valor_meta" DECIMAL(65,30),
    "mes" TEXT,
    "ano" INTEGER,
    "data_created" TIMESTAMP(3),
    "data_updated" TIMESTAMP(3),
    "Production_id" INTEGER NOT NULL,

    CONSTRAINT "MetasProducaoConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Eventos" (
    "id" SERIAL NOT NULL,
    "id_empresa" INTEGER,
    "nome_evento" TEXT,
    "contrato" INTEGER,
    "valor_liquido" DECIMAL(65,30),
    "cliente_evento" TEXT,
    "data_contratacao" TIMESTAMP(3),
    "max_participantes" INTEGER,
    "informacoes_montagem" DOUBLE PRECISION,
    "nome_produto" TEXT,
    "descricao_produto" TEXT,
    "status_evento" TEXT,
    "responsavel_montagem" TEXT,
    "local" VARCHAR(45),
    "diaTodo" BOOLEAN,
    "datahora_inicio" TIMESTAMP(3),
    "datahora_fim" TIMESTAMP(3),
    "date_created" TIMESTAMP(3),
    "date_uploated" TIMESTAMP(3),
    "userId" VARCHAR(45),

    CONSTRAINT "Eventos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventsType" (
    "id" SERIAL NOT NULL,
    "tipo_evento" INTEGER,
    "id_empresa" INTEGER,
    "segmento" TEXT,

    CONSTRAINT "EventsType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistoricoLogs" (
    "idHistoricoLogs" INTEGER NOT NULL,
    "Descricao" VARCHAR(45),
    "UserId" VARCHAR(45),
    "datahora_alteracao" TIMESTAMP(3),
    "HistoricoLogscol" VARCHAR(45),

    CONSTRAINT "HistoricoLogs_pkey" PRIMARY KEY ("idHistoricoLogs")
);

-- CreateTable
CREATE TABLE "Orcamentos" (
    "id" INTEGER NOT NULL,
    "nome_orcamento" TEXT,
    "cliente_orcamento" TEXT,
    "tipo_orcamento" VARCHAR(45),
    "data_orcamento" TIMESTAMP(3),
    "valor_orcamento" DECIMAL(65,30),
    "forma_pagamento" VARCHAR(45),
    "parcelas_orcamento" INTEGER,
    "max_participantes" INTEGER,
    "valor_negociado" DECIMAL(65,30),
    "forma_pagamento_negociado" VARCHAR(45),
    "parcelas_negociadas" INTEGER,
    "data_negociacao" TIMESTAMP(3),
    "data_principal_evento" TIMESTAMP(3),
    "idVendedor_orcamento" VARCHAR(45),
    "idVendedor_negociacao" VARCHAR(45),
    "status_orcamento" VARCHAR(45),
    "data_criacao" TIMESTAMP(3),
    "data_atualizacao" TIMESTAMP(3),

    CONSTRAINT "Orcamentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropostaSituacao" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "dt_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_alteracao" TIMESTAMP(3),
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "PropostaSituacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClienteContato" (
    "id" SERIAL NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "tipo_contato" VARCHAR(50) NOT NULL,
    "valor_contato" VARCHAR(255) NOT NULL,
    "dt_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_alteracao" TIMESTAMP(3),
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ClienteContato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Saidas" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "categoria" TEXT,
    "valor" DECIMAL(65,30) NOT NULL,
    "data_pagamento" TIMESTAMP(3),
    "data_emissao" TIMESTAMP(3),
    "forma_pagamento" TEXT,
    "status_pagamento" TEXT,
    "fornecedor_id" INTEGER,
    "fornecedor_nome" TEXT,
    "evento_id" INTEGER,
    "evento_nome" TEXT,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Saidas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fornecedores" (
    "idfornecedores" INTEGER NOT NULL,
    "nome_fornecedor" TEXT,
    "cnpj_fornecedor" TEXT NOT NULL,
    "tipo_fornecedor" TEXT,
    "representante_responsavel" TEXT,
    "localizacao_fornecedor" TEXT,
    "telefone_fornecedor" TEXT,
    "email_fornecedor" TEXT,
    "data_contratada" TIMESTAMP(3),
    "data_termino" TIMESTAMP(3),
    "data_criacao" TIMESTAMP(3),
    "data_atualizacao" TIMESTAMP(3),
    "userID" TEXT,

    CONSTRAINT "Fornecedores_pkey" PRIMARY KEY ("idfornecedores")
);

-- CreateTable
CREATE TABLE "Clientes" (
    "idclientes" INTEGER NOT NULL,
    "cliente" TEXT,
    "cpf_cnpj_cliente" TEXT NOT NULL,
    "data_nascimento_cliente" TIMESTAMP(3),
    "endereco_cliente" TEXT,
    "estado_cliente" TEXT,
    "telefone_cliente" TEXT,
    "celular_cliente" TEXT,
    "email_cliente" TEXT,
    "sexo_cliente" TEXT,
    "data_criacao" TIMESTAMP(3),
    "data_atualizacao" TIMESTAMP(3),

    CONSTRAINT "Clientes_pkey" PRIMARY KEY ("idclientes")
);

-- CreateTable
CREATE TABLE "ModelosRelatorios" (
    "idModelosRelatorios" INTEGER NOT NULL,
    "nome_relatorio" TEXT,
    "ModelosRelatorioscol" TEXT,

    CONSTRAINT "ModelosRelatorios_pkey" PRIMARY KEY ("idModelosRelatorios")
);

-- CreateTable
CREATE TABLE "Estoque" (
    "id" INTEGER NOT NULL,
    "idProduto" INTEGER,
    "qtde_total" INTEGER,
    "qtde_disponivel" INTEGER,
    "qtde_em_uso" INTEGER,
    "localizacao_produto" TEXT,
    "data_status" TIMESTAMP(3),
    "data_entrada" TIMESTAMP(3),
    "data_saida" TIMESTAMP(3),

    CONSTRAINT "Estoque_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produtos" (
    "idProdutos" INTEGER NOT NULL,
    "nome_produto" TEXT,
    "tipo_produto" TEXT,
    "qtde_total_produto" INTEGER,
    "valor_unitario_produto" DECIMAL(65,30),
    "valor_total_produto" DECIMAL(65,30),
    "data_status" TIMESTAMP(3),
    "responsavel_cadastro" TEXT,
    "data_cadastro" TIMESTAMP(3),
    "responsavel_atualizacao" TEXT,
    "data_atualizacao" TIMESTAMP(3),

    CONSTRAINT "Produtos_pkey" PRIMARY KEY ("idProdutos")
);

-- CreateTable
CREATE TABLE "AgendaGeral" (
    "idAgendaGeral" INTEGER NOT NULL,
    "titulo_agenda" TEXT,
    "tipo_agenda" INTEGER,
    "responsavel_agenda" TEXT,
    "datahora_inicial" TIMESTAMP(3),
    "datahora_final" TIMESTAMP(3),
    "localizacao" TEXT,
    "informacoes_extras" TEXT,
    "userID" TEXT,
    "data_criacao" TIMESTAMP(3),
    "data_atualizacao" TIMESTAMP(3),
    "status_compromisso" TEXT,
    "id_empresa" INTEGER,

    CONSTRAINT "AgendaGeral_pkey" PRIMARY KEY ("idAgendaGeral")
);

-- CreateTable
CREATE TABLE "TiposAgenda" (
    "idTiposAgenda" INTEGER NOT NULL,
    "tipo_agenda" TEXT,
    "responsavel_agenda" TEXT,

    CONSTRAINT "TiposAgenda_pkey" PRIMARY KEY ("idTiposAgenda")
);

-- CreateIndex
CREATE UNIQUE INDEX "Empresas_cnpj_key" ON "Empresas"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Fornecedores_cnpj_fornecedor_key" ON "Fornecedores"("cnpj_fornecedor");

-- CreateIndex
CREATE UNIQUE INDEX "Clientes_cpf_cnpj_cliente_key" ON "Clientes"("cpf_cnpj_cliente");
