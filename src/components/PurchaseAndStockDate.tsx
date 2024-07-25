import { DatePicker } from "@nextui-org/react";
import React from "react";

export default function PurchaseAndStockDate({ setPurchaseDate, setStockDate }) {
  const handleChangePurchaseDate = (e) => {
    const formatDateString = (dateObj) => {
      if (!dateObj) {
        return "";
      }
      const year = dateObj.year;
      const month = String(dateObj.month).padStart(2, "0");
      const day = String(dateObj.day).padStart(2, "0");
      return `${year}${month}${day}`;
    };
    const formattedPurchase = formatDateString(e);
    setPurchaseDate(formattedPurchase);
  };

  const handleChangeStockDate = (e) => {
    const formatDateString = (dateObj) => {
      if (!dateObj) {
        return "";
      }
      const year = dateObj.year;
      const month = String(dateObj.month).padStart(2, "0");
      const day = String(dateObj.day).padStart(2, "0");
      return `${year}${month}${day}`;
    };
    const formattedPurchase = formatDateString(e);
    setStockDate(formattedPurchase);
  };
  return (
    <div className="flex justify-between items-center gap-3">
      {/* Purchase date */}
      <div className="w-full">
        <label className="block text-[14.4px] font-medium text-gray-500 dark:text-white">
          <div className="mb-2 flex justify-start items-center gap-1">
            <span>Purchase Date</span>
          </div>
        </label>
        <DatePicker
          variant="flat"
          size="lg"
          fullWidth
          hideTimeZone
          // label="Select purchase date"
          onChange={handleChangePurchaseDate}
          className="w-full"
        />
      </div>
      {/* Stock date */}
      <div className="w-full">
        <label className="block text-[14.4px] font-medium text-gray-500 dark:text-white">
          <div className="mb-2 flex justify-start items-center gap-1">
            <span>Stock Date</span>
          </div>
        </label>
        <DatePicker
          variant="flat"
          size="lg"
          fullWidth
          hideTimeZone
          // label="Select stock date"
          onChange={handleChangeStockDate}
          className="w-full"
        />
      </div>
    </div>
  );
}
