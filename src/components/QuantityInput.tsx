import { Button, Input } from "@nextui-org/react";
import React from "react";

export default function QuantityInput({ quantity, setQuantity }) {
  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const increment = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
    }
  };
  return (
    <div>
      <label className="block text-[14.4px] font-medium text-gray-500 dark:text-white">
        <div className="mb-2 flex justify-start items-center gap-1">
          <span>Quantity</span>
        </div>
      </label>
      <div className="flex items-center">
        <Button
          isIconOnly
          onClick={decrement}
          className="bg-white border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center"
        >
          <span className="text-xl">-</span>
        </Button>
        <Input
          type="text"
          value={quantity.toString().padStart(2, "0")}
          onChange={handleChange}
          className="w-12 mx-2 text-center"
          classNames={{
            input: "text-center",
            inputWrapper: "bg-transparent",
          }}
        />
        <Button
          isIconOnly
          onClick={increment}
          className="bg-white border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center"
        >
          <span className="text-xl">+</span>
        </Button>
      </div>
    </div>
  );
}
