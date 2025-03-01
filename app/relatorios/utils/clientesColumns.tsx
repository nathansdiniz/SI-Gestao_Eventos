import { ClientePropos } from "@/app/_props";
import { ColumnDef } from "@tanstack/react-table";

export const clientesColumns: ColumnDef<ClientePropos>[] = [
  {
    accessorFn: (row) => row.id,
    header: "ID",
  },
  {
    accessorFn: (row) => row.nomeCliente,
    header: "Nome do Cliente",
  },
  {
    accessorFn: (row) => row.telefone,
    header: "Telefone",
  },
  {
    accessorFn: (row) => row.email,
    header: "Email",
  },
  {
    accessorFn: (row) => row.cpf_cnpj,
    header: "CPF/CNPJ",
  },
  {
    accessorFn: (row) => row.endereco,
    header: "Endereço",
  },
  {
    accessorFn: (row) => row.cidade,
    header: "Cidade",
  },
  {
    accessorFn: (row) => row.estado,
    header: "Estado",
  },
  {
    accessorFn: (row) => row.pais,
    header: "País",
  },
];
