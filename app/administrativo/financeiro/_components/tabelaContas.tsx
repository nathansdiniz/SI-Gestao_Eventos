"use client";
import { useState } from "react";
import { Button } from "@/app/_components/ui/button";
import { DataTable } from "@/app/_components/ui/data-table";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { PencilIcon, TrashIcon } from "lucide-react";
import TiposCobrancaBadge from "./tipoCobranca";
import EditDialog from "./dialog-edicao";
import { ColumnDef } from "@tanstack/react-table";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Link from "next/link";

// Configuração do pdfmake
pdfMake.vfs = pdfFonts.vfs;
interface FinanceiroProps {
  id: number;
  evento: string | null;
  datapagamento: Date | null;
  datacompetencia: Date | null;
  tipocobranca: string | null;
  idrecebidode: string | null;
  recebidode: string | null;
  informede: string | null;
  descricao: string | null;
  valor: number | null;
  juros: number | null;
  multa: number | null;
  desconto: number | null;
  pago: string | null;
  idconta: string | null;
  conta: string | null;
  idcategoria: string | null;
  categoria: string | null;
  idcentrodecusto: string | null;
  centrodecusto: string | null;
  mododepagamento: string | null;
  parcelas: null | {
    id: number | null;
    datapagamento: string | null;
    descricao: string | null;
    valor: number | null;
  };
  data_criacao: Date;
  data_update: Date;
  idevento: string | null;
}

interface TabelaFinanceiraProps {
  dadosfinanceiros: FinanceiroProps[];
  cor: string;
  titulo: string;
}

const TabelaContas = ({
  dadosfinanceiros,
  titulo,
  cor,
}: TabelaFinanceiraProps) => {
  const [dadosFiltrados] = useState<FinanceiroProps[]>(dadosfinanceiros);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<FinanceiroProps>();

  const handleEditClick = (row: FinanceiroProps) => {
    console.log(row);
    setSelectedRow(row);
    setIsDialogOpen(true);
  };

  const columns: ColumnDef<FinanceiroProps>[] = [
    // Tipagem aqui!
    {
      accessorKey: "datacompetencia",
      header: "Data de Vencimento",
      cell: ({ row: { original: transaction } }) =>
        transaction.datacompetencia
          ? new Date(transaction.datacompetencia).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          : "",
    },
    { accessorKey: "descricao", header: "Descrição", enableColumnFilter: true },
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
    { accessorKey: "informede", header: "Cliente" },

    {
      accessorKey: "evento",
      header: "Evento",
      cell: ({ row: { original: transaction } }) => (
        <Link
          href={`/eventos/${transaction.idevento}`}
          className={"text-muted-foreground"}
        >
          {transaction.evento}
        </Link>
      ),
    },
    {
      accessorKey: "valor",
      header: "Valor",
      cell: ({ row }) =>
        new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(Number(row.original.valor)),
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => (
        <div className="flex flex-row space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 bg-yellow-600 text-white"
            onClick={() => handleEditClick(row.original)}
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

  // Função para exportar para PDF

  // Função para exportar para Excel
  return (
    <>
      <EditDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        financeiroId={"0"}
        defaultValues={selectedRow}
        setIsOpen={(isOpen: boolean) => setIsDialogOpen(isOpen)}
      />

      <ScrollArea className="h-[500px] space-y-6">
        <h3 className={`p-6 text-center text-2xl font-bold bg-${cor}-500`}>
          {titulo}
        </h3>
        <DataTable key={titulo} columns={columns} data={dadosFiltrados} />
      </ScrollArea>
    </>
  );
};

export default TabelaContas;
