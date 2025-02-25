"use client";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { ReactNode } from "react";

interface CardResumidProps {
  icon: ReactNode;
  title1: string;
  title2: string;
  title3: string;
  title4: string;
  saldo1: number;
  saldo2: number;
  saldo3: number;
  saldo4: number;
  size?: "small" | "large";
}

const CardSaldos = ({
  icon,
  title1,
  title2,
  title3,
  title4,
  saldo1,
  saldo2,
  saldo3,
  saldo4,
  size = "small",
}: CardResumidProps) => {
  return (
    <Card>
      <CardHeader className="flew-row items-start gap-4">
        <p
          className={`${size === "small" ? "text-muted-foreground" : "text-white opacity-70"}`}
        >
          {icon}
          Saldos Atuais
        </p>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col items-center">
          <p
            className={`font-bold ${size === "small" ? "text-2xl" : "text-4xl"}`}
          >
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(saldo1)}
          </p>
          <p
            className={`${size === "small" ? "text-muted-foreground" : "text-white opacity-70"}`}
          >
            {title1}
          </p>
        </div>
        {size === "large" && (
          <>
            <div className="flex flex-col items-center">
              <p className="text-xl font-bold">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(saldo2)}
              </p>
              <p className="text-white opacity-70">{title2}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-xl font-bold">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(saldo3)}
              </p>
              <p className="text-white opacity-70">{title3}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-xl font-bold">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(saldo4)}
              </p>
              <p className="text-white opacity-70">{title4}</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CardSaldos;
