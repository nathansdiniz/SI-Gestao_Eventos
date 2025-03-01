import TiposCobrancaBadge from "@/app/eventos/[id]/financeiro/_components/tipoCobranca";
import TiposPagosBadge from "@/app/_components/PagoouNao";
import TiposValidacaoBadge from "@/app/eventos/[id]/financeiro/_components/tipoValidacao";
import { FinanceiroPropos } from "@/app/_props";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const financeiroColumns: ColumnDef<FinanceiroPropos>[] = [
  {
    accessorFn: (row) => row.data_criacao,
    header: "Data de Registro",
    cell: ({ row }) =>
      row.original.datacompetencia
        ? new Date(row.original.datacompetencia).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        : "",
  },
  {
    accessorFn: (row) => row.datacompetencia,
    header: "Data de Vencimento",
    cell: ({ row }) =>
      row.original.datacompetencia
        ? new Date(row.original.datacompetencia).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        : "",
  },
  {
    accessorFn: (row) => row.descricao,
    header: "Descrição",
  },
  {
    accessorFn: (row) => row.informede,
    header: "Cliente",
  },
  {
    accessorFn: (row) => row.tipocobranca,
    header: "Tipo de Cobrança",
    cell: ({ row }) => (
      <TiposCobrancaBadge tipocobranca={row.original.tipocobranca ?? ""} />
    ),
  },
  {
    accessorFn: (row) => row.evento,
    header: "Evento",
    cell: ({ row }) => (
      <Link
        href={`/eventos/${row.original.idevento}`}
        className={"text-muted-foreground"}
      >
        {row.original.evento}
      </Link>
    ),
  },
  {
    accessorFn: (row) => row.pago,
    header: "Pago",
    cell: ({ row }) => <TiposPagosBadge pago={row.original.pago ?? ""} />,
  },
  {
    accessorFn: (row) => row.datapagamento,
    header: "Data Pagamento",
    cell: ({ row }) =>
      row.original.datapagamento
        ? new Date(row.original.datapagamento).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        : "",
  },
  {
    accessorFn: (row) => row.valor,
    header: "Valor",
    cell: ({ row }) =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(row.original.valor)),
  },
  {
    accessorFn: (row) => row.validacao,
    header: "Validação",
    cell: ({ row }) => (
      <TiposValidacaoBadge validacao={row.original.validacao ?? ""} />
    ),
  },
];
