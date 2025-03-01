"use client";
import { useState, useEffect } from "react";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { CalendarIcon, DownloadIcon } from "lucide-react";
import { Label } from "@/app/_components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import {
  FinanceiroPropos,
  FornecedorPropos,
  ClientePropos,
  EventoPropos,
} from "@/app/_props";

import { toast } from "sonner";
import * as XLSX from "xlsx";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { financeiroColumns } from "../utils/financeiroColums";
import { ColumnDef } from "@tanstack/react-table";
import { eventosColumns } from "../utils/eventosColumns";
import { clientesColumns } from "../utils/clientesColumns";
import { fornecedoresColumns } from "../utils/fornecedoresColumns";
import {
  obterFinanceiroEventos,
  obterEventos,
  obterClientes,
  obterFornecedores,
} from "../_data";

// Configuração do pdfmake
pdfMake.vfs = pdfFonts.vfs;

type ReportData =
  | FinanceiroPropos[]
  | FornecedorPropos[]
  | ClientePropos[]
  | EventoPropos[];

type ReportRow =
  | FinanceiroPropos
  | FornecedorPropos
  | ClientePropos
  | EventoPropos;

const EmitirRelatoriosPage: React.FC = () => {
  const [filter, setFilter] = useState({
    startDate: "",
    endDate: "",
    reportType: "",
    customColumns: [] as string[],
  });
  const [data, setData] = useState<ReportData>([]);
  const [columns, setColumns] = useState<ColumnDef<any>[]>([]);

  useEffect(() => {
    fetchData();
  }, [filter.reportType]);

  const fetchData = async () => {
    let response: any[] = [];
    switch (filter.reportType) {
      case "financeiro":
        response = await obterFinanceiroEventos();
        setColumns(financeiroColumns);
        break;
      case "eventos":
        response = await obterEventos();
        setColumns(eventosColumns);
        break;
      case "clientes":
        response = await obterClientes();
        setColumns(clientesColumns);
        break;
      case "fornecedores":
        response = await obterFornecedores();
        setColumns(fornecedoresColumns);
        break;
      default:
        setColumns([]);
        setData([]);
        break;
    }

    setData(response);
  };

  const handleGenerateReport = async () => {
    fetchData();
  };

  const handleExportPDF = () => {
    if (filter.reportType === "financeiro") {
      exportToPDF(data as FinanceiroPropos[]);
    } else if (filter.reportType === "eventos") {
      exportToPDFEventos(data as EventoPropos[]);
    } else if (filter.reportType === "clientes") {
      exportToPDFClientes(data as ClientePropos[]);
    } else if (filter.reportType === "fornecedores") {
      exportToPDFFornecedores(data as FornecedorPropos[]);
    }
  };

  const handleExportExcel = () => {
    if (filter.reportType === "financeiro") {
      exportToExcel(data as FinanceiroPropos[]);
    } else if (filter.reportType === "eventos") {
      exportToExcelEventos(data as EventoPropos[]);
    } else if (filter.reportType === "clientes") {
      exportToExcelClientes(data as ClientePropos[]);
    } else if (filter.reportType === "fornecedores") {
      exportToExcelFornecedores(data as FornecedorPropos[]);
    }
  };

  const exportToPDF = (data: FinanceiroPropos[]) => {
    // Lógica para exportar o relatório gerado como PDF
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
              ...data.map((item) => [
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
          layout: "lightHorizontalLines",
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
          fillColor: "#eeeeee",
        },
        tableBody: {
          fontSize: 8,
        },
      },
    };
    pdfMake.createPdf(docDefinition).download(`relatorio.pdf`);

    toast("Baixando Relátorio!", {
      style: {
        background: "#007300",
        textDecorationColor: "#f1f4ff",
      },
    });
  };

  const exportToExcel = (data: FinanceiroPropos[]) => {
    const worksheet = XLSX.utils.json_to_sheet(
      data.map((item) => ({
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
    XLSX.utils.book_append_sheet(workbook, worksheet, `dados`);
    XLSX.writeFile(workbook, `relatorio.xlsx`);
    toast("Baixando Relátorio Excel.", {
      style: {
        background: "#007300",
        textDecorationColor: "#f1f4ff",
      },
    });
  };
  const exportToPDFEventos = (data: EventoPropos[]) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `dados`);
    XLSX.writeFile(workbook, `relatorioEventos.xlsx`);
  };

  const exportToExcelEventos = (data: EventoPropos[]) => {
    const docDefinition = {
      content: [{ text: "Relatório de Eventos" }],
    };
    console.log(data);
    pdfMake.createPdf(docDefinition).download(`relatorioEventos.pdf`);
  };

  const exportToPDFClientes = (data: ClientePropos[]) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `dados`);
    XLSX.writeFile(workbook, `relatorioClientes.xlsx`);
  };
  const exportToExcelClientes = (data: ClientePropos[]) => {
    const docDefinition = {
      content: [{ text: "Relatório de Clientes" }],
    };
    console.log(data);
    pdfMake.createPdf(docDefinition).download(`relatorioClientes.pdf`);
  };
  const exportToPDFFornecedores = (data: FornecedorPropos[]) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `dados`);
    XLSX.writeFile(workbook, `relatorioFornecedores.xlsx`);
  };
  const exportToExcelFornecedores = (data: FornecedorPropos[]) => {
    const docDefinition = {
      content: [{ text: "Relatório de Fornecedores" }],
    };
    console.log(data);
    pdfMake.createPdf(docDefinition).download(`relatorioFornecedores.pdf`);
  };

  return (
    <>
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>
        Emitir Relatórios
      </h1>
      <div className="space-y-6 p-6">
        {/* Filtros */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <Label htmlFor="startDate">Data Inicial</Label>
            <div className="flex items-center space-x-2">
              <Input
                type="date"
                id="startDate"
                value={filter.startDate}
                onChange={(e) =>
                  setFilter({ ...filter, startDate: e.target.value })
                }
              />
              <CalendarIcon size={20} />
            </div>
          </div>
          <div>
            <Label htmlFor="endDate">Data Final</Label>
            <div className="flex items-center space-x-2">
              <Input
                type="date"
                id="endDate"
                value={filter.endDate}
                onChange={(e) =>
                  setFilter({ ...filter, endDate: e.target.value })
                }
              />
              <CalendarIcon size={20} />
            </div>
          </div>
          <div>
            <Label htmlFor="reportType">Tipo de Relatório</Label>
            <Select
              onValueChange={(value) =>
                setFilter({ ...filter, reportType: value })
              }
              value={filter.reportType}
            >
              <SelectTrigger id="reportType">
                <SelectValue placeholder="Selecione um tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="financeiro">Relatório Financeiro</SelectItem>
                <SelectItem value="eventos">Relatório de Eventos</SelectItem>
                <SelectItem value="clientes">Relatório de Clientes</SelectItem>
                <SelectItem value="fornecedores">
                  Relatório de Fornecedores
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Botão de Gerar Relatório */}
        <div className="flex justify-end">
          <Button onClick={handleGenerateReport}>Gerar Relatório</Button>
        </div>

        {/* Tabela de Resultados */}
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column, index) => (
                  <TableHead key={index}>
                    {typeof column.header === "string" ? column.header : ""}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column: any, cellIndex) => (
                    <TableCell key={cellIndex}>
                      {column.cell
                        ? column.cell({ row: { original: row as ReportRow } })
                        : (row as ReportRow)[
                            column.accessorKey as keyof ReportRow
                          ]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Botões de Exportação */}
        <div className="flex justify-end space-x-4">
          <Button onClick={handleExportPDF} variant="secondary">
            <DownloadIcon className="mr-2" size={16} />
            Exportar PDF
          </Button>
          <Button onClick={handleExportExcel}>
            <DownloadIcon className="mr-2" size={16} />
            Exportar Excel
          </Button>
        </div>
      </div>
    </>
  );
};

export default EmitirRelatoriosPage;
