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

fetchAndInsertData();
