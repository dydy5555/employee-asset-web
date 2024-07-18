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
  Tabs,
  Tab,
  CardBody,
  Card,
  Input,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { func_GetCategoryByID } from "@/services/category.service";
import think from "../../../public/images/icon/Thinkin.svg";
import Image from "next/image";
import { func_UpdateAssetUser } from "@/services/assets.service";
import toast from "react-hot-toast";

export default function ItemDetail({
  setOpenMod,
  openMod,
  itemsUser,
  empinfo,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] =
    React.useState<ModalProps["scrollBehavior"]>("inside");
  const [allAssets, setAllAssets] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSelected, setIsSelected] = useState(true);
  const [category, setCategory] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [id, setID] = useState("");
  const [isLoadingCate, setIsLoadingCate] = useState(false);
  const [subCate, setSubCate] = useState([]);
  const [cateName, setCateName] = useState("");
  const [inputValues, setInputValues] = useState({});
  const [subCategories, setSubCategories] = useState();


  const handleCategoryChange = (value) => {
    if (value === null) {
      setIsSelected(true);
    } else {
      setIsLoadingCate(true);
      setTimeout(() => {
        try {
          const selectedAsset = itemsUser
            .flatMap((user) => user.allAssets)
            .find((asset) => asset.categoryId === value);
          setSelectedCategory(selectedAsset);
          setAllAssets([]);
          setAllAssets(selectedAsset);
          setCateName(selectedAsset.name);

          itemsUser.map((user) => {
            const select = user.allAssets.find(asset => asset.categoryId === value);
            if (select) {
              setID(user.id);
            }
          });
          setIsLoadingCate(false);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoadingCate(false);
          setIsSelected(false);
        }
      }, 2000);
    }
  };

  const handleInputChange = (key, value) => {
    console.log(key, value);

    setSelectedCategory((prevState) => ({
      ...prevState,
      subCategories: {
        ...prevState.subCategories,
        [key]: value,
      },
    }));
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
            // console.log("res", res);
            setCateName(res.categoryName.toLowerCase());
            console.log(res);
            setSubCate(res.subCategories);
            setInputValues(res.subCategories);
            setIsLoadingCate(false);
          });
          setIsLoadingCate(false);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoadingCate(false);
          // setIsSelected(false);
        }
      }, 2000);
    }
  };

  const renderInputFields = () => {
    if (!selectedCategory) return null;

    return Object.keys(selectedCategory.subCategories).map((key) => (
      <div key={key} className="w-full flex flex-col gap-2">
        <div className="w-full flex justify-between">
          <p className="capitalize text-sm font-medium">{key}</p>
        </div>
        <div className="w-full">
          <Input
            radius="md"
            placeholder={`Enter ${key}`}
            className="w-full text-sm"
            defaultValue={selectedCategory.subCategories[key] || ""}
            onChange={(e) => handleInputChange(key, e.target.value)}
          />
        </div>
      </div>
    ));
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

  }, [itemsUser]);

  const subCategoryKeys = Array.from(
    new Set(
      itemsUser.flatMap((user) =>
        user.allAssets.flatMap((asset) => Object.keys(asset.subCategories))
      )
    )
  );

  const handleSave = () => {
    const allAss = Array.of({
      categoryId: selectedCategory.categoryId,
      name: cateName,
      subCategories: selectedCategory.subCategories,
    });

    const data = {
      userId: empinfo.userId,
      employee_name: empinfo.flnm,
      team: empinfo.dvsn_NM,
      remark: empinfo.remark || "",
      department: empinfo.dvsn_NM,
      company: empinfo.use_INTT_ID,
      img_url: empinfo.prfl_PHTG,
      use_INNITID: empinfo.use_INTT_ID,
      allAssets: allAss,
    };

    try {
      func_UpdateAssetUser(empinfo.userId, id, data).then((res) => {
        if (res.status === 200) {
          toast.success("Updated successfully!");
          setSelectedCategory(null);
          setOpenMod(false);
        }
      });
    } catch (error) {
      console.log("Erorr ::: ", error);
    }

    console.log({ data });
    setAllAssets([]);
    setIsSelected(true);
  };
  // console.log({ empinfo });
  return (
    <div className="flex flex-col gap-2 ">
      <Modal
        isOpen={openMod}
        onOpenChange={()=>{
          setOpenMod(false);
        }}
        scrollBehavior={scrollBehavior}
        className="min-h-[650px] min-w-[700px]"
      >
        <ModalContent className="">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 mt-2 py-0 pt-4 pb-2">
                <h1 className="text-center">Assets Detail</h1>
                <div className=" border-b-[1px] border-gray-100 mt-2"></div>
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-5">
                  <div className="flex h-full justify-between  text-sm">
                    {/* {itemsUser.map((user, index) => ( */}
                    <>
                      <div className="grid grid-cols-6 w-3/5 gap-6">
                        <div className="col-span-2 font-medium flex flex-col justify-center">
                          <p className="py-1">Employee </p>
                          <p className="py-1">User ID </p>
                          <p className="py-1">Company </p>
                          <p className="py-1">Department </p>
                          {/* <p className="py-1">Position </p> */}
                        </div>

                        <div className="col-span-4 flex flex-col justify-center">
                          <p className="py-1">{empinfo.flnm}</p>
                          <p className="py-1">{empinfo.userId}</p>
                          <p className="py-1">
                            {empinfo.use_INTT_ID &&
                            empinfo.use_INTT_ID == "UTLZ_590"
                              ? "KOSIGN"
                              : "-"}
                          </p>
                          <p className="py-1">{empinfo.dvsn_NM}</p>
                          {/* <p className="py-1">
                              {empinfo.jbcl_NM ? empinfo.jbcl_NM : "-"}
                            </p> */}
                        </div>
                      </div>

                      <div className="w-2/5 flex justify-center item-center">
                        <Image
                          width={150}
                          height={150}
                          src={
                            empinfo.prfl_PHTG
                              ? empinfo.prfl_PHTG
                              : "https://i.pinimg.com/originals/b5/85/5b/b5855b9c2b4dd756c997882ecfbd58e9.jpg"
                          }
                          alt={empinfo?.flnm}
                          className="w-[150px] h-[150px] object-cover p-1 rounded-full dark:block border-[1px] border-gray-100"
                        />
                      </div>
                    </>
                    {/* ))} */}
                  </div>

                  {/* <div className="border-b-[0.5px] border--100"></div> */}

                  <div className="flex w-full flex-col">
                    <Tabs
                      aria-label="Options"
                      className="w-full"
                      fullWidth="true"
                      onSelectionChange={OnChangeTab}
                    >
                      <Tab key="view" title="VIEW" className="w-full">
                        <Card className=" min-h-[300px] overflow-auto custom-scroll">
                          <CardBody className="px-4">
                            <table className="w-full mt-2  border-collapse text-[14px]">
                              <thead>
                                <tr className="bg-gray-100 py-2  hover:bg-gray-200 hover:cursor-pointer">
                                  {/* <th
                                    className="text-center pl-3 py-2"
                                    style={{
                                      borderRadius: "10px 0 0 10px",
                                      borderColor: "red",
                                    }}
                                  >
                                    No
                                  </th> */}
                                  <th
                                    className="pl-5 text-left font-medium"
                                    style={{
                                      borderRadius: "10px 0 0 10px",
                                      borderColor: "red",
                                    }}
                                  >
                                    Category Name
                                  </th>
                                  {subCategoryKeys.map((key, index) => (
                                    <th
                                      key={index}
                                      className="p-2 text-center font-medium"
                                      style={{ borderColor: "red" }}
                                    >
                                      {key}
                                    </th>
                                  ))}
                                  <th
                                    className="p-2 text-center font-medium"
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
                                      {/* <td className="py-2 pl-3 text-center">
                                        {assetIndex + 1}
                                      </td> */}
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
                        <Card className=" min-h-[300px] px-3 py-2 text-sm">
                          <CardBody>
                            <div className="w-3/6 ">
                              <p className="font-medium pb-2">
                                Please choose a category{" "}
                              </p>
                              <Autocomplete
                                placeholder="Laptop, Monitor, Keyboad ,..."
                                className="max-w-sm"
                                onSelectionChange={handleCategoryChange}
                              >
                                {itemsUser?.map((cate) => {
                                  return cate.allAssets.map(
                                    (asset, assetIndex) => (
                                      <AutocompleteItem
                                        key={asset.categoryId}
                                        value={asset.categoryId}
                                        className="capitalize"
                                      >
                                        {asset.name}
                                      </AutocompleteItem>
                                    )
                                  );
                                })}
                              </Autocomplete>
                            </div>

                            <div className="mt-4">
                              {isLoadingCate ? (
                                <div className="flex justify-center items-center w-full h-[175px]">
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
                                        className="w-[175px] h-[175px] object-cover rounded-full dark:block "
                                      />
                                    </div>
                                  ) : (
                                    <>
                                      {isLoadingCate ? (
                                        <div className="flex justify-center items-center w-full h-[175px]">
                                          <button className="custom-loader"></button>
                                        </div>
                                      ) : (
                                        <>
                                          <div className="grid grid-cols-2 gap-6 -z-1 max-h-[300px] pt-2  overflow-auto custom-scroll w-full h-full">
                                            {renderInputFields()}
                                          </div>
                                        </>
                                      )}
                                    </>
                                  )}
                                </>
                              )}
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
                        setSelectedCategory(null);
                        setOpenMod(false);
                        setAllAssets([]);
                        setIsSelected(true);
                      }}
                    >
                      Close
                    </Button>
                    <Button
                      color="primary"
                      className="border-[1px] text-white font-medium border-gray-200"
                      onClick={() => {
                        handleSave();
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
                      // setSelectedCategory(null);
                      setSubCate([]);
                      setOpenMod(false);
                      setAllAssets([]);
                      setIsSelected(true);
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
