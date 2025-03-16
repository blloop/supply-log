import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { Button } from "./components/ui/button"

export default function AddForm({ header, date } : {
  header: string[];
  date: Date;
}) {
  const [isNewEntryOpen, setIsNewEntryOpen] = useState(false);

  return (    
    <Dialog open={isNewEntryOpen} onOpenChange={setIsNewEntryOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          New Entry
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Entry</DialogTitle>
          <DialogDescription>Enter the details for the new entry</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">{header[0]}{" Name"}</Label>
            <Input id="name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="amount">{"Amount"}{" ("}{header[1]}{")"}</Label>
            <Input id="amount" type="number" step="0.01" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="cost">{"Cost"}{" ("}{header[2]}{"/"}{header[1]}{")"}</Label>
            <Input id="cost" type="number" step="0.01" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" defaultValue={(date || new Date()).toISOString().split("T")[0]} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsNewEntryOpen(false)}>
            Cancel
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsNewEntryOpen(false)}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
