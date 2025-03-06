"use client";
import { useEffect, useState } from "react";
import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AlertTriangleIcon, CircleCheckBigIcon } from "lucide-react";
import consultarEventos from "@/app/_actions/consultar-inputEventos";
import { formSchemaFinanceiro } from "@/app/_props";
import { Textarea } from "@/app/_components/ui/textarea";
import { Input } from "@/app/_components/ui/input";
import { atualizarFinanceiroEvento } from "@/app/_actions/eventos/financeiro";
import { addUpdateFinanceiro } from "@/app/_actions/criar-atualizarFinanceiro";

type FormSchema = z.infer<typeof formSchemaFinanceiro>;

interface EditDialogProps {
  isOpen: boolean;
  defaultValues?: Partial<FormSchema>;
  financeiroId?: string;
  titulo: string;
  onClose?: () => void;
  onSave?: (data: FormSchema) => void;
  setIsOpen: (isOpen: boolean) => void;
}

const ValidacaoDialogFinancas = ({
  isOpen,
  defaultValues,
  setIsOpen,
  titulo,
}: EditDialogProps) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchemaFinanceiro),
    defaultValues: {
      id: undefined,
      evento: "",
      datapagamento: null,
      datacompetencia: null,
      tipocobranca: "",
      idrecebidode: "",
      recebidode: "",
      informede: "",
      descricao: "",
      valor: null,
      juros: null,
      multa: null,
      desconto: null,
      pago: "",
      idconta: "",
      conta: "",
      idcategoria: "",
      categoria: "",
      idcentrodecusto: "",
      centrodecusto: "",
      mododepagamento: "",
      parcelas: null,
      idevento: "",
      id_empresa: null,
      data_criacao: new Date(),
      data_update: new Date(),
      validacao: "Pendente",
      informacoes_extras: "",
      ultima_alteracao_validacao: "",
      userID: "",
      recorrencia: "Nenhuma",
      periodo_final: null,
      documentos_anexados: null,
      ...defaultValues,
    },
  });

  const [eventos, setEventos] = useState<
    { id: number; nomeEvento: string | null }[]
  >([]);
  let acaoValidada = "Pendente";
  let acaoBotao = "";
  let cor = "yellow";
  switch (titulo) {
    case "Validar Registro":
      acaoValidada = "Aprovado";
      acaoBotao = "Validar";
      cor = "green";
      console.log(eventos);
      break;
    case "Enviar pro Financeiro":
      acaoValidada = "Aprovado e Enviado";
      acaoBotao = "Encaminhar para Financeiro";
      cor = "blue";
      console.log(eventos);
      break;
    case "Rejeitar Registro":
      acaoValidada = "Recusado";
      acaoBotao = "Rejeitar";
      cor = "red";
      break;
    case "Pendência no Registro":
      acaoValidada = "Pendente";
      acaoBotao = "Adicionar Pendência";
      cor = "orange";
      break;
    case "Em espera o Registro":
      acaoValidada = "Em espera";
      acaoBotao = "Adicionar Em espera";
      cor = "yellow";
      break;
    default:
      acaoValidada = "Pendente";
      acaoBotao = "Adicionar Pendência";
      break;
  }

  // Atualiza os campos do formulário quando defaultValues mudar
  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

  useEffect(() => {
    async function fetchEventos() {
      try {
        const res = await consultarEventos();
        const data = res;
        console.log(res);
        setEventos(data);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      }
    }

    fetchEventos();
  }, []);

  const onSubmit = async (data: FormSchema) => {
    data.validacao = acaoValidada;
    console.log(data, acaoValidada);
    try {
      await atualizarFinanceiroEvento({
        ...data,
        id: data.id ?? 0,
      });
      if (acaoValidada === "Aprovado e Enviado") {
        await addUpdateFinanceiro({
          ...data,
          id: 0,
        });
      }
      toast(`Estado do Registro Financeiro atualizado com sucesso!`, {
        description: (
          <div className="flex items-center">
            <CircleCheckBigIcon className="mr-2 text-white" />
            <span>{`${data.descricao} salva em ${new Date().toLocaleString()}`}</span>
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
      setIsOpen(false);
      form.reset();
    } catch (error) {
      toast("Falha ao salvar os dados!", {
        description: <AlertTriangleIcon />,
        action: {
          label: "X",
          onClick: () => console.log("X"),
        },
        style: {
          background: "#af080d",
          textDecorationColor: "#f1f4ff",
        },
      });
      console.error("Erro ao salvar dados:", error);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open: boolean) => {
        setIsOpen(open);
        if (!open) {
          form.reset();
        }
      }}
    >
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="max-h-[80vh] max-w-[40vw] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{titulo} o Registro Financeiro</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja {titulo}?
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Campos do formulário */}
            <FormField
              control={form.control}
              name="data_update"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar Data de Vencimento</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      value={
                        field.value
                          ? new Date(field.value).toISOString().split("T")[0]
                          : ""
                      }
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ultima_alteracao_validacao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Informações Adicionais</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Digite a informação adicional..."
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Outros campos aqui... */}

            <DialogFooter className="mt-4 flex flex-wrap justify-center gap-4">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  size={"lg"}
                  className="bg-red-950 font-bold text-white"
                >
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                type="submit"
                size={"lg"}
                className={`bg-${cor}-500 font-bold text-white`}
              >
                {acaoBotao}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ValidacaoDialogFinancas;
