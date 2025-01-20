"use client";
import React, { useState } from "react";
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

const EmitirRelatoriosPage: React.FC = () => {
  const [filter, setFilter] = useState({
    startDate: "",
    endDate: "",
    reportType: "",
  });

  const handleGenerateReport = () => {
    // Lógica para gerar relatório com base nos filtros
    console.log("Gerando relatório com filtros:", filter);
  };

  const handleExportPDF = () => {
    // Lógica para exportar o relatório gerado como PDF
    console.log("Exportando como PDF...");
  };

  const handleExportExcel = () => {
    // Lógica para exportar o relatório gerado como Excel
    console.log("Exportando como Excel...");
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
                <SelectItem value="vendas">Relatório de Vendas</SelectItem>
                <SelectItem value="estoque">Relatório de Estoque</SelectItem>
                <SelectItem value="financeiro">Relatório Financeiro</SelectItem>
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
                <TableHead>ID</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>Relatório Mensal</TableCell>
                <TableCell>01/2025</TableCell>
                <TableCell>Concluído</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2</TableCell>
                <TableCell>Relatório de Vendas</TableCell>
                <TableCell>12/2024</TableCell>
                <TableCell>Pendente</TableCell>
              </TableRow>
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
