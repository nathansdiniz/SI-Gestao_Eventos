import { TransactionType } from "@prisma/client";

export type TransacaoPorcentagemPorTipo = {
  [key in TransactionType]: number;
};
export interface TotalGastosPorCategoria {
  category: string | null;
  totalAmount: number;
  percentageOfTotal: number;
}
