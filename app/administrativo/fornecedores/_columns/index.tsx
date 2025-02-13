"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/app/_components/ui/button";
import { ArrowUpDownIcon } from "lucide-react";

import BotaoEditarFornecedor from "../_components/botao-update-fornecedor";
import ExcluirFornecedorButton from "../_components/botao-exclusaoEmpresa";

interface FornecedoresProps {
  idfornecedores: number;
  nome_fornecedor: string | null;
  cnpj_fornecedor: string;
  tipo_fornecedor: string | null;
  representante_responsavel: string | null;
  localizacao_fornecedor: string | null;
  telefone_fornecedor: string | null;
  email_fornecedor: string | null;
  data_contratada: Date | null;
  data_termino: Date | null;
  data_criacao: Date | null;
  data_atualizacao: Date | null;
  userID: string | null;
}

export const fornecedoresColumns: ColumnDef<FornecedoresProps>[] = [
  {
    accessorKey: "nome_fornecedor",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome do Fornecedor
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "cnpj_fornecedor",
    header: "CNPJ",
  },
  {
    accessorKey: "tipo_fornecedor",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tipo de Fornecedor
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "representante_responsavel",
    header: "Representante Responsável",
  },
  {
    accessorKey: "localizacao_fornecedor",
    header: "Localização",
  },
  {
    accessorKey: "telefone_fornecedor",
    header: "Telefone",
  },
  {
    accessorKey: "email_fornecedor",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          E-mail
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "data_contratada",
    header: "Data Contratada",
    cell: ({ row: { original: fornecedor } }) =>
      fornecedor.data_contratada
        ? new Date(fornecedor.data_contratada).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "-",
  },
  {
    accessorKey: "data_termino",
    header: "Data de Término",
    cell: ({ row: { original: fornecedor } }) =>
      fornecedor.data_termino
        ? new Date(fornecedor.data_termino).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "-",
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row }) => (
      <div className="flex flex-row space-x-2">
        <BotaoEditarFornecedor dados={row.original} />
        <ExcluirFornecedorButton dados={row.original} />
      </div>
    ),
  },
];
