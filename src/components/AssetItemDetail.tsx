"use client";
import React from "react";
import { Image } from "@nextui-org/react";
import {
  processItemHistory,
  processPayload,
} from "@/services/commonfunc.service";

const AssetItemDetail = ({}) => {
  const payload = [
    {
      id: "6698dabe868b2579766a6178",
      allAssets: [
        {
          categoryId: "6698da71868b2579766a6177",
          name: "Monitor A",
          subCategories: {
            name: "Dell-3440",
            logo: "",
            model: "",
          },
        },
      ],
      status: null,
      purchase_date: null,
      quantity: null,
      unit_price: null,
      stock_date: null,
      img_url: null,
      remark: null,
    },
    {
      id: "6698e00259cfc60b17356e0a",
      allAssets: [
        {
          categoryId: "6698b4bbdd3f8e324988cf37",
          name: "phone",
          subCategories: {
            year: "2023",
            model: "Camintel-ip Phone",
          },
        },
      ],
      status: null,
      purchase_date: null,
      quantity: null,
      unit_price: null,
      stock_date: null,
      img_url: null,
      remark: null,
    },
  ];

  const processedData = processPayload(payload);
  console.log("processedData = ", processedData);
  return (
    <>
      <div className="flex justify-start items-start gap-5">
        <Image
          isBlurred
          isZoomed
          width={150}
          alt="NextUI Fruit Image with Zoom"
          src="https://img.freepik.com/free-vector/computer_53876-35112.jpg?w=826&t=st=1721622939~exp=1721623539~hmac=7e2dfa91dceb96080e217ce8a3069bb487c749c41eda86b985944b312ff377cc"
        />
        <div className="w-full grid grid-cols-2 justify-between">
          <div>
            <h1 className="font-bold text-[14px]">Name</h1>
            <h1 className="font-normal text-gray-500 text-[14px]">
              Monitor Dell-3440
            </h1>
          </div>
          <div>
            <h1 className="font-bold text-[14px]">Category</h1>
            <h1 className="font-normal text-gray-500 text-[14px]">Monitor</h1>
          </div>    
        </div>
      </div>
    </>
  );
};

export default AssetItemDetail;
