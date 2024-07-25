"use client";
import React, { useState } from "react";
import { Input } from "@nextui-org/react";

export default function PriceInput( { price, setPrice }) {
    console.log("price ", price);

  const handlePriceChange = (e) => {
    const value = e.target.value;
    // Allow empty string or numbers with up to two decimal places
    if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
      setPrice(value);
    }
  };
  return (
    <div className="w-full">
      <label className="block text-[14.4px] font-medium text-gray-500 dark:text-white">
        <div className="mb-2 flex justify-start items-center gap-1">
          <span>Price per unit</span>
        </div>
      </label>
      <Input
        type="text"
        label="Price"
        placeholder="0.00"
        value={price}
        onChange={handlePriceChange}
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">$</span>
          </div>
        }
        endContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">USD</span>
          </div>
        }
        className="w-full"
        classNames={{
          input: "text-right",
        }}
      />
    </div>
  );
}
