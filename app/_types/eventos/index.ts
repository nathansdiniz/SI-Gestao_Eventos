// app/_types/evento.ts
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
  horarioInicio?: string;
  horarioFim?: string;
}
