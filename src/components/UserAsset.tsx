"use client";

import { getSession } from "@/api/interceptor";
import { getByUserAndCompany } from "@/services/assets.service";
import { Card, Tab, Tabs } from "@nextui-org/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function UserAsset() {
  const [session, setSession] = useState({});
  const [items, setItems] = useState([]);

  

  useEffect(() => {
    getSession().then((res) => {
      setSession(res);
      getByUserAndCompany(res.userId, res.use_intt_id).then((res) => {
        console.log(res?.data);
        setItems(res?.data.payload);
      });
    });
  }, []);

  console.log({ items });

  const subCategoryKeys = Array.from(
    new Set(
      items?.allAssetOfUser?.flatMap((user) =>
          user.item?.allAssets?.flatMap((j) => Object.keys(j.subCategories))
        )
      )
  );
  // user?.item.allAssets?.flatMap((i) =>
  // console.log(session);
 
  console.log({ subCategoryKeys });

  return (
    <div className="w-full h-full">
      <div className="grid w-full grid-cols-12 gap-10 h-full ">
        <Card className="col-span-6 p-5">
          <div className="flex ">
            <div className="w-2/5 flex  items-center">
              <Image
                width={150}
                height={150}
                src={
                  session.img_url
                    ? session.img_url
                    : "https://i.pinimg.com/564x/81/3c/88/813c8866eb407214f7b74333d0a054b2.jpg"
                }
                alt={session?.employee_name}
                className="w-[200px] h-[200px] object-cover p-1 rounded-full dark:block border-[2px] border-[#378CE7]"
              />
            </div>
            <div className="grid grid-cols-6 w-3/5 gap-6">
              <div className="col-span-2 font-medium flex flex-col justify-center">
                <p className="py-1">Employee </p>
                <p className="py-1">User ID </p>
                <p className="py-1">Position </p>
                <p className="py-1">Company </p>
                <p className="py-1">Department </p>
              </div>

              <div className="col-span-4 flex flex-col justify-center">
                <p className="py-1">{session.flnm}</p>
                <p className="py-1">{session.userId}</p>
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
          </div>
        </Card>
        <Card className="col-span-6 p-5">
            <p>Related application</p>
        </Card>
      </div>

      <div className="mt-5">
        <Tabs
          aria-label="Options"
          size="lg"
          className="w-full"
          fullWidth="true"
        >
          <Tab key="asset" title="Assets">
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
                  {items?.map((user, userIndex) =>
                    user?.allAssetOfUser?.map((i, assetIndex) =>
                      i.item?.allAssets?.map((asset) => (
                        <tr
                          key={`${userIndex}-${i.categoryId}`}
                          className="py-2 border-b"
                        >
                          <td className="py-2 pl-3 text-center">
                            {userIndex + 1}
                          </td>
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
                    )
                  )}
                </tbody>
              </table>
            </Card>
          </Tab>
          <Tab key="music" title="Music">
            <Card className="p-5 min-h-[500px] flex justify-center items-center overflow-auto custom-scroll">
             <p> No data</p>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default UserAsset;
