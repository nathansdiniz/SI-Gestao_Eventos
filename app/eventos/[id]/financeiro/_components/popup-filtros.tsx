"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { Button } from "@/app/_components/ui/button";
import { useState } from "react";
import { FilterIcon } from "lucide-react";

interface FilterProps {
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  tipo: string | null;
  status: string | null;
  dataInicio: Date;
  dataFim: Date;
}

const Pop_upFiltros = ({ onFilterChange }: FilterProps) => {
  const [filters, setFilters] = useState<FilterState>({
    tipo: null,
    status: null,
    dataInicio: new Date("2024-01-01"),
    dataFim: new Date(),
  });

  const handleFilterChange = (
    field: keyof FilterState,
    value: string | null | Date | null,
  ) => {
    setFilters({ ...filters, [field]: value });
  };

  const applyFilters = () => {
    onFilterChange(filters);
  };

  const clearFilters = () => {
    setFilters({
      tipo: null,
      status: null,
      dataInicio: new Date("2024-01-01"),
      dataFim: new Date(),
    });
    onFilterChange({
      tipo: null,
      status: null,
      dataInicio: new Date("2024-01-01"),
      dataFim: new Date(),
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="w-72" variant={"outline"}>
          <FilterIcon size={64}></FilterIcon>Filtros
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <label htmlFor="tipo">Tipo:</label>
          <select
            id="tipo"
            className="w-full rounded border p-1 text-black"
            value={filters.tipo || ""}
            onChange={(e) => handleFilterChange("tipo", e.target.value)}
          >
            <option value="">Todos</option>
            <option value="Receita">Entradas</option>
            <option value="Despesa">Saídas</option>
            <option value="null">Outros</option>
          </select>

          <label htmlFor="status">Status:</label>
          <select
            id="status"
            className="w-full rounded border p-1 text-black"
            value={filters.status || ""}
            onChange={(e) => handleFilterChange("status", e.target.value)}
          >
            <option value="">Todos</option>
            <option value="sim">Pago</option>
            <option value="nao">Pendente</option>
          </select>
          <label htmlFor="dataInicio">Data Início:</label>
          <input
            type="date"
            id="dataInicio"
            className="w-full rounded border p-1 text-black"
            value={
              filters.dataInicio
                ? filters.dataInicio.toISOString().split("T")[0]
                : ""
            }
            onChange={(e) =>
              handleFilterChange("dataInicio", new Date(e.target.value))
            }
          />
          <label htmlFor="dataFim">Data Fim:</label>
          <input
            type="date"
            id="dataFim"
            className="w-full rounded border p-1 text-black"
            value={
              filters.dataFim ? filters.dataFim.toISOString().split("T")[0] : ""
            }
            onChange={(e) =>
              handleFilterChange("dataFim", new Date(e.target.value))
            }
          />
          <div className="mt-4 flex justify-end">
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Limpar
            </Button>
            <Button size="sm" onClick={applyFilters}>
              Aplicar
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Pop_upFiltros;
