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
      <div key={index} className="w-full ">
        <Input
          placeholder={`Enter ${property}`}
          className="w-full"
          // Implement onChange handler to manage input state
        />
      </div>
    ));

    return inputs;
  };

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Add New
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
                <div className="border border-[1px] border-gray-100 mt-2"></div>
              </ModalHeader>
              <ModalBody className="px-7">
                <div className="flex gap-4 items-center">
                  <Select
                    label="Select a category"
                    className="max-w-lg"
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
                <div className="flex flex-col gap-4 my-2">{renderInputFields()}</div>
                <div className="border border-[1px] border-gray-100"></div>
              </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
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
