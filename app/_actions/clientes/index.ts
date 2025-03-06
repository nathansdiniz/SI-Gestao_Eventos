"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { Novo_UP_historicoLogs } from "../historicosLogs";

interface ClientesProps {
  id: number;
  tipoCadastro: string | null;
  cliente: string;
  cpf_cnpj_cliente: string | null;
  razaoSocial: string | null;
  nomeFantasia: string | null;
  inscricaoMunicipal: string | null;
  inscricaoEstadual: string | null;
  data_nasc: Date | null;
  estadoCivil: string | null;
  email: string | null;
  telefone: string | null;
  endereco: string | null;
  cep: string | null;
  complemento: string | null;
  cidade: string | null;
  estado: string | null;
  pais: string | null;
  pontoReferencia: string | null;
  anotacoes: string | null;
  dataCadastro: Date;
  ddiTelefone: string | null;
  ddiTelefone2: string | null;
  telefone2: string | null;
  ddiCelular: string | null;
  celular: string | null;
  redeSocial: string | null;
  id_empresa: number | null;
  userID: string | null;
}

export const addUpdateClientes = async (params: ClientesProps) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Consultar o maior id existente na tabela
  const maxIdRecord = await db.clientes.findFirst({
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
    data_created: new Date(),
    data_updated: new Date(),
    id: id ?? nextId, // Se o id não for passado, usa o próximo id
  };

  if (id) {
    // Atualizar ou inserir se o ID existir
    await db.clientes.upsert({
      where: { id },
      update: dataToSave,
      create: {
        ...rest,
        userID: userId,
        dataCadastro: new Date(),
        id: nextId, // Se o id não for passado, usa o próximo id
      }, // Inclui 'id' ao criar
    });
    await Novo_UP_historicoLogs({
      acao_realizada: "Atualizar Cliente ",
      dados_acao: dataToSave,
      datahora_alteracao: new Date(),
      Descricao: `Atualizar Cliente ID: ${dataToSave.id} e Nome:  ${dataToSave.cliente}`,
      HistoricoLogscol: "",
      status: "Sucesso",
    });
  } else {
    // Criar novo registro se o ID não existir
    await db.clientes.create({
      data: {
        ...rest,
        userID: userId,
        dataCadastro: new Date(),
        id: nextId, // Se o id não for passado, usa o próximo id
      }, // Inclui 'id' como numérico, agora garantido
    });
    await Novo_UP_historicoLogs({
      acao_realizada: "Cadastro de Cliente",
      dados_acao: dataToSave,
      datahora_alteracao: new Date(),
      Descricao: `Criar Cliente ID: ${dataToSave.id} e Nome:  ${dataToSave.cliente}`,
      HistoricoLogscol: "",
      status: "Sucesso",
    });
  }

  revalidatePath("/administrativo/Clientes");
};

export const getClientes = async () => {
  return await db.clientes.findMany();
};
