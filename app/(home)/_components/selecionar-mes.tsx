"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/app/_components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { useRouter, useSearchParams } from "next/navigation";
const MONTH_OPTIONS = [
  { value: "01", label: "Janeiro" },
  { value: "02", label: "Fevereiro" },
  { value: "03", label: "Marco" },
  { value: "04", label: "Abril" },
  { value: "05", label: "Maio" },
  { value: "06", label: "Junho" },
  { value: "07", label: "Jullho" },
  { value: "08", label: "Agosto" },
  { value: "09", label: "Setembro" },
  { value: "10", label: "Outubro" },
  { value: "11", label: "Novembro" },
  { value: "12", label: "Dezembro" },
];

const SelecionarMes = () => {
  const { push } = useRouter();
  const filtrarMesDados = (mes: string) => {
    push(`?mes=${mes}`);
  };
  const searchParams = useSearchParams();
  const mesAtual = searchParams.get("mes");
  console.log(mesAtual);
  return (
    <Select
      onValueChange={(valor) => filtrarMesDados(valor)}
      defaultValue={mesAtual ?? ""}
    >
      <SelectTrigger className="w-80">
        <SelectValue placeholder="Mês" />
      </SelectTrigger>
      <SelectContent>
        {MONTH_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelecionarMes;
