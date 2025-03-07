"use client";

import React, { useState, useEffect, ChangeEvent } from "react";

import { fetchEventos } from "@/app/_actions/eventos";
import { Evento } from "@/app/_types/eventos"; // Assuming you have an Evento type defined
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

const EventosPage: React.FC = () => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [eventosFiltrados, setEventosFiltrados] = useState<Evento[]>([]);
  const [dataInicio, setDataInicio] = useState<string>("");
  const [dataFim, setDataFim] = useState<string>("");
  const [busca, setBusca] = useState<string>("");
  const [eventosCarregados, setEventosCarregados] = useState(false);

  useEffect(() => {
    const loadEventos = async () => {
      const eventosData = await fetchEventos();

      // Mapeia os eventos e converte `null` para `undefined`
      const eventosFormatados = eventosData.map((evento) => ({
        ...evento,
        horarioInicio: evento.horarioInicio ?? undefined, // Converte null para undefined
        horarioFim: evento.horarioFim ?? undefined, // Converte null para undefined
      }));

      // Atualiza o estado com os dados formatados
      setEventos(eventosFormatados);
    };
    if (!eventosCarregados) {
      loadEventos();
      setEventosCarregados(true);
      setDataInicio(new Date().toISOString().split("T")[0]);
    }
  }, [eventosCarregados]);

  useEffect(() => {
    // Filter events into "Proximos" and "Outros"
    const now = new Date();
    const eventosProximos = eventos
      .filter((evento) => {
        if (!evento.dataEvento) return false;
        const eventDate = new Date(evento.dataEvento);
        // Verifica se a data do evento é hoje ou no futuro
        return eventDate >= now;
      })
      .sort(
        (a, b) =>
          new Date(b.dataEvento || 0).getTime() -
          new Date(a.dataEvento || 0).getTime(),
      );

    setEventosFiltrados(eventosProximos);
  }, [eventos]);

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case "Confirmado":
        return "green";
      case "Cancelado":
        return "red";
      case "Pendente":
        return "yellow";
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

  useEffect(() => {
    let eventosFiltradosTemp = [...eventos];

    if (busca) {
      eventosFiltradosTemp = eventosFiltradosTemp.filter(
        (evento) =>
          evento.nomeEvento?.toLowerCase().includes(busca.toLowerCase()) ||
          evento.nomeCliente?.toLowerCase().includes(busca.toLowerCase()),
      );
    }

    if (dataInicio) {
      eventosFiltradosTemp = eventosFiltradosTemp.filter(
        (evento) =>
          evento.dataEvento &&
          new Date(evento.dataEvento) >= new Date(dataInicio),
      );
    }

    if (dataFim) {
      eventosFiltradosTemp = eventosFiltradosTemp.filter(
        (evento) =>
          evento.dataEvento && new Date(evento.dataEvento) <= new Date(dataFim),
      );
    }

    setEventosFiltrados(eventosFiltradosTemp);
  }, [busca, dataInicio, dataFim, eventos]);

  return (
    <Layout>
      <main className="space-y-6 p-6">
        <BotaoVoltar redirecionar="/menu" />
        <h1 className="text-center text-2xl font-bold">Próximos Eventos</h1>
        {/* Proximos Eventos */}
        <section>
          <h2 className="text-xl font-semibold">Próximos Eventos</h2>
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
                <Card key={evento.id} className="bg-black">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {evento.nomeEvento ?? "Evento sem nome"}
                      <Badge
                        style={{
                          backgroundColor: getStatusColor(evento.status),
                        }}
                      >
                        {evento.status ?? "Sem Status"}
                      </Badge>
                    </CardTitle>
                    {evento.dataEvento && (
                      <CardDescription className="flex items-center gap-1">
                        <ClockIcon size={16} />
                        {new Date(
                          evento.dataEvento,
                        ).toLocaleDateString()} - {evento.horaEvento}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    {evento.localEvento && <p>Local: {evento.localEvento}</p>}
                    {evento.nomeCliente && <p>Cliente: {evento.nomeCliente}</p>}
                  </CardContent>
                  <CardFooter>
                    <Link href={`/eventos/${evento.id}`}>
                      <Button className="w-full gap-2">
                        <InfoIcon size={16} />
                        Detalhes
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <p>Nenhum evento encontrado.</p>
          )}
        </section>

        {/* Outros Eventos */}
        {/* <section>
          <h2 className="text-xl font-semibold">Outros Eventos</h2>
          {outrosEventos.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {outrosEventos.map((evento) => (
                <Card key={evento.id} className="bg-black">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {evento.nomeEvento ?? "Evento sem nome"}
                      <Badge
                        style={{
                          backgroundColor: getStatusColor(evento.status),
                        }}
                      >
                        {evento.status ?? "Sem Status"}
                      </Badge>
                    </CardTitle>
                    {evento.dataEvento && (
                      <CardDescription className="flex items-center gap-1">
                        <ClockIcon size={16} />
                        {new Date(
                          evento.dataEvento,
                        ).toLocaleDateString()} - {evento.horaEvento}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    {evento.localEvento && <p>Local: {evento.localEvento}</p>}
                    {evento.nomeCliente && <p>Cliente: {evento.nomeCliente}</p>}
                  </CardContent>
                  <CardFooter>
                    <Link href={`/eventos/${evento.id}`}>
                      <Button className="w-full gap-2">
                        <InfoIcon size={16} />
                        Detalhes
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <p>Nenhum outro evento encontrado.</p>
          )}
        </section> */}
      </main>
    </Layout>
  );
};
export default EventosPage;
