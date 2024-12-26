"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/app/_components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";

interface EmpresasProps {
  id: string;
  nome: string;
  cnpj: string;
  site: string;
  cep: string;
  email: string;
  endereco: string;
  numero: number;
  bairro: string;
  cidade: string;
  estado: string;
  telefone: string;
  celular: string;
  dataAbertura: string;
  inscricaoEstadual: string;
}

export const empresasColumns: ColumnDef<EmpresasProps>[] = [
  {
    accessorKey: "dataAbertura",
    header: "Data Abertura",
    cell: ({ row: { original: transaction } }) =>
      new Date(transaction.dataAbertura).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
  },
  {
    accessorKey: "nome",
    header: "Nome",
  },

  {
    accessorKey: "cnpj",
    header: "CNPJ",
  },
  {
    accessorKey: "inscricaoEStadual",
    header: "Inscrição Estadual",
  },
  {
    accessorKey: "email",
    header: "E-mail",
  },
  {
    accessorKey: "site",
    header: "Site",
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
