"use client";

import { fetchAllCCategory } from "@/services/category.service";
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
import { Edit2, Minus, Monitor, SearchNormal1 } from "iconsax-react";
import React, { useEffect, useState } from "react";
import NoImage from "../../public/images/no_app.jpg";

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
  const [categories, setCategories] = useState([]);
  const [totalSubCategories, setTotalSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);

  useEffect(() => {
    fetch();
  }, []);

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

  const largestArrayItem = totalSubCategories.reduce((max, item) => {
    return item?.length > max?.length ? item : max;
  }, totalSubCategories[0]);

  const maxSubCategories = Math.max(
    ...categories.map((category) => category.subCategories?.length),
    largestArrayItem?.length
  );

  const handleCategoryDetailClick = (category) => {
    setSelectedCategory([]);
    // setOpenEdit(true);
    setSelectedCategory(category);
  };
  const handleDelete = (id) => {
    // setSelectedID([]);
    // setOpenDelete(true);
    // setSelectedID(id);
  };

  const filteredCategories = categories.filter((category) => {
    const categoryNameMatch = category.categoryName
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    const subCategoriesMatch = category.subCategories.some((subCategory) =>
      subCategory.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return categoryNameMatch || subCategoriesMatch;
  });
  return (
    <div>
      <div className="p-6 mx-auto">
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
            {/* <CreateCategory
              setCategoriesFromParent={setCategories}
              setTotalSubCategories={setTotalSubCategories}
            /> */}
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
                variant="light"
                className="border font-medium text-[#378CE7] border-[#378CE7]"
              >
                <Monitor size="22" color="#378CE7" /> Add Item
              </Button>
            </div>
          </div>
        </div>

        <Card className="w-full">
          {isLoading ? (
            <CardBody className="flex items-center justify-center h-96">
              <Spinner size="lg" />
            </CardBody>
          ) : filteredCategories.length > 0 ? (
            <Table
              aria-label="Categories table"
              classNames={{
                th: "bg-default-100 text-default-800 border-b border-divider",
                td: "border-b border-divider",
              }}
            >
              <TableHeader>
                <TableColumn>No</TableColumn>
                <TableColumn>Category Name</TableColumn>
                {Array.from({ length: maxSubCategories }).map((_, key) => (
                  <TableColumn key={key}>Subcategory {key + 1}</TableColumn>
                ))}
                <TableColumn>Actions</TableColumn>
              </TableHeader>
              <TableBody>
                {filteredCategories.map((v, i) => (
                  <TableRow key={v.id}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell className="font-medium capitalize">
                      {v.categoryName}
                    </TableCell>
                    {Array.from({ length: maxSubCategories }).map((_, key) => (
                      <TableCell key={key} className="lowercase">
                        {v.subCategories[key] || ""}
                      </TableCell>
                    ))}
                    <TableCell>
                      <ButtonGroup>
                        <Button
                          isIconOnly
                          variant="flat"
                          color="primary"
                          onClick={() => handleCategoryDetailClick(v)}
                        >
                          <Edit2 size={18} />
                        </Button>
                        <Button
                          isIconOnly
                          variant="flat"
                          color="danger"
                          onClick={() => handleDelete(v.id)}
                        >
                          <Minus size={18} />
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <CardBody className="flex flex-col items-center justify-center h-96 text-center">
              <Image
                src={NoImage}
                alt="No categories"
                className="w-48 h-48 mb-4 opacity-50"
              />
              <p className="text-xl text-default-500">No categories found</p>
              <p className="text-sm text-default-400 mt-2">
                Try adding a new category or adjusting your search.
              </p>
            </CardBody>
          )}
        </Card>

        {/* {selectedCategory && (
          <CategoryDetail
            setCategoriesFromParent={setCategories}
            setTotalSubCategories={setTotalSubCategories}
            category={selectedCategory}
            setOpenEdit={setOpenEdit}
            isOpen={openEdit}
          />
        )}
        {selectedID && (
          <ConfirmDeleteCategory
            setCategoriesFromParent={setCategories}
            setTotalSubCategories={setTotalSubCategories}
            id={selectedID}
            setOpenDelete={setOpenDelete}
            isOpen={openDelete}
          />
        )} */}
      </div>
    </div>
  );
}

export default AllItems;
