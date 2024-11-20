"use client";

import { Transactions } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import TransactionTypeBadge from "../_components/type-badge";

// Transactions type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const transactionColumns: ColumnDef<Transactions>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row: { original: transaction } }) => (
      <TransactionTypeBadge transaction={transaction} />
    ),
  },
  {
    accessorKey: "category",
    header: "Categoria",
  },
  {
    accessorKey: "paymentMethod",
    header: "Método de Pagamento",
  },
  {
    accessorKey: "date",
    header: "Data",
  },
  {
    accessorKey: "amount",
    header: "Valor",
  },
  {
    accessorKey: "Actions",
    header: "",
  },
];