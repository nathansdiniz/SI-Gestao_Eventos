// app/administrativo/orcamentos/_components/DownloadOrcamentoPdf.tsx
"use client";
import { Button } from "@/app/_components/ui/button";
import { FileDown } from "lucide-react";
import { jsPDF } from "jspdf"; // Import jsPDF
import autoTable from "jspdf-autotable";
import { OrcamentosProps } from "../_columns";

interface DownloadOrcamentoPdfProps {
  orcamento: OrcamentosProps;
}

const DownloadOrcamentoPdf = ({ orcamento }: DownloadOrcamentoPdfProps) => {
  const handleDownloadPdf = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(20);
    doc.text(`Orçamento - ${orcamento.nome_orcamento}`, 10, 10);

    // Define data for autoTable
    const data = [
      ["ID", orcamento.id.toString() || "N/A"],
      ["Cliente", orcamento.cliente_orcamento || "N/A"],
      ["Email do Cliente", orcamento.email_cliente || "N/A"],
      ["Vendedor", orcamento.vendedor || "N/A"],
      ["Assunto", orcamento.assunto || "N/A"],
      ["Mensagem", orcamento.mensagem || "N/A"],
      ["Tipo de Evento", orcamento.tipo_evento || "N/A"],
      ["Tipo de Orçamento", orcamento.tipo_orcamento || "N/A"],
      [
        "Data do Orçamento",
        orcamento.data_orcamento
          ? new Date(orcamento.data_orcamento).toLocaleDateString("pt-BR")
          : "N/A",
      ],
      [
        "Valor do Orçamento",
        orcamento.valor_orcamento
          ? `R$ ${orcamento.valor_orcamento.toFixed(2).replace(".", ",")}`
          : "N/A",
      ],
      ["Forma de Pagamento", orcamento.forma_pagamento || "N/A"],
      ["Parcelas", orcamento.parcelas_orcamento?.toString() || "N/A"],
      ["Máx. Participantes", orcamento.max_participantes?.toString() || "N/A"],
      [
        "Valor Negociado",
        orcamento.valor_negociado
          ? `R$ ${orcamento.valor_negociado.toFixed(2).replace(".", ",")}`
          : "N/A",
      ],
      [
        "Forma Pagamento Negociado",
        orcamento.forma_pagamento_negociado || "N/A",
      ],
      [
        "Parcelas Negociadas",
        orcamento.parcelas_negociadas?.toString() || "N/A",
      ],
      [
        "Data Negociação",
        orcamento.data_negociacao
          ? new Date(orcamento.data_negociacao).toLocaleDateString("pt-BR")
          : "N/A",
      ],
      [
        "Data Principal Evento",
        orcamento.data_principal_evento
          ? new Date(orcamento.data_principal_evento).toLocaleDateString(
              "pt-BR",
            )
          : "N/A",
      ],
      ["Status do Orçamento", orcamento.status_orcamento || "N/A"],
      [
        "Data de Criação",
        orcamento.data_criacao
          ? new Date(orcamento.data_criacao).toLocaleDateString("pt-BR")
          : "N/A",
      ],
      [
        "Data de Atualização",
        orcamento.data_atualizacao
          ? new Date(orcamento.data_atualizacao).toLocaleDateString("pt-BR")
          : "N/A",
      ],
      [
        "Data de Retorno",
        orcamento.data_retorno
          ? new Date(orcamento.data_retorno).toLocaleDateString("pt-BR")
          : "N/A",
      ],
      ["Observação", orcamento.observacao || "N/A"],
      ["Número de Convidados", orcamento.numeroConvidados?.toString() || "N/A"],
      [
        "Valor Inicial",
        orcamento.valorInicial
          ? `R$ ${orcamento.valorInicial.toFixed(2).replace(".", ",")}`
          : "N/A",
      ],
      ["Whatsapp", orcamento.whatsapp || "N/A"],
      ["Telefone", orcamento.telefone || "N/A"],
      ["Celular", orcamento.celular || "N/A"],
      ["Como Conheceu", orcamento.como_conheceu || "N/A"],
      ["Nome do Responsável", orcamento.nomeResponsavel || "N/A"],
      ["Obs2", orcamento.obs2 || "N/A"],
      ["Obs3", orcamento.obs3 || "N/A"],
      ["Obs4", orcamento.obs4 || "N/A"],
      ["Nome do Evento", orcamento.nomeDoEvento || "N/A"],
    ];

    // Add table
    autoTable(doc, {
      head: [["Descrição", "Valor"]],
      body: data,
    });

    // Save the PDF
    doc.save(`orcamento-${orcamento.nome_orcamento}.pdf`);
  };

  return (
    <Button onClick={handleDownloadPdf}>
      <FileDown className="mr-2 h-4 w-4" />
      PDF
    </Button>
  );
};

export default DownloadOrcamentoPdf;
