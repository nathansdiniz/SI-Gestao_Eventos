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
import { FinanceiroPropos } from "@/app/_props";
import Link from "next/link";
import TiposValidacaoBadge from "@/app/eventos/[id]/financeiro/_components/tipoValidacao";

// Configuração do pdfmake
pdfMake.vfs = pdfFonts.vfs;

interface TabelaFinanceiraProps {
  dadosfinanceiros: FinanceiroPropos[];
  cor: string;
  titulo: string;
}

const TabelaContas = ({
  dadosfinanceiros,
  titulo,
  cor,
}: TabelaFinanceiraProps) => {
  const [dadosFiltrados] = useState<FinanceiroPropos[]>(dadosfinanceiros);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<FinanceiroPropos>();

  const handleEditClick = (row: FinanceiroPropos) => {
    console.log(row);
    setSelectedRow(row);
    setIsDialogOpen(true);
  };

  const columns: ColumnDef<FinanceiroPropos>[] = [
    // Tipagem aqui!
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
      accessorKey: "validacao",
      header: "Validação",
      cell: ({ row }) => (
        <TiposValidacaoBadge
          validacao={row.original.validacao ? row.original.validacao : ""}
        />
      ),
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
