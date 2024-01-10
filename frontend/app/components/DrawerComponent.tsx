"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useState } from "react";

const DrawerComponent = ({ id, name }: { id: number; name: string }) => {
  const [amount, setAmount] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [paymentType, setPaymentType] = useState("BANK");

  const addPayment = async () => {
    try {
      // return console.log({amount: parseInt(amount),transactionId,paymentType,id})
      const res = await fetch("http://localhost:5000/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          farmerId: id,
          amount: parseInt(amount),
          transactionId,
          paymentType,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw Error(data.error);
      }
      console.log(data);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  return (
    <div>
      <Drawer>
        <DrawerTrigger>
          <div className="bg-[#111827] text-white px-8 rounded">+</div>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Add payment for {name}</DrawerTitle>
            <DrawerDescription>
              This action cannot be undone. {id}
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            <label htmlFor="">Amount:</label>
            <input
              onChange={(e) => setAmount(e.target.value)}

              required
              className="border w-full  my-2 p-2 rounded"
              placeholder="Amount"
              type="number"
            />
            <label htmlFor="">Transaction ID:</label>
            <input
              onChange={(e) => setTransactionId(e.target.value)}
              required
              className="border w-full  my-2 p-2 rounded"
              placeholder="Transaction ID"
              type="text"
            />
            <label htmlFor="">Payment Type:</label>
            <select className="w-full border rounded p-2 my-2" name="" id="">
              <option value="">BANK</option>
              <option value="">M-PESA</option>
              <option value="">CASH</option>
              <option value="">OTHER</option>
            </select>
          </div>
          <DrawerFooter>
            <Button onClick={() => addPayment()}>Submit</Button>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default DrawerComponent;
