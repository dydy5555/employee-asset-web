"use client";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import {
  showErrorToast,
  showToastSuccess,
} from "@/services/commonfunc.service";
import {
  func_EditCategory,
  func_GetCategoryByID,
} from "@/services/category.service";
import { func_DeleteItem } from "@/services/item.service";

export default function AskToDelete({
  openAskDelete,
  setOpenAskDelete,
  itemId,
  selectedCategory,
  onItemCreated,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [countItem, setCountItem] = useState(null);
  const [cateName, setCateName] = useState(null);
  const [subCate, setSubCate] = useState([]);


  useEffect(() => {
    const fetchCategory = () => {
      func_GetCategoryByID(selectedCategory).then((res) => {
        console.log("ressssssssss ", res, selectedCategory)
          setCateName(res?.categoryName)
          setSubCate(res?.subCategories)
          setCountItem(res?.countItem);
      });
    };
    fetchCategory();
  }, [selectedCategory]);

  const handleDeleteItem = () => {
    setIsLoading(true);
    try {
      func_DeleteItem(itemId).then((res) => {
        console.log("Delete item res: ", res);
        if (res.status === 200) {
          showToastSuccess("Item deleted succecfully!");
          const updateCateData = {
            categoryName: cateName,
            subCategories: subCate,
            countItem: countItem - 1,
          }
          func_EditCategory(selectedCategory, updateCateData);
          setOpenAskDelete(false);
          setIsLoading(false);
          onItemCreated();
        }
      });
    } catch (e) {
      console.error("Error deleting item: ", e);
      showErrorToast(`Error deleting item: , ${e}`);
      setOpenAskDelete(false);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal
        isOpen={openAskDelete}
        onOpenChange={() => setOpenAskDelete(false)}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center justify-center">
                <Image
                  preview={false}
                  className="mb-3 mt-5"
                  width={100}
                  height={100}
                  src="https://cdn-icons-png.flaticon.com/512/11747/11747900.png"
                  alt="delete icons"
                />
              </ModalHeader>
              <ModalBody>
                <p className="text-center">
                  Are you sure you want to delete this <b>Item</b>? This action
                  cannot be rollback.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="default"
                  onClick={() => setOpenAskDelete(false)}
                  className="w-full"
                >
                  Cancel
                </Button>
                <Button
                  color="danger"
                  onClick={() => handleDeleteItem()}
                  className="w-full"
                  isDisabled={isLoading}
                >
                  {isLoading ? <div className="custom-loader"></div> : "Delete"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
