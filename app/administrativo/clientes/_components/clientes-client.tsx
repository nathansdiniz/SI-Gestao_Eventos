"use client";

import { useState, useMemo } from "react";
import { DataTable } from "@/app/_components/ui/data-table";
import { ClientesColumns } from "../_columns";
import ClientesFiltros, { FilterState } from "./clientes-filtros"; // Import FilterState
import { Cliente } from "../page"; // Import types from Server Component

interface ClientesClientProps {
  allClientes: Cliente[];
}

const ClientesClient = ({ allClientes }: ClientesClientProps) => {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    tipoCadastro: null,
    dataCadastroInicio: null,
    dataCadastroFim: null,
  });

  const filteredClientes = useMemo(() => {
    let filteredClientes = [...allClientes];
    if (filters.search) {
      filteredClientes = filteredClientes.filter((cliente) =>
        cliente.cliente.toLowerCase().includes(filters.search.toLowerCase()),
      );
    }
    if (filters.tipoCadastro) {
      filteredClientes = filteredClientes.filter(
        (cliente) => cliente.tipoCadastro === filters.tipoCadastro,
      );
    }
    if (filters.dataCadastroInicio) {
      filteredClientes = filteredClientes.filter(
        (cliente) => cliente.dataCadastro >= filters.dataCadastroInicio!,
      );
    }

    if (filters.dataCadastroFim) {
      filteredClientes = filteredClientes.filter(
        (cliente) => cliente.dataCadastro <= filters.dataCadastroFim!,
      );
    }
    return filteredClientes;
  }, [allClientes, filters]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Clientes</h1>
      </div>
      <ClientesFiltros onFilterChange={handleFilterChange} />{" "}
      {/* Pass filters to ClientesFiltros component*/}
      <DataTable columns={ClientesColumns} data={filteredClientes} />
    </>
  );
};

export default ClientesClient;
