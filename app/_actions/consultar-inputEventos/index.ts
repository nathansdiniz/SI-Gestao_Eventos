"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { Novo_UP_historicoLogs } from "../historicosLogs";

interface ParametrosEventos {
  id?: number; // Deixa como opcional, pois pode ser um novo registro
  titulo: string;
  inicio: Date | string | null;
  fim: Date | string;
  diaTodo: boolean;
  descricao: string | undefined;
  status: string;
  cor: string;
  tipoEvento: string;
  dataDeCadastro: string | undefined;
  idOrcamento: number | undefined;
  idCliente: number | undefined;
  nomeCliente: string;
  dataEvento: string | undefined;
  horaEvento: string;
  localEvento: string | undefined;
  nomeEvento: string | undefined;
  idLocalEvento: number | undefined;
  endereco: string | undefined;
  numero: number | undefined;
  complemento: string | undefined;
  cep: string | undefined;
  bairro: string | undefined;
  cidade: string | undefined;
  estado: string | undefined;
  informacoes: string | undefined;
  observacao: string | undefined;
  codigoInterno: string | undefined;
  convidados: number;
  datasAdicionais: string;
  id_empresa: number;
  userID?: string; // Isso será adicionado automaticamente
}

export const addUpdateEventos = async (params: ParametrosEventos) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Preenchendo os campos obrigatórios
  const maxIdRecord = await db.eventosme.findFirst({
    orderBy: {
      id: "desc", // Ordena pelo id em ordem decrescente
    },
    select: {
      id: true,
    },
  });

  // Define o próximo id
  const nextId = maxIdRecord ? maxIdRecord.id + 1 : 1; // Se não houver id, começa com 1
  const { id, ...rest } = params;
  const dataToSave = {
    ...rest,
    userID: userId,
    dataDeCadastro: params.dataDeCadastro || new Date(),
    id: id ?? nextId, // Se o id não for passado, usa o próximo id
  };

  if (params.id) {
    // Atualizar ou inserir se o ID existir
    await db.eventosme.upsert({
      where: {
        id: params.id,
      },
      update: dataToSave,
      create: dataToSave,
    });
    await Novo_UP_historicoLogs({
      acao_realizada: "Atualizar Evento",
      dados_acao: dataToSave,
      datahora_alteracao: new Date(),
      Descricao: `Atualizar Evento ID: ${dataToSave.id} e Evento:  ${dataToSave.nomeEvento}`,
      HistoricoLogscol: "",
      status: "Sucesso",
    });
  } else {
    // Criar novo registro se o ID não existir
    await db.eventosme.create({
      data: dataToSave,
    });
    await Novo_UP_historicoLogs({
      acao_realizada: "Criar Evento",
      dados_acao: dataToSave,
      datahora_alteracao: new Date(),
      Descricao: `Criar Evento ID: ${dataToSave.id} e Evento:  ${dataToSave.nomeEvento}`,
      HistoricoLogscol: "",
      status: "Sucesso",
    });
  }

  revalidatePath("/eventos");
};

const consultarEventos = async () => {
  const dados = await db.eventosme.findMany();
  return dados;
};

export default consultarEventos;
