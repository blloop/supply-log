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
import Plane from "./assets/plane.png";

export default function LogTable({
  buyerType,
  rows,
  showDate,
}: {
  buyerType: string;
  rows: Row[];
  showDate: boolean;
}) {
  return (
    <>
      <Table className={cn(rows.length < 1 && "hidden")}>
        <TableHeader>
          <TableRow className="border-b border-gray-100">
            {showDate &&
              <TableHead className="text-base font-medium">
                Date
              </TableHead>
            }
            <TableHead className="text-base font-medium">
              {buyerType}
            </TableHead>
            <TableHead className="text-base font-medium" >
              {"Amount (lb)"}
            </TableHead>
            <TableHead className="text-base font-medium text-right">
              {"Cost ($/lb)"}
            </TableHead>
            <TableHead className="text-base font-bold text-right min-w-20 text-blue-600">
              Total
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((item, index) => (
            <TableRow key={index}>
              {showDate &&
                <TableCell className="font-medium">{item.date}</TableCell>
              }
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
      {rows.length === 0 && (
        <>
          <img className="w-80 mx-auto" src={Plane} alt="" />
          <p className="w-full p-4 text-center italic">No transactions found</p>
        </>
      )}
    </>
  );
}
