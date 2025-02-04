"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { Novo_UP_historicoLogs } from "../historicosLogs";

interface ParametrosFinanceiro {
  id?: number | undefined; // Deixa como opcional, pois pode ser um novo registro
  evento: string | null;
  datapagamento: Date | null;
  datacompetencia: Date | null;
  tipocobranca: string | null;
  idrecebidode: string | null;
  recebidode: string | null;
  informede: string | null;
  descricao: string | null;
  valor: number | null;
  juros: number | null;
  multa: number | null;
  desconto: number | null;
  pago: string | null;
  idconta: string | null;
  conta: string | null;
  idcategoria: string | null;
  categoria: string | null;
  idcentrodecusto: string | null;
  centrodecusto: string | null;
  mododepagamento: string | null;
  parcelas:
    | {
        id: number | null;
        datapagamento: string | null;
        valor: number | null;
        descricao: string | null;
      }
    | null
    | undefined; // Permite null aqui
  idevento: string | null;
  id_empresa: number | null;
  data_criacao: Date;
  data_update: Date;
  userID?: string | null; // Isso será adicionado automaticamente
}

export const addUpdateFinanceiro = async (params: ParametrosFinanceiro) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Consultar o maior id existente na tabela
  const maxIdRecord = await db.financeiroME.findFirst({
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
    data_criacao: new Date(),
    data_update: new Date(),
    id: id ?? nextId, // Se o id não for passado, usa o próximo id
    parcelas: rest.parcelas ? rest.parcelas : undefined,
  };

  if (id) {
    // Atualizar ou inserir se o ID existir
    await db.financeiroME.upsert({
      where: { id },
      update: dataToSave,
      create: {
        ...rest,
        userID: userId,
        data_criacao: new Date(),
        data_update: new Date(),
        id: nextId, // Se o id não for passado, usa o próximo id
        parcelas: rest.parcelas ? rest.parcelas : undefined,
      }, // Inclui 'id' ao criar
    });
    await Novo_UP_historicoLogs({
      acao_realizada: "Atualizar Registro Financeiro",
      dados_acao: dataToSave,
      datahora_alteracao: new Date(),
      Descricao: `Atualizar Registro Financeiro ID: ${dataToSave.id} e Descrição:  ${dataToSave.descricao}`,
      HistoricoLogscol: "",
      status: "Sucesso",
    });
  } else {
    // Criar novo registro se o ID não existir
    await db.financeiroME.create({
      data: {
        ...rest,
        userID: userId,
        data_criacao: new Date(),
        data_update: new Date(),
        id: nextId, // Se o id não for passado, usa o próximo id
        parcelas: rest.parcelas ? rest.parcelas : undefined,
      }, // Inclui 'id' como numérico, agora garantido
    });
    await Novo_UP_historicoLogs({
      acao_realizada: "Criar Registro Financeiro",
      dados_acao: dataToSave,
      datahora_alteracao: new Date(),
      Descricao: `Criar Registro Financeiro ID: ${dataToSave.id} e Descrição:  ${dataToSave.descricao}`,
      HistoricoLogscol: "",
      status: "Sucesso",
    });
  }

  revalidatePath("/administrativo/financeiro");
};
