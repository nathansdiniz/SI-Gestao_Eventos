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

interface HistoricoLogsProps {
  idHistoricoLogs?: number; // Opcional para diferenciar criação/atualização
  descricao: string;
  status: string;
  acao_realizada: string;
  dados_acao: any;
  datahora_alteracao: string; // Alterado para string para facilitar manipulação
  HistoricoLogscol: string;
  userID?: string; // Será preenchido com o ID do usuário autenticado
}

interface HistoricoLogsPageProps {
  data: HistoricoLogsProps[];
}

const HistoricoLogsPage: React.FC<HistoricoLogsPageProps> = ({ data }) => {
  const [logs, setLogs] = useState(data);
  const [filter, setFilter] = useState({
    startDate: "",
    endDate: "",
    usuario: "",
  });

  const handleSearch = () => {
    const { startDate, endDate, usuario } = filter;

    const filteredLogs = data.filter((log) => {
      const logDate = new Date(log.datahora_alteracao);
      const isAfterStartDate = startDate
        ? logDate >= new Date(startDate)
        : true;
      const isBeforeEndDate = endDate ? logDate <= new Date(endDate) : true;
      const matchesUsuario = usuario
        ? log.userID?.toLowerCase().includes(usuario.toLowerCase())
        : true;

      return isAfterStartDate && isBeforeEndDate && matchesUsuario;
    });

    setLogs(filteredLogs);
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
            <Label htmlFor="usuario">Usuário</Label>
            <Input
              type="text"
              id="usuario"
              placeholder="Buscar por usuário"
              value={filter.usuario}
              onChange={(e) =>
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
                <TableHead>Descrição</TableHead>
                <TableHead>Ação</TableHead>
                <TableHead>Data e Hora</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Usuário</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.idHistoricoLogs}>
                  <TableCell>{log.idHistoricoLogs}</TableCell>
                  <TableCell>{log.descricao}</TableCell>
                  <TableCell>{log.acao_realizada}</TableCell>
                  <TableCell>
                    {new Date(log.datahora_alteracao).toLocaleString()}
                  </TableCell>
                  <TableCell>{log.status}</TableCell>
                  <TableCell>{log.userID}</TableCell>
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
