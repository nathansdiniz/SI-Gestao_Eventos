"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { UpsertUserDialog } from "../_components/dialog-usuarios";
import { deleteUser } from "@/app/_actions/clerkUsuarios";

interface SimpleUser {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string | undefined;
  createdAt: number;
  updatedAt: number;
  externalId: string | null;
}

export const usuariosColumns: ColumnDef<SimpleUser>[] = [
  {
    accessorKey: "firstName",
    header: "Nome",
    cell: ({ row }) =>
      `${row.original.firstName ?? ""} ${row.original.lastName ?? ""}`,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => row.original.email,
  },
  {
    accessorKey: "createdAt",
    header: "Criado em",
    cell: ({ row }) =>
      new Date(row.original.createdAt).toLocaleDateString("pt-BR"),
  },
  {
    accessorKey: "updatedAt",
    header: "Atualizado em",
    cell: ({ row }) =>
      new Date(row.original.updatedAt).toLocaleDateString("pt-BR"),
  },
  {
    accessorKey: "externalId",
    header: "ID Externo",
    cell: ({ row }) => (row.original.externalId ? row.original.externalId : ""),
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (row.original.id ? row.original.id : ""),
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex gap-2">
          <UpsertUserDialog
            defaultValues={{
              id: user.id,
              email: user.email,
              firstName: user.firstName ?? "",
              lastName: user.lastName ?? "",
            }}
            isEdit={true}
          >
            <Button variant="outline" size="icon">
              <Pencil className="h-4 w-4" />
            </Button>
          </UpsertUserDialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                <AlertDialogDescription>
                  Essa ação é irreversível. Você deseja realmente excluir o
                  usuário {user.firstName} {user.lastName}?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <form action={() => deleteUser(user.id)}>
                  <Button type="submit">Excluir</Button>
                </form>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
