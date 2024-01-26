"use client";

import React, { useState, useRef, useEffect } from "react";

const InputComponent = () => {
  const [paragraphs, setParagraphs] = useState([""]);
  const inputRefs = useRef([]);

  useEffect(() => {
    // Focus on the last input field when it's added
    if (inputRefs.current && inputRefs.current[inputRefs.current.length - 1]) {
      inputRefs.current[inputRefs.current.length - 1].focus();
    }
  }, [paragraphs]);

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newParagraphs = [...paragraphs];
    newParagraphs[index] = event.target.value + "\n"; // Append '\n' to the input value
    setParagraphs(newParagraphs);
  };

  const handleEnterPress = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      const newParagraphs = [...paragraphs];
      newParagraphs.splice(index + 1, 0, "");
      setParagraphs(newParagraphs);
    }
  };

  const stringArray = paragraphs.join("");
  const paragraphArray = stringArray.split("\n");

  return (
    <div className="flex flex-col max-w-7xl m-auto">
      {JSON.stringify(stringArray)}
      {paragraphArray.map((paragraph, index) => {
        return (
          <p key={index} className="my-2">
            {paragraph}
          </p>
        );
      })}
      {paragraphs.map((paragraph, index) => (
        <input
          className="border p-2 my-2"
          key={index}
          type="text"
          value={paragraph}
          onChange={(event) => handleInputChange(index, event)}
          onKeyDown={(event) => handleEnterPress(index, event)}
          ref={(input) => {
            inputRefs.current[index] = input;
          }}
        />
      ))}

      <button
        onClick={() => console.log(`${stringArray.toString()}`)}
        className="px-6 rounded py-2 border bg-[#2d2929] text-white"
      >
        Submit
      </button>
    </div>
  );
};

export default InputComponent;
