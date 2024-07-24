"use client";

import React, { useEffect, useState } from "react";
import { fetchAllItems } from "@/services/item.service";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Image,
  Input,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { Devices, Edit2, Minus, Monitor, SearchNormal1 } from "iconsax-react";
import NoImage from "../../public/images/no_app.jpg";
import AddNewAsset from "./Modals/AddNewItem";
import ViewHistoryModal from "./Modals/ViewHistoryModal";
import TableAllItem from "./TableAllItem";

export const animals = [
  {
    label: "Cat",
    value: "cat",
    description: "The second most popular pet in the world",
  },
  {
    label: "Dog",
    value: "dog",
    description: "The most popular pet in the world",
  },
  {
    label: "Elephant",
    value: "elephant",
    description: "The largest land animal",
  },
  { label: "Lion", value: "lion", description: "The king of the jungle" },
  { label: "Tiger", value: "tiger", description: "The largest cat species" },
];

function AllItems() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [allItems, setAllItems] = useState([]);
  const [openMod, setOpenMod] = useState(false);
  const [openHistory, setOpenHistory] = useState(false);
  const [selectItem, setSelectItem] = useState([]);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = () => {
    setIsLoading(true);

    setTimeout(() => {
      try {
        fetchAllItems().then((res) => {
          console.log("all item ", res)
          setIsLoading(true);
          if (res?.status == 200) {
            setAllItems(res?.data?.payload?.allItem);
            setIsLoading(false);
          }
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        // setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };


  const handleDelete = (id) => {
    // setSelectedID([]);
    // setOpenDelete(true);
    // setSelectedID(id);
  };


  console.log("AllItem ", allItems)
  return (
    <>
      <div className="h-full mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-primary">Items</h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <Input
              isClearable
              radius="lg"
              className="flex-grow max-w-sm"
              classNames={{
                label: "text-black/50 dark:text-white/90",
                input: [
                  "bg-transparent",
                  "text-black/90 dark:text-white/90",
                  "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                ],
                inputWrapper: [
                  "shadow-sm",
                  "bg-default-100",
                  "dark:bg-default-50",
                  "hover:bg-default-200",
                  "dark:hover:bg-default-100",
                  "group-data-[focused=true]:bg-default-100",
                  "dark:group-data-[focused=true]:bg-default-50",
                ],
              }}
              placeholder="Type to search categories name, sub categories..."
              startContent={
                <SearchNormal1 size={20} className="text-default-400" />
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClear={() => setSearchQuery("")}
            />
            <div className="flex gap-4">
              <div>
                <Autocomplete
                  defaultItems={animals}
                  label=""
                  placeholder="Search an animal"
                  className="max-w-xs"
                >
                  {(animal) => (
                    <AutocompleteItem key={animal.value}>
                      {animal.label}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              </div>
              <Button
                onClick={() => {
                  setOpenMod(true);
                }}
                color="primary"
                variant="light"
                className="border-[0.5px] text-md text-semibold text-[#378CE7]"
                style={{ borderColor: "#378CE7" }}
              >
                <Devices size="22" color="#378CE7" /> Add Item
              </Button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-96">
            <Spinner size="lg" />
          </div>
        ) : allItems.length > 0 ? ( 
          <Card className="p-5 h-full max-h-[750px] overflow-y-auto custom-scroll">
            <TableAllItem data={allItems} handleDelete={handleDelete} setOpenHistory={setOpenHistory} setSelectItem={setSelectItem} />
          </Card>
        ) : (
          <div className="flex flex-col items-center justify-center h-96 text-center">
            <Image
              src={NoImage}
              alt="No items"
              className="w-48 h-48 mb-4 opacity-50"
            />
            <p className="text-xl text-default-500">No items found</p>
            <p className="text-sm text-default-400 mt-2">
              Try adding a new item or adjusting your search.
            </p>
          </div>
        )}
      </div>
      <AddNewAsset setOpenMod={setOpenMod} openMod={openMod}></AddNewAsset>
      <ViewHistoryModal
        selectItem={selectItem}
        openHistory={openHistory}
        setOpenHistory={setOpenHistory}
      />
    </>
  );
}

export default AllItems;
