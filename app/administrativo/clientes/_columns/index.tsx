"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/app/_components/ui/button";
import { ArrowUpDownIcon } from "lucide-react";
import BotaoEditarFuncionario from "../_components/botao-update";
import ExcluirClientesButton from "../_components/botao-exclusaoCliente";

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

export const ClientesColumns: ColumnDef<ClientesProps>[] = [
  {
    accessorKey: "cliente",
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
    cell: ({ row: { original: transaction } }) => {
      if (transaction.data_nasc != null)
        new Date(transaction.data_nasc).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
    },
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
        <ExcluirClientesButton dados={row.original}></ExcluirClientesButton>
      </div>
    ),
  },
];
