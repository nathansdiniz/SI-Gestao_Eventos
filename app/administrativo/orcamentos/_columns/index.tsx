"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/app/_components/ui/button";
import { ArrowUpDownIcon } from "lucide-react";
import BotaoEditarOrcamento from "../_components/botao-update";
import ExcluirOrcamentoButton from "../_components/botao-exclusaoOrcamento";
import DownloadOrcamentoPdf from "../_components/downloadpdf";

export interface OrcamentosProps {
  id: number;
  nome_orcamento: string | null;
  cliente_orcamento: string | null;
  email_cliente: string | null;
  vendedor: string | null;
  assunto: string | null;
  mensagem: string | null;
  tipo_evento: string | null;
  tipo_orcamento: string | null;
  data_orcamento: Date | null;
  valor_orcamento: number | null;
  forma_pagamento: string | null;
  parcelas_orcamento: number | null;
  max_participantes: number | null;
  valor_negociado: number | null;
  forma_pagamento_negociado: string | null;
  parcelas_negociadas: number | null;
  data_negociacao: Date | null;
  data_principal_evento: Date | null;
  idVendedor_orcamento: string | null;
  idVendedor_negociacao: string | null;
  status_orcamento: string | null;
  data_criacao: Date | null;
  data_atualizacao: Date | null;
  data_retorno: Date | null;
  observacao: string | null;
  codigoInterno: string | null;
  numeroConvidados: number | null;
  valorInicial: number | null;
  whatsapp: string | null;
  ddiTelefone: string | null;
  telefone: string | null;
  ddiCelular: string | null;
  celular: string | null;
  como_conheceu: string | null;
  idLocalEvento: number | null;
  nomeResponsavel: string | null;
  obs2: string | null;
  obs3: string | null;
  obs4: string | null;
  nomeDoEvento: string | null;
  datasAdicionais: any | null;
  funil: string | null;
  id_empresa: number | null;
  userID: string | null;
}

export const OrcamentosColumns: ColumnDef<OrcamentosProps>[] = [
  {
    accessorKey: "nome_orcamento",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome do Orçamento
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "cliente_orcamento",
    header: "Cliente",
  },
  {
    accessorKey: "email_cliente",
    header: "Email",
  },
  {
    accessorKey: "vendedor",
    header: "Vendedor",
  },
  {
    accessorKey: "tipo_evento",
    header: "Tipo de Evento",
  },
  {
    accessorKey: "data_orcamento",
    header: "Data do Orçamento",
    cell: ({ row: { original: orcamento } }) => {
      if (orcamento.data_orcamento != null)
        return new Date(orcamento.data_orcamento).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      return null;
    },
  },
  {
    accessorKey: "valor_orcamento",
    header: "Valor do Orçamento",
    cell: ({ row: { original: orcamento } }) => {
      if (orcamento.valor_orcamento != null)
        return orcamento.valor_orcamento.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
      return null;
    },
  },
  {
    accessorKey: "status_orcamento",
    header: "Status",
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row }) => (
      <div className="flex flex-row space-x-2">
        <BotaoEditarOrcamento dados={row.original}></BotaoEditarOrcamento>
        <ExcluirOrcamentoButton dados={row.original}></ExcluirOrcamentoButton>
        <DownloadOrcamentoPdf orcamento={row.original}></DownloadOrcamentoPdf>
      </div>
    ),
  },
];
