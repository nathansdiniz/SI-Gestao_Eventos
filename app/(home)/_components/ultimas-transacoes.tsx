import { Button } from "@/app/_components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { TRANSACTION_PAYMENT_METHOD_ICONS } from "@/app/_constants/transactions";
import { formatarMoeda } from "@/app/_utils/moeda";
import { Transaction, TransactionType } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface UltimasTransacoesProps {
  ultimasTransacoes: Transaction[];
}

const UltimasTransacoes = ({ ultimasTransacoes }: UltimasTransacoesProps) => {
  const obterCordoValor = (transaction: Transaction) => {
    if (transaction.type === TransactionType.EXPENSE) {
      return "text-red-500";
    }
    if (transaction.type === TransactionType.DEPOSIT) {
      return "text-green-500";
    }
    return "text-white";
  };
  const obterPrefixoValor = (transaction: Transaction) => {
    if (transaction.type === TransactionType.DEPOSIT) {
      return "+";
    }
    return "-";
  };

  return (
    <ScrollArea className="rounded-md border">
      <CardHeader>
        <CardTitle>Últimas Transações</CardTitle>
        <Button variant="outline" className="rounded-2xl font-bold">
          <Link href="/transactions">Ver mais</Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {ultimasTransacoes.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-white bg-opacity-[3%] p-3 text-white">
                <Image
                  src={`/${TRANSACTION_PAYMENT_METHOD_ICONS[transaction.paymentMethod]}`}
                  height={20}
                  width={20}
                  alt="PIX"
                />
              </div>
              <div>
                <p className="text-sm font-bold">{transaction.name}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(transaction.date).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <p className={`text-sm font-bold ${obterCordoValor(transaction)}`}>
              {obterPrefixoValor(transaction)}
              {formatarMoeda(Number(transaction.amount))}
            </p>
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  );
};

export default UltimasTransacoes;
