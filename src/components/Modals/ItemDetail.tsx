import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalProps,
  Button,
  useDisclosure,
  Image,
  Tabs,
  Tab,
  CardBody,
  Card,
  Select,
  SelectItem,
  Input,
} from "@nextui-org/react";
import { Add, Edit, Trash, User, Verify } from "iconsax-react";
import NoImage from "../../../public/images/no_app.jpg";
import axios from "axios";
import { log } from "console";

export default function ItemDetail({ setOpenMod, openMod, itemsUser }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] =
    React.useState<ModalProps["scrollBehavior"]>("inside");
  const [allAssets, setAllAssets] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [category, setCategory] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  console.log(itemsUser);

  const handleCategoryChange = (event) => {
    console.log("Selected Category ID:", event.target.value);
    setSelectedCategory(event.target.value.toLowerCase());

    const cate = allAssets.reduce((acc, data) => {
      const key = data.name.toLowerCase();
      acc[key] = data.subCategories;
      return acc;
    }, {});

    console.log(cate);
    const result = Object.keys(cate).map((key) => ({
      [key]: cate[key],
    }));
    console.log(result);
    setCategory(result);
  };

  const renderInputFields = () => {
    if (!selectedCategory) {
      return null;
    }

    console.log(category);
    const properties = category.find((item) => item[selectedCategory]);
    if (!properties) {
      return null;
    }
    console.log(properties);
    const inputs = Object.entries(properties).map(
      ([key, subProperties], index) => (
        <div
          key={index}
          className="w-full mt-4 grid grid-cols-2 gap-6 text-[14px]"
        >
          {Object.entries(subProperties).map(([subKey, value], subIndex) => (
            <div key={subIndex} className="col-span-1 flex gap-4 ">
              <div className="w-1/4 flex justify-between gap-4 items-center">
                <p className="capitalize">{subKey}</p>
                <p>:</p>
              </div>
              <div className="w-3/4">
                <Input
                  radius="sm"
                  placeholder={`Enter ${subKey}`}
                  className="w-full"
                  defaultValue={value}
                />
              </div>
            </div>
          ))}
        </div>
      )
    );
    setIsSelected(true);
    return inputs;
  };

  const OnChangeTab = (key) => {
    console.log(key);
    if (key === "edit") {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  };

  useEffect(() => {
    itemsUser.map((user) => {
      console.log(user);
      setAllAssets(user.allAssets);
    });
  }, [itemsUser]);

  const subCategoryKeys = Array.from(
    new Set(
      itemsUser.flatMap((user) =>
        user.allAssets.flatMap((asset) => Object.keys(asset.subCategories))
      )
    )
  );

  console.log(itemsUser);
  console.log("get assetsssssssss: ", allAssets);

  return (
    <div className="flex flex-col gap-2 ">
      <Modal
        isOpen={openMod}
        onOpenChange={onOpenChange}
        scrollBehavior={scrollBehavior}
        className="lg:max-h-[800px] md:max-h-[500px] max-w-[50%] h-[800px]"
      >
        <ModalContent className="">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 ">
                {/* Details */}
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-5">
                  <div className="flex justify-between gap-5">
                    {itemsUser.map((user, index) => (
                      <div key={index} className="flex gap-8">
                        <div>
                          <Image
                            src={user.prfl_PHTG}
                            alt={user?.employee_name}
                            className="w-[150px] h-[150px] rounded-full object-cover border-2 p-[2px] border-gray-400"
                          />
                        </div>
                        <div className="flex flex-col gap-4">
                          <div className="flex flex-col">
                            <div className="flex items-center font-medium">
                              {user?.employee_name}
                              <Verify
                                className="ml-2"
                                variant="Bold"
                                size="14"
                                color="#63F155"
                              />
                            </div>
                            <div className="text-[14px] text-gray-500">
                              {user.userId}
                            </div>
                          </div>
                          <div className="text-sm flex gap-5">
                            <div className="flex flex-col gap-1">
                              <p>Team </p>
                              <p>Department</p>
                              <p>Company </p>
                            </div>
                            <div className="flex flex-col gap-1 font-medium">
                              <p>{user?.team ? user?.team : "-"}</p>
                              <p> {user?.department}</p>
                              <p>{user?.company}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {/* <div className="flex gap-2 items-end">
                      <Button
                        isIconOnly
                        variant="light"
                        className="border-[1px] border-[#FF1E00]"
                      >
                        <Trash size="18" color="#FF1E00" />
                      </Button>
                    </div> */}
                  </div>

                  {/* <div className="border-b-[0.5px] border-gray-100"></div> */}

                  <div className="flex w-full flex-col">
                    <Tabs
                      aria-label="Options"
                      className="w-full"
                      fullWidth="true"
                      onSelectionChange={OnChangeTab}
                    >
                      <Tab key="view" title="VIEW" className="w-full">
                        <Card>
                          <CardBody>
                            <table className="w-full mt-4 border-collapse text-[14px]">
                              <thead>
                                <tr className="bg-gray-100 py-2 hover:bg-gray-200 hover:cursor-pointer">
                                  <th
                                    className="text-center pl-3 py-2"
                                    style={{
                                      borderRadius: "10px 0 0 10px",
                                      borderColor: "red",
                                    }}
                                  >
                                    No
                                  </th>
                                  <th
                                    className="pl-5 text-left py-2"
                                    style={{ borderColor: "red" }}
                                  >
                                    Category Name
                                  </th>
                                  {subCategoryKeys.map((key, index) => (
                                    <th
                                      key={index}
                                      className="p-2 text-center"
                                      style={{ borderColor: "red" }}
                                    >
                                      {key}
                                    </th>
                                  ))}
                                  <th
                                    className="p-2 text-center"
                                    style={{
                                      borderRadius: "0 10px 10px 0",
                                      borderColor: "red",
                                    }}
                                  >
                                    Remark
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {itemsUser.map((user, userIndex) =>
                                  user.allAssets.map((asset, assetIndex) => (
                                    <tr
                                      key={`${userIndex}-${asset.categoryId}`}
                                      className="py-2"
                                    >
                                      <td className="py-2 pl-3 text-center">
                                        {assetIndex + 1}
                                      </td>
                                      <td className="py-2 pl-6 capitalize">
                                        {asset.name}
                                      </td>
                                      {subCategoryKeys.map((key, subIndex) => (
                                        <td
                                          key={subIndex}
                                          className="p-2 text-center"
                                          style={{ borderColor: "red" }}
                                        >
                                          {asset.subCategories[key] || ""}
                                        </td>
                                      ))}
                                      <td
                                        className="p-2 text-center"
                                        style={{ borderColor: "red" }}
                                      >
                                        remark
                                      </td>
                                    </tr>
                                  ))
                                )}
                              </tbody>
                            </table>
                          </CardBody>
                        </Card>
                      </Tab>
                      <Tab key="edit" title="EDIT" className="w-full">
                        <Card className=" min-h-[450px] p-4">
                          <CardBody>
                            <div>
                              <p className="">
                                Please choose category to update
                              </p>
                              <div className="flex w-full my-2">
                                <Select
                                  label="Choose category"
                                  className="max-w-md"
                                  value={selectedCategory || ""}
                                  onChange={handleCategoryChange}
                                >
                                  {allAssets.map((item) => (
                                    <SelectItem
                                      key={item.name}
                                      value={item.name}
                                    >
                                      {item.name}
                                    </SelectItem>
                                  ))}
                                </Select>
                              </div>
                              <div className="mt-2">{renderInputFields()}</div>
                            </div>
                          </CardBody>
                        </Card>
                      </Tab>
                    </Tabs>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                {isEdit ? (
                 <>
                  <Button
                    color="default"
                    variant="light"
                    className="border-[1px] border-gray-200"
                    onClick={() => {
                      setSelectedCategory(null)
                      setOpenMod(false);
                    }}
                  >
                    Close
                  </Button>
                  <Button
                    color="primary"
                    className="border-[1px] text-white font-medium border-gray-200"
                    onClick={() => {
                      setSelectedCategory(null)
                      setOpenMod(false);
                    }}
                  >
                    Save Change
                  </Button>
                 </>
                ) : (
                  <Button
                    color="default"
                    variant="light"
                    className="border-[1px] border-gray-200"
                    onClick={() => {
                      setSelectedCategory(null)
                      setOpenMod(false);
                    }}
                  >
                    Close
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
