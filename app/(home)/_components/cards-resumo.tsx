"use client";
import {
  HandCoinsIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import CardResumido from "./card-resumido";
import CardSaldos from "./card-saldos";

interface CardResumo {
  mes: string;
  investidoTotal: number;
  depositoTotal: number;
  saldo: number;
  saldo_previsto: number;
  saldo_previstoEntradas: number;
  saldo_previstoSaidas: number;
  gastosTotal: number;
  saldoEvento?: number;
}

const CardResumo = ({
  depositoTotal,
  saldo,
  gastosTotal,
  saldo_previsto,
  saldo_previstoEntradas,
  saldo_previstoSaidas,
  saldoEvento,
}: CardResumo) => {
  return (
    <>
      <div className="space-y-6">
        {/*Primeiro Card*/}
        <CardSaldos
          icon={<WalletIcon size={30} className="text-blue-500" />}
          title1="Saldo Real             "
          saldo1={saldo}
          title2="Provisonamento de Saldo"
          saldo2={saldo_previsto}
          title3="Provisionamento de Entradas"
          saldo3={saldo_previstoEntradas}
          title4="Provisionamento de Saídas"
          saldo4={saldo_previstoSaidas}
          size="large"
        />

        <div
          className={
            saldoEvento === null || saldoEvento === undefined
              ? "grid grid-cols-2 gap-6"
              : "grid grid-cols-3 gap-3"
          }
        >
          {saldoEvento != null || saldoEvento != undefined ? (
            <CardResumido
              icon={<HandCoinsIcon size={26} className="text-yellow-500" />}
              title="Saldo do Evento"
              amount={saldoEvento}
            />
          ) : null}
          <CardResumido
            icon={<TrendingUpIcon size={26} className="text-green-500" />}
            title="Entradas"
            amount={depositoTotal}
          />
          <CardResumido
            icon={<TrendingDownIcon size={26} className="text-red-500" />}
            title="Saídas"
            amount={gastosTotal}
          />
        </div>
      </div>
    </>
  );
};

export default CardResumo;
