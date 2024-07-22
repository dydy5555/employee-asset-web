"use client";

import React, { use, useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  Tooltip,
  Card,
} from "@nextui-org/react";
import { Add, CardAdd, Category, Trash } from "iconsax-react";
import AddNewAsset from "./AddNewAsset";
import {
  fetchAllCCategory,
  func_CreateCategory,
} from "@/services/category.service";
import toast from "react-hot-toast";
import { showToastSuccess } from "@/services/commonfunc.service";

function CreateCategory({ setCategoriesFromParent, setTotalSubCategories }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [inputList, setInputList] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [properties, setProperties] = useState(["name", "label no"]);
  const [tempProperty, setTempProperty] = useState([]);

  const onClose = () => setIsOpen(false);

  const handleAddInput = () => {
    setInputList([...inputList, { id: inputList.length, value: "" }]);
    console.log(inputList);
  };

  const handleInputChange = (id, value) => {
    const updatedInputList = inputList.map((input) =>
      input.id === id ? { ...input, value } : input
    );
    setInputList(updatedInputList);

    console.log(inputList);
    const propertiesList = inputList
      .map((input) => input.value.trim().toLowerCase())
      .filter((value) => value !== "");
    setTempProperty((prev)=> [...prev, propertiesList])

    console.log(tempProperty);
  };

  const handleChangeCategoryName = (e) => {
    setCategoryName(e.target.value.toLowerCase());
  };

  const handleDeleteInput = (id) => {
    const updatedInputList = inputList.filter((input) => input.id !== id);
    setInputList(updatedInputList);
  };

  const handleSave = (onClose) => {
    const propertiesList = inputList
      .map((input) => input.value.trim().toLowerCase())
      .filter((value) => value !== "");

    // console.log(propertiesList);
    // setProperties((prev) => [...prev, ...propertiesList]);
    // console.log({ properties });

    const newCategory = { categoryName, subCategories: propertiesList };

    // func_CreateCategory(newCategory).then((res) => {
    //   console.log(res);
    //   showToastSuccess("Asset created successfully!");
    //   // onClose();
    //   fetchAllCCategory().then((res) => {
    //     if (res?.status == 200) {
    //       setCategoriesFromParent(res?.data?.payload);
    //       setTotalSubCategories([]);
    //       const count = res?.data?.payload.map((data) => {
    //         setTotalSubCategories((prev) => [...prev, data.subCategories]);
    //       });
    //     }
    //   });
    // });
  };

  useEffect(() => {
    
    
    
    // setProperties((prev) => [...prev,...propertiesList]);
    // console.log({ properties });
  }, [inputList]);

  return (
    <>
      <Button
        onPress={onOpen}
        color="primary"
        className="bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold px-4 py-2 rounded-full transition-all duration-300 ease-in-out"
        startContent={<CardAdd size="36" />}
      >
        Add Category
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        size="xl"
        className="min-h-[550px] min-w-[650px]"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col w-full h-full gap-1">
                <h1 className="text-center text-[#378CE7]">Create Category</h1>
                <div className=" border-b-[1px] border-gray-100 mt-2"></div>
              </ModalHeader>
              <ModalBody className="px-10">
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium"> Category Name</p>
                    <div className="flex items-center gap-4">
                      <Input
                        placeholder="Enter category name"
                        value={categoryName}
                        onChange={handleChangeCategoryName}
                        className="flex-grow text-sm"
                        size="lg"
                        isClearable
                        onClear={() => {
                          setCategoryName("");
                        }}
                        // startContent={
                        //   <Category className="text-gray-400" size="20" />
                        // }
                      />
                      <Tooltip content="Add Property" size="sm">
                        <Button
                          color="primary"
                          isIconOnly
                          className="rounded-full p-2"
                          onClick={handleAddInput}
                        >
                          <Add size={24} />
                        </Button>
                      </Tooltip>
                    </div>
                  </div>
                  <Card>
                    <div className=" pb-5 pl-5">
                      <div className="">
                        <p className="pb-4 pt-4 font-medium text-sm ">
                          Property
                        </p>
                      </div>
                      <div className="flex flex-col pr-5 gap-6 pb-2 min-h-[250px] max-h-[250px] overflow-auto custom-scroll">
                        <div className="flex items-center gap-6">
                          <Input
                            label="Default property"
                            value="Label No"
                            name="label_no"
                          />
                          <Input
                            label="Default property"
                            value="Name"
                            name="name"
                          />
                        </div>
                        <div className=" grid grid-cols-2 text-sm gap-6">
                          {inputList.map((input, index) => (
                            <div
                              key={input.id}
                              className="flex items-center gap-2 col-span-1 w-full"
                            >
                              <Input
                                label="New property"
                                placeholder=""
                                value={input.value}
                                onChange={(e) =>
                                  handleInputChange(input.id, e.target.value)
                                }
                                className="flex-grow p-0"
                                endContent={
                                  <div className="mt-3 h-full">
                                    <Tooltip
                                      size="sm"
                                      content="Delete this Property"
                                      placement="top"
                                    >
                                      <Button
                                        isIconOnly
                                        color="danger"
                                        variant="light"
                                        className="rounded-full pt-1 pb-1"
                                        onClick={() =>
                                          handleDeleteInput(input.id)
                                        }
                                      >
                                        <Trash size={18} />
                                      </Button>
                                    </Tooltip>
                                  </div>
                                }
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
                {/* <div className="border-t-[0.5px] border-gray-100 w-full"></div> */}
              </ModalBody>
              <ModalFooter className="mt-0 pt-0">
                <Button variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onClick={() => handleSave(onClose)}>
                  Save Category
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateCategory;
