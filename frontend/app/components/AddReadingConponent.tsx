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
import { useState } from "react";

export function AddReadningComponent({
  name,
  month,
  update,
  currentValue,
  currentId,
}: {
  name: string;
  month: string;
  update: (id: number, value: number) => void;
  currentValue: number;
  currentId: number;
}) {
  const [value, setValue] = useState(currentValue);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">+</Button>
      </DialogTrigger>
      <DialogContent
        onSubmit={() => update(currentId, value)}
        className="sm:max-w-[425px]"
      >
        <DialogHeader>
          <DialogTitle>
            Add {month} Reading for {name}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
         {name}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Reading
            </Label>
            <Input
              onChange={(e) => {
                setValue(parseInt(e.target.value));
              }}
              placeholder={currentValue.toString()}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => update(currentId, value)} type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
