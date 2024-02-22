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
import DeleteAlert from "./DeleteAlert";

import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";

const PaymentComponent = ({
  payments,
  name,
  id,
}: {
  payments: {
    id: number;
    transactionId: string;
    amount: number;
    date: Date;
    paymentType: string;
    farmerId: number;
  }[];
  name: string;
  id: number;
}) => {
  const url = process.env.NEXT_PUBLIC_URL;

  const { toast } = useToast();

  const [amount, setAmount] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [paymentType, setPaymentType] = useState("BANK");
  const [currentPayments, setCurrentPayments] = useState(payments);

  const [loading, setLoading] = useState(false);

  const addPayment = async () => {
    try {
      setLoading(true);
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
      setLoading(false);

      const data = await res.json();
      if (!res.ok) {
        throw Error(data.error);
      }
      setCurrentPayments([...currentPayments, data]);
      toast({
        title: "Success",
        description: "Payment added successfully",
      });
      console.log(data);
    } catch (error) {
      setLoading(false);
      if (error instanceof Error)
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
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
    const dateString = formatDate.toDateString();
    const time = formatDate.toLocaleTimeString();
    return `${dateString} at ${time}`;
  };

  return (
    <div>
      <Drawer>
        <DrawerTrigger>
          <div className="bg-[#111827] text-white px-2 rounded">+</div>
        </DrawerTrigger>
        <DrawerContent>
          <div className="p-4 h-[400px] overflow-scroll">
            <div className="flex justify-between items-center">
              <p className="font-bold text-xl my-4">{name}</p>
              <Button>View Statement</Button>
            </div>
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
                      <>
                        {payment.amount !== 0 && (
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
                              <DeleteAlert
                                deletePay={deletePayment}
                                id={payment.id}
                              />
                              {/* <Button
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
                              </Button> */}
                            </td>
                          </tr>
                        )}
                      </>
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
                        onChange={(e) => setPaymentType(e.target.value)}
                        className="w-full border rounded p-2 "
                        name=""
                        id=""
                      >
                        <option value="BANK">BANK</option>
                        <option value="M-PESA">M-PESA</option>
                        <option value="CASH">CASH</option>
                        <option value="OTHER">OTHER</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 ">
                      <Button disabled={loading} onClick={() => addPayment()}>
                        {loading && (
                          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {!loading && "Submit payment"}
                      </Button>
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
