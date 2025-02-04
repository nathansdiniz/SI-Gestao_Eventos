"use client";
import BotaoAdicionarFinancas from "@/app/_components/add-Financeiro";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { ReactNode } from "react";

interface CardResumidProps {
  icon: ReactNode;
  title: string;
  amount: number;
  size?: "small" | "large";
}

const CardResumido = ({
  icon,
  title,
  amount,
  size = "small",
}: CardResumidProps) => {
  return (
    <Card>
      <CardHeader className="flew-row items-start gap-4">
        {icon}
        <p
          className={`${size === "small" ? "text-muted-foreground" : "text-white opacity-70"}`}
        >
          {title}
        </p>
      </CardHeader>
      <CardContent className="flex justify-between">
        <p
          className={`font-bold ${size === "small" ? "text-2xl" : "text-4xl"}`}
        >
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(amount)}
        </p>

        {size === "large" && <BotaoAdicionarFinancas />}
      </CardContent>
    </Card>
  );
};

export default CardResumido;
