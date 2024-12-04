import { TRANSACTION_CATEGORY_LABELS } from "@/app/_constants/transactions";
import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { Progress } from "@/app/_components/ui/progress";
import { TotalExpensePerCategory } from "@/app/_data/get-dashboard/types";
import { ScrollArea } from "@radix-ui/react-scroll-area";

interface ExpensesPerCategoryProps {
  ExpensesPerCategory: TotalExpensePerCategory[];
}

const ExpensesPerCategory = ({
  ExpensesPerCategory,
}: ExpensesPerCategoryProps) => {
  return (
    <ScrollArea className="pg-6 col-span-2 h-full rounded-md border">
      <CardHeader>
        <CardTitle className="font-bold">Gastos por Categoria</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {ExpensesPerCategory.map((category) => (
          <div key={category.category} className="space-y-2">
            <div className="flex w-full justify-between">
              <p className="text-sm font-bold">
                {TRANSACTION_CATEGORY_LABELS[category.category]}
              </p>
              <p className="text-sm font-bold">{category.percentageOfTotal}%</p>
            </div>
            <Progress value={category.percentageOfTotal} />
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  );
};

export default ExpensesPerCategory;
