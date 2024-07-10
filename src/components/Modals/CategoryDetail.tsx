'use client'
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Tooltip,
} from "@nextui-org/react";
import { Add, Edit2, Trash } from "iconsax-react";
import { log } from "console";
import { func_EditCategory } from "@/services/category.service";
import toast from "react-hot-toast";

export default function CategoryDetail({ category, isOpen, setOpenEdit }) {
  const { onOpen, onOpenChange } = useDisclosure();
  const [cate, setCate] = useState([]);
  const [subCategoryValues, setSubCategoryValues] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [cateProperty, setCateProperty] = useState([]);
  const [inputValues, setInputValues] = useState([]);
  const [categories, setCategories] = useState([]);
  const [inputList, setInputList] = useState([]);

  const handleAddInput = () => {
    setInputList([...inputList, { id: inputList.length, value: "" }]);
    inputList.map((v, k) => {
      setCateProperty([...cateProperty, v.value]);
    });
  };

  useEffect(() => {
    setCategories(category);
    setCategoryName(category?.categoryName);
    setCateProperty(category.subCategories);
    setInputValues(category.subCategories);
  }, [category]);

  const handleChangeCateName = (e) => {
    setCategoryName(e.target.value.toLowerCase());
  };

  const handleDeleteProperty = (index) => {
    // console.log(value);
    // console.log(index);
    // const newData = [
    //   ...cateProperty.slice(0, index),
    //   ...cateProperty.slice(index + 1),
    // ];
    // setInputValues(newData)
    // setCateProperty(newData);
    // console.log(cateProperty);
    const updatedProperties = cateProperty.filter((_, i) => i !== index);
    setCateProperty(updatedProperties);

    const propertyToRemove = cateProperty[index];
    setInputValues((prevValues) => {
      const updatedValues = { ...prevValues };
      delete updatedValues[propertyToRemove];
      return updatedValues;
    });
  };

  const handleInputChange = (value, index) => {
    // setInputValues((prevValues) => ({
    //   ...prevValues,
    //   [index]: value,
    // }));
    setInputValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = value.toLowerCase().trim();
      return newValues;
    });
    console.log(inputValues);
  };

  const handleSaveUpdate = () => {
    // const valueSub = inputValues.filter(value => value !== null || value !== "");
    const propertiesList = inputValues
      .map((input) => input.trim().toLowerCase())
      .filter((value) => value !== "");

    console.log(propertiesList);

    const dataUpdate = { categoryName, subCategories: propertiesList };
    console.log(dataUpdate);
    if (categoryName !== "") {
      func_EditCategory(category.id, dataUpdate).then(async (res) => {
        console.log(res?.data?.payload);
        setOpenEdit(false);
        toast.success("Updated Successfully!");
      });
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="text-[14px]"
        size="2xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-[16px] text-center mt-2">
                Edit Category
              </ModalHeader>
              <ModalBody className="px-10 text-[14px] ">
                <div>
                  <p className="pb-3 font-medium">Category name</p>
                  <div className="flex gap-4">
                    <Input
                      isClearable
                      isRequired
                      size="md"
                      placeholder=""
                      defaultValue={category?.categoryName}
                      onChange={handleChangeCateName}
                      onClear={() => {
                        console.log("input cleared");
                        setCategoryName("");
                      }}
                    />
                    <div className="right-6 flex">
                      <Tooltip
                        color="default"
                        content="Add Property"
                        placement="bottom"
                        className="capitalize"
                      >
                        <Button
                          color="primary"
                          className=""
                          isIconOnly
                          variant="flat"
                          onClick={handleAddInput}
                        >
                          <Add size="20" color="#006FEE" />
                        </Button>
                      </Tooltip>
                    </div>
                  </div>
                  <div className="border-t-[0.5px] border-gray-100 mt-4">
                    <p className="font-medium py-2">Categorys field</p>
                    <div className="grid grid-cols-2 gap-6">
                      {cateProperty?.map((property, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center mb-2"
                        >
                          <p className="capitalize text-[12px] pl-1">
                            {/* {property} */}
                          </p>
                          <div className="flex justify-center items-center gap-2">
                            <Input
                              isClearable
                              type="text"
                              size="md"
                              className="mt-1"
                              placeholder=""
                              defaultValue={property}
                              onChange={(e) =>
                                handleInputChange(e.target.value, index)
                              }
                            />

                            <Button
                              isIconOnly
                              onClick={() => handleDeleteProperty(index)}
                            >
                              <Trash size="18" color="#FF8A65" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onClick={() => {
                    setOpenEdit(false);
                    setInputValues([]);
                    setCategoryName("");
                    setCateProperty([]);
                    onClose();
                  }}
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  onClick={() => {
                    handleSaveUpdate();
                    setOpenEdit(false);
                    setInputValues([]);
                    setCategoryName("");
                    setCateProperty([]);
                    onClose();
                  }}
                >
                  Update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
