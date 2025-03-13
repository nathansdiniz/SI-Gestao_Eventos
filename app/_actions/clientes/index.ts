"use server";
import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

export const addUpdateClientes = async (
  data: Prisma.ClientesUncheckedCreateInput,
) => {
  try {
    if (data.id) {
      // Se o ID estiver presente, é uma atualização
      const clienteAtualizado = await db.clientes.update({
        where: { id: data.id },
        data: {
          ...data,
          data_nasc: data.data_nasc ? new Date(data.data_nasc) : null,
          dataCadastro: data.dataCadastro
            ? new Date(data.dataCadastro)
            : new Date(),
        },
      });
      revalidatePath("/administrativo/clientes");
      return clienteAtualizado;
    } else {
      // Se o ID não estiver presente, é uma adição
      const clienteCriado = await db.clientes.create({
        data: {
          ...data,
          data_nasc: data.data_nasc ? new Date(data.data_nasc) : null,
          dataCadastro: data.dataCadastro
            ? new Date(data.dataCadastro)
            : new Date(),
        },
      });
      revalidatePath("/administrativo/clientes");
      return clienteCriado;
    }
  } catch (error) {
    console.error("Erro ao adicionar/atualizar cliente:", error);
    throw error;
  }
};

export const getClientes = async () => {
  return await db.clientes.findMany();
};

export const deleteCliente = async (id: number) => {
  try {
    await db.clientes.delete({ where: { id } });
    revalidatePath("/administrativo/clientes");
    return { success: true };
  } catch (error) {
    console.error("Erro ao excluir cliente:", error);
    throw error; // Lança o erro para ser tratado no componente
  }
};
