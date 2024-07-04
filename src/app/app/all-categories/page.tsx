"use client";

import CategoryDetail from "@/components/Modals/CategoryDetail";
import ConfirmDeleteCategory from "@/components/Modals/ConfirmDeleteCategory";
import CreateCategory from "@/components/Modals/CreateCategory";
import { fetchAllCCategory } from "@/services/category.service";
import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { Edit2, Minus, SearchNormal1 } from "iconsax-react";
import React, { useEffect, useState } from "react";

function page() {
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);
  const [totalSubCategories, setTotalSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [openEdit, setOpenEdit] = useState(false)

  useEffect(() => {
    fetchAllCCategory().then((res) => {
      if (res?.status == 200) {
        setCategories(res?.data?.payload);
        const count = res?.data?.payload.map((data) => {
          setTotalSubCategories((prev) => [...prev, data.subCategories]);
        });
      }
    });
  }, []);

  const handleCategoryDetailClick = (category) => {
    setSelectedCategory([]);
    setOpenEdit(true)
    setSelectedCategory(category);
  };

  const largestArrayItem = totalSubCategories.reduce((max, item) => {
    return item.length > max.length ? item : max;
  }, totalSubCategories[0]);

  console.log(largestArrayItem);

  const maxSubCategories = Math.max(
    ...categories.map((category) => category.subCategories.length),
    largestArrayItem?.length
  );
  return (
    <>
      <div className="w-2/4 flex justify-center items-center gap-5">
        <Input
          label="Search"
          isClearable
          radius="lg"
          classNames={{
            label: "text-black/50 dark:text-white/90",
            input: [
              "bg-transparent",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            ],
            innerWrapper: "bg-transparent",
            inputWrapper: [
              "shadow-md",
              "bg-default-200/50",
              "dark:bg-default/60",
              "backdrop-blur-xl",
              "backdrop-saturate-200",
              "hover:bg-default-200/70",
              "dark:hover:bg-default/70",
              "group-data-[focus=true]:bg-default-200/50",
              "dark:group-data-[focus=true]:bg-default/60",
              "!cursor-text",
            ],
          }}
          placeholder="Type to search..."
          startContent={
            <SearchNormal1
              size="20"
              className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0"
            />
          }
        />
        <div>
          <CreateCategory />
        </div>
      </div>

      <div className="text-[14px] mt-5 shadow-md border-t-[0.5px] border-gray-50 px-10 py-5 rounded-lg h-full min-h-[750px] custom-scroll">
        <div className="text-base font-medium">All Categories</div>
        <table className=" w-full mt-4 border-collapse">
          <thead>
            <tr className="bg-gray-100 py-2 hover:bg-gray-200 hover:cursor-pointer">
              <th
                className=" text-center pl-3 py-2"
                style={{ borderRadius: "10px 0 0 10px", borderColor: "red" }}
              >
                No
              </th>
              <th
                className=" pl-5 text-left  py-2"
                style={{ borderRadius: "0px 0 0 0px", borderColor: "red" }}
              >
                Category Name
              </th>
              {Array.from({ length: maxSubCategories }).map((_, key) => (
                <th
                  key={key}
                  className="p-2 text-center"
                  style={
                    key === maxSubCategories - 1
                      ? { borderRadius: "0 0px 0px 0", borderColor: "red" }
                      : { borderColor: "red" }
                  }
                >
                  Subcategory {key + 1}
                </th>
              ))}
              <th
                className="p-2 text-center"
                style={{ borderRadius: "0 10px 10px 0", borderColor: "red" }}
              ></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((v, i) => (
              <tr key={i}>
                <td className="py-2 pl-3 text-center">{i + 1}</td>
                <td className="py-2 pl-6 capitalize">{v.categoryName}</td>
                {Array.from({ length: maxSubCategories }).map((_, key) => (
                  <td
                    key={key}
                    className="p-2 text-center"
                    style={
                      key === maxSubCategories - 1
                        ? {
                            borderRadius: "0 100px 100px 0",
                            borderColor: "red",
                          }
                        : { borderColor: "red" }
                    }
                  >
                    {v.subCategories[key] || ""}
                  </td>
                ))}
                <td
                  className="p-2 text-center"
                  style={{
                    borderRadius: "0 100px 100px 0",
                    borderColor: "red",
                  }}
                >
                  <Button
                    isIconOnly
                    variant="light"
                    onClick={() => handleCategoryDetailClick(v)}
                  >
                    <Edit2 size="18" color="#FF7F3E" />
                  </Button>

                  <ConfirmDeleteCategory />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedCategory && <CategoryDetail category={selectedCategory} setOpenEdit={setOpenEdit} isOpen={openEdit} />}
      </div>
    </>
  );
}

export default page;
