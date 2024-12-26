"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/app/_components/ui/sidebar";

interface FinanceiroSidebarProps {
  onApplyFilter: (mes: string, ano: string) => void;
}

export const FinanceiroSidebar: React.FC<FinanceiroSidebarProps> = ({
  onApplyFilter,
}) => {
  const [mes, setMes] = React.useState<string>("1");
  const [ano, setAno] = React.useState<string>(`${new Date().getFullYear()}`);

  const handleFilterChange = () => {
    onApplyFilter(mes, ano);
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Filtros</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <label className="font-medium">Mês:</label>
                <select
                  value={mes}
                  onChange={(e) => setMes(e.target.value)}
                  className="w-full rounded border px-2 py-1"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                    <option key={m} value={m}>
                      {new Date(0, m - 1).toLocaleString("pt-BR", {
                        month: "long",
                      })}
                    </option>
                  ))}
                </select>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <label className="font-medium">Ano:</label>
                <input
                  type="number"
                  value={ano}
                  onChange={(e) => setAno(e.target.value)}
                  className="w-full rounded border px-2 py-1"
                />
              </SidebarMenuItem>
              <SidebarMenuItem>
                <button
                  onClick={handleFilterChange}
                  className="mt-4 w-full rounded bg-blue-500 px-4 py-2 text-white"
                >
                  Aplicar Filtros
                </button>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
