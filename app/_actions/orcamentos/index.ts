"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { Novo_UP_historicoLogs } from "../historicosLogs";

interface OrcamentosProps {
  id: number;
  nome_orcamento: string | null;
  cliente_orcamento: string | null;
  email_cliente: string | null;
  vendedor: string | null;
  assunto: string | null;
  mensagem: string | null;
  tipo_evento: string | null;
  tipo_orcamento: string | null;
  data_orcamento: Date | null;
  valor_orcamento: number | null;
  forma_pagamento: string | null;
  parcelas_orcamento: number | null;
  max_participantes: number | null;
  valor_negociado: number | null;
  forma_pagamento_negociado: string | null;
  parcelas_negociadas: number | null;
  data_negociacao: Date | null;
  data_principal_evento: Date | null;
  idVendedor_orcamento: string | null;
  idVendedor_negociacao: string | null;
  status_orcamento: string | null;
  data_criacao: Date | null;
  data_atualizacao: Date | null;
  data_retorno: Date | null;
  observacao: string | null;
  codigoInterno: string | null;
  numeroConvidados: number | null;
  valorInicial: number | null;
  whatsapp: string | null;
  ddiTelefone: string | null;
  telefone: string | null;
  ddiCelular: string | null;
  celular: string | null;
  como_conheceu: string | null;
  idLocalEvento: number | null;
  nomeResponsavel: string | null;
  obs2: string | null;
  obs3: string | null;
  obs4: string | null;
  nomeDoEvento: string | null;
  datasAdicionais: any | null;
  funil: string | null;
  id_empresa: number | null;
  userID: string | null;
}

export const addUpdateOrcamentos = async (params: OrcamentosProps) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Consultar o maior id existente na tabela
  const maxIdRecord = await db.orcamentos.findFirst({
    orderBy: {
      id: "desc", // Ordena pelo id em ordem decrescente
    },
    select: {
      id: true,
    },
  });

  // Define o próximo id
  const nextId = maxIdRecord ? maxIdRecord.id + 1 : 1; // Se não houver id, começa com 1

  // Preenchendo os campos obrigatórios
  const { id, ...rest } = params;
  const dataToSave = {
    ...rest,
    userID: userId,
    data_atualizacao: new Date(),
    data_negociacao: new Date(),
    data_orcamento: new Date(),
    id: id ?? nextId, // Se o id não for passado, usa o próximo id
  };

  if (id) {
    // Atualizar ou inserir se o ID existir
    await db.orcamentos.upsert({
      where: { id },
      update: dataToSave,
      create: {
        ...rest,
        userID: userId,
        data_criacao: new Date(),
        data_atualizacao: new Date(),
        data_negociacao: new Date(),
        data_orcamento: new Date(),
        id: nextId, // Se o id não for passado, usa o próximo id
      }, // Inclui 'id' ao criar
    });
    await Novo_UP_historicoLogs({
      acao_realizada: "Atualizar Orçamento ",
      dados_acao: dataToSave,
      datahora_alteracao: new Date(),
      Descricao: `Atualizar Orçamento ID: ${dataToSave.id} e Nome:  ${dataToSave.assunto}`,
      HistoricoLogscol: "",
      status: "Sucesso",
    });
  } else {
    // Criar novo registro se o ID não existir
    await db.orcamentos.create({
      data: {
        ...rest,
        userID: userId,
        data_criacao: new Date(),
        data_atualizacao: new Date(),
        data_negociacao: new Date(),
        data_orcamento: new Date(),
        id: nextId, // Se o id não for passado, usa o próximo id
      }, // Inclui 'id' como numérico, agora garantido
    });
    await Novo_UP_historicoLogs({
      acao_realizada: "Cadastro de Orçamento",
      dados_acao: dataToSave,
      datahora_alteracao: new Date(),
      Descricao: `Criar Orçamento ID: ${dataToSave.id} e Nome:  ${dataToSave.assunto}`,
      HistoricoLogscol: "",
      status: "Sucesso",
    });
  }

  revalidatePath("/administrativo/Orcamentos");
};

export const deleteOrcamentos = async (id: number) => {
  try {
    await db.orcamentos.delete({
      where: {
        id,
      },
    });
    return true;
  } catch {
    return false;
  }
};
export const getClientes = async () => {
  const clientes = await db.clientes.findMany();
  return clientes;
};
