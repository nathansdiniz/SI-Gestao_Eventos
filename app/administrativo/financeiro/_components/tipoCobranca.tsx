import { Badge } from "@/app/_components/ui/badge";
import { CircleIcon } from "lucide-react";

interface dadosfinanceirosProps {
  tipocobranca: string;
}

interface TiposCobrancaBadgeProps {
  tipocobranca: string;
}

const TiposCobrancaBadge = ({ tipocobranca }: TiposCobrancaBadgeProps) => {
  if (tipocobranca === "Receita") {
    return (
      <Badge className="bg-muted font-bold text-green-700 hover:bg-muted">
        <CircleIcon className="mr-2 fill-green-700" size={10} />
        Entrada
      </Badge>
    );
  }
  if (tipocobranca === "Despesa") {
    return (
      <Badge className="font bold bg-danger bg-opacity-10 text-danger">
        <CircleIcon className="mr-2 fill-danger" size={10} />
        Saída
      </Badge>
    );
  }
  return (
    <Badge className="font bold bg-white bg-opacity-10 text-white">
      <CircleIcon className="mr-2 fill-white" size={10} />
      Investimento
    </Badge>
  );
};

export default TiposCobrancaBadge;
