"use client";

import { useState } from "react";
import { useFarmerContext } from "../hooks/useFarmerContext";

import { farmerType } from "../types";

const Dashboard = () => {
  const { loading, farmers } = useFarmerContext();

  const [month, setMonth] = useState(6);

  const months = [6, 7, 8, 9, 10, 11, 12];

  const items = [
    {
      title: "Pending Bills",
      value:
        farmers
          // .filter((farm) => farm.month === "December")
          .reduce((acc, curr) => acc + curr.monthlyBill, 0) -
        farmers.reduce((acc, curr) => acc + curr.paid, 0),
    },
    { title: "Total Bills for certain month", value: "" },
    {
      title: "Income Per Month",
      value: farmers
        .filter((f) => f.month === "January")
        .map(
          (far) =>
            far.payments

              .map((farme) => {
                return {
                  id: farme.farmerId,
                  tId: farme.id,
                  amount: farme.amount,
                  month: new Date(farme.date).getMonth() + 1,
                };
              })
              .filter((fa) => fa.month === month)
          // .flat()
          // .flat()
        )
        .flat()

        .reduce((acc, curr) => acc + curr.amount, 0),
    },
    {
      title: "Total farmers",
      value: farmers.filter((farmr) => farmr.month === "January").length,
    },
  ];

  return (
    <div className="p-6">
      <div className="flex gap-2 justify-center">
        {months.map((mont, i) => {
          return (
            <div
              onClick={() => setMonth(mont)}
              className="bg-black cursor-pointer text-white p-4 rounded"
              key={i}
            >
              {mont}
            </div>
          );
        })}
      </div>
      <div className="flex justify-around gap-4 flex-wrap">
        {items.map((item, i) => {
          return (
            <div
              className="border rounded p-4 shadow-md h-56 w-80 text-center"
              key={i}
            >
              <p className="text-gray-600">{item.title}</p>
              <p className="text-gray-600">{item.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
