import { DollarSign, TrendingUp, Trophy } from "lucide-react";

export default function Overview({
  rows,
  date,
}: {
  rows: Object[];
  date: Date;
}) {
  console.log("rows", rows);
  console.log(date.toLocaleDateString("en-CA").split("T")[0]);
  console.log(
    "filtered",
    rows.filter(
      (e) => (e as any).date === date.toLocaleDateString("en-CA").split("T")[0],
    ),
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 bg-white border-t shadow-md p-4">
      <div className="w-full max-w-[1280px] mx-auto px-4 flex flex-wrap items-center justify-center gap-8 overflow-x-auto whitespace-nowrap text-sm md:text-base">
        <p>
          Month{": "}
          <span className="font-bold">
            {date.toLocaleDateString("en-CA", { month: "long" })}{" "}
            {date.getFullYear()}
          </span>
        </p>

        <div className="h-4 w-px bg-gray-200 mx-1"></div>

        <div className="flex items-center gap-1.5">
          <DollarSign className="h-4 w-4 text-blue-600 flex-shrink-0" />
          <span className="text-gray-500 font-medium">Total:</span>
          <span className={`font-bold transition-colors`}>
            ${(2000).toFixed(2)}
          </span>
        </div>

        <div className="h-4 w-px bg-gray-200 mx-1"></div>

        <div className="flex items-center gap-1.5">
          <TrendingUp className="h-4 w-4 text-green-600 flex-shrink-0" />
          <span className="text-gray-500 font-medium">Avg/Day:</span>
          <span className={`font-bold transition-colors`}>
            $
            {(
              2000 /
              new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
            ).toFixed(2)}
          </span>
        </div>

        <div className="h-4 w-px bg-gray-200 mx-1"></div>

        <div className="flex items-center gap-1.5">
          <Trophy className="h-4 w-4 text-yellow-600 flex-shrink-0" />
          <span className="text-gray-500 font-medium">Largest:</span>
          <span className={`font-bold transition-colors`}>
            ${(600).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
