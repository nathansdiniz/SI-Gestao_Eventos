"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/button";
import { Checkbox } from "@/app/_components/ui/checkbox";
import { Label } from "@/app/_components/ui/label";
import { SheetIcon, FileTextIcon } from "lucide-react";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { FinanceiroPropos } from "@/app/_props";

// Configuração do pdfmake
pdfMake.vfs = pdfFonts.vfs;

// Mapeamento entre os nomes das colunas e os rótulos dos formulários
const columnLabelMap: { [key: string]: string } = {
  descricao: "Descrição",
  idevento: "Id Evento",
  valor: "Valor",
  juros: "Juros",
  multa: "Multa",
  desconto: "Desconto",
  tipocobranca: "Tipo de Cobrança",
  pago: "Status",
  mododepagamento: "Modo de Pagamento",
  datacompetencia: "Data de Vencimento",
  datapagamento: "Data de Pagamento",
  recorrencia: "Recorrente",
  periodo_final: "Data Final",
  idrecebidode: "Recebido de",
  informede: "Informe de",
  idconta: "Id Conta",
  idcategoria: "Categoria",
  idcentrodecusto: "Centro de Custo",
  data_criacao: "Data de Criação",
  data_update: "Data de Atualização",
  validacao: "Validação",
  informacoes_extras: "Informações Extras",
  ultima_alteracao_validacao: "Última Alteração de Validação",
  userID: "ID do Usuário",
  documentos_anexados: "Documentos Anexados",
};

interface ExportFinanceiroDialogProps {
  isOpen: boolean;
  onClose: () => void;
  data: FinanceiroPropos[];
  filters?: any;
}

const ExportFinanceiroDialog = ({
  isOpen,
  onClose,
  data,
}: ExportFinanceiroDialogProps) => {
  const allColumns = useMemo(() => {
    const firstItem = data[0];
    if (firstItem) {
      return Object.keys(firstItem).map((key) => ({
        value: key,
        label: columnLabelMap[key] || key,
      }));
    }
    return [];
  }, [data]);

  const [selectedColumns, setSelectedColumns] = useState<string[]>(
    allColumns.map((column) => column.value),
  );

  const handleColumnChange = (column: string) => {
    setSelectedColumns((prev) =>
      prev.includes(column)
        ? prev.filter((c) => c !== column)
        : [...prev, column],
    );
  };

  // Function to format the data
  const formatData = (data: FinanceiroPropos[], selectedColumns: string[]) => {
    return data.map((item) => {
      const formattedItem: any = {};
      selectedColumns.forEach((column) => {
        formattedItem[columnLabelMap[column] || column] =
          item[column as keyof FinanceiroPropos] || "";

        if (
          column === "datacompetencia" ||
          column === "datapagamento" ||
          column === "data_criacao"
        ) {
          formattedItem[columnLabelMap[column] || column] = item[
            column as keyof FinanceiroPropos
          ]
            ? new Date(
                item[column as keyof FinanceiroPropos] as Date,
              ).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
            : "";
        }
        if (
          column === "valor" ||
          column === "juros" ||
          column === "multa" ||
          column === "desconto"
        ) {
          formattedItem[columnLabelMap[column] || column] =
            new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(Number(item[column as keyof FinanceiroPropos]));
        }
      });
      return formattedItem;
    });
  };

  const handleExportToPDF = () => {
    const formattedData = formatData(data, selectedColumns);
    const dataEmissao = new Date();
    const dataFormatada = dataEmissao.toLocaleDateString("pt-BR");
    const horaFormatada = dataEmissao.toLocaleTimeString("pt-BR");
    // 📌 Calculando o total
    const total = data.reduce((acc, item) => {
      const valor = Number(item.valor) || 0;
      return item.tipocobranca === "Receita" ? acc + valor : acc - valor;
    }, 0);

    const docDefinition = {
      content: [
        { text: "Relatório Financeiro", style: "header" },
        {
          table: {
            headerRows: 1,
            widths: selectedColumns.map(() => "auto"),
            body: [
              selectedColumns.map((column) => ({
                text: columnLabelMap[column] || column,
                style: "tableHeader",
              })),
              ...formattedData.map((item) =>
                selectedColumns.map((column) => ({
                  text: item[columnLabelMap[column] || column],
                  style: "tableBody",
                })),
              ),
            ],
          },
          layout: "lightHorizontalLines",
        },
        { text: "\n" },
        {
          text: `Total: ${new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(total)}`,
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
          fillColor: "#eeeeee",
        },
        tableBody: {
          fontSize: 8,
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

    pdfMake.createPdf(docDefinition).download(`relatorio_financeiro.pdf`);
    onClose();
    toast("Baixando Relátorio PDF!", {
      description: (
        <div className="flex items-center">
          <FileTextIcon className="mr-2 text-white" />
          <span>{`relatorio_financeiro emitido em ${new Date().toLocaleString()}`}</span>
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

  const handleExportToExcel = () => {
    const formattedData = formatData(data, selectedColumns);
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "dados");
    XLSX.writeFile(workbook, `relatorio_financeiro.xlsx`);
    onClose();
    toast("Baixando Relátorio Excel.", {
      description: (
        <div className="flex items-center">
          <SheetIcon className="mr-2 text-white" />
          <span>{`relatorio_financeiro emitido em ${new Date().toLocaleString()}`}</span>
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Exportar Dados Financeiros</DialogTitle>
          <DialogDescription>
            Selecione as colunas e o formato desejado para exportar os dados.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <h4 className="text-sm font-medium">Selecionar Colunas:</h4>
          <div className="grid grid-cols-2 gap-2">
            {allColumns.map((column) => (
              <div key={column.value} className="flex items-center space-x-2">
                <Checkbox
                  id={column.value}
                  checked={selectedColumns.includes(column.value)}
                  onCheckedChange={() => handleColumnChange(column.value)}
                />
                <Label htmlFor={column.value} className="text-sm">
                  {column.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter className="space-x-2">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="button" variant="outline" onClick={handleExportToPDF}>
            <FileTextIcon className="mr-2 h-4 w-4" />
            PDF
          </Button>
          <Button type="button" variant="default" onClick={handleExportToExcel}>
            <SheetIcon className="mr-2 h-4 w-4" />
            Excel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExportFinanceiroDialog;
