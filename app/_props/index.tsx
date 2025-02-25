import { z } from "zod";

export interface FinanceiroPropos {
  id: number;
  evento: string | null;
  datapagamento: Date | null;
  datacompetencia: Date | null;
  tipocobranca: string | null;
  idrecebidode: string | null;
  recebidode: string | null;
  informede: string | null;
  descricao: string | null;
  valor: number | null;
  juros: number | null;
  multa: number | null;
  desconto: number | null;
  pago: string | null;
  idconta: string | null;
  conta: string | null;
  idcategoria: string | null;
  categoria: string | null;
  idcentrodecusto: string | null;
  centrodecusto: string | null;
  mododepagamento: string | null;
  parcelas: null | {
    id: number | null;
    datapagamento: string | null;
    descricao: string | null;
    valor: number | null;
  };
  idevento: string | null;
  id_empresa: number | null;
  data_criacao: Date;
  data_update: Date;
  validacao: string | null;
  informacoes_extras: string | null;
  ultima_alteracao_validacao: string | null;
  recorrencia: "Nenhuma" | "Semanal" | "Mensal" | undefined;
  periodo_final: Date | null;
  documentos_anexados: object | null;
  userID: string | null;
}

export const formSchemaFinanceiro = z.object({
  id: z.number().optional(),
  evento: z.string().nullable(),
  datapagamento: z.date().nullable(),
  datacompetencia: z.date().nullable(),
  tipocobranca: z.string().nullable(),
  idrecebidode: z.string().nullable(),
  recebidode: z.string().nullable(),
  informede: z.string().nullable(),
  descricao: z.string().nullable(),
  valor: z.number().nullable(),
  juros: z.number().nullable(),
  multa: z.number().nullable(),
  desconto: z.number().nullable(),
  pago: z.string().nullable(),
  idconta: z.string().nullable(),
  conta: z.string().nullable(),
  idcategoria: z.string().nullable(),
  categoria: z.string().nullable(),
  idcentrodecusto: z.string().nullable(),
  centrodecusto: z.string().nullable(),
  mododepagamento: z.string().nullable(),
  parcelas: z
    .object({
      id: z.number().nullable(),
      datapagamento: z.string().nullable(),
      valor: z.number().nullable(),
      descricao: z.string().nullable(),
    })
    .nullable(),
  idevento: z.string().nullable(),
  id_empresa: z.number().nullable(),
  data_criacao: z.date(),
  data_update: z.date(),
  validacao: z.string().nullable(),
  informacoes_extras: z.string().nullable(),
  ultima_alteracao_validacao: z.string().nullable(),
  userID: z.string().nullable(),
  recorrencia: z.enum(["Nenhuma", "Semanal", "Mensal"]).default("Nenhuma"),
  periodo_final: z.date().nullable(),
  documentos_anexados: z.object({}).nullable(),
});
