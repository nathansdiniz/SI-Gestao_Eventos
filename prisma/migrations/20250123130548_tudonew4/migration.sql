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
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "descricao" TEXT,
    "data_created" TIMESTAMP(3),
    "data_updated" TIMESTAMP(3),

    CONSTRAINT "UserType_pkey" PRIMARY KEY ("id")
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
    "id" SERIAL NOT NULL,
    "empresa" TEXT NOT NULL DEFAULT 'Indefinido',
    "cnpj" TEXT NOT NULL,
    "ramo_empresa" TEXT NOT NULL DEFAULT 'Indefinido',
    "localizacao_empresa" TEXT NOT NULL DEFAULT 'Indefinido',
    "data_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_updated" TIMESTAMP(3) NOT NULL,
    "gestor_responsavel" TEXT NOT NULL DEFAULT 'Indefinido',
    "dataAbertura" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL DEFAULT 'email@exemplo.com',
    "inscricaoEstadual" TEXT NOT NULL DEFAULT 'Indefinido',
    "inscricaoMunicipal" TEXT NOT NULL DEFAULT 'Indefinido',
    "site" TEXT NOT NULL DEFAULT 'https://exemplo.com',
    "telefone" TEXT NOT NULL DEFAULT '0000000000',

    CONSTRAINT "Empresas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EntradasEventos" (
    "id" SERIAL NOT NULL,
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

    CONSTRAINT "EntradasEventos_pkey" PRIMARY KEY ("id")
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
    "id" SERIAL NOT NULL,
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

    CONSTRAINT "EntradasAgenda_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "Evento" (
    "id" SERIAL NOT NULL,
    "tipoEvento" TEXT NOT NULL,
    "dataDeCadastro" TIMESTAMP(3) NOT NULL,
    "idOrcamento" INTEGER,
    "idCliente" INTEGER,
    "nomeCliente" TEXT NOT NULL,
    "dataEvento" TIMESTAMP(3),
    "horaEvento" TEXT NOT NULL,
    "localEvento" TEXT,
    "nomeEvento" TEXT,
    "idLocalEvento" INTEGER,
    "endereco" TEXT,
    "numero" INTEGER,
    "complemento" TEXT,
    "cep" TEXT,
    "bairro" TEXT,
    "cidade" TEXT,
    "estado" TEXT,
    "informacoes" TEXT,
    "observacao" TEXT,
    "codigoInterno" TEXT,
    "convidados" INTEGER NOT NULL,
    "datasAdicionais" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "id_empresa" INTEGER NOT NULL,

    CONSTRAINT "Evento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Eventosme" (
    "id" INTEGER NOT NULL,
    "tipoEvento" TEXT NOT NULL,
    "dataDeCadastro" TIMESTAMP(3) NOT NULL,
    "idOrcamento" INTEGER,
    "idCliente" INTEGER,
    "nomeCliente" TEXT NOT NULL,
    "dataEvento" TIMESTAMP(3),
    "horaEvento" TEXT NOT NULL,
    "localEvento" TEXT,
    "nomeEvento" TEXT,
    "idLocalEvento" INTEGER,
    "endereco" TEXT,
    "numero" INTEGER,
    "complemento" TEXT,
    "cep" TEXT,
    "bairro" TEXT,
    "cidade" TEXT,
    "estado" TEXT,
    "informacoes" TEXT,
    "observacao" TEXT,
    "codigoInterno" TEXT,
    "convidados" INTEGER NOT NULL,
    "datasAdicionais" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "id_empresa" INTEGER NOT NULL
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
    "email_cliente" TEXT,
    "vendedor" TEXT,
    "assunto" TEXT,
    "mensagem" TEXT,
    "tipo_evento" TEXT,
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
    "data_retorno" TIMESTAMP(3),
    "observacao" TEXT,
    "codigoInterno" TEXT,
    "numeroConvidados" INTEGER,
    "valorInicial" DECIMAL(65,30),
    "whatsapp" TEXT,
    "ddiTelefone" TEXT,
    "telefone" TEXT,
    "ddiCelular" TEXT,
    "celular" TEXT,
    "como_conheceu" TEXT,
    "idLocalEvento" INTEGER,
    "nomeResponsavel" TEXT,
    "obs2" TEXT,
    "obs3" TEXT,
    "obs4" TEXT,
    "nomeDoEvento" TEXT,
    "datasAdicionais" JSONB,
    "funil" TEXT,
    "id_empresa" INTEGER
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
    "id" INTEGER NOT NULL,
    "tipoCadastro" TEXT,
    "cliente" TEXT NOT NULL,
    "cpf_cnpj_cliente" TEXT,
    "razaoSocial" TEXT,
    "nomeFantasia" TEXT,
    "inscricaoMunicipal" TEXT,
    "inscricaoEstadual" TEXT,
    "data_nasc" TIMESTAMP(3),
    "estadoCivil" TEXT,
    "email" TEXT,
    "telefone" TEXT,
    "endereco" TEXT,
    "cep" TEXT,
    "complemento" TEXT,
    "cidade" TEXT,
    "estado" TEXT,
    "pais" TEXT,
    "pontoReferencia" TEXT,
    "anotacoes" TEXT,
    "dataCadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ddiTelefone" TEXT,
    "ddiTelefone2" TEXT,
    "telefone2" TEXT,
    "ddiCelular" TEXT,
    "celular" TEXT,
    "redeSocial" TEXT,
    "id_empresa" INTEGER
);

-- CreateTable
CREATE TABLE "FinanceiroME" (
    "id" INTEGER NOT NULL,
    "evento" TEXT,
    "datapagamento" TEXT,
    "datacompetencia" TEXT,
    "tipocobranca" TEXT,
    "idrecebidode" TEXT,
    "recebidode" TEXT,
    "informede" TEXT,
    "descricao" TEXT,
    "valor" DECIMAL(65,30),
    "juros" DECIMAL(65,30),
    "multa" DECIMAL(65,30),
    "desconto" DECIMAL(65,30),
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
    "id_empresa" INTEGER
);

-- CreateTable
CREATE TABLE "ModelosRelatorios" (
    "idModelosRelatorios" INTEGER NOT NULL,
    "nome_relatorio" TEXT,
    "ModelosRelatorioscol" JSONB,

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
CREATE UNIQUE INDEX "Eventosme_id_key" ON "Eventosme"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Orcamentos_id_key" ON "Orcamentos"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Fornecedores_cnpj_fornecedor_key" ON "Fornecedores"("cnpj_fornecedor");

-- CreateIndex
CREATE UNIQUE INDEX "Clientes_id_key" ON "Clientes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FinanceiroME_id_key" ON "FinanceiroME"("id");
