const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function fetchAndInsertData() {
  try {
    const response = await fetch(
      "https://app1.meeventos.com.br/inmidialed/api/v1/clients",
      {
        method: "GET",
        headers: {
          Authorization: `${process.env.TOKEN_ME_EVENTOS}`,
          "Content-Type": "application/json",
        },
      },
    );

    const clientes = await response.json();
    console.log(clientes);

    for (const cliente of clientes.data) {
      // Criação do cliente base
      const clienteBase = await prisma.cliente.create({
        data: {
          tipoCadastro: cliente.tipoCadastro == "1" ? true : false,
          nome: cliente.nome,
          email: cliente.email,
          endereco: cliente.endereco,
          cep: cliente.cep,
          complemento: cliente.complemento,
          cidade: cliente.cidade,
          estado: cliente.estado,
          pais: cliente.pais,
          pontoReferencia: cliente.pontoReferencia,
          anotacoes: cliente.anotacoes,
          ddiTelefone: cliente.ddiTelefone, // DDI do telefone (ex: (31))
          telefone: cliente.telefone, // Telefone para contato
          ddiTelefone2: cliente.ddiTelefone2, // DDI do telefone secundário (ex: (31))
          telefone2: cliente.telefone2, // Telefone secundário
          ddiCelular: cliente.ddiCelular, // DDI do celular (ex: (31))
          celular: cliente.celular, // Celular
          redeSocial: cliente.redeSocial, // URL da rede social
          id_empresa: 1,
        },
      });

      // Inserir dados específicos com base no tipoCadastro
      if (cliente.tipoCadastro == "0") {
        // Pessoa Física
        await prisma.pessoaFisica.create({
          data: {
            clienteId: clienteBase.id,
            cpf: cliente.cpf,
            rg: cliente.rg,
            orgaoExpeditor: cliente.orgaoExpeditor,
            dataDeNascimento: new Date(cliente.dataDeNascimento),
            estadoCivil: cliente.estadoCivil,
            profissao: cliente.profissao,
            nacionalidade: cliente.nacionalidade,
          },
        });
      } else {
        // Pessoa Jurídica
        await prisma.pessoaJuridica.create({
          data: {
            clienteId: clienteBase.id,
            cnpj: cliente.cnpjPJ,
            razaoSocial: cliente.razaoSocial,
            nomeFantasia: cliente.nomeFantasia,
            inscricaoMunicipal: cliente.municipal,
            inscricaoEstadual: cliente.estadual,
          },
        });
      }
    }

    console.log("Dados inseridos com sucesso!");
  } catch (error) {
    console.error("Erro ao inserir dados:", error);
  } finally {
    await prisma.$disconnect();
  }
}
async function InserirOrcamentos() {
  try {
    const response = await fetch(
      "https://app1.meeventos.com.br/inmidialed/api/v1/budgets", // Supondo que a URL seja essa, altere conforme necessário
      {
        method: "GET",
        headers: {
          Authorization: `${process.env.TOKEN_ME_EVENTOS}`,
          "Content-Type": "application/json",
        },
      },
    );

    const orcamentos = await response.json();
    console.log(orcamentos);

    for (const orcamento of orcamentos.data) {
      // Verificar se o orçamento já existe (caso seja necessário)

      // Criação do orçamento
      const orcamentoBase = await prisma.orcamentos.create({
        data: {
          nome_orcamento: orcamento.nome_orcamento || null, // Verifique se o campo existe
          cliente_orcamento: orcamento.cliente_orcamento || null,
          email_cliente: orcamento.email_cliente || null,
          tipo_orcamento: orcamento.tipo_orcamento || null,
          data_orcamento: orcamento.data_orcamento
            ? new Date(orcamento.data_orcamento)
            : null,
          valor_orcamento: orcamento.valor_orcamento
            ? parseFloat(orcamento.valor_orcamento)
            : null,
          forma_pagamento: orcamento.forma_pagamento || null,
          parcelas_orcamento: orcamento.parcelas_orcamento || null,
          max_participantes: orcamento.max_participantes || null,
          valor_negociado: orcamento.valor_negociado
            ? parseFloat(orcamento.valor_negociado)
            : null,
          forma_pagamento_negociado:
            orcamento.forma_pagamento_negociado || null,
          parcelas_negociadas: orcamento.parcelas_negociadas || null,
          data_negociacao: orcamento.data_negociacao
            ? new Date(orcamento.data_negociacao)
            : null,
          data_principal_evento: orcamento.data_principal_evento
            ? new Date(orcamento.data_principal_evento)
            : null,
          idVendedor_orcamento: orcamento.idVendedor_orcamento || null,
          idVendedor_negociacao: orcamento.idVendedor_negociacao || null,
          status_orcamento: orcamento.status_orcamento || null,
          data_criacao: orcamento.data_criacao
            ? new Date(orcamento.data_criacao)
            : null,
          data_atualizacao: orcamento.data_atualizacao
            ? new Date(orcamento.data_atualizacao)
            : null,
          observacao: orcamento.observacao || null,
          codigoInterno: orcamento.codigoInterno || null,
          numeroConvidados: orcamento.numeroConvidados || null,
          valorInicial: orcamento.valorInicial
            ? parseFloat(orcamento.valorInicial)
            : null,
          whatsapp: orcamento.whatsapp || null,
          ddiTelefone: orcamento.ddiTelefone || null,
          telefone: orcamento.telefone || "", // Preenche com string vazia, caso não tenha
          ddiCelular: orcamento.ddiCelular || null,
          celular: orcamento.celular || "", // Preenche com string vazia, caso não tenha
          idLocalEvento: orcamento.idLocalEvento || null,
          nomeResponsavel: orcamento.nomeResponsavel || null,
          obs2: orcamento.obs2 || null,
          obs3: orcamento.obs3 || null,
          obs4: orcamento.obs4 || null,
          nomeDoEvento: orcamento.nomeDoEvento || null,
        },
      });

      console.log(`Orçamento com ID ${orcamentoBase.id} inserido com sucesso!`);
    }

    console.log("Dados de orçamentos inseridos com sucesso!");
  } catch (error) {
    console.error("Erro ao inserir orçamentos:", error);
  } finally {
    await prisma.$disconnect();
  }
}

async function inserirEventos() {
  try {
    const response = await fetch(
      "https://app1.meeventos.com.br/inmidialed/api/v1/events",
      {
        method: "GET",
        headers: {
          Authorization: `${process.env.TOKEN_ME_EVENTOS}`,
          "Content-Type": "application/json",
        },
      },
    );

    const eventos = await response.json();

    for (const evento of eventos.data) {
      // Inserir os dados no modelo Evento
      await prisma.eventosme.create({
        data: {
          tipoEvento: evento.tipoEvento,
          dataDeCadastro: evento.dataDeCadastro
            ? new Date(evento.dataDeCadastro)
            : new Date(), // Caso não venha uma data, usa a atual
          idOrcamento: Number(evento.idorcamento) || null,
          idCliente: Number(evento.idCliente) || null,
          nomeCliente: evento.nomeCliente,
          dataEvento: evento.dataevento ? new Date(evento.dataevento) : null,
          horaEvento: evento.horaevento || "00:00:00", // Define um valor padrão
          localEvento: evento.localevento || null,
          nomeEvento: evento.nomeevento || null,
          idLocalEvento: Number(evento.idlocalevento) || null,
          endereco: evento.endereco || null,
          numero: Number(evento.numero) || null,
          complemento: evento.complemento || null,
          cep: evento.cep || null,
          bairro: evento.bairro || null,
          cidade: evento.cidade || null,
          estado: evento.estado || null,
          informacoes: evento.informacoes || null,
          observacao: evento.observacao || null,
          codigoInterno: evento.codigointerno || null,
          convidados: Number(evento.convidados) || 0, // Define valor padrão se não houver convidados
          datasAdicionais: evento.datasAdicionais
            ? JSON.stringify(evento.datasAdicionais)
            : "[]", // Armazena como JSON
          status: evento.status || "Pendente", // Status padrão
          id_empresa: 1,
        },
      });

      console.log(`Evento "${evento.nomeevento}" inserido com sucesso!`);
    }

    console.log("Todos os eventos foram inseridos com sucesso!");
  } catch (error) {
    console.error("Erro ao inserir eventos:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Chamada da função
fetchAndInsertData();
