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
} from "@nextui-org/react";
import { PlusIcon } from "../../public/icons/PlusIcon";
import { columns, asset_user, statusOptions, items } from "../data/data";
import { capitalize } from "../utils/util";
import { SearchNormal1 } from "iconsax-react";
import { ChevronDownIcon } from "../../public/icons/ChevronDownIcon";
import { VerticalDotsIcon } from "../../public/icons/VerticalDotsIcon";
import AddNewAsset from "./Modals/AddNewAsset";
import ConfirmDelete from "./Modals/ConfirmDelete";
import ItemDetail from "./Modals/ItemDetail";
import CreateCategory from "./Modals/CreateCategory";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const category = [
  { key: "laptop", label: "Laptop" },
  { key: "phone", label: "Phone" },
  { key: "monitor", label: "Monitor" },
];

const INITIAL_VISIBLE_COLUMNS = ["asset_type", "asset_name", "type", "action"];

export default function ItemCards() {
  const [filterValue, setFilterValue] = React.useState("");
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [page, setPage] = React.useState(1);
  const [selectedCategory, setSelectedCategory] = useState(category[0].key);

  const handleCategoryChange = (event) => {
    console.log(event);
    setSelectedCategory(event.anchorKey);
  };

  console.log(asset_user);
  // const selectedAssets = data[0].assets[selectedCategory];
  // console.log(selectedAssets);
  // const assetKeys = selectedAssets ? Object.keys(selectedAssets) : [];

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

  const [openMod, setOpenMod] = useState(false);
  const [itemsUser, setItemsUser] = useState([]);
  const handleRowClick = (user) => {
    setItemsUser([])
    setItemsUser((prev)=> [...prev, user]);
    setOpenMod(true);
  };
  console.log(itemsUser);
  return (
    <>
      <div className="h-[400px]">
        {/* isHeaderSticky
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[792px]",
        }}
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor} */}
        <Table topContent={topContent} topContentPlacement="outside" isStriped isHeaderSticky className=" max-h-[850px] py-5">
          <TableHeader>
            <TableColumn>NO</TableColumn>
            <TableColumn>EMPLOYEE</TableColumn>
            <TableColumn>TEAM</TableColumn>
            <TableColumn>DEPARTMENT</TableColumn>
            <TableColumn>COMPANY</TableColumn>
            <TableColumn>ASSETS</TableColumn>
            <TableColumn>REMARK</TableColumn>
          </TableHeader>

          <TableBody >
            {asset_user.map((user, index) => (
              <TableRow
                key={user.id}
                onClick={() => handleRowClick(user)}
                className="hover:cursor-pointer"
              >
                <TableCell className="py-2 pl-4">{index + 1}</TableCell>
                <TableCell className="flex items-center py-2">
                  <User 
                    avatarProps={{ radius: "full", src: user.prfl_PHTG }}
                    description={user.userId}
                    name={user.username}
                    
                  >
                    {user.username}
                  </User>
                </TableCell>
                <TableCell className="py-2">{user.team}</TableCell>
                <TableCell className="py-2">{user.department}</TableCell>
                <TableCell className="py-2">{user.company}</TableCell>
                <TableCell className="py-2">
                  {user.allAssets.map((asset) => (
                    <>{`${asset.name}, `}</>
                  ))}
                </TableCell>
                <TableCell className="py-2">{user.remark}</TableCell>
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
