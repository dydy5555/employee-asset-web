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
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";

import { CardAdd } from "iconsax-react";
import {
  fetchAllCCategory,
  func_GetCategoryByID,
} from "@/services/category.service";
import { getListEmployee } from "@/services/employee.service";
import { func_CreateAsset } from "@/services/assets.service";
import toast from "react-hot-toast";
import Image from "next/image";
import think from "../../../public/images/icon/Thinkin.svg";

export default function CreateAssetByUser({ clickUser }) {
  let { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [id, setID] = useState(null);
  const [isSelected, setIsSelected] = useState(true);
  const [isSelectedUser, setIsSelectedUser] = useState(false);
  const [userSelected, setUserSeleted] = useState([]);
  const [allCate, setAllCate] = useState([]);
  const [subCate, setSubCate] = useState([]);
  const [allUser, setAllUser] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [cateName, setCateName] = useState("");
  const [subCategories, setSubCategories] = useState();
  const [allAssets, setAllAssets] = useState([]);
  const [isDisabledBtn, setIsDisabledBtn] = useState(true);
  const [isLoadingCate, setIsLoadingCate] = useState(false);

  // console.log({ clickUser });

  const handleInputChange = (property, value) => {
    setIsDisabledBtn(false)
    setInputValues((prevValues) => ({
      ...prevValues,
      [property]: value.toLowerCase(),
    }));
    setSubCategories(inputValues);
    const allAss = { categoryId: id, name: cateName.toLowerCase(), subCategories };
    console.log("subCate", allAss);
    setAllAssets([]);
    setAllAssets((prev) => [...prev, allAss]);
  };

  const handleCategoryChange = (id) => {
    console.log(id);
    if (id === null) {
      setIsSelected(true);
    }
    setID(id);
    fetchByID(id);
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
        <div key={index} className="items-start  text-sm ">
          <div className=" w-full flex justify-between">
            <p className="capitalize pb-1 font-medium ">{property}</p>
          </div>
          <div className=" w-full">
            <Input
              radius="md"
              placeholder={`Enter ${property}`}
              className="w-full "
              value={inputValues[property] || ""}
              onChange={(e) => handleInputChange(property, e.target.value)}
            />
          </div>
        </div>
      </>
    ));
    return inputs;
  };

  const fetchCate = () => {
    try {
      fetchAllCCategory().then((res) => {
        if (res?.status == 200) {
          setAllCate(res.data.payload);
          console.log("allCate", res?.data?.payload);
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };

  const fetchByID = async (id) => {
    console.log(id);
    if (id === null) {
      setIsSelected(true);
    } else {
      setIsLoadingCate(true);
      setTimeout(() => {
        try {
          func_GetCategoryByID(id).then((res) => {
            setIsLoadingCate(true);
            setIsSelected(false);
            console.log("res", res);
            setCateName(res.categoryName.toLowerCase());
            console.log(res.subCategories);
            setSubCate(res.subCategories);
            setIsLoadingCate(false);
          });
          setIsLoadingCate(false);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoadingCate(false);
          // setIsSelected(false);s
        }
      }, 2000);
    }

    console.log(isSelected);
  };

  const handleSave = async () => {
    console.log(allAssets);
    const data = {
      userId: clickUser.userId,
      employee_name: clickUser.flnm,
      team: clickUser.dvsn_NM,
      remark: "",
      department: clickUser.dvsn_NM,
      company: clickUser.use_INTT_ID,
      img_url: clickUser.prfl_PHTG,
      use_INNITID: clickUser.use_INTT_ID,
      allAssets,
    };
   console.log(data)
    try {
      await new Promise((resolve) => {
        func_CreateAsset(data).then((res) => {
          console.log(res);
          if (res.status === 200) {
            toast.success("Added asset successfully!");
          }
        });
        setTimeout(resolve, 2000);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsDisabledBtn(true);
    }
    setIsSelected(true);
    console.log(data);
    setAllAssets([]);
  };

  console.log(isSelected);

  useEffect(() => {
    fetchCate();
  }, [clickUser]);

  return (
    <>
      <Button
        onPress={onOpen}
        color="primary"
        variant="light"
        className="border-[0.5px] text-md text-semibold text-[#378CE7]"
        style={{ borderColor: "#378CE7" }}
      >
        <CardAdd size="26" color="#378CE7" /> Asset
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        size="xl"
        className="min-h-[650px] min-w-[700px]"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 mt-2 py-0 pt-4 pb-2">
                <h1 className="text-center">Add New Asset</h1>
                <div className=" border-b-[1px] border-gray-100 mt-2"></div>
              </ModalHeader>
              <ModalBody className="px-8 w-full h-full">
                <div className="text-sm h-full w-full">
                  <div className="flex h-full justify-between ">
                    <div className="grid grid-cols-6 w-3/5 gap-6">
                      <div className="col-span-2 font-medium flex flex-col justify-center">
                        <p className="py-1">Employee </p>
                        <p className="py-1">User ID </p>
                        <p className="py-1">Company </p>
                        <p className="py-1">Department </p>
                        {/* <p className="py-1">Position </p> */}
                      </div>

                      <div className="col-span-4  flex flex-col justify-center">
                        <p className="py-1">{clickUser.flnm}</p>
                        <p className="py-1">{clickUser.userId}</p>
                        <p className="py-1">
                          {clickUser.use_INTT_ID &&
                          clickUser.use_INTT_ID == "UTLZ_590"
                            ? "KOSIGN"
                            : "-"}
                        </p>
                        <p className="py-1">{clickUser.dvsn_NM}</p>
                        {/* <p className="py-1">
                          {clickUser.jbcl_NM ? clickUser.jbcl_NM : "-"}
                        </p> */}
                      </div>
                    </div>

                    <div className="w-2/5 flex justify-center item-center">
                      <Image
                        width={150}
                        height={150}
                        src={
                          clickUser.prfl_PHTG ||
                          "https://i.pinimg.com/originals/3a/80/6d/3a806d44cdb143cb707185ce196e0e1d.jpg"
                        }
                        alt="logo"
                        className="w-[150px] h-[150px] object-cover p-1 rounded-full dark:block border-[1px] border-gray-100"
                      />
                    </div>
                  </div>

                  <div className="w-3/6 pt-2">
                    <p className="font-medium py-2">
                      Please choose a category{" "}
                    </p>
                    <Autocomplete
                      placeholder="Laptop, Monitor, Keyboad ,..."
                      className="max-w-sm capitalize"
                      onSelectionChange={handleCategoryChange}
                    >
                      {allCate?.map((cate) => (
                        <AutocompleteItem key={cate.id} value={cate.id} className="capitalize">
                          {cate.categoryName}
                        </AutocompleteItem>
                      ))}
                    </Autocomplete>
                  </div>
                </div>

                <div className="w-full h-full min-h-[300px] mt-2 border py-5 border-gray-100 rounded-xl ">
                  {isLoadingCate ? (
                    <div className="flex justify-center items-center w-full h-[250px]">
                      <button className="custom-loader"></button>
                    </div>
                  ) : (
                    <>
                      {isSelected ? (
                        <div className="w-full h-full flex justify-center items-center">
                          <Image
                            width={200}
                            height={200}
                            src={think}
                            alt="logo"
                            className="w-[250px] h-[250px] object-cover rounded-full dark:block "
                          />
                        </div>
                      ) : (
                        <>
                          {isLoadingCate ? (
                            <div className="flex justify-center items-center w-full h-[250px]">
                              <button className="custom-loader"></button>
                            </div>
                          ) : (
                            <>
                              <div className="grid grid-cols-2 gap-6 px-5 -z-1 max-h-[300px]  overflow-auto custom-scroll w-full h-full">
                                {renderInputFields()}
                              </div>
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
              </ModalBody>

              <ModalFooter>
                <Button
                  variant="flat"
                  onClick={() => {
                    setIsSelectedUser(false);
                    // setAllCate([]);
                    // setSubCate([]);
                    setIsSelected(true);
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
                    onClose();
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
