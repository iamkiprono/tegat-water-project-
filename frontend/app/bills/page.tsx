"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useToast } from "@/components/ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { AddReadningComponent } from "../components/AddReadingConponent";
import { InvoiceDialog } from "../components/InvoiceDialog";
import PaymentComponent from "../components/PaymentComponent";
import { farmerType } from "../types";
import NextTable from "../components/Table";

 

const Page = () => {
  const router = useRouter();

  const { toast } = useToast();

  const url = process.env.NEXT_PUBLIC_URL;

  const [month, setMonth] = useState("January");
  const [year, setYear] = useState(2024);
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);

  const [addReading, setAddReading] = useState(false);

  const [pageNumber, setPageNumber] = useState(1);

  const [farmers, setFarmers] = useState<(typeof farmerType)[]>([]);

  const getFarmers = async () => {
    try {
      setLoading(true);
      // const res = await fetch("https://milimani-api.onrender.com/farmers/bills");
      const res = await fetch(`${url}/farmers/bills?page=${pageNumber}&limit=10`);
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

  const updateReading = async (id: number, value: number) => {
    try {
      setAddReading(true);
      const res = await fetch(`${url}/readings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, value }),
      });
      setAddReading(false);

      const data = await res.json();
      getFarmers();

      toast({
        title: "Reading added",
        description: "Reading updated succesfully",
      });
      console.log(data);
    } catch (error) {
      setAddReading(false);
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      }
    }
  };
  ``;

  useEffect(() => {
    getFarmers();
  }, [pageNumber]);

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
    <div className="w-full">
      <NextTable/>
      <div className="flex justify-around items-center   w-full ">
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
        <div></div>
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
        <Link
          href={"/dashboard"}
          className="border px-6 py-2 my-4 bg-black text-white hover:bg-white hover:text-black "
        >
          Dashboard
        </Link>

        <InvoiceDialog />
        {/* <Link
          href={"/invoices"}
          className="border px-6 py-2 my-4 bg-black text-white hover:bg-white hover:text-black "
        >
          Invoices
        </Link> */}
        {/* <div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Search Name or Plot No"
            className="border px-4 py-2"
            type="search"
          />
        </div> */}
      </div>

      <div className="max-h-[90vh] p-6">
        {loading ? (
          <div className="h-[90vh] flex flex-col items-center justify-center">
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Loading....
          </div>
        ) : (
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
                      <td className="p-3 border border-gray-300">
                        {(pageNumber - 1) * 10 + (i + 1)}
                      </td>
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
                        <AddReadningComponent
                          loading={addReading}
                          name={farmer.name}
                          month={farmer.month}
                          currentId={farmer.currentId}
                          currentValue={farmer.current}
                          update={updateReading}
                        />
                        {/* <button
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
                      </button> */}
                      </td>
                      <td className="p-3 border border-gray-300">
                        {farmer.prev} m<sup>3</sup>
                      </td>
                      <td className="p-3 border border-gray-300 ">
                        {farmer.count} m<sup>3</sup>
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
                        (farmer) =>
                          farmer.month === month && farmer.year === year
                      )
                      .reduce((acc, curr) => acc + curr.monthlyBill, 0)
                      .toLocaleString()}
                    /=
                  </td>
                )}
                <td className="p-3 border border-gray-300"></td>
                <td className="p-3 border border-gray-300"></td>
                <td className="p-3 border border-gray-300">
                  {amundue
                    .reduce((acc, curr) => acc + curr, 0)
                    .toLocaleString()}
                  /=
                </td>
              </tr>
            </tbody>
          </table>
        )}

        <div className="px-6 py-2 border flex gap-2">
          {Array.from(new Array(15)).map((no, i) => {
            return (
              <button
                onClick={(e) => setPageNumber(i + 1)}
                className={`border px-4 py-2 ${
                  pageNumber === i + 1 ? "bg-black text-white" : ""
                }`}
                key={no}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
