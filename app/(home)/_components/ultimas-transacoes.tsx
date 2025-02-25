import { Button } from "@/app/_components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { TRANSACTION_PAYMENT_METHOD_ICONS } from "@/app/_constants/transactions";
import { formatarMoeda } from "@/app/_utils/moeda";
import Image from "next/image";
import Link from "next/link";

interface ParcelasProps {
  id: number | null;
  datapagamento: string | null;
  descricao: string | null;
  valor: number | null;
}

interface FinanceiroProps {
  id: number;
  evento: string | null;
  datapagamento: Date | null;
  datacompetencia: Date;
  tipocobranca: string | null;
  idrecebidode: string | null;
  recebidode: string | null;
  informede: string | null;
  descricao: string | null;
  valor: number | null;
  juros: number | null;
  multa: number | null;
  desconto: number | null;
  pago: string | null;
  idconta: string | null;
  conta: string | null;
  idcategoria: string | null;
  categoria: string | null;
  idcentrodecusto: string | null;
  centrodecusto: string | null;
  mododepagamento: string;
  parcelas: ParcelasProps | null; // Atualizado aqui
  idevento: string | null;
  userID: string | null;
  data_criacao: Date;
  data_update: Date;
  id_empresa: number | null;
}

interface UltimasTransacoesProps {
  ultimasTransacoes: FinanceiroProps[];
}

const UltimasTransacoes = ({ ultimasTransacoes }: UltimasTransacoesProps) => {
  const obterCordoValor = ({ tipocobranca }: FinanceiroProps) => {
    if (tipocobranca === "Despesa") {
      return "text-red-500";
    }
    if (tipocobranca === "Receita") {
      return "text-green-500";
    }
    return "text-white";
  };
  const obterPrefixoValor = ({ tipocobranca }: FinanceiroProps) => {
    if (tipocobranca === "Receita") {
      return "+";
    }
    return "-";
  };

  return (
    <ScrollArea className="rounded-md border">
      <CardHeader className="space-y-8">
        <CardTitle className="text-center">Últimas Transações</CardTitle>
        <Button variant="outline" className="rounded-2xl font-bold">
          <Link href="/administrativo/financeiro">Ver mais</Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {ultimasTransacoes.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-white bg-opacity-[3%] p-5 text-white">
                <Image
                  src={`/${TRANSACTION_PAYMENT_METHOD_ICONS[transaction.mododepagamento as keyof typeof TRANSACTION_PAYMENT_METHOD_ICONS] ?? "bank-transfer.png"}`}
                  height={20}
                  width={20}
                  alt={transaction.mododepagamento}
                />
              </div>
              <div>
                <p className="text-sm font-bold">{transaction.descricao}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(transaction.datacompetencia).toLocaleDateString(
                    "pt-BR",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    },
                  )}
                </p>
              </div>
            </div>
            <p className={`text-sm font-bold ${obterCordoValor(transaction)}`}>
              {obterPrefixoValor(transaction)}
              {formatarMoeda(Number(transaction.valor))}
            </p>
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  );
};

export default UltimasTransacoes;
