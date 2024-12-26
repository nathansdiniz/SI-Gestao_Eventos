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
  { value: "2023", label: "2023" },
  { value: "2024", label: "2024" },
  { value: "2025", label: "2025" },
];

interface mesProps {
  mes: string;
}

const SelecionarAno = ({ mes }: mesProps) => {
  const { push } = useRouter();
  const filtrarMesDados = (ano: string) => {
    push(`?mes${mes}&ano=${ano}`);
  };
  const searchParams = useSearchParams();
  const mesAtual = searchParams.get("ano");
  console.log(mesAtual);
  return (
    <Select
      onValueChange={(valor) => filtrarMesDados(valor)}
      defaultValue={mesAtual ?? ""}
    >
      <SelectTrigger className="w-80">
        <SelectValue placeholder="Ano" />
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

export default SelecionarAno;
