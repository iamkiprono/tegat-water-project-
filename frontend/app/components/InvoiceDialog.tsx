import { Button } from "@/components/ui/button";
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
import Link from "next/link";
import { useState } from "react";

export function InvoiceDialog() {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Generate Invoices</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Generate Invoices for:</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Month
            </Label>
            <select
              className="border px-2 rounded"
              required
              onChange={(e) => setMonth(e.target.value)}
              name=""
              id=""
            >
              <option value=""></option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
            <Label htmlFor="name" className="text-right">
              Year
            </Label>
            <select
              className="border px-2 rounded"
              required
              onChange={(e) => setYear(e.target.value)}
              name=""
              id=""
            >
              <option value=""></option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4"></div>
        </div>
        <DialogFooter>
          <Link href={`/invoices?month=${month}&year=${year}`}>
            <Button type="submit">Generate</Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
