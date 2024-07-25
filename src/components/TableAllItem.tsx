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
} from "@nextui-org/react";
import { Edit2, Minus } from "iconsax-react";
import Image from "next/image";
import AskToDelete from "./Modals/AskToDelete";

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
  onItemCreated
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const subCategoryKeys = useMemo(() => getAllSubCategoryKeys(data), [data]);
  const [openAskDelete, setOpenAskDelete] = useState(false);
  const [selectedID, setSelectedID] = useState("");

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

      return matchesSearch && matchesFilter;
    });
  }, [data, searchQuery, filterQuery, subCategoryKeys]);

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
      <Table
        isHeaderSticky
        isCompact
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
            <TableColumn key={key}>{key}</TableColumn>
          ))}
          <TableColumn>Quantity</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {currentItems.map((item, i) => (
            <TableRow key={item.id}>
              <TableCell>{(currentPage - 1) * itemsPerPage + i + 1}</TableCell>
              <TableCell>
                {item.img_url ? (
                  <Image
                    width={50}
                    height={50}
                    src={item.img_url}
                    alt="Asset Image"
                    className="w-16 h-16 object-cover"
                  />
                ) : (
                  "N/A"
                )}
              </TableCell>
              <TableCell>{item?.allAssets[0]?.name}</TableCell>
              {subCategoryKeys.map((key) => (
                <TableCell key={key} className="lowercase">
                  {item.allAssets.length > 0 &&
                  item.allAssets[0].subCategories[key]
                    ? item.allAssets[0].subCategories[key]
                    : ""}
                </TableCell>
              ))}
              <TableCell>{item.quantity ?? "N/A"}</TableCell>
              <TableCell>
                <ButtonGroup className="w-full justify-start items-center">
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
                      setSelectedID(item?.id), setOpenAskDelete(true);
                    }}
                  >
                    <Minus size={18} />
                  </Button>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        className="flex justify-center items-center"
        total={totalPages}
        initialPage={1}
        page={currentPage}
        showControls
        onChange={(page) => setCurrentPage(page)}
      />
      <AskToDelete
        openAskDelete={openAskDelete}
        setOpenAskDelete={setOpenAskDelete}
        itemId={selectedID}
        onItemCreated={onItemCreated}
      />
    </>
  );
}
