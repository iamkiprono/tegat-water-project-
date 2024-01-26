"use client";

import React, { useState } from "react";

const AddFarmer = () => {

  const url = "http://localhost:5000";


  const [name, setName] = useState("");
  const [plotNo, setPlotNo] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${url}/farmers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, plotNo }),
      });
      const newFarmer = await res.json();

      if (!newFarmer.ok) {
        throw Error(newFarmer.error);
      }
      setSubmitted(true);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
        console.error("Error submitting data: ", error);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="plotNo"
          >
            Plot No
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="plotNo"
            type="text"
            placeholder="Enter plot number"
            value={plotNo}
            onChange={(e) => setPlotNo(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
        {submitted && (
          <p className="mt-4 text-green-500">Form submitted successfully!</p>
        )}
      </form>
    </div>
  );
};

export default AddFarmer;
