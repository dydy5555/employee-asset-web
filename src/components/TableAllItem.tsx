"use client";
import React, { useState, useMemo, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  ButtonGroup,
  Button,
  Pagination,
  Chip,
} from "@nextui-org/react";
import { Edit2, Minus } from "iconsax-react";
import Image from "next/image";
import AskToDelete from "./Modals/AskToDelete";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import NoImage from "../../public/images/no_app.jpg";
import { formatDateForUi } from "@/services/commonfunc.service";

const getAllSubCategoryKeys = (allItems) => {
  const keysSet = new Set();
  allItems.forEach((item) => {
    item.allAssets.forEach((asset) => {
      Object.keys(asset.subCategories).forEach((key) => keysSet.add(key));
    });
  });
  return Array.from(keysSet);
};

export default function TableAllItem({
  data,
  setOpenHistory,
  setSelectItem,
  searchQuery,
  filterQuery,
  onItemCreated,
  statusFilter,
  startDate,
  endDate,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const subCategoryKeys = useMemo(() => getAllSubCategoryKeys(data), [data]);
  const [openAskDelete, setOpenAskDelete] = useState(false);
  const [selectedID, setSelectedID] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredItems = useMemo(() => {
    return data.filter((item) => {
      const categoryName = item.allAssets[0]?.name?.toLowerCase() || "";
      const matchesSearch =
        categoryName.includes(searchQuery.toLowerCase()) ||
        subCategoryKeys.some((key) => {
          const subCategoryValue =
            item.allAssets[0]?.subCategories[key]?.toLowerCase() || "";
          return subCategoryValue.includes(searchQuery.toLowerCase());
        });

      const matchesFilter = filterQuery
        ? categoryName.includes(filterQuery.toLowerCase())
        : true;

      const matchesStatus =
        statusFilter === "all" || item.status === statusFilter;

      const matchesPurchaseDate =
        startDate && endDate
          ? item.purchase_date >= startDate && item.purchase_date <= endDate
          : true;

      return (
        matchesSearch && matchesFilter && matchesStatus && matchesPurchaseDate
      );
    });
  }, [
    data,
    searchQuery,
    filterQuery,
    subCategoryKeys,
    statusFilter,
    startDate,
    endDate,
  ]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Get current items for the page
  const currentItems = useMemo(
    () =>
      filteredItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ),
    [filteredItems, currentPage, itemsPerPage]
  );

  const handleOpenDetail = (id) => {
    setSelectItem(id);
    setOpenHistory(true);
  };

  // Reset the current page to 1 if the filter changes and the current page is out of range
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  return (
    <>
      {currentItems.length > 0 ? (
        <Table
          isHeaderSticky
          isCompact
          isStriped
          removeWrapper
          aria-label="Assets table"
          classNames={{
            th: "bg-default-100 text-default-800 border-divider",
            td: "border-b border-divider",
          }}
          className="h-full w-full"
        >
          <TableHeader>
            <TableColumn>No</TableColumn>
            <TableColumn>Image</TableColumn>
            <TableColumn>Category name</TableColumn>
            {subCategoryKeys.map((key) => (
              <TableColumn className="capitalize" key={key}>{key}</TableColumn>
            ))}
            <TableColumn>Purchase Date</TableColumn>
            {/* <TableColumn>Remain</TableColumn> */}
            <TableColumn className="text-center">Status</TableColumn>
            <TableColumn className="text-center">Actions</TableColumn>
          </TableHeader>
          <TableBody className="">
            {currentItems.map((item, i) => (
              <TableRow key={item.id}>
                <TableCell className="">
                  {(currentPage - 1) * itemsPerPage + i + 1}
                </TableCell>
                <TableCell>
                  <div className="w-full h-full ">
                    {item.img_url ? (
                      <Image
                        width={50}
                        height={50}
                        src={item.img_url}
                        alt="Asset Image"
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    ) : (
                      "N/A"
                    )}
                  </div>
                </TableCell>
                <TableCell className="capitalize">{item?.allAssets[0]?.name}</TableCell>
                {subCategoryKeys.map((key) => (
                  <TableCell key={key} className="capitalize ">
                    {item.allAssets.length > 0 &&
                    item.allAssets[0].subCategories[key]
                      ? item.allAssets[0].subCategories[key]
                      : ""}
                  </TableCell>
                ))}
                <TableCell className="">
                  {formatDateForUi(item.purchase_date) ?? "N/A"}
                </TableCell>
                {/* <TableCell className="border">
                  <Chip
                    color="primary"
                    variant="flat"
                    className={`font-semibold ${
                      item.remain_quantity == 0 ? "text-danger" : "text-success"
                    }`}
                  >
                    {item.remain_quantity ?? "N/A"}
                  </Chip>
                </TableCell> */}
                <TableCell className="">
                  <div className="w-full h-full flex justify-center items-center">
                    <Chip
                      className="text-[12px]"
                      variant="flat"
                      color={
                        item?.status === "unavailable" ? "danger" : "success"
                      }
                    >
                      {item?.status || "N/A"}
                    </Chip>
                  </div>
                </TableCell>
                <TableCell className="">
                  <div className="w-full h-full flex justify-center items-center">
                    <ButtonGroup className="flex justify-center items-center">
                      <Button
                        isIconOnly
                        variant="flat"
                        color="primary"
                        onClick={() => handleOpenDetail(item?.id)}
                      >
                        <Edit2 size={18} />
                      </Button>
                      <Button
                        isIconOnly
                        variant="flat"
                        color="danger"
                        onClick={() => {
                          setSelectedID(item?.id),
                            setOpenAskDelete(true),
                            setSelectedCategory(item?.allAssets[0]?.categoryId);
                        }}
                      >
                        <Minus size={18} />
                      </Button>
                    </ButtonGroup>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <Image
            src={NoImage}
            alt="No items"
            width={100}
            height={100}
            className="w-48 h-48 mb-4 opacity-50"
          />
          <p className="text-xl text-default-500">No items found</p>
          <p className="text-sm text-default-400 mt-2">
            Try adding a new item or adjusting your search.
          </p>
        </div>
      )}
      {currentItems.length > 0 && (
        <Pagination
          className="flex justify-center items-center"
          total={totalPages}
          initialPage={1}
          page={currentPage}
          showControls
          onChange={(page) => setCurrentPage(page)}
        />
      )}
      <AskToDelete
        openAskDelete={openAskDelete}
        setOpenAskDelete={setOpenAskDelete}
        itemId={selectedID}
        selectedCategory={selectedCategory}
        onItemCreated={onItemCreated}
      />
    </>
  );
}
