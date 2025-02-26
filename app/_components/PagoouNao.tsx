"use client";
import { CheckIcon, EqualNotIcon, X } from "lucide-react";

interface TiposCobrancaBadgeProps {
  pago: string;
}

const TiposPagosBadge = ({ pago }: TiposCobrancaBadgeProps) => {
  if (pago === "sim") {
    return <CheckIcon className="rounded-xl bg-green-700"></CheckIcon>;
  }
  if (pago === "nao") {
    return <X className="rounded-2xl bg-red-700" />;
  }

  return <EqualNotIcon></EqualNotIcon>;
};

export default TiposPagosBadge;
