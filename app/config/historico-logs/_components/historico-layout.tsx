"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { CalendarIcon, SearchIcon } from "lucide-react";
import { Label } from "@/app/_components/ui/label";

const HistoricoLogsPage: React.FC = () => {
  const [logs, setLogs] = useState([
    {
      id: 1,
      usuario: "admin",
      acao: "Login no sistema",
      data: "2025-01-20 08:30:00",
      status: "Sucesso",
    },
    {
      id: 2,
      usuario: "johndoe",
      acao: "Criação de novo relatório",
      data: "2025-01-19 14:15:00",
      status: "Sucesso",
    },
    {
      id: 3,
      usuario: "janedoe",
      acao: "Tentativa de login inválida",
      data: "2025-01-19 13:45:00",
      status: "Falha",
    },
    // Adicione mais logs para exemplo
  ]);

  const [filter, setFilter] = useState({
    startDate: "",
    endDate: "",
    usuario: "",
  });

  const handleSearch = () => {
    // Lógica para filtrar os logs
    console.log("Filtrando logs com os critérios:", filter);
  };

  return (
    <main>
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>
        Histórico de Logs
      </h1>
      <div className="space-y-6 p-6">
        {/* Filtros */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div>
            <Label htmlFor="startDate">Data Inicial</Label>
            <div className="flex items-center space-x-2">
              <Input
                type="date"
                id="startDate"
                value={filter.startDate}
                onChange={(e: { target: { value: any } }) =>
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
                onChange={(e: { target: { value: any } }) =>
                  setFilter({ ...filter, endDate: e.target.value })
                }
              />
              <CalendarIcon size={20} />
            </div>
          </div>
          <div>
            <Label htmlFor="usuario">Usuário</Label>
            <Input
              type="text"
              id="usuario"
              placeholder="Buscar por usuário"
              value={filter.usuario}
              onChange={(e: { target: { value: any } }) =>
                setFilter({ ...filter, usuario: e.target.value })
              }
            />
          </div>
          <div className="flex items-end">
            <Button onClick={handleSearch}>
              <SearchIcon size={20} className="mr-2" />
              Filtrar
            </Button>
          </div>
        </div>

        {/* Tabela de Logs */}
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Usuário</TableHead>
                <TableHead>Ação</TableHead>
                <TableHead>Data e Hora</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{log.id}</TableCell>
                  <TableCell>{log.usuario}</TableCell>
                  <TableCell>{log.acao}</TableCell>
                  <TableCell>{log.data}</TableCell>
                  <TableCell>{log.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  );
};

export default HistoricoLogsPage;
