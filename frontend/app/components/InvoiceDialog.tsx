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
            <select name="" id="">
              <option value="">January</option>
              <option value="">February</option>
            </select>
            <Label htmlFor="name" className="text-right">
              Year
            </Label>
            <select name="" id="">
              <option value="">2023</option>
              <option value="">2024</option>
            </select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4"></div>
        </div>
        <DialogFooter>
          <Link href={"invoices"}>
            <Button type="submit">Generate</Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
