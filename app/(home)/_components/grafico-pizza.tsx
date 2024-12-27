"use client";

import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { Pie, PieChart } from "recharts";

import { Card, CardContent } from "@/app/_components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import { TransactionType } from "@prisma/client";
import { TransacaoPorcentagemPorTipo } from "@/app/_data/obter-dados-dashboard/types";
import PorcentagemItem from "./item-porcentagem";

const chartConfig = {
  [TransactionType.INVESTMENT]: {
    label: "Investido",
    color: "#FFFFFF",
  },
  [TransactionType.DEPOSIT]: {
    label: "Receita",
    color: "#55B02E",
  },
  [TransactionType.EXPENSE]: {
    label: "Despesas",
    color: "#E93030",
  },
} satisfies ChartConfig;

interface CardResumo {
  tiposPorcentagem: TransacaoPorcentagemPorTipo;
  investidoTotal: number;
  depositoTotal: number;
  saldo: number;
  gastosTotal: number;
}

const GraficoPizza = ({
  investidoTotal,
  depositoTotal,
  gastosTotal,
  tiposPorcentagem,
}: CardResumo) => {
  const chartData = [
    {
      type: TransactionType.DEPOSIT,
      amount: depositoTotal,
      fill: "#55B02E",
    },
    {
      type: TransactionType.EXPENSE,
      amount: gastosTotal,
      fill: "#E93030",
    },
    {
      type: TransactionType.INVESTMENT,
      amount: investidoTotal,
      fill: "#FFFFFF",
    },
  ];
  return (
    <Card className="flex flex-col">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
        <div className="space-y-3">
          <PorcentagemItem
            icon={<TrendingUpIcon size={16} className="text-green-500" />}
            title="Entrdas"
            value={tiposPorcentagem[TransactionType.DEPOSIT]}
          />
          <PorcentagemItem
            icon={<TrendingDownIcon size={16} className="text-red-500" />}
            title="Saídas"
            value={tiposPorcentagem[TransactionType.EXPENSE]}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default GraficoPizza;
