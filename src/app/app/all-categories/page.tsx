"use client";

import CategoryDetail from "@/components/Modals/CategoryDetail";
import ConfirmDeleteCategory from "@/components/Modals/ConfirmDeleteCategory";
import CreateCategory from "@/components/Modals/CreateCategory";
import {
  fetchAllCCategory,
  func_DeleteCategory,
} from "@/services/category.service";
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
import Image from "next/image";
import NoImage from "../../../../public/images/no_app.jpg";

function page() {
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);
  const [totalSubCategories, setTotalSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedID, setSelectedID] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetch = () => {
    setIsLoading(true);

    setTimeout(() => {
      try {
        fetchAllCCategory().then((res) => {
          setIsLoading(true);
          if (res?.status == 200) {
            setCategories(res?.data?.payload);
            const count = res?.data?.payload.map((data) => {
              setTotalSubCategories((prev) => [...prev, data.subCategories]);
            });
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

  useEffect(() => {
    fetch();
  }, []);

  const handleCategoryDetailClick = (category) => {
    setSelectedCategory([]);
    setOpenEdit(true);
    setSelectedCategory(category);
  };
  const handleDelete = (id) => {
    setSelectedID([]);
    setOpenDelete(true);
    setSelectedID(id);
  };

  const largestArrayItem = totalSubCategories.reduce((max, item) => {
    return item?.length > max?.length ? item : max;
  }, totalSubCategories[0]);

  // console.log(largestArrayItem);

  const maxSubCategories = Math.max(
    ...categories.map((category) => category.subCategories?.length),
    largestArrayItem?.length
  );

  const filteredCategories = categories.filter((category) =>
    category.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
      <div className="p-5">
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClear={() => {
              console.log("input cleared");
              setSearchQuery("");
            }}
          />
          <div>
            <CreateCategory />
          </div>
        </div>

        <div className="text-[14px] mt-5 relative shadow-md border-t-[0.5px] border-gray-50 px-10 py-5 rounded-lg h-full min-h-[800px] max-h-[760px] custom-scroll">
          <div className="text-base font-medium">All Categories</div>
          {isLoading ? (
            <div className="full h-full ">
              <figure className="loader">
                <div className="dot white"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </figure>
            </div>
          ) : (
            <div className="max-h-[730px] h-full w-full mt-2 overflow-hidden">
              <div className="max-h-[730px] h-full w-full overflow-y-auto">
                {filteredCategories.length > 0 ? (
                  <table className="w-full border-collapse">
                    <thead className="bg-gray-100 sticky top-0 z-10">
                      <tr className="py-3 font-normal hover:bg-gray-200 hover:cursor-pointer">
                        <th
                          className="text-center font-medium pl-3 py-3"
                          style={{
                            borderRadius: "10px 0 0 10px",
                            borderColor: "red",
                          }}
                        >
                          No
                        </th>
                        <th
                          className="pl-5 font-medium text-left py-3"
                          style={{
                            borderRadius: "0px 0 0 0px",
                            borderColor: "red",
                          }}
                        >
                          Category Name
                        </th>
                        {Array.from({ length: maxSubCategories }).map(
                          (_, key) => (
                            <th
                              key={key}
                              className="p-2 text-center font-medium "
                              style={
                                key === maxSubCategories - 1
                                  ? {
                                      borderRadius: "0 0px 0px 0",
                                      borderColor: "red",
                                    }
                                  : { borderColor: "red" }
                              }
                            >
                              Subcategory {key + 1}
                            </th>
                          )
                        )}
                        <th
                          className="p-2 text-center"
                          style={{
                            borderRadius: "0 10px 10px 0",
                            borderColor: "red",
                          }}
                        ></th>
                      </tr>
                    </thead>

                    <tbody>
                      <>
                        {filteredCategories.map((v, i) => (
                          <tr key={i} className="hover:bg-gray-200">
                            <td
                              className="py-1 pl-3 text-center"
                              style={{
                                borderRadius: "10px 0px 0px 10px",
                              }}
                            >
                              {i + 1}
                            </td>
                            <td className="py-1 pl-6 capitalize">
                              {v.categoryName}
                            </td>
                            {Array.from({ length: maxSubCategories }).map(
                              (_, key) => (
                                <td
                                  key={key}
                                  className="p-1 text-center lowercase"
                                  style={
                                    key === maxSubCategories - 1
                                      ? {
                                          borderRadius: "0 0px 0px 0",
                                          borderColor: "red",
                                        }
                                      : { borderColor: "red" }
                                  }
                                >
                                  {v.subCategories[key] || ""}
                                </td>
                              )
                            )}
                            <td
                              className="p-1 text-center"
                              style={{
                                borderRadius: "0 10px 10px 0",
                              }}
                            >
                              <Button
                                isIconOnly
                                variant="light"
                                onClick={() => handleCategoryDetailClick(v)}
                              >
                                <Edit2 size="18" color="#FF7F3E" />
                              </Button>
                              <Button
                                isIconOnly
                                variant="light"
                                color="danger"
                                onClick={() => handleDelete(v.id)}
                              >
                                <Minus size="20" color="#FF1E00" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </>
                    </tbody>
                  </table>
                ) : (
                  <>
                    <div className="w-full h-4/5 absolute flex items-center justify-center">
                      <div>
                        <Image
                          src={NoImage}
                          alt="logo"
                          className="w-[400px] dark:block"
                        />

                        <p className="text-lg text-gray-400 w-full text-center">
                          No Asset
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
          {selectedCategory && (
            <CategoryDetail
              category={selectedCategory}
              setOpenEdit={setOpenEdit}
              isOpen={openEdit}
            />
          )}
          {selectedID && (
            <ConfirmDeleteCategory
              id={selectedID}
              setOpenDelete={setOpenDelete}
              isOpen={openDelete}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default page;
