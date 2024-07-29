"use client";

import { getSession } from "@/api/interceptor";
import { getByUserAndCompany } from "@/services/assets.service";
import { Card, Tab, Tabs } from "@nextui-org/react";
import { Devices } from "iconsax-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const tempUser = {
  userId: "string",
  employee_name: "string",
  img_url: "string",
  team: "string",
  department: "string",
  company: "string",
  use_INNITID: "string",
  allAssetOfUser: [
    {
      id: "string",
      start_date: "string",
      end_date: "string",
      item: {
        id: "string",
        allAssets: [
          {
            categoryId: "string",
            name: "string",
            subCategories: {
              additionalProp1: "string",
              additionalProp2: "string",
              additionalProp3: "string",
            },
            countItem: 0,
          },
        ],
        status: "available",
        problem: "Good",
        purchase_date: "string",
        quantity: 0,
        remain_quantity: 0,
        unit_price: 0,
        stock_date: "string",
        img_url: "string",
        remark: "string",
        solution: "string",
        start_date_repair: "string",
        end_date_repair: "string",
      },
      quantity: 0,
      remark: "string",
    },
    {
      id: "string",
      start_date: "string",
      end_date: "string",
      item: {
        id: "string",
        allAssets: [
          {
            categoryId: "string",
            name: "string",
            subCategories: {
              additionalProp1: "string",
              additionalProp2: "string",
              additionalProp3: "string",
            },
            countItem: 0,
          },
        ],
        status: "available",
        problem: "Good",
        purchase_date: "string",
        quantity: 0,
        remain_quantity: 0,
        unit_price: 0,
        stock_date: "string",
        img_url: "string",
        remark: "string",
        solution: "string",
        start_date_repair: "string",
        end_date_repair: "string",
      },
      quantity: 0,
      remark: "string",
    },
  ],
  total_asset: 0,
};

function UserAsset() {
  const [session, setSession] = useState({});
  const [items, setItems] = useState([]);

  useEffect(() => {
    getSession().then((res) => {
      setSession(res);
      getByUserAndCompany(res.userId, res.use_intt_id).then((res) => {
        console.log(res?.data);
        // setItems(res?.data.payload);
      });
    });
  }, []);

  console.log({ items });

  const subCategoryKeys = Array.from(
    new Set(
      tempUser?.allAssetOfUser?.flatMap((user) =>
        user.item?.allAssets?.flatMap((j) => Object.keys(j.subCategories))
      )
    )
  );
  // user?.item.allAssets?.flatMap((i) =>
  // console.log(session);

  console.log({ subCategoryKeys });

  return (
    <div className="w-full h-full">
      <div>
        <p className="text-2xl font-bold text-[#378CE7] flex gap-3 py-4">
          <Devices size="32" color="#378CE7" /> Your Personal Assets
        </p>
      </div>
      <div className="grid text-sm w-3/6 grid-cols-12 gap-10 h-full ">
        <Card className="col-span-6 p-5">
            <div className="flex gap-5">
              <div className=" font-semibold flex flex-col justify-center">
                <p className="py-1">Position </p>
                <p className="py-1">Company </p>
                <p className="py-1">Department </p>
              </div>

              <div className="flex flex-col justify-center">
                <p className="py-1">{session.jbcl_NM}</p>
                <p className="py-1">
                  {session.use_intt_id && session.use_intt_id == "UTLZ_590"
                    ? "KOSIGN"
                    : "-"}
                </p>
                <p className="py-1">
                  {session.dvsn_NM ? session.dvsn_NM : "-"}
                </p>
              </div>
            </div>
        </Card>
        <Card className="col-span-6 p-5 my-2">
            <div className="">
              <p>Total Assets</p>
            </div>
            <div className="bg-gray-100 rounded-full w-[50px] h-[50px] flex items-center justify-center">
              <div className="text-2xl text-[#378CE7]">
              {tempUser.allAssetOfUser?.length}
              </div>
            </div>
            <div>You have access to all this asset</div>
        </Card>
        
      </div>
      <div className="mt-5">
        <Card className="p-5 min-h-[500px] overflow-auto custom-scroll">
          {" "}
          <table className="w-full text-md border-collapse text-[14px]">
            <thead>
              <tr className="bg-gray-100 py-2  hover:bg-gray-200 hover:cursor-pointer">
                <th
                  className="text-center pl-3 py-2"
                  style={{
                    borderRadius: "10px 0 0 10px",
                    borderColor: "red",
                  }}
                >
                  No
                </th>
                <th
                  className="pl-5 text-left "
                  style={{
                    borderRadius: "0px 0 0 0px",
                    borderColor: "red",
                  }}
                >
                  Category Name
                </th>
                {subCategoryKeys?.map((key, index) => (
                  <th
                    key={index}
                    className="p-2 text-center capitalize"
                    style={{ borderColor: "red" }}
                  >
                    {key}
                  </th>
                ))}
                <th
                  className="p-2 text-center "
                  style={{
                    borderRadius: "0 10px 10px 0",
                    borderColor: "red",
                  }}
                >
                  Remark
                </th>
              </tr>
            </thead>
            <tbody>
              {/* {tempUser?.map((user, userIndex) => */}
              {tempUser?.allAssetOfUser?.map((i, assetIndex) =>
                i.item?.allAssets?.map((asset) => (
                  <tr
                    key={`${assetIndex}-${i.categoryId}`}
                    className="py-2 border-b"
                  >
                    <td className="py-2 pl-3 text-center">{assetIndex + 1}</td>
                    <td className="py-2 pl-6 capitalize">{asset.name}</td>
                    {subCategoryKeys.map((key, subIndex) => (
                      <td
                        key={subIndex}
                        className="p-2 text-center"
                        style={{ borderColor: "red" }}
                      >
                        {asset.subCategories[key] || ""}
                      </td>
                    ))}
                    <td
                      className="p-2 text-center"
                      style={{ borderColor: "red" }}
                    >
                      {i.item.remark}
                    </td>
                  </tr>
                ))
              )}
              {/* )} */}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}

export default UserAsset;
