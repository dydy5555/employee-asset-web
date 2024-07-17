import React, { useContext, useEffect, useState } from "react";

import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { SearchNormal1 } from "iconsax-react";
import { ChevronDownIcon } from "../../public/icons/ChevronDownIcon";
import CreateCategory from "./Modals/CreateCategory";
import AddNewAsset from "./Modals/AddNewAsset";
import { columns, asset_user, statusOptions, items } from "../data/data";
import { capitalize } from "../utils/util";
import { createContext } from "vm";
import NoImage from "../../public/images/no_app.jpg";
import Image from "next/image";
import { func_GetByUserID } from "@/services/assets.service";
import ItemDetail from "./Modals/ItemDetail";

const category = [
  { key: "laptop", label: "Laptop" },
  { key: "phone", label: "Phone" },
  { key: "monitor", label: "Monitor" },
];

const INITIAL_VISIBLE_COLUMNS = ["asset_type", "asset_name", "type", "action"];

export const DataContext = createContext();

function AssestByUserList({ clickUser,empInfo }) {
  const [filterValue, setFilterValue] = React.useState("");
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [userID, setUserID] = useState("");
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);
  const [assetUser, setAssetUser] = useState();
  const [assetProperties, setAssetProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [openMod, setOpenMod] = useState(false);
  const [itemsUser, setItemsUser] = useState([]);
  const [empinfo, setEmplInfo] = useState([]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const subCategoryKeys = [
    ...new Set(
      assetUser?.flatMap((item) =>
        item.allAssets.flatMap((category) =>
          category.subCategories ? Object.keys(category.subCategories) : []
        )
      )
    ),
  ];

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      try {
        func_GetByUserID(clickUser).then((res) => {
          setIsLoading(true);
          console.log(res);
          setAssetUser("");
          setAssetUser(res.data?.payload);
          if(subCategoryKeys.length <0){
            setIsLoading(false);
          }
          setIsLoading(false);
        });
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  }, [clickUser]);



  const handleRowClick = () => {
    setItemsUser([]);
    setItemsUser(assetUser);
    setEmplInfo(empInfo)
    setOpenMod(true);
  };


  return (
    <div className="w-full h-full p-5 text-center ">
      {isLoading ? (
        <>
          <div className="absolute w-[60%] h-[60%] flex justify-center items-center text-center">
          <figure className="loader ">
            <div className="dot white"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </figure>
          </div>
        </>
      ) : (
        <>
            {subCategoryKeys.length > 0 ? (
              <div className="flex capitalize text-[16px] rounded-lg w-full  bg-[#F4F4F5]  font-bold text-gray-800">
                <div className=" w-[100px] pl-5 py-2 text-center">No</div>
                <div className=" w-full py-2 text-center">Category</div>
                {subCategoryKeys.map((key) => (
                  <div key={key} className=" w-full py-2 text-center">
                    {key}
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="w-full h-full flex items-center justify-center">
                  <div>
                    <Image
                      src={NoImage}
                      alt="logo"
                      width={400}
                      height={400}
                      className="w-[400px] dark:block"
                    />

                    <p className="text-lg text-gray-400 text-center">No Asset</p>
                  </div>
                </div>
              </>
            )}
            <div onClick={handleRowClick}>
              {assetUser?.map((cate, i) => (
                <>
                  {cate?.allAssets.map((category, index) => (
                    <div key={category.categoryId} className="mb-4 flex">
                      <>
                        <div className="w-[120px] text-center pl-3 py-2">
                          {i + 1}
                        </div>
                        <div className="w-full py-2 capitalize">{category.name || "-" }</div>
                      </>

                      {subCategoryKeys.map((key) => (
                        <div className="w-full py-2" key={key}>
                          {category.subCategories[key] || "-"}
                        </div>
                      ))}
                    </div>
                  ))}
                </>
              ))}
            </div>
        </>
      )}
            <ItemDetail
        setOpenMod={setOpenMod}
        openMod={openMod}
        itemsUser={itemsUser}
        empinfo={empinfo}
      ></ItemDetail>
    </div>
    
  );
}

export default AssestByUserList;
