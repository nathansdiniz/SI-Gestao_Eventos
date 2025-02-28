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
import FileUploadDialog from "@/app/_components/dialog-VerAnexosAdd";
import { obterEventos } from "@/app/_actions/eventos/financeiro";
import ValidacaoDialogFinancas from "./dialog-Ações";
import TiposValidacaoBadge from "../../financeiro/_components/tipoValidacao";
import TiposPagosBadge from "@/app/_components/PagoouNao";

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
  const [botaoSelecionado, setBotaoSelecionado] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    tipo: null,
    status: null,
    dataInicio: new Date("2024-01-01"),
    dataFim: new Date(),
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
    console.log(dadosFiltradosTemporarios);
    setDadosFiltrados([...dadosFiltradosTemporarios]); // Garante que o React detecte a mudança
    setBotaoSelecionado(estado);
    setFilters({
      tipo: null,
      status: null,
      dataInicio: new Date("2024-01-01"),
      dataFim: new Date("2030-04-01"),
    });
  };
  const mostrarTodos = () => {
    setDadosFiltrados(dadosfinanceiros);
    setBotaoSelecionado("todos");
    setFilters({
      tipo: null,
      status: null,
      dataInicio: new Date("2024-01-01"),
      dataFim: new Date(),
    });
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

    pdfMake
      .createPdf(docDefinition)
      .download(
        `relatorio_financeiro ${filtro.dataInicio.toLocaleDateString()} - ${filtro.dataFim.toLocaleDateString()}.pdf`,
      );

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
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      `relatorio_financeiro ${filtro.dataInicio.toLocaleDateString()} - ${filtro.dataFim.toLocaleDateString()}.xlsx`,
    );
    XLSX.writeFile(workbook, "relatorio_financeiro.xlsx");
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
        onClose={() => setIsDialogOpen(false)}
        financeiroId="0"
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
