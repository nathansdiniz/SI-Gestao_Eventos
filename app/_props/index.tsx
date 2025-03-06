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
  recorrencia:
    | "Nenhuma"
    | "Semanal"
    | "Mensal"
    | "Diaria"
    | "Quinzenal"
    | undefined;
  periodo_final: Date | null;
  documentos_anexados: object | null;
  userID: string | null;
}
// Create the new interfaces
export interface EventoPropos {
  id: number;
  nomeEvento: string | null;
  dataInicio: Date | null;
  dataFim: Date | null;
  local: string | null;
  descricao: string | null;
  id_empresa: number | null;
  userID: string | null;
}
export interface Evento {
  id: number;
  tipoEvento: string;
  dataDeCadastro: Date;
  idOrcamento?: number | null;
  idCliente?: number | null;
  nomeCliente: string;
  dataEvento?: Date | null;
  horaEvento: string;
  localEvento?: string | null;
  nomeEvento?: string | null | undefined;
  idLocalEvento?: number | null;
  endereco?: string | null;
  numero?: number | null;
  complemento?: string | null;
  cep?: string | null;
  bairro?: string | null;
  cidade?: string | null;
  estado?: string | null;
  informacoes?: string | null;
  observacao?: string | null;
  codigoInterno?: string | null;
  convidados: number;
  datasAdicionais: string | null;
  status: string | null;
  id_empresa: number;
  userID?: string | null;
  diaTodo: boolean;
  horarioInicio?: string; // Adicionado
  horarioFim?: string; // Adicionado
}

export interface ClientePropos {
  id: number;
  nomeCliente: string | null;
  telefone: string | null;
  email: string | null;
  cpf_cnpj: string | null;
  endereco: string | null;
  cidade: string | null;
  estado: string | null;
  pais: string | null;
  id_empresa: number | null;
  userID: string | null;
}

export interface FornecedorPropos {
  id: number;
  nomeFornecedor: string | null;
  telefone: string | null;
  email: string | null;
  cnpj: string | null;
  endereco: string | null;
  cidade: string | null;
  estado: string | null;
  pais: string | null;
  id_empresa: number | null;
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
  recorrencia: z
    .enum(["Nenhuma", "Semanal", "Mensal", "Quinzenal", "Diaria"])
    .default("Nenhuma"),
  periodo_final: z.date().nullable(),
  documentos_anexados: z.object({}).nullable(),
});

export interface FinanceiroPropsRelatorio {
  id?: string;
  idevento?: number;
  datacompetencia?: string;
  descricao?: string;
  tipocobranca?: string;
  informede?: string;
  evento?: string;
  pago?: string;
  datapagamento?: string;
  valor?: string;
  validacao?: string;
  data_criacao?: string;
  ultima_alteracao_validacao?: string;
  parcelas?: any;
  mododepagamento?: string;
  categoria?: string;
}
