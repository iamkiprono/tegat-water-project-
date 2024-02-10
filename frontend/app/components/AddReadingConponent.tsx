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
import { ReloadIcon } from "@radix-ui/react-icons";


export function AddReadningComponent({
  name,
  month,
  update,
  currentValue,
  currentId,
  loading,
}: {
  name: string;
  month: string;
  update: (id: number, value: number) => void;
  currentValue: number;
  currentId: number;
  loading: boolean;
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
            <p>{name}</p>
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
          <Button onClick={() => update(currentId, value)} type="submit">
            {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            {!loading && "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
