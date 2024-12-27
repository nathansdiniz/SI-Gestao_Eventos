import { Badge } from "@/app/_components/ui/badge";
import { Transaction, TransactionType } from "@prisma/client";
import { CircleIcon } from "lucide-react";

interface TransactionTypeBadgeProps {
  transaction: Transaction;
}

const TransactionTypeBadge = ({ transaction }: TransactionTypeBadgeProps) => {
  if (transaction.type === TransactionType.DEPOSIT) {
    return (
      <Badge className="bg-muted font-bold text-green-500 hover:bg-muted">
        <CircleIcon className="mr-2 fill-primary" size={10} />
        Entradas
      </Badge>
    );
  }
  if (transaction.type === TransactionType.EXPENSE) {
    return (
      <Badge className="font bold bg-danger bg-opacity-10 text-danger">
        <CircleIcon className="mr-2 fill-danger" size={10} />
        Saídas
      </Badge>
    );
  }
};

export default TransactionTypeBadge;
