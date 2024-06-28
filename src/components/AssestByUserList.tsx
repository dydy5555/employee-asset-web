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

const category = [
  { key: "laptop", label: "Laptop" },
  { key: "phone", label: "Phone" },
  { key: "monitor", label: "Monitor" },
];

const INITIAL_VISIBLE_COLUMNS = ["asset_type", "asset_name", "type", "action"];

export const DataContext = createContext();

function AssestByUserList({clickUser}) {
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

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchNormal1 />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <CreateCategory />
            <AddNewAsset />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex w-full flex-col md:flex-nowrap gap-4 ">
            {/* <Select
              onSelectionChange={handleCategoryChange}
              label="Select an animal"
              className="max-w-xs"
            >
              {category.map((cate) => (
                <SelectItem key={cate.key}>{cate.label}</SelectItem>
              ))}
            </Select> */}
            <span className="text-default-400 text-small">
              Total {items.length} items
            </span>
          </div>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
              <option value="60">60</option>
              <option value="70">70</option>
              <option value="80">80</option>
              <option value="90">90</option>
              <option value="100">100</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    items.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const subCategoryKeys = [
    ...new Set(
      assetProperties.flatMap((category) =>
        category.subCategories.flatMap((subCategory) =>
          Object.keys(subCategory)
        )
      )
    ),
  ];

  useEffect(() => {
    clickUser.map((items) => {
      setAssetProperties(items.allAssets);
    });
  }, [assetProperties,subCategoryKeys]);


  return (
    <div className="w-full">
      <div className="">
        <div className="w-full text-center ">
          <div className="flex capitalize text-[16px] rounded-lg w-full  bg-[#F4F4F5]  font-bold text-gray-800">
            <div className=" w-full py-2 text-center">Category</div>
            {subCategoryKeys.map((key) => (
              <div key={key} className=" w-full py-2 text-center">
                {key}
              </div>
            ))}
          </div>

          <div>
            {assetProperties.map((category) => (
              <>
                {category.subCategories.map((subCategory, index) => (
                  <div className=" text-[16px] flex" key={index}>
                    {index === 0 && (
                      <div
                        className="w-full py-2"
                        rowSpan={category.subCategories.length}
                      >
                        {category.name}
                      </div>
                    )}
                    {subCategoryKeys.map((key) => (
                      <div className="w-full py-2" key={key}>
                        {subCategory[key] || "-"}
                      </div>
                    ))}
                  </div>
                ))}
              </>
            ))}
          </div>
        </div>
      </div>
  
      {/* <div className="flex flex-col gap-5 shadow-md p-5 rounded-lg mt-10">
        {assetProperties.map((assets) => (
          <>
            {assets.subCategories.map((subCategory, index) => (
              <div className="border-b-1 pb-5 text-center">
                <div key={index} className="w-full">
                  <div className="flex gap-5 flex-wrap font-medium text-primary py-2 capitalize">
                    <p className="">Asset</p>
                    {Object.entries(subCategory).map(([key, value]) => (
                      <p className="" key={key}>
                        {key}
                      </p>
                    ))}
                  </div>

                  <div className="w-full ">
                    <div key={index} className="flex gap-5">
                      <p className="">{subCategory.name}</p>
                      {Object.entries(subCategory).map(([key, value]) => (
                        <p className="" key={key}>
                          {value}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        ))}
      </div> */}
    </div>
  );
}

export default AssestByUserList;
