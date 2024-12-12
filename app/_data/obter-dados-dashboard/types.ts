import { TransactionCategory, TransactionType } from "@prisma/client";

export type TransacaoPorcentagemPorTipo = {
  [key in TransactionType]: number;
};
export interface TotalGastosPorCategoria {
  category: TransactionCategory;
  totalAmount: number;
  percentageOfTotal: number;
}
