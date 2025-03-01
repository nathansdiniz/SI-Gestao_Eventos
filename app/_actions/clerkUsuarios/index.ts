"use server";

import { clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteUser(userId: string) {
  try {
    await clerkClient.users.deleteUser(userId);
    revalidatePath("/config/usuarios");
  } catch (error) {
    console.error("Erro ao deletar o usuário", error);
  }
}

interface CreateUserProps {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
}

interface UpdateUserProps {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export async function createUser({
  firstName,
  lastName,
  email,
  password,
}: CreateUserProps) {
  try {
    await clerkClient.users.createUser({
      firstName,
      lastName,
      emailAddress: [email],
      password,
    });
    revalidatePath("/config/usuarios");
  } catch (error) {
    console.error("Erro ao criar usuário", error);
  }
}

export async function updateUser({
  id,
  firstName,
  lastName,
  email,
}: UpdateUserProps) {
  try {
    await clerkClient.users.updateUser(id ?? "", {
      firstName,
      lastName,
      primaryEmailAddressID: email,
    });
    revalidatePath("/config/usuarios");
  } catch (error) {
    console.error("Erro ao atualizar usuário", error);
  }
}
