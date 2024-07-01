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
import { Add, Trash } from "iconsax-react";
import AddNewAsset from "./AddNewAsset";

function CreateCategory() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [inputList, setInputList] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [properties, setProperties] = useState([]);

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
    const newCategory = { [categoryName]: propertiesList };
    console.log(newCategory);
  };

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Create Category
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        size="xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 mt-2">
                <h1 className="text-center">CreateCategory</h1>
                <div className="border-b-[0.5px] border-gray-100 mt-2"></div>
              </ModalHeader>
              <ModalBody className="px-6">
                <div className="flex gap-4 items-center w-full">
                  <Input
                    className="w-full"
                    autoFocus
                    placeholder="Enter your category name"
                    onChange={handleChangeCategoryName}
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

                <div className="flex flex-col gap-4 mt-2 mb-3">
                  <div className=" border-b-[0.5px] w-full border-gray-100"></div>
                  {inputList.map((input) => (
                    <>
                      <div className="flex items-center gap-4">
                        <Input
                          key={input.id}
                          value={input.value}
                          onChange={(e) =>
                            handleInputChange(input.id, e.target.value)
                          }
                          placeholder="Enter property name"
                          className="w-full"
                        />
                        <Button
                          isIconOnly
                          onClick={() => handleDeleteInput(input.id)}
                        >
                          <Trash size="20" color="#F31260"></Trash>
                        </Button>
                      </div>
                    </>
                  ))}
                </div>

                  {/* <div className=" border-[1px] border-gray-100"></div> */}
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={handleSave}>
                  Save
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
