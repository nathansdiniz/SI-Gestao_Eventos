"use client";
import { Button } from "@/app/_components/ui/button";
import {
  DialogHeader,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/app/_components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const OrcamentosSchema = z.object({
  id: z.number(),
  nome_orcamento: z.string().nullable(),
  cliente_orcamento: z.string().nullable(),
  email_cliente: z.string().nullable(),
  vendedor: z.string().nullable(),
  assunto: z.string().nullable(),
  mensagem: z.string().nullable(),
  tipo_evento: z.string().nullable(),
  tipo_orcamento: z.string().nullable(),
  data_orcamento: z.date().nullable(),
  valor_orcamento: z.number().nullable(),
  forma_pagamento: z.string().nullable(),
  parcelas_orcamento: z.number().nullable(),
  max_participantes: z.number().nullable(),
  valor_negociado: z.number().nullable(),
  forma_pagamento_negociado: z.string().nullable(),
  parcelas_negociadas: z.number().nullable(),
  data_negociacao: z.date().nullable(),
  data_principal_evento: z.date().nullable(),
  idVendedor_orcamento: z.string().nullable(),
  idVendedor_negociacao: z.string().nullable(),
  status_orcamento: z.string().nullable(),
  data_criacao: z.date().nullable(),
  data_atualizacao: z.date().nullable(),
  data_retorno: z.date().nullable(),
  observacao: z.string().nullable(),
  codigoInterno: z.string().nullable(),
  numeroConvidados: z.number().nullable(),
  valorInicial: z.number().nullable(),
  whatsapp: z.string().nullable(),
  ddiTelefone: z.string().nullable(),
  telefone: z.string().nullable(),
  ddiCelular: z.string().nullable(),
  celular: z.string().nullable(),
  como_conheceu: z.string().nullable(),
  idLocalEvento: z.number().nullable(),
  nomeResponsavel: z.string().nullable(),
  obs2: z.string().nullable(),
  obs3: z.string().nullable(),
  obs4: z.string().nullable(),
  nomeDoEvento: z.string().nullable(),
  datasAdicionais: z.any().nullable(),
  funil: z.string().nullable(),
  id_empresa: z.number().nullable(),
  userID: z.string().nullable(),
});

// Tipo inferido a partir do schema Zod
type OrcamentosForm = z.infer<typeof OrcamentosSchema>;

interface ExcluirDialogProps {
  isOpen: boolean;
  defaultValues?: Partial<OrcamentosForm>;
  setIsOpen: (isOpen: boolean) => void;
}

const ExcluirOrcamentoButton = ({
  isOpen,
  setIsOpen,
  defaultValues,
}: ExcluirDialogProps) => {
  const form = useForm<OrcamentosForm>({
    resolver: zodResolver(OrcamentosSchema),
    defaultValues: defaultValues ?? {
      id: 0,
      nome_orcamento: null,
      cliente_orcamento: null,
      email_cliente: null,
      vendedor: null,
      assunto: null,
      mensagem: null,
      tipo_evento: null,
      tipo_orcamento: null,
      data_orcamento: null,
      valor_orcamento: null,
      forma_pagamento: null,
      parcelas_orcamento: null,
      max_participantes: null,
      valor_negociado: null,
      forma_pagamento_negociado: null,
      parcelas_negociadas: null,
      data_negociacao: null,
      data_principal_evento: null,
      idVendedor_orcamento: null,
      idVendedor_negociacao: null,
      status_orcamento: null,
      data_criacao: null,
      data_atualizacao: null,
      data_retorno: null,
      observacao: null,
      codigoInterno: null,
      numeroConvidados: null,
      valorInicial: null,
      whatsapp: null,
      ddiTelefone: null,
      telefone: null,
      ddiCelular: null,
      celular: null,
      como_conheceu: null,
      idLocalEvento: null,
      nomeResponsavel: null,
      obs2: null,
      obs3: null,
      obs4: null,
      nomeDoEvento: null,
      datasAdicionais: null,
      funil: null,
      id_empresa: null,
      userID: null,
    },
  });

  const onSubmit = (data: OrcamentosForm) => {
    console.log(data);
    // Aqui você pode adicionar a lógica para excluir o orçamento
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          form.reset();
        }
      }}
    >
      <DialogTrigger></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmação de exclusão</DialogTitle>
          <DialogDescription className="text-center text-lg font-semibold text-white">
            Tem certeza que deseja excluir esse orçamento?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4 flex items-center justify-center gap-4">
          <DialogClose asChild>
            <Button
              variant={"default"}
              className="bg-red-700 px-6 py-3 text-lg text-white"
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button
            variant={"secondary"}
            className="px-6 py-3 text-lg"
            onClick={() => onSubmit(form.getValues())}
          >
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExcluirOrcamentoButton;
