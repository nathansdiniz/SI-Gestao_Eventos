"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/button";
import { FinanceiroPropos } from "@/app/_props";
import { toast } from "sonner";
import {
  AlertTriangleIcon,
  CircleCheckBigIcon,
  XCircleIcon,
} from "lucide-react";
import { addUpdateFinanceiro } from "@/app/_actions/criar-atualizarFinanceiro";

interface PaymentConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  record: FinanceiroPropos | null;
  onPaymentStatusChange?: (recordId: number, newStatus: string) => void;
}

const PaymentConfirmationDialog: React.FC<PaymentConfirmationDialogProps> = ({
  isOpen,
  onClose,
  record,
  onPaymentStatusChange,
}) => {
  const [canConfirm, setCanConfirm] = useState<boolean>(false);
  const [paymentStatus, setPaymentStatus] = useState<string>("");

  useEffect(() => {
    if (record) {
      // Check if documentos_anexados is not empty or null
      const hasDocuments =
        record.documentos_anexados &&
        (Array.isArray(record.documentos_anexados)
          ? record.documentos_anexados.length > 0
          : typeof record.documentos_anexados === "string"
            ? JSON.parse(record.documentos_anexados).length > 0
            : false);

      setCanConfirm(hasDocuments || record.pago === "sim");
      setPaymentStatus(record.pago ?? "nao");
    } else {
      setCanConfirm(false);
    }
  }, [record]);

  const handleConfirmPayment = async (): Promise<void> => {
    if (record && canConfirm) {
      try {
        // Assuming 'pago' is the field in your database for payment status
        await addUpdateFinanceiro({
          ...record,
          pago: "sim",
          datapagamento: new Date(),
        });

        toast(`Registro ${record.id} pago com sucesso!`, {
          description: (
            <div className="flex items-center">
              <CircleCheckBigIcon className="mr-2 text-white" />
              <span>
                {`${record.descricao} pago em ${new Date().toLocaleString()}`}
              </span>
            </div>
          ),
          action: {
            label: "X",
            onClick: () => console.log("X"),
          },
          style: {
            background: "#007300",
            textDecorationColor: "#f1f4ff",
          },
        });

        onPaymentStatusChange?.(record.id, "sim");
        onClose();
      } catch (error) {
        console.error("Erro ao atualizar o pagamento:", error);
        toast.error(
          "Erro ao confirmar o pagamento. Veja o console para mais detalhes.",
        );
      }
    } else {
      toast.error(
        "Não é possível confirmar o pagamento sem anexar os documentos.",
      );
    }
  };

  const handleCancelPayment = async (): Promise<void> => {
    if (record) {
      try {
        await addUpdateFinanceiro({
          ...record,
          pago: "nao",
          datapagamento: null,
        });
        toast(`Registro ${record.id} cancelado o pagamento com sucesso!`, {
          description: (
            <div className="flex items-center">
              <XCircleIcon className="mr-2 text-white" />
              <span>
                {`${record.descricao} cancelado em ${new Date().toLocaleString()}`}
              </span>
            </div>
          ),
          action: {
            label: "X",
            onClick: () => console.log("X"),
          },
          style: {
            background: "#800000",
            textDecorationColor: "#f1f4ff",
          },
        });
        onPaymentStatusChange?.(record.id, "nao");
        onClose();
      } catch (error) {
        console.error("Erro ao atualizar o pagamento:", error);
        toast.error(
          "Erro ao confirmar o pagamento. Veja o console para mais detalhes.",
        );
      }
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {paymentStatus === "sim"
              ? "Cancelar Pagamento"
              : "Confirmar Pagamento"}
          </DialogTitle>
          <DialogDescription>
            {record
              ? `Tem certeza de que deseja ${
                  paymentStatus === "sim" ? "cancelar" : "confirmar"
                } o pagamento do registro? : ${record.descricao}`
              : "Registro não encontrado"}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          {!canConfirm && record?.pago === "nao" && (
            <div className="flex items-center space-x-2">
              <AlertTriangleIcon className="text-yellow-500" />
              <span>
                Para confirmar o pagamento, você deve anexar os documentos
                necessários.
              </span>
            </div>
          )}
        </div>

        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>
          {paymentStatus === "sim" ? (
            <Button variant={"destructive"} onClick={handleCancelPayment}>
              Cancelar Pagamento
            </Button>
          ) : (
            <Button
              disabled={!canConfirm}
              onClick={handleConfirmPayment}
              className="bg-green-500 text-white"
            >
              Confirmar Pagamento
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentConfirmationDialog;
