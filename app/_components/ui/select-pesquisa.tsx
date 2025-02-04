"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/app/_lib/utils";
import { Button } from "@/app/_components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/app/_components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import consultarEventos from "@/app/_actions/consultar-inputEventos";

export function SelecionarEvento() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [eventos, setEventos] = React.useState<
    { id: number; nomeEvento: string | null }[]
  >([]);

  React.useEffect(() => {
    async function fetchEventos() {
      try {
        const res = await consultarEventos();
        const data = res;
        console.log(res);
        setEventos(data);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      }
    }

    fetchEventos();
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? eventos.find((evento) => evento.id.toString() === value)
                ?.nomeEvento
            : "Selecione um evento..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Buscar evento..." />
          <CommandList>
            <CommandEmpty>Nenhum evento encontrado.</CommandEmpty>
            <CommandGroup>
              {eventos.map((evento) => (
                <CommandItem
                  key={evento.id}
                  value={evento.id.toString()}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === evento.id.toString()
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {evento.nomeEvento}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
