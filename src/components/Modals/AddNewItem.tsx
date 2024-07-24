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
  Select,
  SelectItem,
  Avatar,
  Autocomplete,
  AutocompleteItem,
  Card,
} from "@nextui-org/react";

import {
  fetchAllCCategory,
  func_GetCategoryByID,
} from "@/services/category.service";
import { getListEmployee } from "@/services/employee.service";
import { func_CreateAsset } from "@/services/assets.service";
import toast from "react-hot-toast";
import NoImage from "../../../public/images/no_app.jpg";
import Image from "next/image";
import think from "../../../public/images/icon/Thinkin.svg";

export default function AddNewItem({ setOpenMod, openMod }) {
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

  const handleCategoryChange = (value) => {
    console.log(value);
    setID(value);
    fetchByID(value);
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
    setIsSelected(true);
    return inputs;
  };

  const fetchByID = async (id) => {
    console.log(id);
    if(id === null){
      setIsSelectedUser(false)
      return null
    }
    try {
      func_GetCategoryByID(id).then((res) => {
        
        console.log("res", res);
        setCateName(res.categoryName);
        console.log(res.subCategories);
        setSubCate(res.subCategories);
        setIsSelectedUser(true);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchEmployee = () => {
    getListEmployee().then((res) => {
      console.log(res.user);
      setAllUser(res.user);
    });
  };

  const handleSelectUser = (userID) => {
    console.log({ userID });
    const selectedUser = allUser.find((user) => user.id === userID);
    setUserSeleted(selectedUser);
    setIsSelectedUser(true);
    console.log(userSelected);
  };

  const handleSave = async () => {
    const allAss = { categoryId: id, name: cateName, subCategories };
    console.log("subCate", allAss);
    setAllAssets((prev) => [...prev, allAss]);
    setIsDisabledBtn(true);
    console.log(allAssets);
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
        func_CreateAsset(data).then((res) => {
          console.log(res);
          if (res.status === 200) {
            toast.success("Added asset successfully!");
            setOpenMod(false);
          }
        });
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
    fetchCate();
    // fetchEmployee();
  }, []);

  console.log({ allUser });
  console.log({ allCate });

  return (
    <div>
      <Modal
        isOpen={openMod}
        onOpenChange={() => {
          setOpenMod(false);
          setIsSelectedUser(false);
        }}
        placement="top-center"
        size="xl"
        className="min-h-[650px] min-w-[700px]"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col w-full h-full gap-1 mt-2">
                <h1 className="text-center text-[#378CE7]">Add New Items</h1>
                <div className=" border-b-[1px] border-gray-100 mt-2"></div>
              </ModalHeader>
              <ModalBody className="px-8 w-full h-full py-0 ">
                {/* {allUser?.length < 0 ? (
                  <>
                    <div className="w-full flex-col flex items-center justify-center">
                      <Image
                        width={400}
                        height={400}
                        src={NoImage}
                        alt="no_app"
                      />
                      <div className="text-gray-400">No user</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <div className="flex gap-5 items-center justify-between">
                        <div className="w-full">
                          <div className="text-md py-1 pl-2 font-medium">
                            Users
                          </div>
                          <Autocomplete
                            items={allUser}
                            label="Select a user"
                            className="max-w-xs w-full "
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
                                <div
                                  key={item.key}
                                  className="flex items-center gap-2"
                                >
                                  <Avatar
                                    alt={item.data.userId}
                                    className="flex-shrink-0"
                                    size="sm"
                                    src={
                                      item.data.prfl_PHTG ||
                                      "https://i.pinimg.com/originals/1b/0a/46/1b0a46e65b98612baa606d0c9af5f715.jpg"
                                    }
                                  />
                                  <div className="flex flex-col">
                                    <span>{item.data.flnm}</span>
                                  </div>
                                </div>
                              ));
                            }}
                            onSelectionChange={handleSelectUser}
                            onClear={() => [setIsSelectedUser(false)]}
                          >
                            {(user) => (
                              <AutocompleteItem
                                key={user.id}
                                textValue={user.flnm}
                                className="capitalize"
                              >
                                <div className="flex gap-2 items-center">
                                  <Image
                                    alt={user.userId}
                                    className=" w-[40px] h-[40px] object-cover rounded-full p-[0.5px] border border-gray-100"
                                    width={40}
                                    height={40}
                                    src={
                                      user.prfl_PHTG ||
                                      "https://d2u8k2ocievbld.cloudfront.net/memojis/female/3.png"
                                    }
                                  />
                                  <div className="flex flex-col">
                                    <span className="text-small">
                                      {user.flnm}
                                    </span>
                                    <span className="text-tiny text-default-400">
                                      {user.userId}
                                    </span>
                                  </div>
                                </div>
                              </AutocompleteItem>
                            )}
                          </Autocomplete>
                        </div>
                        {isSelectedUser ? (
                          <>
                            <div className="w-full">
                              <div className="text-md py-1 pl-2 font-medium">
                                Assets
                              </div>
                              <Autocomplete
                                label="Select an asset"
                                className="max-w-xs"
                                scrollShadowProps={{
                                  isEnabled: false,
                                }}
                                onSelectionChange={handleCategoryChange}
                              >
                                {allCate?.map((item) => (
                                  <AutocompleteItem
                                    key={item.id}
                                    value={item.categoryName}
                                  >
                                    {item.categoryName}
                                  </AutocompleteItem>
                                ))}
                              </Autocomplete>
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>

                    {isSelectedUser ? (
                      <>

                      </>
                    ) : (
                      <>
                        <div className="w-full h-full ">
                          <div className="w-full h-full flex flex-col justify-center items-center">
                            <Image
                              width={200}
                              height={200}
                              src={think}
                              alt="logo"
                              className="w-[350px] h-[350px] p-10 object-cover rounded-full dark:block "
                            />
                            <div className="text-gray-400 text-sm">
                              Please select a user!
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {isSelected ? (
                      <div className=" mt-2 font-medium text-sm">
                        Category properties
                      </div>
                    ) : (
                      <></>
                    )}
                    <div className="grid grid-cols-2 gap-6 max-h-[300px]  overflow-auto custom-scroll w-full h-full">
                      {renderInputFields()}
                    </div>
                  </>
                )} */}

                <div className="w-full">
                  <div className="text-md py-1 pl-2 font-medium">
                    Categories
                  </div>
                  <Autocomplete
                    label="Categories"
                    placeholder="Search an category"
                    className="max-w-xs"
                    radius="lg"
                    scrollShadowProps={{
                      isEnabled: false,
                    }}
                    onSelectionChange={handleCategoryChange}
                    onClear={()=>{
                      setIsSelectedUser(false)
                    }}
                  >
                    {allCate?.map((item) => (
                      <AutocompleteItem key={item.id} value={item.categoryName}>
                        {item.categoryName}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                </div>

                <div>
                  {isSelectedUser ? (
                    <>
                      <div className=" mt-2 font-medium text-md">
                        Category properties
                      </div>
                      <Card className="p-5 mt-3 min-h-[350px]">
                        <div className="grid grid-cols-2 gap-6 max-h-[300px]  overflow-auto custom-scroll w-full h-full">
                          {renderInputFields()}
                        </div>
                      </Card>
                    </>
                  ) : (
                    <>
                      <div className="w-full h-full ">
                        <div className="w-full h-full flex flex-col justify-center items-center">
                          <Image
                            width={200}
                            height={200}
                            src={think}
                            alt="logo"
                            className="w-[350px] h-[350px] p-10 object-cover rounded-full dark:block "
                          />
                          <div className="text-gray-400 text-sm">
                            Please select a category!
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </ModalBody>

              <ModalFooter>
                <Button
                  variant="flat"
                  onClick={() => {
                    setIsSelectedUser(false);
                    setSubCate([]);
                    setOpenMod(false);
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
    </div>
  );
}
