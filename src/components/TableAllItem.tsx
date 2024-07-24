import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  ButtonGroup,
  Button,
} from "@nextui-org/react";
import { Edit2, Minus } from "iconsax-react";

const getAllSubCategoryKeys = (allItems) => {
  const keysSet = new Set();
  allItems.forEach((item) => {
    item.allAssets.forEach((asset) => {
      Object.keys(asset.subCategories).forEach((key) => keysSet.add(key));
    });
  });
  return Array.from(keysSet);
};

export default function TableAllItem({ data, handleDelete, setOpenHistory, setSelectItem }) {
  console.log("from parent", data);
  const allItems = data;

  // Extract all unique subcategory keys
  const subCategoryKeys = getAllSubCategoryKeys(allItems);


  const handleOpenDetail = (id) => {
    setSelectItem(id);
    setOpenHistory(true);
  }

  return (
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
        {allItems.map((item, i) => (
          <TableRow key={item.id}>
            <TableCell>{i + 1}</TableCell>
            <TableCell>
              {item.img_url ? (
                <img
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
                  onClick={() => handleDelete(item.id)}
                >
                  <Minus size={18} />
                </Button>
              </ButtonGroup>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
