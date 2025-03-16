import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function LogTable({ header }: { header: string[] }) {
  const accountingData = [
    {
      name: "mimi",
      description: "Office Supplies",
      amount: 245.5,
      total: 245.5,
    },
    {
      name: "mimi",
      description: "Consulting Services",
      amount: 1200.0,
      total: 1445.5,
    },
    {
      name: "mimi",
      description: "Software License",
      amount: 599.99,
      total: 2045.49,
    },
    {
      name: "mimi",
      description: "Marketing Campaign",
      amount: 850.0,
      total: 2895.49,
    },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-b border-gray-100">
          <TableHead className="text-base font-medium">
            {header[0]}
            {" Name"}
          </TableHead>
          <TableHead className="text-base font-medium">
            {"Amount ("}
            {header[1]}
            {")"}
          </TableHead>
          <TableHead className="text-right text-base font-medium">
            {"Cost ("}
            {header[2]}
            {"/"}
            {header[1]}
            {")"}
          </TableHead>
          <TableHead className="text-right font-bold text-blue-600">
            Total
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {accountingData.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell className="text-right">
              ${item.amount.toFixed(2)}
            </TableCell>
            <TableCell className="text-right font-medium">
              ${item.total.toFixed(2)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
