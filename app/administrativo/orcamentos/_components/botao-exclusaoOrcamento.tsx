"use client";
import { Button } from "@/app/_components/ui/button";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import ExcluirClientesDialog from "./botao-exclusao";

interface OrcamentosProps {
  id: number;
  nome_orcamento: string | null;
  cliente_orcamento: string | null;
  email_cliente: string | null;
  vendedor: string | null;
  assunto: string | null;
  mensagem: string | null;
  tipo_evento: string | null;
  tipo_orcamento: string | null;
  data_orcamento: Date | null;
  valor_orcamento: number | null;
  forma_pagamento: string | null;
  parcelas_orcamento: number | null;
  max_participantes: number | null;
  valor_negociado: number | null;
  forma_pagamento_negociado: string | null;
  parcelas_negociadas: number | null;
  data_negociacao: Date | null;
  data_principal_evento: Date | null;
  idVendedor_orcamento: string | null;
  idVendedor_negociacao: string | null;
  status_orcamento: string | null;
  data_criacao: Date | null;
  data_atualizacao: Date | null;
  data_retorno: Date | null;
  observacao: string | null;
  codigoInterno: string | null;
  numeroConvidados: number | null;
  valorInicial: number | null;
  whatsapp: string | null;
  ddiTelefone: string | null;
  telefone: string | null;
  ddiCelular: string | null;
  celular: string | null;
  como_conheceu: string | null;
  idLocalEvento: number | null;
  nomeResponsavel: string | null;
  obs2: string | null;
  obs3: string | null;
  obs4: string | null;
  nomeDoEvento: string | null;
  datasAdicionais: any | null;
  funil: string | null;
  id_empresa: number | null;
  userID: string | null;
}

interface dadosOrcamentos {
  dados: OrcamentosProps;
}

const ExcluirOrcamentoButton = ({ dados }: dadosOrcamentos) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        className="bg-red-800 font-bold text-white"
        variant={"secondary"}
        onClick={() => setDialogIsOpen(true)}
      >
        <Trash2Icon />
      </Button>
      <ExcluirClientesDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        defaultValues={dados}
      ></ExcluirClientesDialog>
    </>
  );
};

export default ExcluirOrcamentoButton;
