import { Button } from "@/app/_components/ui/button";
import EditDialogFinancas from "@/app/administrativo/financeiro/_components/dialog-edicao";
import { PencilIcon } from "lucide-react";
import { useState } from "react";

interface FinanceiroProps {
  id: string;
  evento: string;
  datapagamento: string;
  datacompetencia: string;
  tipocobranca: string;
  idrecebidode: string;
  recebidode: string;
  informede: string;
  descricao: string;
  valor: string;
  juros: string;
  multa: string;
  desconto: string;
  pago: string;
  idconta: string;
  conta: string;
  idcategoria: string | number;
  categoria: string | null;
  idcentrodecusto: string;
  centrodecusto: string;
  mododepagamento: string;
  parcelas: null;
  idevento: string;
}
interface EditTransactionButtonProps {
  dadosfinanceiros: FinanceiroProps[];
  onUpdateTransaction: (updatedTransaction: FinanceiroProps) => void; // Callback para atualizar transação
}

const EditarContasFinanceiro = ({
  dadosfinanceiros,
  onUpdateTransaction,
}: EditTransactionButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const handleSave = (updatedTransaction: FinanceiroProps) => {
    onUpdateTransaction(updatedTransaction); // Atualiza a transação no estado global ou backend
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
        onClick={() => setDialogIsOpen(true)}
      >
        <PencilIcon />
      </Button>
      <EditDialogFinancas
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        defaultValues={{
          ...dadosfinanceiros,
        }}
        onSave={handleSave} // Passa o callback de salvar
      />
    </>
  );
};

export default EditarContasFinanceiro;
