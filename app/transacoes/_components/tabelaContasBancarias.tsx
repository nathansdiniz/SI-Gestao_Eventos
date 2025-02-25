"use client";
import { useEffect, useState } from "react";
import { Button } from "@/app/_components/ui/button";
import { DataTable } from "@/app/_components/ui/data-table";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { PencilIcon, TrashIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import EditDialogContasBancarias from "./dialog-edicaoContasBancarias";
import Carregando from "@/app/_components/carregando";

// Configuração do pdfmake
pdfMake.vfs = pdfFonts.vfs;

interface ContasBancariasProps {
  id: number;
  nomeConta: string;
  banco: string;
  tipo_conta: string;
  agencia: string;
  conta: string;
  saldoBancario: number | null;
  totalEntradas: number | null;
  totalSaidas: number | null;
  ultima_atualizacao_saldo: Date;
  data_criacao: Date;
  data_atualizacao: Date;
  userID: string | null;
  id_empresa: number;
}

interface TabelaContasBancariasProps {
  dadosContasBancarias: ContasBancariasProps[];
  cor: string;
  titulo: string;
}

const TabelaContasBancarias = ({
  dadosContasBancarias,
  titulo,
  cor,
}: TabelaContasBancariasProps) => {
  const [dadosFiltrados] =
    useState<ContasBancariasProps[]>(dadosContasBancarias);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ContasBancariasProps>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula uma operação de carregamento
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleEditClick = (row: ContasBancariasProps) => {
    console.log(row);
    setSelectedRow(row);
    setIsDialogOpen(true);
  };

  const columns: ColumnDef<ContasBancariasProps>[] = [
    {
      accessorKey: "nomeConta",
      header: "Nome da Conta",
      cell: ({ row }) => row.original.nomeConta,
    },
    {
      accessorKey: "banco",
      header: "Banco",
      cell: ({ row }) => row.original.banco,
    },
    {
      accessorKey: "tipo_conta",
      header: "Tipo de Conta",
      cell: ({ row }) => row.original.tipo_conta,
    },
    {
      accessorKey: "agencia",
      header: "Agência",
      cell: ({ row }) => row.original.agencia,
    },
    {
      accessorKey: "conta",
      header: "Conta",
      cell: ({ row }) => row.original.conta,
    },
    {
      accessorKey: "saldoBancario",
      header: "Saldo Bancário",
      cell: ({ row }) =>
        new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(Number(row.original.saldoBancario)),
    },
    {
      accessorKey: "totalEntradas",
      header: "Total de Entradas",
      cell: ({ row }) =>
        new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(Number(row.original.totalEntradas)),
    },
    {
      accessorKey: "totalSaidas",
      header: "Total de Saídas",
      cell: ({ row }) =>
        new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(Number(row.original.totalSaidas)),
    },
    {
      accessorKey: "ultima_atualizacao_saldo",
      header: "Última Atualização do Saldo",
      cell: ({ row: { original: transaction } }) =>
        transaction.ultima_atualizacao_saldo
          ? new Date(transaction.ultima_atualizacao_saldo).toLocaleDateString(
              "pt-BR",
              {
                day: "2-digit",
                month: "long",
                year: "numeric",
              },
            )
          : "",
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

  return (
    <>
      <EditDialogContasBancarias
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        financeiroId={"0"}
        defaultValues={selectedRow}
        setIsOpen={(isOpen: boolean) => setIsDialogOpen(isOpen)}
      />

      <ScrollArea className="h-full w-full space-y-6">
        <h3 className={`p-6 text-center text-2xl font-bold bg-${cor}-500`}>
          {titulo}
        </h3>
        <DataTable key={titulo} columns={columns} data={dadosFiltrados} />
      </ScrollArea>

      <Carregando open={loading} />
    </>
  );
};

export default TabelaContasBancarias;
