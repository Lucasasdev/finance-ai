import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";
import NavBar from "../_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const TransactionsPage = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/login");
  }

  const transactions = await db.transactions.findMany({
    where: {
      userId,
    },
  });

  return (
    <>
      <NavBar />
      <div className="space-y-6 p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transactions</h1>
          <AddTransactionButton />
        </div>
        <div>
          <DataTable columns={transactionColumns} data={transactions} />
        </div>
      </div>
    </>
  );
};

export default TransactionsPage;
