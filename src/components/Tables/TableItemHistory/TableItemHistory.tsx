"use client";
import React from "react";
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
  Image,
  Tabs,
  Tab,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { columns, statusOptions } from "./data";
import { VerticalDotsIcon } from "../../../../public/icons/VerticalDotsIcon";
import { PlusIcon } from "../../../../public/icons/PlusIcon";
import { ChevronDownIcon } from "../../../../public/icons/ChevronDownIcon";
import { SearchIcon } from "../../../../public/icons/SearchIcon";
import { capitalize } from "@/utils/util";
import { Back } from "iconsax-react";
import AssetItemDetail from "@/components/AssetItemDetail";
import ManageHistoryRoundedIcon from "@mui/icons-material/ManageHistoryRounded";
import DetailsRoundedIcon from "@mui/icons-material/DetailsRounded";
import { func_GetItemHistoryByItemId } from "@/services/itemhistory.service";
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import DoNotDisturbOnTotalSilenceOutlinedIcon from '@mui/icons-material/DoNotDisturbOnTotalSilenceOutlined';
import { formatDateForUi } from "@/services/commonfunc.service";
const statusColorMap = {
  RETURNED: "success",
  INUSE: "warning",
};

const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "givenby",
  "givendate",
  // "receiveby",
  "returneddate",
  "description",
  "condition",
  "status",
  // "actions",
];

export default function TableItemHistory() {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  // fetch data
  const [datas, setDatas] = React.useState([]);
  React.useEffect(() => {
    func_GetItemHistoryByItemId("6698dabe868b2579766a6178").then((res) => {
      console.log({ res });
      if (res?.status == 200) {
        setDatas(res.data.payload);
      }
    });
  }, []);

  console.log({ datas });

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...datas];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.employeeId.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filteredUsers = filteredUsers.filter((user) =>
        user.status.includes(statusFilter)
      );
    }

    return filteredUsers;
  }, [datas, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "name":
        return (
          <User
            isBordered
            radius="lg"
            avatarProps={{ radius: "lg", src: user.userProfile }}
            // description={user.employeeId}
            name={user.employeeId}
          >
            {/* {user.employeeId} */}
          </User>
        );
      case "givenby":
        return (
          <div className="flex flex-col">
            {/* <p className="text-bold text-small capitalize">{cellValue}</p> */}
            <p className="text-bold text-tiny capitalize text-default-400">
              {user.givenBy}
            </p>
          </div>
        );
      case "givendate":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-tiny capitalize text-default-400">
              {formatDateForUi(user.givenDate)}
            </p>
          </div>
        );
      case "receiveby":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-tiny capitalize text-default-400">
              {user.receivedBy}
            </p>
          </div>
        );
      case "returneddate":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-tiny capitalize text-default-400">
              {formatDateForUi(user.returnedDate)}
            </p>
          </div>
        );
      case "description":
        return (
          <Popover placement="top">
            <PopoverTrigger>
              <p
                color="#ffffff"
                variant="light"
                className="text-bold line-clamp-1 flex w-24 items-center justify-start break-all p-0 text-tiny capitalize text-default-400 hover:text-primary cursor-pointer"
              >
                <div className="flex flex-col w-36">
                  <p className="text-bold text-tiny text-start capitalize text-default-400 line-clamp-1">
                    {user.description}
                  </p>
                </div>
              </p>
            </PopoverTrigger>
            <PopoverContent>
              <div className="flex flex-col w-32 p-2">
                <p className="text-bold text-tiny text-justify capitalize break-all text-primary">
                  {user.description}
                </p>
              </div>
            </PopoverContent>
          </Popover>
        );
      case "condition":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-tiny capitalize text-default-400">
              {user.condition}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
            startContent={user.status == "RETURNED" ? <TaskAltOutlinedIcon fontSize="small" /> : <DoNotDisturbOnTotalSilenceOutlinedIcon  fontSize="small" />}
          >
            {cellValue}
          </Chip>
        );
      // case "actions":
      //   return (
      //     <div className="relative flex justify-end items-center gap-2">
      //       <Dropdown>
      //         <DropdownTrigger>
      //           <Button isIconOnly size="sm" variant="light">
      //             <VerticalDotsIcon className="text-default-300" />
      //           </Button>
      //         </DropdownTrigger>
      //         <DropdownMenu>
      //           <DropdownItem>View</DropdownItem>
      //           <DropdownItem>Edit</DropdownItem>
      //           <DropdownItem>Delete</DropdownItem>
      //         </DropdownMenu>
      //       </Dropdown>
      //     </div>
      //   );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

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

  console.log("statusFilter", statusFilter);
  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            color="primary"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Tabs aria-label="Tabs sizes" onSelectionChange={setStatusFilter}>
              <Tab key="all" title="All" />
              <Tab key="INUSE" title="In use" />
              <Tab key="RETURNED" title="Returned" />
            </Tabs>
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
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {datas.length} datas
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
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
    datas.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <div className="flex w-full flex-col">
      <Tabs
        aria-label="Options"
        color="primary"
        variant="underlined"
        classNames={{
          tabList:
            "gap-6 w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-primary",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-primary",
        }}
      >
        <Tab
          key="detail"
          title={
            <div className="flex items-center space-x-2">
              <DetailsRoundedIcon />
              <span>Detail</span>
            </div>
          }
        >
          <AssetItemDetail />
        </Tab>
        <Tab
          key="history"
          title={
            <div className="flex items-center space-x-2">
              <ManageHistoryRoundedIcon />
              <span>History</span>
            </div>
          }
        >
          <Table
            isStriped
            aria-label="Example table with custom cells, pagination and sorting"
            isHeaderSticky
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            classNames={{
              wrapper: "h-[280px] custom-scroll",
            }}
            selectedKeys={selectedKeys}
            // selectionMode="multiple"
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
          >
            <TableHeader columns={headerColumns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === "actions" ? "center" : "start"}
                  allowsSorting={column.sortable}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody emptyContent={"No data available"} items={sortedItems}>
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Tab>
      </Tabs>
    </div>
  );
}
