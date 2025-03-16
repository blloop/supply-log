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

export default function AddForm({ header } : {
  header: String[]
}) {
  const [isNewEntryOpen, setIsNewEntryOpen] = useState(false)

  return (
    // <form style={{ display: "flex", flexDirection: "column" }}>
    //   <p>New Entry</p>
    //   <label htmlFor="name">{header[0]}{" Name"}</label>
    //   <input id="name" type="text" />
    //   <label htmlFor="amount">{"Amount ("}{header[1]}{")"}</label>
    //   <input id="amount" type="text" />
    //   <label htmlFor="cost">{"Cost ("}{header[2]}{"/"}{header[1]}{")"}</label>
    //   <input id="cost" type="text" />
    //   <label htmlFor="total">Total</label>
    //   <input id="total" type="text" />
    // </form>
    
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
          <DialogDescription>Enter the details for your new accounting entry.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="amount">Amount</Label>
            <Input id="amount" type="number" step="0.01" />
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
