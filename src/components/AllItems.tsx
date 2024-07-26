"use client";

import React, { useEffect, useState } from "react";
import { fetchAllItems } from "@/services/item.service";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  DatePicker,
  DateRangePicker,
  Image,
  Input,
  Select,
  SelectItem,
  Spinner,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { Devices, SearchNormal1 } from "iconsax-react";
import NoImage from "../../public/images/no_app.jpg";
import AddNewAsset from "./Modals/AddNewItem";
import ViewHistoryModal from "./Modals/ViewHistoryModal";
import TableAllItem from "./TableAllItem";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import { fetchAllCCategory } from "@/services/category.service";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import ExportReport from "./ExportReport";

function AllItems() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [allItems, setAllItems] = useState([]);
  const [openMod, setOpenMod] = useState(false);
  const [openHistory, setOpenHistory] = useState(false);
  const [selectItem, setSelectItem] = useState(null);
  const [allCate, setAllCate] = useState([]);
  const [filterQuery, setFilterQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetchAllItems()
      .then((res) => {
        if (res?.status === 200) {
          setAllItems(res.data.payload.allItem);
        }
      })
      .catch((error) => console.error("Error fetching items:", error))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    fetchAllCCategory()
      .then((res) => {
        if (res?.status === 200) {
          setAllCate(res.data.payload);
        }
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleCategoryChange = (value) => {
    const selectValue = value.values().next().value;
    console.log("Handle category change ", selectValue);
    if (selectValue !== filterQuery) {
      setFilterQuery(selectValue);
    }
  };

  const handleItemCreated = () => {
    setIsLoading(true);
    fetchAllItems()
      .then((res) => {
        if (res?.status === 200) {
          setAllItems(res.data.payload.allItem);
        }
      })
      .catch((error) => console.error("Error fetching items:", error))
      .finally(() => setIsLoading(false));
  };

  const handleChangeDate = (e) => {
    const { start, end } = e;

    const formatDateString = (dateObj) => {
      const year = dateObj.year;
      const month = String(dateObj.month).padStart(2, "0");
      const day = String(dateObj.day).padStart(2, "0");
      return `${year}${month}${day}`;
    };

    const formattedStartDate = formatDateString(start);
    const formattedEndDate = formatDateString(end);
    setStartDate(formattedStartDate);
    setEndDate(formattedEndDate);
  };
  return (
    <>
      <div className="h-full mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-primary">All Items</h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex justify-start items-center gap-2">
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
              <DateRangePicker
                variant="flat"
                color="primary"
                fullWidth
                hideTimeZone
                size="md"
                // label="Start date - End date"
                // value={date}
                // defaultValue={date}
                onChange={handleChangeDate}
                className="w-fit"
              />
            </div>

            <div className="flex gap-4">
              <div>
                <Tabs
                  color="primary"
                  // variant="flat"
                  aria-label="Tabs sizes"
                  onSelectionChange={setStatusFilter}
                >
                  <Tab key="all" title="All" />
                  <Tab key="available" title="Available" />
                  <Tab key="unavailable" title="Unavailable" />
                </Tabs>
              </div>
              <div>
                <Select
                  placeholder="Filter by Category"
                  className="w-60"
                  radius="lg"
                  size="md"
                  variant="flat"
                  color="primary"
                  onSelectionChange={handleCategoryChange}
                  startContent={<FilterListRoundedIcon fontSize="small" />}
                >
                  {allCate.map((item) => (
                    <SelectItem
                      className="capitalize"
                      color="primary"
                      variant="flat"
                      key={item.categoryName}
                      value={item.categoryName}
                      startContent={
                        <LabelOutlinedIcon
                          fontSize="small"
                          className="text-primary"
                        />
                      }
                    >
                      {item.categoryName}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <Button
                onClick={() => setOpenMod(true)}
                color="primary"
                variant="flat"
                size="md"
                className="border-[0.5px] text-md text-semibold text-primary"
                style={{ borderColor: "#378CE7" }}
              >
                <Devices size="20" color="#378CE7" /> Add Item
              </Button>
              <ExportReport allItems={allItems} />
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-96">
            <Spinner size="lg" />
          </div>
        ) : allItems.length > 0 ? (
          <Card className="p-5 h-full max-h-[750px] overflow-y-auto custom-scroll">
            <TableAllItem
              data={allItems}
              setOpenHistory={setOpenHistory}
              setSelectItem={setSelectItem}
              searchQuery={searchQuery}
              filterQuery={filterQuery}
              onItemCreated={handleItemCreated}
              statusFilter={statusFilter}
              startDate={startDate}
              endDate={endDate}
            />
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
      <AddNewAsset
        onItemCreated={handleItemCreated}
        setOpenMod={setOpenMod}
        openMod={openMod}
      />
      <ViewHistoryModal
        selectItem={selectItem}
        openHistory={openHistory}
        setOpenHistory={setOpenHistory}
      />
    </>
  );
}

export default AllItems;
