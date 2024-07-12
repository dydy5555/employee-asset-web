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
  Checkbox,
  Input,
  Link,
  Select,
  SelectItem,
  Avatar,
  Image,
} from "@nextui-org/react";

import { CardAdd, } from "iconsax-react";
import {
  fetchAllCCategory,
  func_GetCategoryByID,
} from "@/services/category.service";
import { getListEmployee } from "@/services/employee.service";
import { func_CreateAsset } from "@/services/assets.service";
import toast from "react-hot-toast";


export default function CreateAssetByUser() {
  let { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [id, setID] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [isSelectedUser, setIsSelectedUser] = useState(false);
  const [userSelected, setUserSeleted] = useState([]);
  const [allCate, setAllCate] = useState([]);
  const [subCate, setSubCate] = useState([]);
  const [allUser, setAllUser] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [cateName, setCateName] = useState("");
  const [subCategories, setSubCategories] = useState();
  const [allAssets, setAllAssets] = useState([]);
  const [isDisabledBtn, setIsDisabledBtn] = useState(false);

  const handleInputChange = (property, value) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [property]: value,
    }));
    setSubCategories(inputValues);
  };

  const handleCategoryChange = (event) => {
    console.log(event.target.value);
    setID(event.target.value);
    fetchByID(event.target.value);
  };

  const renderInputFields = () => {
    if (!id) {
      return null;
    }
    if (!subCate) {
      return null;
    }

    const inputs = subCate?.map((property, index) => (
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
              value={inputValues[property] || ""}
              onChange={(e) => handleInputChange(property, e.target.value)}
            />
          </div>
        </div>
      </>
    ));
    setIsSelected(true);
    return inputs;
  };

  const fetchCate = () => {
    try {
      fetchAllCCategory().then((res) => {
        if (res?.status == 200) {
          setAllCate(res?.data?.payload);
          console.log("allCate", res?.data?.payload);
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      // setIsLoading(false);
    } finally {
    }
  };

  const fetchByID = async (id) => {
    console.log(id);
    try {
      func_GetCategoryByID(id).then((res) => {
        console.log("res", res);
        setCateName(res.categoryName);
        console.log(res.subCategories);
        setSubCate(res.subCategories);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchEmployee = () => {
    getListEmployee().then((res) => {
      console.log(res);
      setAllUser(res);
    });
  };

  const handleSave = async () => {

    const allAss = { categoryId: id, name: cateName, subCategories };
    console.log("subCate", allAss);
    setAllAssets((prev)=>[...prev,allAss]);
    setIsDisabledBtn(true);
    console.log(allAssets)
    const data = {
      userId: userSelected.userId,
      employee_name: userSelected.flnm,
      team: "B2B",
      remark: "",
      department: userSelected.dvsn_NM,
      company: userSelected.use_INTT_ID,
      img_url: userSelected.prfl_PHTG,
      use_INNITID: userSelected.use_INTT_ID,
      allAssets,
    };
    try {
      await new Promise((resolve) => {
        // func_CreateAsset(data).then((res) => {
        //   console.log(res);
        //   if (res.status === 200) {
        //     toast.success("Added asset successfully!");
        //   }
        // });
        setTimeout(resolve, 2000);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsDisabledBtn(false);
    }

    console.log(data);
  };

  useEffect(() => {
    console.log(isSelectedUser);
    fetchCate();
    fetchEmployee();
  }, []);

  return (
    <>
      <Button
        onPress={onOpen}
        color="primary"
        variant="light"
        className="border-[0.5px] text-md text-semibold text-[#378CE7]"
        style={{ borderColor: "#378CE7" }}
      >
        <CardAdd size="26" color="#378CE7"/> Asset
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
                    items={allUser}
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
                      setUserSeleted(items[0]?.data);
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
                            <span>{item.data.flnm}</span>
                            {/* <span className="text-default-500 text-tiny">
                              {item.data.userId}
                            </span> */}
                          </div>
                        </div>
                      ));
                    }}
                  >
                    {(user) => (
                      <SelectItem key={user.id} textValue={user.flnm}>
                        <div className="flex gap-2 items-center">
                          <Avatar
                            alt={user.userId}
                            className="flex-shrink-0"
                            size="sm"
                            src={user.prfl_PHTG}
                          />
                          <div className="flex flex-col">
                            <span className="text-small">{user.flnm}</span>
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
                      value={id || ""}
                      onChange={handleCategoryChange}
                    >
                      {allCate.map((item) => (
                        <SelectItem key={item.id} value={item.categoryName}>
                          {item.categoryName}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                ) : (
                  <></>
                )}
                <div className="flex flex-col gap-3 my-2 text-sm pl-2">
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
                <Button
                  variant="flat"
                  onClick={() => {
                    setIsSelectedUser(false);
                    setAllCate([]);
                    setSubCate([]);
                    onClose();
                  }}
                >
                  Cancel
                </Button>
                <Button
                 disabled={isDisabledBtn}
                  color="primary"
                  onClick={() => {
                    handleSave();
                    // onClose();
                  }}
                >
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
