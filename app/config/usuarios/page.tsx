import Layout from "@/app/_components/slide-bar";
import { DataTable } from "@/app/_components/ui/data-table";
import BotaoVoltar from "@/app/_components/botao-voltar";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { usuariosColumns } from "./_columns/colums";
import { Button } from "@/app/_components/ui/button";
import { Plus } from "lucide-react";
import { UpsertUserDialog } from "./_components/dialog-usuarios";
import { clerkClient } from "@clerk/nextjs/server";

interface SimpleUser {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string | undefined;
  createdAt: number;
  updatedAt: number;
  externalId: string | null;
}

const Usuarios = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  let users: SimpleUser[] = [];
  const colunas = usuariosColumns;

  try {
    const userList = await clerkClient.users.getUserList();
    users = userList.data.map((user) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.emailAddresses[0]?.emailAddress,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      externalId: user.externalId,
    }));
  } catch (error) {
    console.error("Erro ao buscar usuários do Clerk:", error);
    return (
      <Layout>
        <div className="space-y-6 p-6">
          <BotaoVoltar redirecionar="/menu" />
          <div className="flex justify-between">
            <h1 className="text-4xl font-bold">Usuários</h1>
          </div>
          <p className="text-red-500">Erro ao carregar usuários.</p>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Layout>
        <div className="space-y-6 p-6">
          <BotaoVoltar redirecionar="/menu" />
          <div className="flex w-full items-center justify-between">
            <h1 className="text-4xl font-bold">Usuários</h1>
            <UpsertUserDialog
              isEdit={false}
              defaultValues={{
                id: "",
                email: "",
                firstName: "",
                lastName: "",
                password: "",
              }}
            >
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Criar Usuário
              </Button>
            </UpsertUserDialog>
          </div>
          <DataTable columns={colunas} data={users} />
        </div>
      </Layout>
    </>
  );
};

export default Usuarios;
