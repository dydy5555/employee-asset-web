import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import Image from "next/image";
import NoImage from "../../../public/images/no_app.jpg";
import { fetchAllAssetsOfUserId } from "@/services/assetUser.service";
interface SubCategory {
  name: string;
  inch: number;
}

export default function TableOne() {
  const [allAssetUser, setAllAssetUser] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAllAssetsOfUserId(); // Replace with your API call
        if (response?.status === 200) {
          setAllAssetUser(response?.data?.payload || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error state if needed
      }
    };

    fetchData();
  }, []);
  console.log("jonh son", allAssetUser);

  return (
    <div className="w-full rounded-xl border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Material Usage
      </h4>
      <Table>
        <TableHeader>
          <TableColumn> Material</TableColumn>
          <TableColumn> Inform-Material</TableColumn>
          <TableColumn> Total Usage</TableColumn>
          <TableColumn>Remark</TableColumn>
        </TableHeader>
        <TableBody>
          {allAssetUser.map((allAsset: any) =>
            allAsset.assetUsers.map((assetUser: any) =>
              assetUser.allAssets.map((asset: any) =>
                    <TableRow>
                      <TableCell>{asset.name}</TableCell>
                      <TableCell>{""}</TableCell>
                      <TableCell>{""}</TableCell>
                      <TableCell>{assetUser.remark}</TableCell>
                    </TableRow>
              )
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
}
