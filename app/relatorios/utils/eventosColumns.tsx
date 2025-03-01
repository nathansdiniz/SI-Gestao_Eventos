import { EventoPropos } from "@/app/_props";
import { ColumnDef } from "@tanstack/react-table";

export const eventosColumns: ColumnDef<EventoPropos>[] = [
  {
    accessorFn: (row) => row.id,
    header: "ID",
  },
  {
    accessorFn: (row) => row.nomeEvento,
    header: "Nome do Evento",
  },
  {
    accessorFn: (row) => row.dataInicio,
    header: "Data Início",
    cell: ({ row }) => {
      const dataInicio = row.original.dataInicio;
      return dataInicio ? new Date(dataInicio).toLocaleDateString("pt-BR") : "";
    },
  },
  {
    accessorFn: (row) => row.dataFim,
    header: "Data Fim",
    cell: ({ row }) => {
      const dataFim = row.original.dataFim;
      return dataFim ? new Date(dataFim).toLocaleDateString("pt-BR") : "";
    },
  },
  {
    accessorFn: (row) => row.local,
    header: "Local",
  },
  {
    accessorFn: (row) => row.descricao,
    header: "Descrição",
  },
];
