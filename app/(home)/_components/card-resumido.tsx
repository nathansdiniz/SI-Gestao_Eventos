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
    <Card className="flew-row justify-items-center gap-4">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div className="flex flex-row items-center gap-2">
          {icon}
          <p
            className={`${
              size === "small"
                ? "text-muted-foreground"
                : "text-white opacity-70"
            }`}
          >
            {title}
          </p>
        </div>
        {size === "large" ? <BotaoAdicionarFinancas /> : null}
      </CardHeader>
      <CardContent className="flex justify-between">
        <p
          className={`font-bold ${size === "small" ? "text-base" : "text-xl"}`}
        >
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(amount)}
        </p>

        {size === "large" ? (
          <>
            <p className={`text-sm" font-bold`}>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(amount)}
            </p>
            <p className={`text-sm" font-bold`}>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(amount)}
            </p>
            <p className={`text-sm" font-bold`}>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(amount)}
            </p>
          </>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default CardResumido;
