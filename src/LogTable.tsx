import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Row } from "./App";
import { cn } from "./lib/utils";
import Plane from "./assets/plane.png"

export default function LogTable({
  buyerType,
  rows,
  date,
}: {
  buyerType: string;
  rows: Row[];
  date: Date;
}) {
  const hasRows =
    rows.filter(
      (e) => e.date === date.toLocaleDateString("en-CA").split("T")[0],
    ).length > 0;
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-100">
            <TableHead
              className={cn(
                "text-base font-medium",
                hasRows || "text-transparent",
              )}
            >
              {buyerType}
            </TableHead>
            <TableHead
              className={cn(
                "text-base font-medium",
                hasRows || "text-transparent",
              )}
            >
              {"Amount (lb)"}
            </TableHead>
            <TableHead
              className={cn(
                "text-base font-medium text-right",
                hasRows || "text-transparent",
              )}
            >
              {"Cost ($ / lb)"}
            </TableHead>
            <TableHead
              className={cn(
                "text-base font-bold text-right min-w-20 text-blue-600",
                hasRows || "text-transparent",
              )}
            >
              Total
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows
            .filter(
              (e) =>
                e.date ===
                date.toLocaleDateString("en-CA").split("T")[0],
            )
            .map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.buyer}</TableCell>
                <TableCell>{item.unit}</TableCell>
                <TableCell className="text-right">
                  ${item.price.toFixed(2)}
                </TableCell>
                <TableCell className="text-right font-medium">
                  ${(item.unit * item.price).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {!hasRows && (
        <>
          <img className="w-80 mx-auto" src={Plane} alt="" />
          <p className="w-full p-4 text-center italic">No transactions found</p>
        </>
      )}
    </>
  );
}
