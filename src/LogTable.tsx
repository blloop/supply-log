import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Trash } from "lucide-react";
import { Button } from "./components/ui/button";
import { useState } from "react";
import Spinner from "./Spinner";
import { useLangContext } from "./LangContext";

export default function LogTable({
  buyerType,
  rows,
  showDate,
  deleteRow,
}: {
  buyerType: string;
  rows: Row[];
  showDate: boolean;
  deleteRow: (id: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currID, setCurrID] = useState(-1);

  const { tl } = useLangContext();

  const pushData = async () => {
    setLoading(true);

    const username = sessionStorage.getItem("username");
    const password = sessionStorage.getItem("password");

    const response =
      username && password
        ? await fetch("/api/deleteLocal", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password, id: currID }),
          })
        : await fetch("/api/delete", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ id: currID }),
          });

    const data = await response.json();
    if (data.success) {
      setOpen(false);
      deleteRow(currID);
    } else {
      alert("Failed to update database!");
    }
    setLoading(false);
  };

  const deleteID = (id: number) => {
    setCurrID(id);
    setOpen(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{tl("Confirm Deletion")}</DialogTitle>
            <DialogDescription>
              {tl("Are you sure you want to delete this row?")}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              {tl("Cancel")}
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 md:w-18"
              onClick={pushData}
            >
              {loading ? <Spinner /> : tl("Delete")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Table className={cn(rows.length < 1 && "hidden")}>
        <TableHeader>
          <TableRow className="border-b border-gray-100">
            {showDate && (
              <TableHead className="text-base font-medium">
                {tl("Date")}
              </TableHead>
            )}
            <TableHead className="text-base font-medium">
              {tl(buyerType)}
            </TableHead>
            <TableHead className="text-base font-medium">
              {tl("Amount")}
              {" (lb)"}
            </TableHead>
            <TableHead className="text-base font-medium text-right">
              {tl("Cost")}
              {" ($/lb)"}
            </TableHead>
            <TableHead className="text-base font-bold text-right min-w-20 text-blue-600">
              {tl("Total")}
            </TableHead>
            {showDate && (
              <TableHead className="text-base font-medium"></TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((item, index) => (
            <TableRow
              className={cn(
                index % 2 === (showDate ? 1 : 0) ? "bg-white" : "bg-gray-100",
              )}
              key={index}
            >
              {showDate && (
                <TableCell className="font-medium">{item.date}</TableCell>
              )}
              <TableCell className="font-medium">{item.buyer}</TableCell>
              <TableCell>{item.unit}</TableCell>
              <TableCell className="text-right">${item.price}</TableCell>
              <TableCell className="text-right font-medium">
                ${(Number(item.unit) * Number(item.price)).toFixed(2)}
              </TableCell>
              {showDate && (
                <TableCell className="w-14 font-medium align-right">
                  <Button
                    className="ml-2 bg-gray-600"
                    onClick={() => deleteID(item.id)}
                  >
                    <Trash />
                  </Button>
                </TableCell>
              )}
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
