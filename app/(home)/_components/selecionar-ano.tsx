"use client";
import { getEmpresas } from "@/app/_actions/criar-atualizarEmpresas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/app/_components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SelecionarEmpresa = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const empresaAtual = searchParams.get("src");
  const mesAtual = searchParams.get("mes");

  const [empresas, setEmpresas] = useState<
    {
      id: number;
      empresa: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const res = await getEmpresas();
        setEmpresas(res);
      } catch (error) {
        console.error("Erro ao buscar empresas:", error);
      }
    };

    fetchEmpresas();
  }, []);

  const filtrarEmpresaDados = (valor: string) => {
    push(`?mes=${mesAtual}&src=${valor}`);
  };

  return (
    <Select
      onValueChange={(valor) => filtrarEmpresaDados(valor)}
      defaultValue={empresaAtual ?? ""}
    >
      <SelectTrigger className="w-40 text-xs">
        <SelectValue placeholder="Selecione a Empresa" />
      </SelectTrigger>
      <SelectContent>
        {empresas.map((empresa) => (
          <SelectItem key={empresa.id} value={empresa.id.toString()}>
            {empresa.empresa}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelecionarEmpresa;
