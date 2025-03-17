import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Button } from "./components/ui/button";
import Spinner from "./Spinner";
import { Row } from "./App";

export default function AddForm({
  buyerType,
  defaultDate,
  addRow,
}: {
  buyerType: string;
  defaultDate: Date;
  addRow: (row: Row) => void;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [date, setDate] = useState<Date>(new Date());
  const [buyer, setBuyer] = useState<string>("");
  const [unit, setUnit] = useState<number | undefined>(undefined);
  const [price, setPrice] = useState<number | undefined>(undefined);
  // const [hours, setHours] = useState(0);
  // const [notes, setNotes] = useState("");

  useEffect(() => {
    setDate(defaultDate);
  }, [open]);

  const pushData = async () => {
    setLoading(true);
    if (!unit || !price || isNaN(unit) || isNaN(price) || buyer.length < 1) {
      alert("Form is incomplete!");
      setLoading(false);
      return;
    }

    const newRow = {
      date: date.toLocaleDateString("en-CA"),
      buyer,
      unit: unit.toFixed(2),
      price: price.toFixed(2),
      hours: -1,
      notes: "",
    };

    const username = sessionStorage.getItem("username");
    const password = sessionStorage.getItem("password");

    const response =
      username && password
        ? await fetch("/api/pushLocal", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...newRow,
              username: username,
              password: password,
            }),
          })
        : await fetch("/api/push", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newRow),
          });

    const data = await response.json();
    if (data.success) {
      setOpen(false);
      addRow({
        ...newRow,
        id: data.id,
      });
      setBuyer("");
      setUnit(undefined);
      setPrice(undefined);
    } else {
      alert("Failed to update database!");
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          New Entry
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Entry</DialogTitle>
          <DialogDescription>
            Enter the details for the new entry
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">{buyerType}</Label>
            <Input value={buyer} onChange={(e) => setBuyer(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="amount">
              {"Amount"}
              {" (lb)"}
            </Label>
            <Input
              type="number"
              step="0.01"
              value={unit}
              onChange={(e) => setUnit(Number(e.target.value))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="cost">
              {"Cost"}
              {" ($ / lb)"}
            </Label>
            <Input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="date">Date</Label>
            <Input
              type="date"
              value={date.toLocaleDateString("en-CA").split("T")[0]}
              onChange={(e) => {
                setDate(new Date(e.target.value));
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700 w-18"
            onClick={() => pushData()}
          >
            {loading ? <Spinner /> : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
