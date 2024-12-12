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

      <div className="grid grid-cols-3 gap-6">
        <CardResumido
          icon={<PiggyBankIcon size={16} className="text-" />}
          title="Investido"
          amount={investidoTotal}
        />

        <CardResumido
          icon={<TrendingUpIcon size={16} className="text-primary" />}
          title="Receita"
          amount={depositoTotal}
        />
        <CardResumido
          icon={<TrendingDownIcon size={16} className="text-red-500" />}
          title="Despesa"
          amount={gastosTotal}
        />
      </div>
    </div>
  );
};

export default CardResumo;
