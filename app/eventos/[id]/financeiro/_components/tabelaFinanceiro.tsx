"use client";
import { useEffect, useState } from "react";
import { Button } from "@/app/_components/ui/button";
import { DataTable } from "@/app/_components/ui/data-table";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import {
  DownloadIcon,
  FileTextIcon,
  PaperclipIcon,
  PencilIcon,
  SheetIcon,
  TrashIcon,
} from "lucide-react";
import Pop_upFiltros from "./popup-filtros";
import TiposCobrancaBadge from "./tipoCobranca";
import { ColumnDef } from "@tanstack/react-table";
import EditDialogFinancas from "./dialog-edicao";
import CardResumo from "@/app/(home)/_components/cards-resumo";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import * as XLSX from "xlsx";
import { toast } from "sonner";
import { FinanceiroPropos } from "@/app/_props";
import FileUploadDialog from "@/app/eventos/[id]/validacao/_components/Dialog-Anexos";
import { useSearchParams } from "next/navigation";
import { obterEventos } from "@/app/_actions/eventos/financeiro";
import TiposValidacaoBadge from "./tipoValidacao";
import BotaoAdicionarFinancas from "../../validacao/_components/adicionarTransação";
import TiposPagosBadge from "@/app/_components/PagoouNao";
import Link from "next/link";

// Configuração do pdfmake
pdfMake.vfs = pdfFonts.vfs;

interface TabelaFinanceiraProps {
  dadosfinanceiros: FinanceiroPropos[];
}
interface FilterState {
  tipo: string | null;
  status: string | null;
  dataInicio: Date;
  dataFim: Date;
}

const TabelaFinanceira = ({ dadosfinanceiros }: TabelaFinanceiraProps) => {
  const searchParams = useSearchParams();
  const idEvento = searchParams.get("view");
  const [nomeEvento, setNomeEvento] = useState<string>("");
  const [dadosFiltrados, setDadosFiltrados] =
    useState<FinanceiroPropos[]>(dadosfinanceiros);
  const [filters, setFilters] = useState<FilterState>({
    tipo: null,
    status: null,
    dataInicio: new Date("2024-01-01"),
    dataFim: new Date("2025-12-31"),
  });

  const [dashboard, setDashboard] = useState({
    investidoTotal: 0,
    depositoTotal: 0,
    saldo: 0,
    gastosTotal: 0,
    saldo_previstoEntradas: 0,
    saldo_previstoSaidas: 0,
    saldo_previsto: 0,
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

    dados.forEach((item) => {
      const valor = Number(item.valor || 0);
      if (item.tipocobranca === "Investimento") {
        investidoTotal += valor;
      } else if (item.tipocobranca === "Receita") {
        depositoTotal += valor;
      } else {
        gastosTotal += valor;
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
    });
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
    { accessorKey: "informede", header: "Cliente" },
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
      accessorKey: "actions",
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
            className="h-8 w-8 bg-blue-600 text-white"
            onClick={() => {
              setSelectedRow(row.original);
              setIsOpenAnexo(true);
            }}
          >
            <PaperclipIcon></PaperclipIcon>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 bg-red-600 text-white"
          >
            <TrashIcon></TrashIcon>
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    aplicarFiltros(filters);
  }, [dadosfinanceiros, filters]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<FinanceiroPropos>();
  const [isOpenAnexo, setIsOpenAnexo] = useState(false);

  const handleEditClick = (row: FinanceiroPropos) => {
    console.log(row);
    setSelectedRow(row);
    setIsDialogOpen(true);
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const aplicarFiltros = (filtros: FilterState) => {
    let dadosFiltradosTemporarios = [...dadosfinanceiros];

    if (filtros.tipo) {
      dadosFiltradosTemporarios = dadosFiltradosTemporarios.filter(
        (item) => item.tipocobranca === filtros.tipo,
      );
    }

    if (filtros.status) {
      dadosFiltradosTemporarios = dadosFiltradosTemporarios.filter(
        (item) => item.pago === filtros.status,
      );
    }

    if (filtros.dataInicio) {
      dadosFiltradosTemporarios = dadosFiltradosTemporarios.filter((item) => {
        const dataCompetencia = item.datacompetencia
          ? new Date(item.datacompetencia)
          : null;
        return dataCompetencia && dataCompetencia >= filtros.dataInicio;
      });
    }

    if (filtros.dataFim) {
      dadosFiltradosTemporarios = dadosFiltradosTemporarios.filter((item) => {
        const dataCompetencia = item.datacompetencia
          ? new Date(item.datacompetencia)
          : null;
        return dataCompetencia && dataCompetencia <= filtros.dataFim;
      });
    }

    setDadosFiltrados(dadosFiltradosTemporarios);
  };

  // Função para exportar para PDF
  const exportToPDF = () => {
    // 📌 Obtendo data e hora da emissão
    const filtro = filters;
    const dataEmissao = new Date();
    const dataFormatada = dataEmissao.toLocaleDateString("pt-BR");
    const horaFormatada = dataEmissao.toLocaleTimeString("pt-BR");
    filtro.dataInicio.setHours(25);
    filtro.dataFim.setHours(25);

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
    const dataInicio = filtro.dataInicio.toLocaleDateString();
    const dataFim = filtro.dataFim.toLocaleDateString();
    console.log(dataInicio, dataFim);
    pdfMake
      .createPdf(docDefinition)
      .download(`relatorio_financeiro ${dataInicio} - ${dataFim}.pdf`);

    toast("Baixando Relátorio!", {
      description: (
        <div className="flex items-center">
          <DownloadIcon className="mr-2 text-white" />
          <span>{`relatorio_financeiro ${filtro.dataInicio.toLocaleDateString()} - ${filtro.dataFim.toLocaleDateString()} emitido em ${new Date().toLocaleString()}`}</span>
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
    filtro.dataInicio.setHours(25);
    filtro.dataFim.setHours(25);
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
    const dataInicio = filtro.dataInicio.toLocaleDateString();
    const dataFim = filtro.dataFim.toLocaleDateString();
    console.log(dataInicio, dataFim);
    XLSX.utils.book_append_sheet(workbook, worksheet, `dados`);
    XLSX.writeFile(
      workbook,
      `relatorio_financeiro ${dataInicio} ${dataFim}.xlsx`,
    );
    toast("Baixando Relátorio Excel.", {
      description: (
        <div className="flex items-center">
          <DownloadIcon className="mr-2 text-white" />
          <span>{`Relatorio_financeiro ${filtro.dataInicio.toLocaleDateString()} - ${filtro.dataFim.toLocaleDateString()} emitido em ${new Date().toLocaleString()}`}</span>
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
    <div className="m-5 space-y-6 p-6">
      <EditDialogFinancas
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        financeiroId="0"
        defaultValues={selectedRow}
        setIsOpen={(isOpen: boolean) => setIsDialogOpen(isOpen)}
      />

      <FileUploadDialog
        isOpen={isOpenAnexo}
        dados={selectedRow || ({} as FinanceiroPropos)}
        setIsOpen={(isOpenAnexo: boolean) => setIsOpenAnexo(isOpenAnexo)}
      />
      <Pop_upFiltros onFilterChange={handleFilterChange} />
      <div>
        <CardResumo mes="12" {...dashboard} />
      </div>

      <div className="flex flex-col justify-end gap-4 p-4 md:flex-row">
        <BotaoAdicionarFinancas
          idEvento={idEvento ?? ""}
          nomeEvento={nomeEvento}
        />
        <Button
          onClick={exportToPDF}
          className="flex items-center gap-2 text-white"
          variant={"outline"}
        >
          <FileTextIcon size={32} className="md:size-40" />
          Exportar para PDF
        </Button>
        <Button
          onClick={exportToExcel}
          className="flex items-center gap-2 bg-green-500 text-white"
        >
          <SheetIcon size={32} className="md:size-40" />
          Exportar para Excel
        </Button>
      </div>

      {/* Tabela Responsiva */}
      <div className="overflow-x-auto">
        <ScrollArea className="space-y-6">
          <DataTable
            key={"tabelaFinanceira"}
            columns={financeiroColumns}
            data={dadosFiltrados}
          />
        </ScrollArea>
      </div>
    </div>
  );
};

export default TabelaFinanceira;
