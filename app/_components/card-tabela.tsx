import { Button } from "@/app/_components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { TRANSACTION_PAYMENT_METHOD_ICONS } from "@/app/_constants/transactions";
import { formatarMoeda } from "@/app/_utils/moeda";
import Image from "next/image";
import Link from "next/link";
import { FinanceiroPropos } from "../_props";

interface UltimasTransacoesProps {
  ultimasTransacoes: FinanceiroPropos[];
  titulo: string;
  redirecionar: string;
}

const CardTabelaFinancas = ({
  ultimasTransacoes,
  titulo,
  redirecionar,
}: UltimasTransacoesProps) => {
  const obterCordoValor = ({ tipocobranca }: FinanceiroPropos) => {
    if (tipocobranca === "Despesa") {
      return "text-red-500";
    }
    if (tipocobranca === "Receita") {
      return "text-green-500";
    }
    return "text-white";
  };
  const obterPrefixoValor = ({ tipocobranca }: FinanceiroPropos) => {
    if (tipocobranca === "Receita") {
      return "+";
    }
    return "-";
  };

  return (
    <ScrollArea className="rounded-md border">
      <CardHeader className="space-y-8">
        <CardTitle className="text-center">{titulo}</CardTitle>
        <Button variant="outline" className="rounded-xl font-bold">
          <Link href={redirecionar}>Ver mais</Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-1">
        {ultimasTransacoes.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-white bg-opacity-[3%] p-5 text-white">
                <Image
                  src={`/${TRANSACTION_PAYMENT_METHOD_ICONS[transaction.mododepagamento as keyof typeof TRANSACTION_PAYMENT_METHOD_ICONS] ?? "bank-transfer.png"}`}
                  height={16}
                  width={16}
                  alt={transaction.mododepagamento ?? ""}
                />
              </div>
              <div>
                <p className="text-xs font-bold">{transaction.descricao}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(
                    transaction.datacompetencia ?? "",
                  ).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <p className={`text-xs font-bold ${obterCordoValor(transaction)}`}>
              {obterPrefixoValor(transaction)}
              {formatarMoeda(Number(transaction.valor))}
            </p>
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  );
};

export default CardTabelaFinancas;
