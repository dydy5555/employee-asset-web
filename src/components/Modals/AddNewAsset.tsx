import React, { useState } from "react";
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
  Select,
  SelectItem,
} from "@nextui-org/react";

import { Heart } from "iconsax-react";

  const category = [
    { key: "laptop", label: "Laptop" },
    { key: "phone", label: "Phone" },
    { key: "monitor", label: "Monitor" },
  ];

  const temp = [
    {
      laptop: ["name", "type", "lable_no", "mac_address"],
    },
    {
      phone: ["name"],
    },
    {
      monitor: ["name", "inch_A"],
    },
  ];

export default function AddNewAsset() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSelected, setIsSelected] = useState(false);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const renderInputFields = () => {
    if (!selectedCategory) {
      return null;
    }

    const properties = temp.find((item) => item[selectedCategory]);
    if (!properties) {
      return null;
    }

    const inputs = properties[selectedCategory].map((property, index) => (
      <>
      <div key={index} className="w-full grid grid-cols-4 gap-4 items-center">
        <div className="col-span-1 flex justify-between">
        <p className="capitalize ">{property}</p>
        <p>:</p>
        </div>
        <div className="col-span-3">
          <Input
            radius="sm"
            placeholder={`Enter ${property}`}
            className="w-full"
          />
        </div>
      </div>
      </>
    ));
    setIsSelected(true)
    return inputs;
  };

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Add New Asset
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
                <h1 className="text-center">Add New Asset</h1>
                <div className=" border-b-[1px] border-gray-100 mt-2"></div>
              </ModalHeader>
              <ModalBody className="px-8">
                <div className="flex w-full">
                  <Select
                    label="Select a category"
                    className="max-w-lg w-full"
                    value={selectedCategory || ""}
                    onChange={handleCategoryChange}
                  >
                    {category.map((item) => (
                      <SelectItem key={item.key} value={item.key}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <div className="flex flex-col gap-3 my-2 text-sm">
                  {isSelected ? (
                    <div className=" font-medium">Category properties</div> 
                  ):(
                    <></>
                  )}
                {renderInputFields()}</div>
                {/* <div className="border border-[1px] border-gray-100"></div> */}
              </ModalBody>

              <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={onClose}>
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
