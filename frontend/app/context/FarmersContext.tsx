"use client";

import React, {
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { farmerType } from "../types";

type props = {
  farmers: (typeof farmerType)[];
  loading: boolean;
  setPageNumber: (value: SetStateAction<number>) => void;
};

export const FarmerContext = createContext<props | null>(null);

export const FarmerContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState(false);

  const [pageNumber, setPageNumber] = useState(3);

  const [farmers, setFarmers] = useState<(typeof farmerType)[]>([]);

  const url = process.env.NEXT_PUBLIC_URL;

  const getFarmers = async () => {
    try {
      setLoading(true);
      // const res = await fetch("https://milimani-api.onrender.com/farmers/bills");
      const res = await fetch(
        `${url}/farmers/bills?page=${pageNumber}&type=INVOICE`
      );
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
    <FarmerContext.Provider value={{ farmers, loading, setPageNumber }}>
      {children}
    </FarmerContext.Provider>
  );
};
