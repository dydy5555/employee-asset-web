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

const category = [
  { key: "laptop", label: "Laptop" },
  { key: "phone", label: "Phone" },
  { key: "monitor", label: "Monitor" },
];

const INITIAL_VISIBLE_COLUMNS = ["asset_type", "asset_name", "type", "action"];

export const DataContext = createContext();

function AssestByUserList({ clickUser }) {
  const [filterValue, setFilterValue] = React.useState("");
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const [assetProperties, setAssetProperties] = useState([]);
  const data = useContext(clickUser);

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
      assetProperties.flatMap((category) =>
        category.subCategories?.flatMap((subCategory) =>
          Object.keys(subCategory)
        )
      )
    ),
  ];

  useEffect(() => {
    clickUser.map((items) => {
      setAssetProperties(items.allAssets);
    });
  }, [assetProperties, subCategoryKeys]);
  console.log(subCategoryKeys);
  return (
    <div className="w-full text-center h-full">
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
                className="w-[400px] dark:block"
              />

              <p className="text-lg text-gray-400">No Asset</p>
            </div>
          </div>
        </>
      )}

      <div>
        {assetProperties.map((category, i) => (
          <>
            <>
              {category.subCategories.map((subCategory, index) => (
                <div className=" text-[16px] flex" key={index}>
                  {index === 0 && (
                    <>
                      <div className="w-[100px] pl-5 text-center py-2">
                        {i + 1}
                      </div>
                      <div
                        className="w-full py-2"
                        rowSpan={category.subCategories.length}
                      >
                        {category.name}
                      </div>
                    </>
                  )}
                  {subCategoryKeys.map((key) => (
                    <>
                      <div className="w-full py-2" key={key}>
                        {subCategory[key] || "-"}
                      </div>
                    </>
                  ))}
                </div>
              ))}
            </>
          </>
        ))}
      </div>
    </div>
  );
}

export default AssestByUserList;
