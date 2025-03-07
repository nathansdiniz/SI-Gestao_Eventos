"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Badge } from "@/app/_components/ui/badge";
import Link from "next/link";
import { Button } from "@/app/_components/ui/button";
import { ClockIcon, InfoIcon } from "lucide-react";
import Layout from "@/app/_components/slide-bar";
import BotaoVoltar from "@/app/_components/botao-voltar";
import { Input } from "@/app/_components/ui/input";
import { dadosAgenda } from "@/app/_actions/agenda";
import { Agenda } from "../layout-agenda";

const EventosPage: React.FC = () => {
  const [eventos, setEventos] = useState<Agenda[]>([]);
  const [eventosFiltrados, setEventosFiltrados] = useState<Agenda[]>([]);
  const [dataInicio, setDataInicio] = useState<string>("");
  const [dataFim, setDataFim] = useState<string>("");
  const [busca, setBusca] = useState<string>("");

  useEffect(() => {
    const loadEventos = async () => {
      const eventosData = await dadosAgenda();
      const eventosFormatados = eventosData.map((evento) => ({
        ...evento,
        datahora_inicial: evento.datahora_inicial?.toISOString() ?? "",
        datahora_final: evento.datahora_final?.toISOString() ?? "",
        data_criacao: evento.data_criacao?.toISOString() ?? "",
        data_atualizacao: evento.data_atualizacao?.toISOString() ?? "",
      }));

      // Filter out past events here
      const hoje = new Date();
      const eventosFuturos = eventosFormatados.filter((evento) => {
        if (!evento.datahora_final) return false;
        const eventStartDate = new Date(evento.datahora_inicial);
        const eventEndDate = new Date(evento.datahora_final);
        return eventEndDate >= hoje || eventStartDate >= hoje; // Only keep events ending today or later
      });

      setEventos(eventosFuturos); // Update the state with the filtered events
    };

    loadEventos();
  }, []);

  useEffect(() => {
    // Filtering by search, dataInicio, and dataFim
    let eventosFiltradosTemp = [...eventos];

    if (busca) {
      eventosFiltradosTemp = eventosFiltradosTemp.filter(
        (evento) =>
          evento.titulo_agenda?.toLowerCase().includes(busca.toLowerCase()) ||
          evento.responsavel_agenda
            ?.toLowerCase()
            .includes(busca.toLowerCase()),
      );
    }

    if (dataInicio) {
      eventosFiltradosTemp = eventosFiltradosTemp.filter(
        (evento) =>
          evento.datahora_inicial &&
          new Date(evento.datahora_inicial) >= new Date(dataInicio),
      );
    }

    if (dataFim) {
      eventosFiltradosTemp = eventosFiltradosTemp.filter(
        (evento) =>
          evento.datahora_final &&
          new Date(evento.datahora_final) <= new Date(dataFim),
      );
    }
    setEventosFiltrados(eventosFiltradosTemp);
  }, [busca, dataInicio, dataFim, eventos]); //dependencias alteradas

  const getStatusColor = (status: string | null) => {
    const statusM = status ?? "Pendente";
    switch (statusM[0].toUpperCase() + statusM.slice(1)) {
      case "Confirmado":
        return "#007300";
      case "Cancelado":
        return "#af080d";
      case "Pendente":
        return "#e6e600";
      default:
        return "gray";
    }
  };

  const handleDataInicioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDataInicio(event.target.value);
  };

  const handleDataFimChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDataFim(event.target.value);
  };

  const handleBuscaChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBusca(event.target.value);
  };

  return (
    <Layout>
      <main className="space-y-6 p-6">
        <BotaoVoltar redirecionar="/menu" />
        <h1 className="text-center text-2xl font-bold">
          Próximos Compromissos
        </h1>
        {/* Proximos Eventos */}
        <section>
          <h2 className="text-xl font-semibold">Próximos Compromissos</h2>
          <div className="flex gap-4">
            <Input
              type="text"
              placeholder="Buscar por nome do evento ou cliente"
              value={busca}
              onChange={handleBuscaChange}
            />
            <Input
              type="date"
              value={dataInicio}
              onChange={handleDataInicioChange}
            />
            <Input type="date" value={dataFim} onChange={handleDataFimChange} />
          </div>
          {eventosFiltrados.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {eventosFiltrados.map((evento) => (
                <Card key={evento.idAgendaGeral} className="bg-black">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {evento.titulo_agenda ?? "Evento sem nome"}
                      <Badge
                        style={{
                          backgroundColor: getStatusColor(
                            evento.status_compromisso,
                          ),
                        }}
                      >
                        {evento.status_compromisso ?? "Sem Status"}
                      </Badge>
                    </CardTitle>
                    {evento.datahora_inicial && (
                      <CardDescription className="flex items-center gap-1">
                        <ClockIcon size={16} />
                        {new Date(evento.datahora_inicial).toLocaleString()}-
                        {new Date(evento.datahora_final ?? "").toLocaleString()}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    {evento.localizacao && <p>Local: {evento.localizacao}</p>}
                    {evento.responsavel_agenda && (
                      <p>Responsável: {evento.responsavel_agenda}</p>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Link href={`/agenda/${evento.idAgendaGeral}`}>
                      <Button className="w-full gap-2" disabled>
                        <InfoIcon size={16} />
                        Detalhes
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <p>Nenhum Compromisso encontrado.</p>
          )}
        </section>
      </main>
    </Layout>
  );
};
export default EventosPage;
