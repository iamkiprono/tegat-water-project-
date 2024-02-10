"use client";

import React, { useEffect, useState } from "react";
import { farmerType } from "../bills/page";

const Invoices = () => {
  const url = process.env.NEXT_PUBLIC_URL;

  const [farmers, setFarmers] = useState<(typeof farmerType)[]>([]);

  const [loading, setLoading] = useState(false);

  const [month, setMonth] = useState("January");
  const [year, setYear] = useState(2024);
  const [name, setName] = useState("");

  const [pageNumber, setPageNumber] = useState(3);

  const getFarmers = async () => {
    try {
      setLoading(true);
      // const res = await fetch("https://milimani-api.onrender.com/farmers/bills");
      const res = await fetch(`${url}/farmers/bills?page=${pageNumber}`);
      const data = await res.json();
      if (!res.ok) {
        throw Error(data.error);
      }
      console.log({ data });
      setFarmers(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) alert(error.message);
    }
  };

  useEffect(() => {
    getFarmers();
  }, [pageNumber]);

  return (
    <div className="max-w-7xl m-auto  p-6">
      {farmers
        .filter(
          (farmer) =>
            farmer.name
              .toLocaleLowerCase()
              .includes(name.toLocaleLowerCase()) ||
            farmer.plotNo.toLocaleLowerCase().includes(name.toLocaleLowerCase())
        )
        .filter((farmer) => farmer.year === year)
        .filter((farmer) => farmer.month === month)
        .map((farmer, i) => {
          return (
            <div
              key={farmer.farmerId}
              className="border  mb-8 p-2 flex flex-col gap-10 relative"
            >
              <p className="absolute top-56 right-40">
                Due date:
                <span className="font-bold my-2">Sat Feb 10 2024</span>
              </p>
              <div className="">
                <p className="text-center font-bold text-lg">INVOICE</p>
                <p className="text-center font-bold">MILIMANI WATER PROJECT</p>
                <p className="text-center">P.O BOX 91-20102, ELBURGON</p>
                <p className="text-center">
                  Motto:{" "}
                  <span className="italic">Clean water for better life</span>
                </p>

                <p className="">
                  Account Name:
                  <span className="font-bold my-2">{farmer.name}</span>
                  {/* <span className="font-bold my-2">${card.names_}</span> */}
                </p>
                <p className="">
                  Date:
                  <span className="font-bold my-2">
                    {new Date().toDateString()}
                  </span>
                </p>
                <div className="flex gap-20 mt-4">
                  <div>
                    <p className="">
                      Current Reading:
                      <span className="font-bold my-2">
                        {farmer.current} m<sup>3</sup>
                        {/* ${card.current_reading} m<sup>3</sup> */}
                      </span>
                    </p>
                    <p className="">
                      Previous Reading:
                      <span className="font-bold my-2">
                        {farmer.prev} m<sup>3</sup>
                        {/* ${card.previous_reading} m<sup>3</sup> */}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="">
                      Consumed Units:
                      <span className="font-bold my-2">
                        {farmer.count} m<sup>3</sup>
                        {/* ${card.count_} m<sup>3</sup> */}
                      </span>
                    </p>
                    <p className="">
                      Consumption Month:
                      <span className="font-bold my-2">
                        {farmer.month}{" "}
                        {/* ${card.month ? card.month : "January"} */}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="">
                      Monthly Bill:
                      <span className="font-bold my-2">
                        {farmer.monthlyBill}/=
                      </span>
                      {/* <span className="font-bold my-2">${card.monthly_bill}/=</span> */}
                    </p>

                    <p className="">
                      Previous Balance:
                      <span className="font-bold my-2">
                        {farmers
                          .filter((farm) => farm.farmerId === farmer.farmerId)
                          .reduce((acc, cur) => acc + cur.monthlyBill, 0) -
                          farmer.paid -
                          farmer.monthlyBill}
                        /=
                      </span>
                      {/* <span className="font-bold my-2">${card.previous_balance}/=</span> */}
                    </p>
                  </div>

                  <p className="text-xl border p-2 w-fit">
                    Total Amount Due:
                    <span className="font-bold my-2">
                      {(
                        farmers
                          .filter((farm) => farm.farmerId === farmer.farmerId)
                          .reduce((acc, cur) => acc + cur.monthlyBill, 0) -
                        farmer.paid
                      ).toLocaleString()}
                      /=
                    </span>
                    {/* <span className="font-bold my-2">${card.amount_due}/=</span> */}
                  </p>
                </div>
              </div>
              <div>
                <p className="font-bold">NOTE</p>
                <ol>
                  <li>
                    1. All payments to be made through
                    <span className="font-bold">
                      BANK AGENT: Co-op Account No 01134721103900
                    </span>
                    .
                  </li>
                  <li>
                    2. Please pay your bill within due date to avoid
                    disconnection.
                  </li>
                  <li>
                    3. Once your water is disconnected for late payments. It is
                    illegal to reconnect on your own.
                  </li>
                  <li>
                    4. Normal reconnection fee is{" "}
                    <span className="font-bold">Kshs. 1000</span>
                  </li>
                  <li>
                    5. It is <span className="font-bold">ILLEGAL</span> to sell
                    water. If implicated your water will be disconnected.
                    Reconnection will be subject to approval of the management
                    committee.
                  </li>
                </ol>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Invoices;
