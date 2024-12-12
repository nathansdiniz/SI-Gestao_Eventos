import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { Progress } from "@/app/_components/ui/progress";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { TRANSACTION_CATEGORY_LABELS } from "@/app/_constants/transactions";
import { TotalGastosPorCategoria } from "@/app/_data/obter-dados-dashboard/types";

interface GastosCategoria {
  gastosPorCategoria: TotalGastosPorCategoria[];
}

const GastosCategoria = ({ gastosPorCategoria }: GastosCategoria) => {
  return (
    <ScrollArea className="col-span-2 h-full rounded-md border pb-6">
      <CardHeader>
        <CardTitle>Gastos por Categoria</CardTitle>
      </CardHeader>

      <CardContent>
        {gastosPorCategoria.map((categoria) => (
          <div key={categoria.category} className="space-y-6">
            <div className="flex w-full justify-between">
              <p className="text-sm font-bold">
                {TRANSACTION_CATEGORY_LABELS[categoria.category]}
              </p>
              <p className="text-sm font-bold">
                {categoria.percentageOfTotal}%
              </p>
            </div>
            <Progress value={categoria.percentageOfTotal} />
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  );
};

export default GastosCategoria;
