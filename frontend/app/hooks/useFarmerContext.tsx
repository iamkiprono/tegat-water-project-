"use client"

import { useContext } from "react";


import { FarmerContext } from "../context/FarmersContext";


export const useFarmerContext = () => {
  const context = useContext(FarmerContext);
  if (!context) {
    throw Error("useAuthContext must be used inside an AuthContextProvider");
  }
  return context;
};