"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/button";

interface FilterDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onFilter: (filters: { month: number; year: number }) => void;
}

const FilterDialog: React.FC<FilterDialogProps> = ({
  isOpen,
  onClose,
  onFilter,
}) => {
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedYear && selectedMonth) {
      onFilter({ year: Number(selectedYear), month: Number(selectedMonth) });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">
            Filtrar por Mês e Ano
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="p-7">
          <label>Ano:</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            required
            className="mb-3 w-full rounded-md border bg-black p-3 text-white"
          >
            <option value="" disabled>
              Selecione o ano
            </option>
            {Array.from({ length: 10 }, (_, i) => {
              const year = new Date().getFullYear() - i;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>

          <label>Mês:</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            required
            className="mb-3 w-full rounded-md border bg-black p-3 text-white"
          >
            <option value="" disabled>
              Selecione o mês
            </option>
            {[
              "Janeiro",
              "Fevereiro",
              "Março",
              "Abril",
              "Maio",
              "Junho",
              "Julho",
              "Agosto",
              "Setembro",
              "Outubro",
              "Novembro",
              "Dezembro",
            ].map((month, index) => (
              <option key={index} value={index + 1}>
                {month}
              </option>
            ))}
          </select>

          <div className="flex justify-between">
            <Button type="submit" className="bg-green-500">
              Filtrar
            </Button>
            <DialogClose asChild>
              <Button type="button" className="bg-red-700">
                Cancelar
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FilterDialog;
