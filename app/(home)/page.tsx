import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import NavBar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";
import TransactionPieChart from "./_components/transactions-pie-chart";
import { getDashboard } from "../_data/get-dashboard";
import ExpensesPerCategory from "./_components/expenses-per-category";

interface HomeProps {
  searchParams: {
    month: string;
  };
}

const Home = async ({ searchParams: { month } }: HomeProps) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/login");
  }

  const isMonthValid = !month || !isMatch(month, "MM");
  if (isMonthValid) {
    redirect("/?month=01");
  }

  const dashboard = await getDashboard(month);

  return (
    <>
      <NavBar />
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>
        <div className="grid grid-cols-[2fr_1fr]">
          <div className="flex flex-col gap-6">
            <SummaryCards
              month={month}
              balance={dashboard.balance}
              depositsTotal={dashboard.depositsTotal}
              expensesTotal={dashboard.expensesTotal}
              investmentsTotal={dashboard.investmentsTotal}
            />

            <div className="grid grid-cols-3 grid-rows-1 gap-6">
              <TransactionPieChart
                depositsTotal={dashboard.depositsTotal}
                expensesTotal={dashboard.expensesTotal}
                investimentsTotal={dashboard.investmentsTotal}
                typesPercentage={dashboard.typesPercentage}
              />
              <ExpensesPerCategory
                ExpensesPerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
