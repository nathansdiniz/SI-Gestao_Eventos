"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/app/_components/ui/button";
import { ArrowUpDownIcon } from "lucide-react";
import BotaoEditarFuncionario from "../_components/botao-update";
import ExcluirFuncionarioButton from "../_components/botao-exclusaoEmpresa";

interface FuncionariosProps {
  id: number;
  nome: string;
  cpf: string;
  rg: string;
  data_nascimento: Date;
  sexo: string;
  funcao: string;
  id_empresa: number;
  endereco: string;
  status: boolean;
  email: string;
  telefone: string;
  celular: string;
  data_start_funcao: Date;
  data_end_funcao: Date | null;
  data_updated_funcao: Date;
  data_created: Date;
  data_updated: Date;
  userID: string | null;
}

export const funcionariosColumns: ColumnDef<FuncionariosProps>[] = [
  {
    accessorKey: "nome",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome Completo
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "data_nasc",
    header: "Data Nascimento",
    cell: ({ row: { original: transaction } }) =>
      new Date(transaction.data_nascimento ?? "").toLocaleDateString("pt-BR", {
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Sexo
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
    accessorKey: "telefone",
    header: "telefone",
  },
  {
    accessorKey: "celular",
    header: "celular",
  },
  {
    accessorKey: "funcao",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Função
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "estado",
    header: "Estado",
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row }) => (
      <div className="flex flex-row space-x-2">
        <BotaoEditarFuncionario dados={row.original}></BotaoEditarFuncionario>
        <ExcluirFuncionarioButton
          dados={row.original}
        ></ExcluirFuncionarioButton>
      </div>
    ),
  },
];
