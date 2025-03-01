"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { Button } from "@/app/_components/ui/button";
import { FilterIcon } from "lucide-react";
import { useState } from "react";
import { PopoverClose } from "@radix-ui/react-popover";
import { Input } from "@/app/_components/ui/input";

interface Pop_upFiltrosProps {
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  tipo: string | null;
  status: string | null;
  dataInicio: Date | null;
  dataFim: Date | null;
  descricao: string | null;
  informede: string | null;
  evento: string | null;
  pago: string | null;
  validacao: string | null;
  dataCompetencia: Date | null;
  valor: string | null;
}

const Pop_upFiltros = ({ onFilterChange }: Pop_upFiltrosProps) => {
  const [filters, setFilters] = useState<FilterState>({
    tipo: null,
    status: null,
    dataInicio: null,
    dataFim: null,
    descricao: null,
    informede: null,
    evento: null,
    pago: null,
    validacao: null,
    dataCompetencia: null,
    valor: null,
  });

  const handleFilterChange = (
    field: keyof FilterState,
    value: string | Date | null,
  ) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleAplicarFiltros = () => {
    onFilterChange(filters);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <FilterIcon size={24} />
          Filtros
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] space-y-4">
        <div>
          <h3 className="text-md font-bold">Filtros</h3>
        </div>
        <div className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Descrição"
            value={filters.descricao || ""}
            onChange={(e) => handleFilterChange("descricao", e.target.value)}
          />
          <Input
            type="text"
            placeholder="Cliente"
            value={filters.informede || ""}
            onChange={(e) => handleFilterChange("informede", e.target.value)}
          />
          <Input
            type="text"
            placeholder="Evento"
            value={filters.evento || ""}
            onChange={(e) => handleFilterChange("evento", e.target.value)}
          />
          <Input
            type="text"
            placeholder="Valor"
            value={filters.valor || ""}
            onChange={(e) => handleFilterChange("valor", e.target.value)}
          />
          <label htmlFor="tipo">Tipo:</label>
          <select
            id="tipo"
            className="w-full rounded-sm border bg-black p-1 text-white"
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
            className="w-full rounded-sm border bg-black p-1 text-white"
            value={filters.status || ""}
            onChange={(e) => handleFilterChange("status", e.target.value)}
          >
            <option value="">Todos</option>
            <option value="sim">Pago</option>
            <option value="nao">Pendente</option>
          </select>
          <Input
            type="text"
            placeholder="Pagamento"
            value={filters.pago || ""}
            onChange={(e) => handleFilterChange("pago", e.target.value)}
          />
          <Input
            type="text"
            placeholder="Validação"
            value={filters.validacao || ""}
            onChange={(e) => handleFilterChange("validacao", e.target.value)}
          />
          <label htmlFor="dataInicio">Data Início:</label>
          <Input
            type="date"
            id="dataInicio"
            className="w-full rounded border p-1 text-white"
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
          <Input
            type="date"
            id="dataFim"
            className="w-full rounded border p-1 text-white"
            value={
              filters.dataFim ? filters.dataFim.toISOString().split("T")[0] : ""
            }
            onChange={(e) =>
              handleFilterChange("dataFim", new Date(e.target.value))
            }
          />
        </div>
        <div className="flex justify-end space-x-2">
          <PopoverClose asChild>
            <Button variant="outline">Cancelar</Button>
          </PopoverClose>
          <Button onClick={handleAplicarFiltros}>Aplicar</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Pop_upFiltros;
