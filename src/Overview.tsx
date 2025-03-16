import { DollarSign, TrendingUp, Trophy } from "lucide-react";

export default function Overview({
  total,
  max,
  date,
}: {
  total: number;
  max: number;
  date: Date;
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 bg-white border-t shadow-md p-4">
      <div className="w-full max-w-[1280px] mx-auto px-4 flex flex-wrap items-center justify-center gap-8 overflow-x-auto whitespace-nowrap text-sm md:text-base">
        <p>
          Month{": "}
          <span className="font-bold">
            {date.toLocaleDateString("default", { month: "long" })}{" "}
            {date.getFullYear()}
          </span>
        </p>

        <div className="h-4 w-px bg-gray-200 mx-1"></div>

        <div className="flex items-center gap-1.5">
          <DollarSign className="h-4 w-4 text-blue-600 flex-shrink-0" />
          <span className="text-gray-500 font-medium">Total:</span>
          <span className={`font-bold transition-colors`}>
            ${total.toFixed(2)}
          </span>
        </div>

        <div className="h-4 w-px bg-gray-200 mx-1"></div>

        <div className="flex items-center gap-1.5">
          <TrendingUp className="h-4 w-4 text-green-600 flex-shrink-0" />
          <span className="text-gray-500 font-medium">Avg/Day:</span>
          <span className={`font-bold transition-colors`}>
            $
            {(
              total /
              new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
            ).toFixed(2)}
          </span>
        </div>

        <div className="h-4 w-px bg-gray-200 mx-1"></div>

        <div className="flex items-center gap-1.5">
          <Trophy className="h-4 w-4 text-yellow-600 flex-shrink-0" />
          <span className="text-gray-500 font-medium">Largest:</span>
          <span className={`font-bold transition-colors`}>
            ${max.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
