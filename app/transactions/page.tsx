import { ArrowDownUp } from "lucide-react";
import { Button } from "../_components/ui/button";
import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns";

const TransactionsPage = async () => {
  const transactions = await db.transactions.findMany({});

  return (
    <div className="space-y-6 p-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <Button className="rounded-full">
          Adicionar transação
          <ArrowDownUp />
        </Button>
      </div>
      <div>
        <DataTable columns={transactionColumns} data={transactions} />
      </div>
    </div>
  );
};

export default TransactionsPage;
