"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/app/_components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";

interface FuncionariosProps {
  nome: string;
  cpf: string;
  idade: number;
  rg: string;
  data_nasc: string;
  sexo: string;
  signo: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  mae: string;
  pai: string;
  email: string;
  senha: string;
  telefone_fixo: string;
  celular: string;
  altura: string;
  peso: number;
  tipo_sanguineo: string;
  cor: string;
}

export const funcionariosColumns: ColumnDef<FuncionariosProps>[] = [
  {
    accessorKey: "nome",
    header: "Nome",
  },
  {
    accessorKey: "data_nasc",
    header: "Data Nascimento",
    cell: ({ row: { original: transaction } }) =>
      new Date(transaction.data_nasc).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
  },

  {
    accessorKey: "cpf",
    header: "CPF",
  },
  {
    accessorKey: "sexo",
    header: "Sexo",
  },
  {
    accessorKey: "email",
    header: "E-mail",
  },
  {
    accessorKey: "rg",
    header: "RG",
  },
  {
    accessorKey: "endereco",
    header: "Endereco",
  },
  {
    accessorKey: "cidade",
    header: "Cidade",
  },
  {
    accessorKey: "estado",
    header: "Estado",
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({}) => (
      <div className="flex flex-row space-x-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 bg-yellow-600 text-white"
        >
          <PencilIcon />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 bg-red-800 text-white"
        >
          <TrashIcon />
        </Button>
      </div>
    ),
  },
];
