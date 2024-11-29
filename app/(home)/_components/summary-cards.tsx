import {
  PiggyBankIcon,
  TrendingUpDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";
import { db } from "@/app/_lib/prisma";

interface SummaryCardsProps {
  month: string;
}

const SummaryCards = async ({ month }: SummaryCardsProps) => {
  const where = {
    date: {
      gte: new Date(`2024-${month}-01`),
      lt: new Date(`2024-${month}-31`),
    },
  };

  const depositsTotal = Number(
    (
      await db.transactions.aggregate({
        where: { ...where, type: "DEPOSIT" },
        _sum: { amount: true },
      })
    )._sum?.amount,
  );
  const expensesTotal = Number(
    (
      await db.transactions.aggregate({
        where: { ...where, type: "EXPENSE" },
        _sum: { amount: true },
      })
    )._sum?.amount,
  );
  const investimentTotal = Number(
    (
      await db.transactions.aggregate({
        where: { ...where, type: "INVESTMENT" },
        _sum: { amount: true },
      })
    )._sum?.amount,
  );
  const balance = depositsTotal - expensesTotal - investimentTotal;

  return (
    <div className="space-y-6">
      <SummaryCard
        icon={<WalletIcon size={20} />}
        title="Saldo"
        amount={balance}
        size="large"
      />
      <div className="grid grid-cols-3 gap-4">
        <SummaryCard
          icon={<PiggyBankIcon size={16} />}
          title="Investido"
          amount={investimentTotal}
        />
        <SummaryCard
          icon={<TrendingUpIcon size={16} className="text-primary" />}
          title="Receita"
          amount={depositsTotal}
        />
        <SummaryCard
          icon={<TrendingUpDownIcon size={16} className="text-red-500" />}
          title="Despesa"
          amount={expensesTotal}
        />
      </div>
    </div>
  );
};

export default SummaryCards;
