"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/app/_components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import TiposCobrancaBadge from "../_components/tipoCobranca";
import { FinanceiroPropos } from "@/app/_props";
import { Checkbox } from "@/app/_components/ui/checkbox";

export const financeiroColumns: ColumnDef<FinanceiroPropos>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "datacompetencia",
    header: "Data",
    cell: ({ row: { original: transaction } }) =>
      transaction.datacompetencia
        ? new Date(transaction.datacompetencia).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })
        : "",
  },
  {
    accessorKey: "descricao",
    header: "Descrição",
  },

  {
    accessorKey: "tipocobranca",
    header: "Tipo de Cobrança",
    cell: ({ row }) => (
      <TiposCobrancaBadge
        tipocobranca={
          row.original.tipocobranca ? row.original.tipocobranca : ""
        }
      />
    ),
  },
  {
    accessorKey: "evento",
    header: "Responsável",
    cell: ({ row: { original: transaction } }) =>
      transaction.evento || "Não informado.",
  },
  {
    accessorKey: "pago",
    header: "Pago",
  },
  {
    accessorKey: "datapagamento",
    header: "Data Pagamento",
    cell: ({ row: { original: transaction } }) =>
      transaction.datapagamento
        ? new Date(transaction.datapagamento).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })
        : "",
  },
  {
    accessorKey: "valor",
    header: "Valor",
    cell: ({ row: { original: transaction } }) =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(transaction.valor)),
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

export const ContasColumns: ColumnDef<FinanceiroPropos>[] = [
  {
    accessorKey: "datacompetencia",
    header: "Data",
    cell: ({ row: { original: transaction } }) =>
      transaction.datacompetencia
        ? new Date(transaction.datacompetencia).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })
        : "",
  },
  {
    accessorKey: "descricao",
    header: "Descrição",
    enableColumnFilter: true,
  },

  {
    accessorKey: "tipocobranca",
    header: "Tipo de Cobrança",
    cell: ({ row }) => (
      <TiposCobrancaBadge
        tipocobranca={
          row.original.tipocobranca ? row.original.tipocobranca : ""
        }
      />
    ),
  },
  {
    accessorKey: "evento",
    header: "Responsável",
    cell: ({ row: { original: transaction } }) =>
      transaction.evento || "Não informado.",
  },
  {
    accessorKey: "valor",
    header: "Valor",
    cell: ({ row: { original: transaction } }) =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(transaction.valor)),
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
