"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/app/_components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import TiposCobrancaBadge from "../_components/tipoCobranca";

interface FinanceiroPropos {
  id: string;
  evento: string;
  datapagamento: string;
  datacompetencia: string;
  tipocobranca: string;
  idrecebidode: string;
  recebidode: string;
  informede: string;
  descricao: string;
  valor: string;
  juros: string;
  multa: string;
  desconto: string;
  pago: string;
  idconta: string;
  conta: string;
  idcategoria: string | number;
  categoria: string | null;
  idcentrodecusto: string;
  centrodecusto: string;
  mododepagamento: string;
  parcelas: null;
  idevento: string;
}

export const financeiroColumns: ColumnDef<FinanceiroPropos>[] = [
  {
    accessorKey: "datacompetencia",
    header: "Data",
    cell: ({ row: { original: transaction } }) =>
      new Date(transaction.datacompetencia).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
  },
  {
    accessorKey: "descricao",
    header: "Descrição",
  },

  {
    accessorKey: "tipocobranca",
    header: "Tipo de Cobrança",
    cell: ({ row }) => (
      <TiposCobrancaBadge tipocobranca={row.original.tipocobranca} />
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
      new Date(transaction.datapagamento).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
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
    cell: ({ row }) => (
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
