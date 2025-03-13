"use client";

import { ptBR } from "date-fns/locale";
import { useState, useEffect } from "react";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { Calendar } from "@/app/_components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/app/_lib/utils";

export interface FilterState {
  search: string;
  tipoCadastro: string | null;
  dataCadastroInicio: Date | null;
  dataCadastroFim: Date | null;
}

interface ClientesFiltrosProps {
  onFilterChange: (filters: FilterState) => void;
}

const ClientesFiltros = ({ onFilterChange }: ClientesFiltrosProps) => {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    tipoCadastro: null,
    dataCadastroInicio: null,
    dataCadastroFim: null,
  });

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: event.target.value });
  };

  const handleTipoCadastroChange = (value: string | null) => {
    setFilters({ ...filters, tipoCadastro: value });
  };

  const handleDataCadastroChange = (
    type: "inicio" | "fim",
    date: Date | undefined,
  ) => {
    setFilters((prev) => ({
      ...prev,
      [`dataCadastro${type === "inicio" ? "Inicio" : "Fim"}`]: date || null,
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      tipoCadastro: null,
      dataCadastroInicio: null,
      dataCadastroFim: null,
    });
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      {/* Search Bar */}
      <Input
        type="search"
        placeholder="Pesquisar por nome..."
        className="w-full md:w-80"
        value={filters.search}
        onChange={handleSearchChange}
      />

      {/* Tipo de Cadastro */}
      <Select
        onValueChange={handleTipoCadastroChange}
        value={filters.tipoCadastro ?? undefined}
      >
        <SelectTrigger>
          <SelectValue placeholder="Tipo de Cadastro" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Pessoa Física">Pessoa Física</SelectItem>
          <SelectItem value="Pessoa Jurídica">Pessoa Jurídica</SelectItem>
        </SelectContent>
      </Select>

      {/* Date Range */}
      <div className="flex items-center gap-2 md:gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "justify-start text-left font-normal",
                !filters.dataCadastroInicio && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filters.dataCadastroInicio ? (
                format(filters.dataCadastroInicio, "dd/MM/yyyy")
              ) : (
                <span>Data Inicial</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              locale={ptBR}
              selected={filters.dataCadastroInicio ?? undefined}
              onSelect={(date) => handleDataCadastroChange("inicio", date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "justify-start text-left font-normal",
                !filters.dataCadastroFim && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filters.dataCadastroFim ? (
                format(filters.dataCadastroFim, "dd/MM/yyyy")
              ) : (
                <span>Data Final</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              locale={ptBR}
              selected={filters.dataCadastroFim ?? undefined}
              onSelect={(date) => handleDataCadastroChange("fim", date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <Button variant="secondary" onClick={clearFilters}>
        Limpar Filtros
      </Button>
    </div>
  );
};

export default ClientesFiltros;
