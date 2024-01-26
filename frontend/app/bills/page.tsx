"use client";

import React, { useEffect, useState } from "react";
import DrawerComponent from "../components/DrawerComponent";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import PaymentComponent from "../components/PaymentComponent";

export const farmerType = {
  name: "Justine Langat",
  farmerId: 1,
  plotNo: "24",
  currentId: 0,
  month: "February",
  current: 35,
  prev: 23,
  count: 12,
  extraCount: 2,
  extraCharge: 100,
  standingCharge: 400,
  monthlyBill: 500,
  paid: 0,
  amountDue: 500,
  payments: [
    {
      id: 4,
      transactionId: "",
      amount: 500,
      date: "2023-12-19T11:16:29.475Z",
      paymentType: "MPESA",
      farmerId: 1,
    },
  ],
};

const Page = () => {
  const router = useRouter();

  const url = "http://localhost:5000";

  const [month, setMonth] = useState("January");
  const [name, setName] = useState("");

  const [farmers, setFarmers] = useState<(typeof farmerType)[]>([]);
  const getFarmers = async () => {
    try {
      // const res = await fetch("https://milimani-api.onrender.com/farmers/bills");
      const res = await fetch(`${url}/farmers/bills`);
      const data = await res.json();
      setFarmers(data);
    } catch (error) {}
  };

  const updateReading = async (id: number, value: number) => {
    try {
      const res = await fetch(`${url}/readings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, value }),
      });

      const data = await res.json();
      getFarmers();

      console.log(data);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };
  ``;

  useEffect(() => {
    getFarmers();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <select
            onChange={(e) => setMonth(e.target.value)}
            className="border px-6 py-2 my-4"
            name=""
            id=""
          >
            <option className="px-6 py-2" value="January">
              January
            </option>
            <option className="px-6 py-2" value="February">
              February
            </option>
            <option className="px-6 py-2" value="March">
              March
            </option>
            <option className="px-6 py-2" value="April">
              April
            </option>
          </select>
        </div>
        <div>
          <button
            onClick={() => {
              getFarmers();
            }}
            className="border px-6 py-2 my-4 bg-black text-white hover:bg-white hover:text-black "
          >
            Refresh
          </button>
        </div>
        <div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Search Name or Plot No"
            className="border px-4 py-2"
            type="search"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="p-3 text-left bg-gray-100 border border-gray-300">
                No
              </th>
              <th className="p-3 text-left bg-gray-100 border border-gray-300">
                Name
              </th>
              <th className="p-3 text-left bg-gray-100 border border-gray-300">
                Plot No
              </th>
              <th className="p-3 text-left bg-gray-100 border border-gray-300">
                Month
              </th>
              <th className="p-3 text-left bg-gray-100 border border-gray-300">
                Curr Reading
              </th>
              <th className="p-3 text-left bg-gray-100 border border-gray-300">
                Prev Reading
              </th>
              <th className="p-3 text-left bg-gray-100 border border-gray-300">
                Count
              </th>
              <th className="p-3 text-left bg-gray-100 border border-gray-300">
                Extra Count
              </th>
              <th className="p-3 text-left bg-gray-100 border border-gray-300">
                Extra Charge
              </th>
              <th className="p-3 text-left bg-gray-100 border border-gray-300">
                Standing Charge
              </th>
              <th className="p-3 text-left bg-gray-100 border border-gray-300">
                Monthly bill<br></br>{" "}
                <span className="italic font-light">({month})</span>
              </th>
              <th className="p-3 text-left bg-gray-100 border border-gray-300">
                Total <br></br>{" "}
                <span className="italic font-light">(all months)</span>
              </th>
              <th className="p-3 text-left bg-gray-100 border border-gray-300">
                Total Paid
              </th>

              <th className="p-3 text-left bg-gray-100 border border-gray-300">
                Amount Due
              </th>
            </tr>
          </thead>
          <tbody>
            {farmers
              .filter(
                (farmer) =>
                  farmer.name
                    .toLocaleLowerCase()
                    .includes(name.toLocaleLowerCase()) ||
                  farmer.plotNo
                    .toLocaleLowerCase()
                    .includes(name.toLocaleLowerCase())
              )
              .filter((farmer) => farmer.month === month)
              .map((farmer, i) => {
                return (
                  <tr key={farmer.plotNo}>
                    <td className="p-3 border border-gray-300">{i + 1}</td>
                    <td className="p-3 border border-gray-300">
                      {farmer.name}
                    </td>
                    <td className="p-3 border border-gray-300">
                      {farmer.plotNo}
                    </td>
                    <td className="p-3 border border-gray-300">
                      {farmer.month}
                    </td>
                    <td className="p-3 border border-gray-300">
                      {farmer.current}
                      <button
                        onClick={() => {
                          const value = prompt("Enter current reading");
                          if (value) {
                            updateReading(farmer.currentId, parseInt(value));
                          }
                        }}
                        className="px-2 border ml-2"
                      >
                        +
                      </button>
                    </td>
                    <td className="p-3 border border-gray-300">
                      {farmer.prev}
                    </td>
                    <td className="p-3 border border-gray-300">
                      {farmer.count}
                    </td>
                    <td className="p-3 border border-gray-300">
                      {farmer.extraCount}
                    </td>
                    <td className="p-3 border border-gray-300">
                      {farmer.extraCharge}
                    </td>
                    <td className="p-3 border border-gray-300">
                      {farmer.standingCharge}
                    </td>
                    <td className="p-3 border border-gray-300">
                      {farmer.monthlyBill}
                    </td>
                    <td className="p-3 border border-gray-300">
                      {farmers
                        .filter((farm) => farm.plotNo === farmer.plotNo)
                        .reduce((acc, cur) => acc + cur.monthlyBill, 0)}
                    </td>
                    <td className="p-3 border border-gray-300 flex items-center  gap-2">
                      {farmer.paid}
                      {/* <button  onClick={()=>alert(farmer.farmerId)} className="ml-4 border rounded px-1">+</button> */}

                      {/* <DrawerComponent
                        id={farmer.farmerId}
                        name={farmer.name}
                      /> */}
                      <PaymentComponent
                        id={farmer.farmerId}
                        name={farmer.name}
                        payments={farmer.payments}
                      />
                    </td>

                    <td className="p-3 border border-gray-300">
                      {farmers
                        .filter((farm) => farm.plotNo === farmer.plotNo)
                        .reduce((acc, cur) => acc + cur.monthlyBill, 0) -
                        farmer.paid}
                    </td>
                  </tr>
                );
              })}
            <tr>
              {!name && <td className="p-3 border border-gray-300">Total</td>}
              <td className="p-3 border border-gray-300"></td>
              <td className="p-3 border border-gray-300"></td>
              <td className="p-3 border border-gray-300"></td>
              <td className="p-3 border border-gray-300"></td>
              <td className="p-3 border border-gray-300"></td>
              <td className="p-3 border border-gray-300"></td>
              <td className="p-3 border border-gray-300"></td>
              <td className="p-3 border border-gray-300"></td>
              <td className="p-3 border border-gray-300"></td>
              {!name && (
                <td className="p-3 border border-gray-300 font-bold">
                  {farmers
                    .filter((farmer) => farmer.month === month)
                    .reduce((acc, curr) => acc + curr.monthlyBill, 0)
                    .toLocaleString()}
                </td>
              )}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
