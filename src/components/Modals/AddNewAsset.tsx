import React, { useEffect, useState } from "react";
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
  Avatar,
  Image,
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

const tempUser = [
  {
    id: 1,
    userId: "kongrady",
    username: "Kong Rady",
    prfl_PHTG:
      "https://i.pinimg.com/736x/8d/96/08/8d960872618c86ab63bd51922c4da6de.jpg",
  },
  {
    id: 2,
    userId: "moniroit",
    username: "Morn Moniroit",
    prfl_PHTG:
      "https://i.pinimg.com/originals/be/ce/4f/bece4fb55afdd7bbdc55628cc8242aea.jpg",
  },
  {
    id: 3,
    userId: "sokhen",
    username: "Sim Sokhen",
    prfl_PHTG:
      "https://i.pinimg.com/564x/62/a2/b5/62a2b5e86f23ff89ce394d7eed6a4d43.jpg",
  },
  {
    id: 4,
    userId: "rithysak",
    username: "Ren Rithysak",
    prfl_PHTG:
      "https://i.pinimg.com/736x/2e/7a/a5/2e7aa5fc8a1eaa81f604d1b992acbcb1.jpg",
  },
];

export default function AddNewAsset() {
  let { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [isSelectedUser, setIsSelectedUser] = useState(false);

  const handleCategoryChange = (event) => {
    console.log(event.target.value);
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

    console.log(properties);
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
    setIsSelected(true);
    return inputs;
  };

  useEffect(() => {}, []);

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
                <div>
                  {/* <p>Choose a user to add asset</p> */}

                  <Select
                    items={tempUser}
                    label="Select a user"
                    className="max-w-lg w-full"
                    classNames={{
                      label: "group-data-[filled=true]:-translate-y-5",
                      trigger: "min-h-16",
                      listboxWrapper: "max-h-[400px]",
                    }}
                    listboxProps={{
                      itemClasses: {
                        base: [
                          "rounded-md",
                          "text-default-500",
                          "transition-opacity",
                          "data-[hover=true]:text-foreground",
                          "data-[hover=true]:bg-default-100",
                          "dark:data-[hover=true]:bg-default-50",
                          "data-[selectable=true]:focus:bg-default-50",
                          "data-[pressed=true]:opacity-70",
                          "data-[focus-visible=true]:ring-default-500",
                        ],
                      },
                    }}
                    popoverProps={{
                      classNames: {
                        base: "before:bg-default-200",
                        content:
                          "p-0 border-small border-divider bg-background",
                      },
                    }}
                    renderValue={(items) => {
                      setIsSelectedUser(true);
                      return items.map((item) => (
                        <div key={item.key} className="flex items-center gap-2">
                          <Avatar
                            alt={item.data.userId}
                            className="flex-shrink-0"
                            size="sm"
                            src={item.data.prfl_PHTG}
                          />
                          <div className="flex flex-col">
                            <span>{item.data.username}</span>
                            {/* <span className="text-default-500 text-tiny">
                              {item.data.userId}
                            </span> */}
                          </div>
                        </div>
                      ));
                    }}
                  >
                    {(user) => (
                      <SelectItem key={user.id} textValue={user.username}>
                        <div className="flex gap-2 items-center">
                          <Avatar
                            alt={user.userId}
                            className="flex-shrink-0"
                            size="sm"
                            src={user.prfl_PHTG}
                          />
                          <div className="flex flex-col">
                            <span className="text-small">{user.username}</span>
                            <span className="text-tiny text-default-400">
                              {user.userId}
                            </span>
                          </div>
                        </div>
                      </SelectItem>
                    )}
                  </Select>
                </div>

                {isSelectedUser ? (
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
                ) : (
                  <></>
                )}
                <div className="flex flex-col gap-3 my-2 text-sm">
                  {isSelected ? (
                    <div className=" font-medium">Category properties</div>
                  ) : (
                    <></>
                  )}
                  {renderInputFields()}
                </div>
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
