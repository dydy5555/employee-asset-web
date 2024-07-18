"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Select,
  SelectItem,
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
} from "@nextui-org/react";
import { PlusIcon } from "../../public/icons/PlusIcon";
import { columns, asset_user, statusOptions, items } from "../data/data";
import { capitalize } from "../utils/util";
import { ArrowRight2, SearchNormal1, UserSquare } from "iconsax-react";
import { ChevronDownIcon } from "../../public/icons/ChevronDownIcon";
import { VerticalDotsIcon } from "../../public/icons/VerticalDotsIcon";
import AddNewAsset from "./Modals/AddNewAsset";
import ConfirmDelete from "./Modals/ConfirmDelete";
import ItemDetail from "./Modals/ItemDetail";
import CreateCategory from "./Modals/CreateCategory";
import { fetchAllEmployeeAssets } from "@/services/assets.service";
import CardDataStats from "./CardDataStats";
import { fetchAllCCategory } from "@/services/category.service";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

// const category = [
//   { key: "laptop", label: "Laptop" },
//   { key: "phone", label: "Phone" },
//   { key: "monitor", label: "Monitor" },
// ];

const INITIAL_VISIBLE_COLUMNS = ["asset_type", "asset_name", "type", "action"];

export default function ItemCards() {
  const [filterValue, setFilterValue] = React.useState("");
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [allEmployeeAssets, setAllEmployeeAssets] = useState([]);
  const [allAssets, setAllAssets] = useState([]);
  const [page, setPage] = React.useState(1);
  // const [selectedCategory, setSelectedCategory] = useState(category[0].key);
  const [allCate , setAllCate] = useState([]);

  const handleCategoryChange = (event) => {
    console.log(event);
    // setSelectedCategory(event.anchorKey);
  };

  ///
  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...asset_user];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) => {
        user.username.includes(filterValue.toLowerCase());
      });
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status)
      );
    }

    return filteredUsers;
  }, [items, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const item = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  // const sortedItems = React.useMemo(() => {
  //   return [...item].sort((a, b) => {
  //     const first = a[sortDescriptor.column];
  //     const second = b[sortDescriptor.column];
  //     const cmp = first < second ? -1 : first > second ? 1 : 0;

  //     return sortDescriptor.direction === "descending" ? -cmp : cmp;
  //   });
  // }, [sortDescriptor, item]);

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
        <div className="flex gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchNormal1 size="22" color="#378CE7" />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            {/* <Dropdown>
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
            </Dropdown> */}
            {/* <Dropdown>
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
            </Dropdown> */}
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
              {/* Total {allEmployeeAssets.length} employee */}
            </span>
          </div>
          {/* <label className="flex items-center text-default-400 text-small">
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
          </label> */}
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

  const [openMod, setOpenMod] = useState(false);
  const [itemsUser, setItemsUser] = useState([]);
  const handleRowClick = (user) => {
    setItemsUser([]);
    setItemsUser((prev) => [...prev, user]);
    setOpenMod(true);
  };
  console.log(itemsUser);

  const getAllCate = ()=>{
    fetchAllCCategory().then((res)=>{
      console.log(res)
      setAllCate(res.data.payload)
    })
  }

  useEffect(() => {
    getAllCate();
    fetchAllEmployeeAssets().then((res) => {
      console.log(res)
      if (res?.status == 200) {
        setAllEmployeeAssets(res?.data?.payload);
      }
    });
  }, []);
  console.log(allEmployeeAssets);
  console.log(allCate.length);

  return (
    <>
      {/* <div>
        <p className="text-lg font-medium flex gap-5">
          All Employee
        </p>
      </div> */}
      {/* <div className="flex justify-between gap-10">
        <div className="flex gap-5 w-full mt-3">
          <div>
            <Card className="px-2">
              <CardHeader></CardHeader>
              <CardBody>
                <div className=" font-medium ">
                  <div className="bg-gray-100 rounded-full w-[50px] p-2 h-[50px] flex items-center justify-center">
                    <svg
                      className="fill-primary dark:fill-white "
                      width="22"
                      height="18"
                      viewBox="0 0 22 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z"
                        fill=""
                      />
                      <path
                        d="M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z"
                        fill=""
                      />
                      <path
                        d="M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z"
                        fill=""
                      />
                    </svg>
                  </div>
                  <div className="flex gap-2 mt-2"><span> {allCate.length} </span>
                  <p className=""> Employee </p></div>
                </div>
              </CardBody>
              <CardFooter></CardFooter>
            </Card>
          </div>
        </div>
        <div className="w-full flex items-end justify-end">
          <div className="flex w-full gap-3 items-end justify-end">
            <Input
              isClearable
              className="w-full "
              placeholder="Search by name..."
              startContent={<SearchNormal1 size="22" color="#378CE7" />}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
            <div className="flex gap-3">
              <CreateCategory />
              <AddNewAsset />
            </div>
          </div>
        </div>
      </div> */}
      <div className="">
        {/* isHeaderSticky
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[792px]",
        }}
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor} */}
        <Table
          topContentPlacement="outside"
          isStriped
          isHeaderSticky
          className=" max-h-[580px]"
        >
          <TableHeader>
            <TableColumn>NO</TableColumn>
            <TableColumn>EMPLOYEE</TableColumn>
            <TableColumn>TEAM</TableColumn>
            <TableColumn>DEPARTMENT</TableColumn>
            <TableColumn>COMPANY</TableColumn>
            <TableColumn>ASSETS</TableColumn>
            <TableColumn>REMARK</TableColumn>
          </TableHeader>

          <TableBody>
            {allEmployeeAssets.map((user, index) => (
              <TableRow
                key={index}
                // onClick={() => handleRowClick(user)}
              >
                <TableCell className="py-2.5 pl-4">{index + 1}</TableCell>
                <TableCell className="flex items-center py-2.5">
                  <User
                    avatarProps={{
                      radius: "full",
                      src: user.img_url
                        ? user.img_url
                        : "https://d2u8k2ocievbld.cloudfront.net/memojis/female/3.png",
                    }}
                    description={user.userId}
                    name={user.employee_name}
                  >
                    {user.employee_name}
                  </User>
                  {/* {user.employee_name} */}
                </TableCell>
                <TableCell className="py-2.5">{user.team}</TableCell>
                <TableCell className="py-2.5">{user.department}</TableCell>
                <TableCell className="py-2.5">{user.company}</TableCell>
                <TableCell className="py-2.5">
                  {user.allAssets.map((asset) => (
                    <>{`${asset.name}, `}</>
                  ))}
                </TableCell>
                <TableCell className="py-2.5">{user.remark}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <ItemDetail
        setOpenMod={setOpenMod}
        openMod={openMod}
        itemsUser={itemsUser}
      ></ItemDetail>
    </>
  );
}
