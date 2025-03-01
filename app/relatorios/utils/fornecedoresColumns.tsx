import { FornecedorPropos } from "@/app/_props";
import { ColumnDef } from "@tanstack/react-table";

export const fornecedoresColumns: ColumnDef<FornecedorPropos>[] = [
  {
    accessorFn: (row) => row.id,
    header: "ID",
  },
  {
    accessorFn: (row) => row.nomeFornecedor,
    header: "Nome do Fornecedor",
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
    accessorFn: (row) => row.cnpj,
    header: "CNPJ",
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
