"use client";
import { useState } from "react";
import { Button } from "@/app/_components/ui/button";
import { DataTable } from "@/app/_components/ui/data-table";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { PencilIcon, TrashIcon } from "lucide-react";
import TiposCobrancaBadge from "./tipoCobranca";
import EditDialog from "./dialog-edicao";
import { ColumnDef } from "@tanstack/react-table";

interface FinanceiroProps {
  id: string;
  evento: string;
  datapagamento: string;
  datacompetencia: string;
  tipocobranca: string;
  idrecebidode: string;
  recebidode: string;
  informede: string;
  descricao: string;
  valor: number;
  juros: string;
  multa: string;
  desconto: string;
  pago: string;
  idconta: string;
  conta: string;
  idcategoria: string;
  categoria: string;
  idcentrodecusto: string;
  centrodecusto: string;
  mododepagamento: string;
  parcelas: string;
  idevento: string;
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
  const [dadosFiltrados, setDadosFiltrados] =
    useState<FinanceiroProps[]>(dadosfinanceiros);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<FinanceiroProps>();

  const handleEditClick = (row: FinanceiroProps) => {
    console.log(row);
    setSelectedRow(row);
    setIsDialogOpen(true);
  };

  const handleSave = (updatedData: FinanceiroProps) => {
    // Lógica para salvar os dados atualizados (ex: chamada de API)
    console.log("Dados atualizados:", updatedData);
    setIsDialogOpen(false);
  };

  const columns: ColumnDef<FinanceiroProps>[] = [
    // Tipagem aqui!
    {
      accessorKey: "datacompetencia",
      header: "Data",
      cell: (
        { row }, // `row` agora é tipado como Row<FinanceiroProps>
      ) =>
        new Date(row.original.datacompetencia).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
    },
    { accessorKey: "descricao", header: "Descrição", enableColumnFilter: true },
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
      cell: ({ row }) => row.original.evento || "Não informado.",
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
  return (
    <>
      <EditDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSave}
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
