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
  year: 2023,
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
      date: new Date(),
      paymentType: "MPESA",
      farmerId: 1,
    },
  ],
};

const Page = () => {
  const router = useRouter();

  const url = process.env.NEXT_PUBLIC_URL;

  const [month, setMonth] = useState("January");
  const [year, setYear] = useState(2024);
  const [name, setName] = useState("");

  const [farmers, setFarmers] = useState<(typeof farmerType)[]>([]);
  const getFarmers = async () => {
    try {
      // const res = await fetch("https://milimani-api.onrender.com/farmers/bills");
      const res = await fetch(`${url}/farmers/bills`);
      const data = await res.json();
      if (!res.ok) {
        throw Error(data.error);
      }
      console.log({ data });
      setFarmers(data);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
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

  const amundue: number[] = [];

  const calculatesSomething = (
    x: (typeof farmerType)[],
    y: {
      name: string;
      farmerId: number;
      plotNo: string;
      currentId: number;
      month: string;
      current: number;
      year: number;
      prev: number;
      count: number;
      extraCount: number;
      extraCharge: number;
      standingCharge: number;
      monthlyBill: number;
      paid: number;
      amountDue: number;
      payments: {
        id: number;
        transactionId: string;
        amount: number;
        date: Date;
        paymentType: string;
        farmerId: number;
      }[];
    }
  ) => {
    const due =
      x
        .filter((farm) => farm.farmerId === y.farmerId)
        .reduce((acc, cur) => acc + cur.monthlyBill, 0) - y.paid;

    amundue.push(due);

    return due;
  };

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
            <option className="px-6 py-2" value="May">
              May
            </option>
            <option className="px-6 py-2" value="June">
              June
            </option>
            <option className="px-6 py-2" value="July">
              July
            </option>
            <option className="px-6 py-2" value="August">
              August
            </option>
            <option className="px-6 py-2" value="September">
              September
            </option>

            <option className="px-6 py-2" value="October">
              October
            </option>
            <option className="px-6 py-2" value="November">
              November
            </option>
            <option className="px-6 py-2" value="December">
              December
            </option>
          </select>
          <select
            onChange={(e) => setYear(parseInt(e.target.value))}
            className="border px-6 py-2 my-4"
            name=""
            id=""
            value={year}
          >
            <option className="px-6 py-2" value={"2023"}>
              2023
            </option>
            <option className="px-6 py-2" value={"2024"}>
              2024
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

      <div className="overflow-x-auto max-h-[90vh]">
        <table className="min-w-full border-collapse border border-gray-300 ">
          <thead className="w-screen sticky top-0 ">
            <tr className="">
              <th className="p-3 text-left bg-gray-100 border border-gray-300 ">
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
              .filter((farmer) => farmer.year === year)
              .filter((farmer) => farmer.month === month)
              .map((farmer, i) => {
                return (
                  <tr
                    className={`${i % 2 === 0 ? "bg-gray-200" : ""}`}
                    key={farmer.plotNo}
                  >
                    <td className="p-3 border border-gray-300">{i + 1}</td>
                    <td className="p-3 border border-gray-300 font-bold">
                      {farmer.name}
                    </td>
                    <td className="p-3 border border-gray-300">
                      {farmer.plotNo}
                    </td>
                    <td className="p-3 border border-gray-300">
                      {farmer.month}
                    </td>
                    <td className="p-3 border border-gray-300 font-bold">
                      {farmer.current} m<sup>3</sup>
                      <button
                        onClick={() => {
                          const value = prompt(
                            `Enter ${farmer.month} reading for ${farmer.name}`
                          );
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
                      {farmer.prev} m3
                    </td>
                    <td className="p-3 border border-gray-300 ">
                      {farmer.count} m3
                    </td>
                    <td className="p-3 border border-gray-300">
                      {farmer.extraCount}
                    </td>
                    <td className="p-3 border border-gray-300">
                      {farmer.extraCharge}
                    </td>
                    <td className="p-3 border border-gray-300">
                      {farmer.standingCharge}/=
                    </td>
                    <td className="p-3 border border-gray-300 font-bold">
                      {farmer.monthlyBill.toLocaleString()}/=
                    </td>
                    <td className="p-3 border border-gray-300 font-bold">
                      {farmers
                        .filter((farm) => farm.farmerId === farmer.farmerId)
                        .reduce((acc, cur) => acc + cur.monthlyBill, 0)
                        .toLocaleString()}
                      /=
                    </td>
                    <td className="p-3 border font-bold  flex items-center  gap-2">
                      {farmer.paid.toLocaleString()}/=
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

                    <td className="p-3 border border-gray-300 font-bold">
                      {
                        calculatesSomething(farmers, farmer)

                        // (
                        //   farmers
                        //     .filter((farm) => farm.farmerId === farmer.farmerId)
                        //     .reduce((acc, cur) => acc + cur.monthlyBill, 0) -
                        //   farmer.paid
                        // ).toLocaleString()
                      }
                      /=
                    </td>
                  </tr>
                );
              })}
            <tr className="sticky bottom-0 bg-gray-400 text-black font-bold text-lg">
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
                    .filter(
                      (farmer) => farmer.month === month && farmer.year === year
                    )
                    .reduce((acc, curr) => acc + curr.monthlyBill, 0)
                    .toLocaleString()}
                  /=
                </td>
              )}
              <td className="p-3 border border-gray-300"></td>
              <td className="p-3 border border-gray-300"></td>
              <td className="p-3 border border-gray-300">
                {amundue.reduce((acc, curr) => acc + curr, 0).toLocaleString()}
                /=
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
