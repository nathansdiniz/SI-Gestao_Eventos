"use client";
import { useState } from "react";
import { Button } from "@/app/_components/ui/button";
import { DataTable } from "@/app/_components/ui/data-table";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ArrowDownCircleIcon, CircleArrowUpIcon } from "lucide-react";
import { financeiroColumns } from "../_colums";

interface FinanceiroProps {
  id: string;
  evento: string;
  datapagamento: string;
  datacompetencia: string;
  tipocobranca: string;
  idrecebidode: string;
  recebidode: string;
  informede: string;
  descricao: string;
  valor: string;
  juros: string;
  multa: string;
  desconto: string;
  pago: string;
  idconta: string | null;
  conta: string | null;
  idcategoria: string | number;
  categoria: string | null;
  idcentrodecusto: string | null;
  centrodecusto: string | null;
  mododepagamento: string;
  parcelas: null | {};
  idevento: string;
}

interface TabelaFinanceiraProps {
  dadosfinanceiros: FinanceiroProps[];
}

const TabelaFinanceira = ({ dadosfinanceiros }: TabelaFinanceiraProps) => {
  const [dadosFiltrados, setDadosFiltrados] =
    useState<FinanceiroProps[]>(dadosfinanceiros);
  const [botaoSelecionado, setBotaoSelecionado] = useState<string | null>(null);

  const filtrarReceitas = () => {
    const receitas = dadosfinanceiros.filter(
      (item) => item.tipocobranca === "Receita",
    );
    setDadosFiltrados(receitas);
    setBotaoSelecionado("receitas");
  };

  const filtrarDespesas = () => {
    const despesas = dadosfinanceiros.filter(
      (item) => item.tipocobranca !== "Receita",
    );
    setDadosFiltrados(despesas);
    setBotaoSelecionado("despesas");
  };

  const mostrarTodos = () => {
    setDadosFiltrados(dadosfinanceiros);
    setBotaoSelecionado("todos");
  };

  return (
    <>
      <div className="flex items-center justify-center space-x-10 p-6">
        <Button
          className={`h-32 w-96 rounded-sm text-2xl font-bold ${
            botaoSelecionado === "todos"
              ? "bg-blue-700 text-white"
              : "bg-gray-200"
          }`}
          onClick={mostrarTodos}
        >
          Todas as Movimentações
        </Button>
        <Button
          className={`h-32 w-96 rounded-sm text-2xl font-bold ${
            botaoSelecionado === "receitas"
              ? "bg-blue-700 text-white"
              : "bg-green-800 text-white"
          }`}
          onClick={filtrarReceitas}
        >
          <CircleArrowUpIcon color="#ffffff" size={64} />
          Entradas
        </Button>
        <Button
          className={`h-32 w-96 rounded-sm text-2xl font-bold ${
            botaoSelecionado === "despesas"
              ? "bg-blue-700 text-white"
              : "bg-red-800 text-white"
          }`}
          onClick={filtrarDespesas}
        >
          <ArrowDownCircleIcon color="#ffffff" size={96} />
          Saídas
        </Button>
      </div>
      <ScrollArea className="space-y-6">
        <DataTable
          key={"tabelaFinanceira"}
          columns={financeiroColumns} // Colunas
          data={dadosFiltrados} // Dados filtrados
        />
      </ScrollArea>
    </>
  );
};

export default TabelaFinanceira;
