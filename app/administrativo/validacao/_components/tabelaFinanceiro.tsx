"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/app/_components/ui/button";
import { DataTable } from "@/app/_components/ui/data-table";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import {
  ArrowDownCircleIcon,
  CheckCheckIcon,
  CircleArrowUpIcon,
  Clock10Icon,
  DownloadIcon,
  FileTextIcon,
  Link,
  SendIcon,
  SheetIcon,
  TriangleAlertIcon,
  X,
} from "lucide-react";

import TiposCobrancaBadge from "./tipoCobranca";
import { ColumnDef } from "@tanstack/react-table";
import EditDialogFinancas from "./dialog-edicao";
import CardResumo from "@/app/(home)/_components/cards-resumo";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import * as XLSX from "xlsx";
import { toast } from "sonner";
import { FinanceiroPropos } from "@/app/_props";
import { obterEventos } from "@/app/_actions/eventos/financeiro";
import ValidacaoDialogFinancas from "./dialog-Ações";

import TiposPagosBadge from "@/app/_components/PagoouNao";
import Pop_upFiltros from "@/app/_components/popup-filtros";
import FileUploadDialog from "./Dialog-Anexos";
import TiposValidacaoBadge from "@/app/eventos/[id]/financeiro/_components/tipoValidacao";

// Configuração do pdfmake
pdfMake.vfs = pdfFonts.vfs;

interface TabelaFinanceiraProps {
  dadosfinanceiros: FinanceiroPropos[];
}

interface FilterState {
  tipo: string | null; // Tipo de cobrança
  status: string | null; // Status de pagamento
  dataInicio: Date | null; // Data de início
  dataFim: Date | null; // Data de fim
  descricao: string | null; // Descrição
  informede: string | null; // Cliente
  evento: string | null; // Evento
  pago: string | null; // Pago
  validacao: string | null; // Validação
  dataCompetencia: Date | null; // Data de competência
  valor: string | null; // Valor
}

const TabelaFinanceira = ({ dadosfinanceiros }: TabelaFinanceiraProps) => {
  const searchParams = useSearchParams();
  const idEvento = searchParams.get("view");
  const [nomeEvento, setNomeEvento] = useState<string>("");
  const [dadosFiltrados, setDadosFiltrados] =
    useState<FinanceiroPropos[]>(dadosfinanceiros);
  const [botaoSelecionado, setBotaoSelecionado] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    tipo: null,
    status: null,
    dataInicio: null,
    dataFim: null,
    descricao: null,
    informede: null,
    evento: null,
    pago: null,
    validacao: null,
    dataCompetencia: null,
    valor: null,
  });

  const [dashboard, setDashboard] = useState({
    investidoTotal: 0,
    depositoTotal: 0,
    saldo: 0,
    gastosTotal: 0,
    saldo_previstoEntradas: 0,
    saldo_previstoSaidas: 0,
    saldo_previsto: 0,
    saldoEvento: 0,
  });

  useEffect(() => {
    const fetchNomeEvento = async () => {
      if (idEvento) {
        const evento = await obterEventos(Number(idEvento));
        if (evento) {
          setNomeEvento(evento.nomeEvento || "");
        }
      }
    };

    fetchNomeEvento();
  }, [idEvento]);

  useEffect(() => {
    calcularTotais(dadosFiltrados);
  }, [dadosFiltrados]);

  const calcularTotais = (dados: FinanceiroPropos[]) => {
    let investidoTotal = 0;
    let depositoTotal = 0;
    let gastosTotal = 0;
    let saldo_previstoEntradas = 0;
    let saldo_previstoSaidas = 0;
    let saldo_previsto = 0;
    let saldoEvento = 0;

    dados.forEach((item) => {
      const valor = Number(item.valor || 0);
      if (item.tipocobranca === "Investimento") {
        investidoTotal += valor;
        saldoEvento += valor;
      } else if (item.tipocobranca === "Receita") {
        depositoTotal += valor;
        saldoEvento += valor;
      } else if (item.tipocobranca === "Transferência") {
        saldoEvento += valor;
      } else {
        gastosTotal += valor;
        saldoEvento -= valor;
      }

      if (item.pago === "nao") {
        saldo_previsto += valor;
        switch (item.tipocobranca) {
          case "Despesa":
            saldo_previstoSaidas += valor;
            break;
          case "Receita":
            saldo_previstoEntradas += valor;
            break;
        }
      }
    });

    setDashboard({
      investidoTotal,
      depositoTotal,
      saldo: depositoTotal - gastosTotal - investidoTotal,
      gastosTotal,
      saldo_previsto,
      saldo_previstoEntradas,
      saldo_previstoSaidas,
      saldoEvento,
    });
  };

  const [isAcoesgOpen, setIsAcoesOpen] = useState(false);
  const [isAcao, setAcao] = useState("");
  const handleAcoesClick = (row: FinanceiroPropos, titulo: string) => {
    console.log(row);
    setSelectedRow(row);
    setIsAcoesOpen(true);
    setAcao(titulo);
  };
  console.log(nomeEvento);

  useEffect(() => {
    aplicarFiltros(filters);
  }, [dadosfinanceiros, filters]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isOpenAnexo, setIsOpenAnexo] = useState(false);
  const [selectedRow, setSelectedRow] = useState<FinanceiroPropos>();

  const filtrarEstados = (estado: string) => {
    let dadosFiltradosTemporarios = [...dadosfinanceiros];
    console.log(estado);
    dadosFiltradosTemporarios = dadosFiltradosTemporarios.filter(
      (item) => item.validacao === estado,
    );

    setDadosFiltrados(dadosFiltradosTemporarios);
    setBotaoSelecionado(estado);
    setFilters((prevFilters) => ({
      ...prevFilters,
      validacao: estado,
      dataInicio: null,
      dataFim: null,
      tipo: null,
      status: null,
    }));
  };
  const mostrarTodos = () => {
    setDadosFiltrados(dadosfinanceiros);
    setBotaoSelecionado(null);
    setFilters((prevFilters) => ({
      ...prevFilters,
      validacao: null,
      dataInicio: null,
      dataFim: null,
      tipo: null,
      status: null,
    }));
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const financeiroColumns: ColumnDef<FinanceiroPropos>[] = [
    {
      accessorKey: "data_criacao",
      header: "Data de Registro",
      cell: ({ row: { original: transaction } }) =>
        transaction.datacompetencia
          ? new Date(transaction.datacompetencia).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          : "",
    },
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
    {
      accessorKey: "descricao",
      header: "Descrição",
    },
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
      accessorKey: "pago",
      header: "Pago",
      cell: ({ row }) => (
        <TiposPagosBadge pago={row.original.pago ? row.original.pago : ""} />
      ),
    },
    {
      accessorKey: "datapagamento",
      header: "Data Pagamento",
      cell: ({ row: { original: transaction } }) =>
        transaction.datapagamento
          ? new Date(transaction.datapagamento).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          : "",
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
      accessorKey: "validacao",
      header: "Validação",
      cell: ({ row }) => (
        <TiposValidacaoBadge
          validacao={row.original.validacao ? row.original.validacao : ""}
        />
      ),
    },
    {
      accessorKey: "ultima_alteracao_validacao",
      header: "Informações Adicionais",
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
            onClick={() =>
              handleAcoesClick(row.original, "Em espera o Registro")
            }
          >
            <Clock10Icon />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 bg-green-600 text-white"
            onClick={() => handleAcoesClick(row.original, "Validar Registro")}
          >
            <CheckCheckIcon />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 bg-blue-600 text-white"
            onClick={() =>
              handleAcoesClick(row.original, "Enviar pro Financeiro")
            }
          >
            <SendIcon />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 bg-red-600 text-white"
            onClick={() => handleAcoesClick(row.original, "Rejeitar Registro")}
          >
            <X />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 bg-orange-600 text-white"
            onClick={() =>
              handleAcoesClick(row.original, "Pendência no Registro")
            }
          >
            <TriangleAlertIcon />
          </Button>
        </div>
      ),
    },
  ];
  // Função para exportar para PDF
  const filtrarPorData = (
    dados: FinanceiroPropos[],
    dataInicio: Date | null,
    dataFim: Date | null,
  ): FinanceiroPropos[] => {
    return dados.filter((item) => {
      const dataCompetencia = item.datacompetencia
        ? new Date(item.datacompetencia)
        : null;
      if (!dataCompetencia) return false;
      return (
        (!dataInicio || dataCompetencia >= dataInicio) &&
        (!dataFim || dataCompetencia <= dataFim)
      );
    });
  };

  const aplicarFiltros = (filtros: FilterState) => {
    let dadosFiltradosTemporarios = [...dadosfinanceiros];

    // Filtros de texto
    const filtrosTexto = [
      "descricao",
      "informede",
      "evento",
      "tipo",
      "status",
      "pago",
      "validacao",
      "valor",
    ];
    filtrosTexto.forEach((filtro) => {
      const valorFiltro = filtros[filtro as keyof FilterState];
      if (valorFiltro) {
        dadosFiltradosTemporarios = dadosFiltradosTemporarios.filter((item) => {
          const valorItem =
            filtro === "tipo"
              ? item.tipocobranca
              : filtro === "status"
                ? item.pago
                : filtro === "validacao"
                  ? item.validacao
                  : filtro === "valor"
                    ? item.valor
                    : filtro === "pago"
                      ? item.pago
                      : filtro === "descricao"
                        ? item.descricao
                        : filtro === "informede"
                          ? item.informede
                          : filtro === "evento"
                            ? item.evento
                            : "";
          return String(valorItem)
            .toLowerCase()
            .includes(String(valorFiltro).toLowerCase());
        });
      }
    });
    dadosFiltradosTemporarios = filtrarPorData(
      dadosFiltradosTemporarios,
      filtros.dataInicio,
      filtros.dataFim,
    );

    setDadosFiltrados(dadosFiltradosTemporarios);
  };

  // Função para exportar para PDF
  const exportToPDF = () => {
    // 📌 Obtendo data e hora da emissão
    const filtro = filters;
    const dataEmissao = new Date();
    const dataFormatada = dataEmissao.toLocaleDateString("pt-BR");
    const horaFormatada = dataEmissao.toLocaleTimeString("pt-BR");
    filtro.dataInicio?.setHours(25);
    filtro.dataFim?.setHours(25);

    // 📌 Calculando o total
    const total = dadosFiltrados.reduce((acc, item) => {
      const valor = Number(item.valor) || 0;
      return item.tipocobranca === "Receita" ? acc + valor : acc - valor;
    }, 0);

    const docDefinition = {
      content: [
        { text: "Relatório Financeiro", style: "header" },
        {
          table: {
            headerRows: 1,
            widths: ["auto", "*", "auto", "auto", "auto", "auto", "auto"],
            body: [
              [
                { text: "Data", style: "tableHeader" },
                { text: "Descrição", style: "tableHeader" },
                { text: "Tipo de Cobrança", style: "tableHeader" },
                { text: "Responsável", style: "tableHeader" },
                { text: "Pago", style: "tableHeader" },
                { text: "Data Pagamento", style: "tableHeader" },
                { text: "Valor", style: "tableHeader" },
              ],
              ...dadosFiltrados.map((item) => [
                {
                  text: item.datacompetencia
                    ? new Date(item.datacompetencia).toLocaleDateString("pt-BR")
                    : "",
                  style: "tableBody",
                },
                { text: item.descricao || "", style: "tableBody" },
                { text: item.tipocobranca || "", style: "tableBody" },
                { text: item.evento || "", style: "tableBody" },
                { text: item.pago || "", style: "tableBody" },
                {
                  text: item.datapagamento
                    ? new Date(item.datapagamento).toLocaleDateString("pt-BR")
                    : "",
                  style: "tableBody",
                },
                {
                  text: new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(item.valor)),
                  style: "tableBody",
                },
              ]),
            ],
          },
          layout: "lightHorizontalLines", // Adiciona linhas horizontais leves
        },
        { text: "\n" }, // Espaço antes do total
        {
          text: `Total: ${new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(total)}`,
          style: "total",
        },
        {
          text: `Emitido em: ${dataFormatada} às ${horaFormatada}`,
          style: "footer",
        },
      ],
      styles: {
        header: {
          fontSize: 14,
          bold: true,
          marginLeft: 5,
          marginTop: 2,
          marginRight: 10,
          marginBottom: 2,
        },
        tableHeader: {
          bold: true,
          fontSize: 10,
          fillColor: "#eeeeee", // Cor de fundo cinza claro para cabeçalho
        },
        tableBody: {
          fontSize: 8, // Fonte menor para os dados da tabela
        },
        total: {
          fontSize: 12,
          bold: true,
          marginLeft: 5,
          marginTop: 2,
          marginRight: 10,
          marginBottom: 2,
        },
        footer: {
          fontSize: 10,
          marginLeft: 5,
          marginTop: 2,
          marginRight: 10,
          marginBottom: 2,
          color: "#555",
        },
      },
    };
    const dataInicio = filtro.dataInicio?.toLocaleDateString();
    const dataFim =
      filtro.dataFim?.toLocaleDateString() || new Date().toLocaleDateString();
    console.log(dataInicio, dataFim, "data");
    pdfMake
      .createPdf(docDefinition)
      .download(`relatorio_financeiro ${dataInicio} - ${dataFim}.pdf`);

    toast("Baixando Relátorio!", {
      description: (
        <div className="flex items-center">
          <DownloadIcon className="mr-2 text-white" />
          <span>{`relatorio_financeiro ${filtro.dataInicio?.toLocaleDateString()} - ${filtro.dataFim?.toLocaleDateString()} emitido em ${new Date().toLocaleString()}`}</span>
        </div>
      ),
      action: {
        label: "X",
        onClick: () => console.log("X"),
      },
      style: {
        background: "#007300",
        textDecorationColor: "#f1f4ff",
      },
    });
  };

  // Função para exportar para Excel
  const exportToExcel = () => {
    const filtro = filters;
    filtro.dataInicio?.setHours(25);
    filtro.dataFim?.setHours(25);
    const worksheet = XLSX.utils.json_to_sheet(
      dadosFiltrados.map((item) => ({
        Data: item.datacompetencia
          ? new Date(item.datacompetencia).toLocaleDateString("pt-BR")
          : "",
        Descrição: item.descricao || "",
        "Tipo de Cobrança": item.tipocobranca || "",
        Responsável: item.evento || "",
        Pago: item.pago || "",
        "Data Pagamento": item.datapagamento
          ? new Date(item.datapagamento).toLocaleDateString("pt-BR")
          : "",
        Valor: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(Number(item.valor)),
      })),
    );
    const workbook = XLSX.utils.book_new();
    const dataInicio = filtro.dataInicio?.toLocaleDateString();
    const dataFim =
      filtro.dataFim?.toLocaleDateString() || new Date().toLocaleDateString();
    console.log(dataInicio, dataFim, "data");
    XLSX.utils.book_append_sheet(workbook, worksheet, `dados`);
    XLSX.writeFile(
      workbook,
      `relatorio_financeiro ${dataInicio} ${dataFim}.xlsx`,
    );
    toast("Baixando Relátorio Excel.", {
      description: (
        <div className="flex items-center">
          <DownloadIcon className="mr-2 text-white" />
          <span>{`Relatorio_financeiro ${filtro.dataInicio?.toLocaleDateString()} - ${filtro.dataFim?.toLocaleDateString()} emitido em ${new Date().toLocaleString()}`}</span>
        </div>
      ),
      action: {
        label: "X",
        onClick: () => console.log("X"),
      },
      style: {
        background: "#007300",
        textDecorationColor: "#f1f4ff",
      },
    });
  };

  return (
    <>
      <EditDialogFinancas
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        financeiroId="0"
        defaultValues={selectedRow}
        setIsOpen={(isOpen: boolean) => setIsDialogOpen(isOpen)}
      />
      <FileUploadDialog
        isOpen={isOpenAnexo}
        pasta="documentosEventos"
        dados={selectedRow || ({} as FinanceiroPropos)}
        setIsOpen={(isOpenAnexo: boolean) => setIsOpenAnexo(isOpenAnexo)}
      />
      <ValidacaoDialogFinancas
        isOpen={isAcoesgOpen}
        onClose={() => setIsAcoesOpen(false)}
        financeiroId="0"
        defaultValues={selectedRow}
        setIsOpen={(isAcoesgOpen: boolean) => setIsAcoesOpen(isAcoesgOpen)}
        titulo={isAcao}
      />
      <Pop_upFiltros onFilterChange={handleFilterChange} />
      <div>
        <CardResumo mes="12" {...dashboard} />
      </div>

      <div className="flex items-center justify-center space-x-10 p-6">
        <Button
          className={`w-50 h-20 rounded-sm text-2xl font-bold ${
            botaoSelecionado === "todos"
              ? "bg-blue-700 text-white"
              : botaoSelecionado === null
                ? "bg-blue-700 text-white"
                : "bg-gray-200"
          }`}
          onClick={mostrarTodos}
        >
          Todas as Movimentações
        </Button>
        <Button
          className={`w-50 h-20 rounded-sm text-2xl font-bold ${
            botaoSelecionado === "Em espera"
              ? "bg-blue-700 text-white"
              : "bg-orange-500 text-white"
          }`}
          onClick={() => filtrarEstados("Em espera")}
        >
          <ArrowDownCircleIcon color="#ffffff" size={96} />
          Em espera
        </Button>
        <Button
          className={`w-50 h-20 rounded-sm text-2xl font-bold ${
            botaoSelecionado === "Aprovado"
              ? "bg-blue-700 text-white"
              : "bg-green-800 text-white"
          }`}
          onClick={() => filtrarEstados("Aprovado")}
        >
          <ArrowDownCircleIcon color="#ffffff" size={96} />
          Aprovados
        </Button>
        <Button
          className={`w-50 h-20 rounded-sm text-2xl font-bold ${
            botaoSelecionado === "Recusado"
              ? "bg-blue-700 text-white"
              : "bg-red-800 text-white"
          }`}
          onClick={() => filtrarEstados("Recusado")}
        >
          <ArrowDownCircleIcon color="#ffffff" size={96} />
          Recusados
        </Button>
        <Button
          className={`w-50 h-20 rounded-sm text-2xl font-bold ${
            botaoSelecionado === "Pendente"
              ? "bg-blue-700 text-white"
              : "bg-yellow-600 text-white"
          }`}
          onClick={() => filtrarEstados("Pendente")}
        >
          <CircleArrowUpIcon color="#ffffff" size={64} />
          Pendentes
        </Button>
      </div>
      <div className="flex justify-end space-x-4 p-4">
        <Button
          onClick={exportToPDF}
          className="text-white"
          variant={"outline"}
        >
          <FileTextIcon size={40}></FileTextIcon>
          Exportar para PDF
        </Button>
        <Button onClick={exportToExcel} className="bg-green-500 text-white">
          <SheetIcon size={40}></SheetIcon>
          Exportar para Excel
        </Button>
      </div>
      <ScrollArea className="space-y-6">
        <DataTable
          key={"tabelaFinanceira"}
          columns={financeiroColumns}
          data={dadosFiltrados}
        />
      </ScrollArea>
    </>
  );
};

export default TabelaFinanceira;
