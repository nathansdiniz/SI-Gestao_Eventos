import {
  MinusIcon,
  Plus,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import CardResumido from "@/app/(home)/_components/card-resumido";

interface CardResumo {
  mes: string;
  investidoTotal: number;
  depositoTotal: number;
  saldo: number;
  gastosTotal: number;
}

const CardResumoFinanceiro = async ({
  depositoTotal,
  gastosTotal,
}: CardResumo) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <CardResumido
          icon={<MinusIcon size={16} className="text-red-500" />}
          title="Total A Pagar"
          amount={gastosTotal}
        />
        <CardResumido
          icon={<Plus size={16} className="text-green-500" />}
          title="Total A Receber"
          amount={depositoTotal}
        />
      </div>
    </div>
  );
};

export default CardResumoFinanceiro;
