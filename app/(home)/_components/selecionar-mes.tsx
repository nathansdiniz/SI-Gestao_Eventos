"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/app/_components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { useRouter, useSearchParams } from "next/navigation";

const CURRENT_YEAR = new Date().getFullYear() - 1;
const YEARS = Array.from({ length: 10 }, (_, i) => CURRENT_YEAR + i);
const MONTH_OPTIONS = [
  { value: "01", label: "Janeiro" },
  { value: "02", label: "Fevereiro" },
  { value: "03", label: "Março" },
  { value: "04", label: "Abril" },
  { value: "05", label: "Maio" },
  { value: "06", label: "Junho" },
  { value: "07", label: "Julho" },
  { value: "08", label: "Agosto" },
  { value: "09", label: "Setembro" },
  { value: "10", label: "Outubro" },
  { value: "11", label: "Novembro" },
  { value: "12", label: "Dezembro" },
];

const SelecionarMes = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const mesAtual = searchParams.get("mes");
  const empresaAtual = searchParams.get("src");

  const filtrarMesDados = (valor: string) => {
    push(`?mes=${valor}&src=${empresaAtual}`);
  };

  return (
    <Select
      onValueChange={(valor) => filtrarMesDados(valor)}
      defaultValue={mesAtual ?? ""}
    >
      <SelectTrigger className="w-40 text-xs">
        <SelectValue placeholder="Selecione o Mês e Ano" />
      </SelectTrigger>
      <SelectContent>
        {YEARS.map((year) =>
          MONTH_OPTIONS.map((month) => (
            <SelectItem
              key={`${year}-${month.value}`}
              value={`${year}-${month.value}`}
            >
              {`${month.label} ${year}`}
            </SelectItem>
          )),
        )}
      </SelectContent>
    </Select>
  );
};

export default SelecionarMes;
