"use client";
import { Badge } from "@/app/_components/ui/badge";
import { CircleIcon } from "lucide-react";

interface TiposCobrancaBadgeProps {
  validacao: string;
}

const TiposValidacaoBadge = ({ validacao }: TiposCobrancaBadgeProps) => {
  if (validacao === "Aprovado") {
    return (
      <Badge className="bg-muted font-bold text-green-500 hover:bg-muted">
        <CircleIcon className="mr-2 fill-green-500" size={10} />
        Aprovado
      </Badge>
    );
  }
  if (validacao === "Aprovado e Enviado") {
    return (
      <Badge className="bg-muted font-bold text-blue-500 hover:bg-muted">
        <CircleIcon className="mr-2 fill-blue-500" size={10} />
        Aprovado e Enviado
      </Badge>
    );
  }
  if (validacao === "Recusado") {
    return (
      <Badge className="font bold bg-danger bg-opacity-10 text-danger">
        <CircleIcon className="mr-2 fill-danger" size={10} />
        Recusado
      </Badge>
    );
  }
  if (validacao === "Em espera") {
    return (
      <Badge className="font bold bg-yellow-500 bg-opacity-10 text-danger">
        <CircleIcon className="mr-2 fill-yellow-500" size={10} />
        Espera
      </Badge>
    );
  }
  if (validacao === "Pendente") {
    return (
      <Badge className="font bold bg-orange-500 bg-opacity-10 text-danger">
        <CircleIcon className="mr-2 fill-orange-500" size={10} />
        Pendente
      </Badge>
    );
  }
  return (
    <Badge className="font bold bg-white bg-opacity-10 text-white">
      <CircleIcon className="mr-2 fill-white" size={10} />
      NÃO VALIDADO
    </Badge>
  );
};

export default TiposValidacaoBadge;
