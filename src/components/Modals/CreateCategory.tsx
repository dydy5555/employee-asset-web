'use client'

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
} from "@nextui-org/react";
import { Add, CardAdd, Category, Trash } from "iconsax-react";
import AddNewAsset from "./AddNewAsset";
import { fetchAllCCategory, func_CreateCategory } from "@/services/category.service";
import toast from "react-hot-toast";
import { showToastSuccess } from "@/services/commonfunc.service";

function CreateCategory({ setCategoriesFromParent, setTotalSubCategories, }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [inputList, setInputList] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [properties, setProperties] = useState([]);
  const onClose = () => setIsOpen(false);
  const handleAddInput = () => {
    setInputList([...inputList, { id: inputList.length, value: "" }]);
  };

  const handleInputChange = (id, value) => {
    const updatedInputList = inputList.map((input) =>
      input.id === id ? { ...input, value } : input
    );
    setInputList(updatedInputList);
  };

  const handleChangeCategoryName = (e) => {
    setCategoryName(e.target.value.toLowerCase());
  };

  const handleDeleteInput = (id) => {
    const updatedInputList = inputList.filter((input) => input.id !== id);
    setInputList(updatedInputList);
  };

  const handleSave = () => {
    const propertiesList = inputList
      .map((input) => input.value.trim().toLowerCase())
      .filter((value) => value !== "");
    const newCategory = { categoryName, subCategories: propertiesList };
    func_CreateCategory(newCategory).then((res)=>{
      console.log(res);
      showToastSuccess("Updated Successfully!");
      fetchAllCCategory().then((res) => {
        if (res?.status == 200) {
          setCategoriesFromParent(res?.data?.payload);
          setTotalSubCategories([])
          const count = res?.data?.payload.map((data) => {
            setTotalSubCategories((prev) => [...prev, data.subCategories]);
          });
        }
      });
    })
  };



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
      size="3xl"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold text-center text-primary">Create Category</h2>
            </ModalHeader>
            <ModalBody>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Input
                    label="Category Name"
                    placeholder="Enter category name"
                    value={categoryName}
                    onChange={handleChangeCategoryName}
                    className="flex-grow"
                    startContent={<Category className="text-gray-400"  size="20" />}
                  />
                  <Tooltip content="Add Property">
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
                {inputList.map((input, index) => (
                  <div key={input.id} className="flex items-center gap-4">
                    <Input
                      label={`Property ${index + 1}`}
                      placeholder="Enter property name"
                      value={input.value}
                      onChange={(e) => handleInputChange(input.id, e.target.value)}
                      className="flex-grow"
                    />
                    <Button
                      isIconOnly
                      color="danger"
                      variant="light"
                      className="rounded-full p-2"
                      onClick={() => handleDeleteInput(input.id)}
                    >
                      <Trash size={24} />
                    </Button>
                  </div>
                ))}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onClick={handleSave}>
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
