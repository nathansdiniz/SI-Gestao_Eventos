"use client";
import { ColumnDef } from "@tanstack/react-table";
import AtualizarEmpresasButton from "../../_components/botao-update";
import ExcluirEmpresasButton from "../../_components/botao-exclusaoEmpresa";

interface EmpresasProps {
  id: number;
  empresa: string;
  cnpj: string;
  site: string;
  ramo_empresa: string;
  email: string;
  localizacao_empresa: string;
  telefone: string;
  dataAbertura: Date;
  data_created: Date;
  data_updated: Date;
  inscricaoEstadual: string;
  inscricaoMunicipal: string;
  gestor_responsavel: string;
  userID: string;
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
    accessorKey: "empresa",
    header: "Empresa",
  },

  {
    accessorKey: "cnpj",
    header: "CNPJ",
  },
  {
    accessorKey: "inscricaoEstadual",
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
    accessorKey: "localizacao_empresa",
    header: "Endereço",
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row }) => (
      <div className="flex flex-row space-x-2">
        <AtualizarEmpresasButton dados={row.original}></AtualizarEmpresasButton>
        <ExcluirEmpresasButton dados={row.original} />
      </div>
    ),
  },
];
