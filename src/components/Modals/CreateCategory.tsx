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
} from "@nextui-org/react";
import { Trash } from "iconsax-react";
import AddNewAsset from "./AddNewAsset";


function CreateCategory() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [inputList, setInputList] = useState([]);
  const [categoryName,  setCategoryName] = useState("");
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
    setCategoryName(e.target.value.toLowerCase())
  }
  
  const handleDeleteInput = (id) => {
    const updatedInputList = inputList.filter((input) => input.id !== id);
    setInputList(updatedInputList);
  };

  const handleSave = ()=>{
    const propertiesList = inputList
    .map((input) => input.value.trim().toLowerCase()).filter((value) => value !== "");
    const newCategory = { [categoryName] : propertiesList };
    console.log(newCategory)
  }
   
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
                <h1 className="text-center">Add New Category</h1>
                <div className="border border-[1px] border-gray-100 mt-2"></div>
              </ModalHeader>
              <ModalBody className="px-7">
                <div className="flex gap-4 items-center">
                  <Input className="w-full ring-0"
                    autoFocus
                    label="Name"
                    placeholder="Enter your category name"
                    variant="bordered"
                    onChange={handleChangeCategoryName}
                  />
                  <div className="right-0 flex ">
                    <Button color="primary" variant="ghost" onClick={handleAddInput}>
                      Add Property
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col gap-4 mt-2 mb-3">
                    {inputList.map((input) => (
                    <div className="flex items-center gap-4">
                        <Input
                        key={input.id}
                        value={input.value}
                        onChange={(e) => handleInputChange(input.id, e.target.value)}
                        placeholder="enter property name"
                        className="w-full"
                        />
                       <Button isIconOnly  onClick={() => handleDeleteInput(input.id)} ><Trash size='20' color="#F31260"></Trash></Button>
                    </div>
                    ))}
                </div>        

                <div className="border border-[1px] border-gray-100"></div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
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
