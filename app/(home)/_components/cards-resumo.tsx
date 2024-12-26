import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import CardResumido from "./card-resumido";

interface CardResumo {
  mes: string;
  investidoTotal: number;
  depositoTotal: number;
  saldo: number;
  gastosTotal: number;
}

const CardResumo = async ({
  investidoTotal,
  depositoTotal,
  saldo,
  gastosTotal,
}: CardResumo) => {
  return (
    <div className="space-y-6">
      {/*Primeiro Card*/}
      <CardResumido
        icon={<WalletIcon size={16} />}
        title="Saldo"
        amount={saldo}
        size="large"
      />

      <div className="grid grid-cols-2 gap-6">
        <CardResumido
          icon={<TrendingUpIcon size={16} className="text-green-500" />}
          title="Entradas"
          amount={depositoTotal}
        />
        <CardResumido
          icon={<TrendingDownIcon size={16} className="text-red-500" />}
          title="Saídas"
          amount={gastosTotal}
        />
      </div>
    </div>
  );
};

export default CardResumo;
