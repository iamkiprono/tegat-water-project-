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

const PaymentComponent = ({
  payments,
  name,
  id,
}: {
  payments: any;
  name: string;
  id: number;
}) => {

  const url = "http://localhost:5000";


  const [amount, setAmount] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [paymentType, setPaymentType] = useState("BANK");
  const [currentPayments, setCurrentPayments] = useState(payments);

  const addPayment = async () => {
    try {
      // return console.log({amount: parseInt(amount),transactionId,paymentType,id})
      const res = await fetch(`${url}/payments`, {
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
      setCurrentPayments([...currentPayments, data]);
      alert("Payment Added!");

      console.log(data);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  async function deletePayment(id: number) {
    try {
      const res = await fetch(`${url}/payments/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const deletedPayment = await res.json();
      setCurrentPayments(
        currentPayments.filter((payment) => payment.id !== id)
      );
      console.log(deletedPayment);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  }


  const formatDate = (date: Date) => {
    const formatDate = new Date(date);
    const dateString = formatDate.toLocaleDateString();
    const time = formatDate.toLocaleTimeString();
    return `${dateString} at ${time}`;
  }


  return (
    <div>
      <Drawer>
        <DrawerTrigger>
          <div className="bg-[#111827] text-white px-2 rounded">+</div>
        </DrawerTrigger>
        <DrawerContent>
          <div className="p-4 h-[400px] overflow-scroll">
            <p className="font-bold text-xl my-4">{name}</p>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">
                      Transaction ID
                    </th>
                    <th className="border border-gray-300 px-4 py-2">Amount</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Date Paid
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Transaction Type
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentPayments.map((payment) => {
                    return (
                      <tr key={payment.id}>
                        <td className="border border-gray-300 px-4 py-2">
                          {payment.transactionId}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 font-bold">
                          {payment.amount}/=
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {formatDate(payment.date)}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {payment.paymentType}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <Button
                            onClick={() => {
                              if (
                                confirm(
                                  "Are you sure you want to delete this record?"
                                )
                              ) {
                                deletePayment(payment.id);
                              }
                            }}
                            variant={"destructive"}
                          >
                            Delete record
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <p className="font-bold my-4 text-lg">Add payment</p>
              <table className="min-w-full border-collapse border border-gray-300 my-6">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">
                      Transaction ID
                    </th>
                    <th className="border border-gray-300 px-4 py-2">Amount</th>

                    <th className="border border-gray-300 px-4 py-2">
                      Transaction Type
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300  font-bold">
                      <input
                        onChange={(e) => setTransactionId(e.target.value)}
                        className="w-full h-full px-4 py-2"
                        type="text"
                      />
                    </td>
                    <td className="border border-gray-300 ">
                      <input
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full h-full px-4 py-2"
                        type="text"
                      />
                    </td>
                    <td className="border border-gray-300 ">
                      <select
                        className="w-full border rounded p-2 "
                        name=""
                        id=""
                      >
                        <option value="">BANK</option>
                        <option value="">M-PESA</option>
                        <option value="">CASH</option>
                        <option value="">OTHER</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 ">
                      <Button onClick={() => addPayment()}>Submit</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
        
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default PaymentComponent;
