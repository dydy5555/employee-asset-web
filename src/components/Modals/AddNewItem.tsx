"use client";
import React, { useCallback, useEffect, useState } from "react";
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
  Tabs,
  Tab,
  DateRangePicker,
  DatePicker,
} from "@nextui-org/react";
import { useDropzone } from "react-dropzone";
import { parseAbsoluteToLocal } from "@internationalized/date";
import {
  fetchAllCCategory,
  func_EditCategory,
  func_GetCategoryByID,
} from "@/services/category.service";
import { getListEmployee } from "@/services/employee.service";
import { func_CreateAsset } from "@/services/assets.service";
import toast from "react-hot-toast";
import NoImage from "../../../public/images/no_app.jpg";
import Image from "next/image";
import think from "../../../public/images/icon/Thinkin.svg";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import { API_URL1, ihttpFormData } from "@/api/interceptor";
import axios from "axios";
import { func_CreateNewitem } from "@/services/item.service";
import PurchaseAndStockDate from "../PurchaseAndStockDate";
import QuantityInput from "../QuantityInput";
import PriceInput from "../PriceInput";
import RemarkInput from "../RemarkInput";
import { showErrorToast, showToastSuccess } from "@/services/commonfunc.service";
import AskToSaveItem from "./AskToSaveItem";
export default function AddNewItem({ onItemCreated, setOpenMod, openMod }) {
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
  const [isDisabledBtn, setIsDisabledBtn] = useState(false);
  const [itemImage, setItemImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [purchaseDate, setPurchaseDate] = useState("");
  const [stockDate, setStockDate] = useState("");
  const [price, setPrice] = useState("");
  const [textNote, setTextNote] = useState("");
  const [openAskToSave, setOpenAskToSave] = useState(false);
  const [countItems, setCountItems] = useState(0);
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setItemImage(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  const handleInputChange = (property, value) => {
    setInputValues((prevValues) => {
      const newValues = { ...prevValues, [property]: value };
      console.log("New inputValues: ", newValues);
      return newValues;
    });
    setSubCategories((prevValues) => ({
      ...prevValues,
      [property]: value,
    }));
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
    if (id === null) {
      setIsSelectedUser(false);
      return null;
    }
    try {
      func_GetCategoryByID(id).then((res) => {
        console.log("res", res);
        setCateName(res.categoryName);
        console.log(res.subCategories);
        setSubCate(res.subCategories);
        setIsSelectedUser(true);
        setCountItems(res.countItem);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    let allAssets = [];
    const allAss = { categoryId: id, name: cateName, subCategories };
    // setAllAssets((prev) => [...prev, allAss]);
    console.log("allAss", allAss);
    allAssets.push(allAss);
    setIsDisabledBtn(true);
    const formData = new FormData();
    formData.append("image", itemImage);
    try {
      const response = await ihttpFormData.post(
        `${API_URL1}/api/v1/images/file`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("File uploaded successfully", response.data);
      let itemPic;
      if (itemImage == null || itemImage == "" || itemImage == undefined) {
        itemPic =
          "https://img.freepik.com/free-psd/3d-rendering-ui-icon_23-2149182289.jpg?t=st=1721803112~exp=1721806712~hmac=370c1b0651a912ea5d4df4ee7b54fa48ae3c10a3be810a3c6bbb75ecf97f5a86&w=826";
      } else {
        itemPic = `${API_URL1}/api/v1/images/getImage?fileName=${response?.data?.payload}`;
      }
      const data = {
        allAssets,
        status: "available",
        problem: "Good",
        purchase_date: purchaseDate || "",
        // quantity: quantity || null,
        // remain_quantity: quantity || null,
        quantity: 1,
        remain_quantity: 1,
        unit_price: price || null,
        stock_date: stockDate || "",
        img_url: itemPic || "",
        remark: textNote || "",
        solution: "",
        start_date_repair: "",
        end_date_repair: "",
      };
      console.log("textNote: " , textNote)
      console.log("data before add ", data);
      
      const updateCountItem = {
        categoryName: cateName,
        subCategories: subCate,
        countItem: countItems + 1,
      }
      console.log("data before update ", updateCountItem);
      const rescate = await func_EditCategory(id, updateCountItem);
      console.log("rescate: ", rescate)
      const res = await func_CreateNewitem(data);
      console.log({ res });

      if (res.status === 200) {
        setLoading(false);
        setOpenMod(false);
        showToastSuccess("Item created successfully!")
        onItemCreated();
        handleCloseModal();
      } else {
        setLoading(false);
        showErrorToast("Failed to create item, Please try again!")
        handleCloseModal();
      }
    } catch (error) {
      console.error("Error uploading file", error);
      setLoading(false);
    }
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
      } finally {
      }
    };
    fetchCate();
  }, []);

  const handleCloseModal = () => {
    setID(null);
    setIsSelected(false);
    setIsSelectedUser(false);
    setUserSeleted([]); // Note the typo, should be setUserSelected
    // setAllCate([]);
    setSubCate([]);
    setAllUser([]);
    setInputValues({});
    setCateName("");
    // setSubCategories(undefined); // or setSubCategories([]);
    // setAllAssets([]);
    setIsDisabledBtn(false);
    setItemImage(null);
    setLoading(false);
    setQuantity(1);
    setPurchaseDate("");
    setStockDate("");
    setPrice("");
    setTextNote("");

    setOpenMod(false);
  };
  
  return (
    <div>
      <Modal
        isOpen={openMod}
        onOpenChange={() => {
          handleCloseModal()
        }}
        placement="top-center"
        size="5xl"
        className="h-[800px] min-w-[700px]"
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col w-full h-fit gap-1 mt-2">
                <h1 className="text-center text-[#378CE7]">Add New Items</h1>
                <div className=" border-b-[1px] border-gray-100 mt-2"></div>
              </ModalHeader>
              <ModalBody className="px-8 w-full h-fit py-0 ">
                <div className="w-full">
                  <label className="block text-[14.4px] font-medium text-gray-500 dark:text-white">
                    <div className="mb-2 flex justify-start items-center gap-1">
                      <span>
                        Please choose a category for the new item from the list
                        below.
                      </span>
                    </div>
                  </label>
                  <Autocomplete
                    label="Categories"
                    placeholder="Search an category"
                    className="max-w-xs"
                    radius="lg"
                    variant="flat"
                    color="primary"
                    scrollShadowProps={{
                      isEnabled: false,
                    }}
                    onSelectionChange={handleCategoryChange}
                    // onClear={() => {
                    //   setIsSelectedUser(false);
                    // }}
                  >
                    {allCate?.map((item) => (
                      <AutocompleteItem
                        className="capitalize"
                        color="primary"
                        variant="flat"
                        key={item.id}
                        value={item.categoryName}
                        startContent={
                          <LabelOutlinedIcon
                            fontSize="small"
                            className="text-primary"
                          />
                        }
                      >
                        {item.categoryName}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                </div>

                <div>
                  {isSelectedUser ? (
                    <>
                      <hr />
                      <br />
                      <Tabs aria-label="Options">
                        <Tab
                          key="properties"
                          title={
                            <label className="block text-sm font-medium text-body-color dark:text-white">
                              <div className="flex justify-start items-center gap-1 text-primary">
                                <CategoryOutlinedIcon
                                  fontSize="small"
                                  className=""
                                />
                                <span>Category properties</span>
                              </div>
                            </label>
                          }
                        >
                          <label className="block text-[14.4px] font-medium text-gray-500 dark:text-white">
                            <div className="mb-2 flex justify-start items-center gap-1">
                              <span>
                                Provide the specifications and details of the
                                new asset being allocated to the employee, such
                                as item name, description, purchase date, stock
                                date, quantity, price per unit, image, status
                                and remark.
                              </span>
                            </div>
                          </label>
                          <Card className="p-5 mt-3 min-h-[400px]">
                            <div className="grid grid-cols-2 gap-6 max-h-[400px]  overflow-auto custom-scroll w-full h-full">
                              {renderInputFields()}
                            </div>
                          </Card>
                        </Tab>
                        <Tab
                          key="picture"
                          title={
                            <label className="block text-sm font-medium text-body-color dark:text-white">
                              <div className="flex justify-start items-center gap-1 text-primary">
                                <InsertPhotoOutlinedIcon
                                  fontSize="small"
                                  className=""
                                />
                                <span>Detail & Picture</span>
                              </div>
                            </label>
                          }
                        >
                          <label className="block text-[14.4px] font-medium text-gray-500 dark:text-white">
                            <div className="mb-2 flex justify-start items-center gap-1">
                              <span>
                                Provide the specifications and details of the
                                new asset being allocated to the employee, such
                                as item name, description, purchase date, stock
                                date, quantity, price per unit, images status
                                and remark.
                              </span>
                            </div>
                          </label>
                          <Card className="p-5 mt-3 min-h-[400px]">
                            <div className="grid grid-cols-2 gap-6 max-h-[400px]  overflow-auto custom-scroll w-full h-full">
                              {/* More detail */}
                              <div className="space-y-3">
                                <div className="grid grid-cols-2 justify-center items-start">
                                  {/* Quatity */}
                                  <QuantityInput
                                    quantity={quantity}
                                    setQuantity={setQuantity}
                                  />
                                  {/* Price per unit */}
                                  <PriceInput
                                    price={price}
                                    setPrice={setPrice}
                                  />
                                </div>
                                {/* purchase date and stock date */}
                                <PurchaseAndStockDate
                                  setPurchaseDate={setPurchaseDate}
                                  setStockDate={setStockDate}
                                />
                                {/* remark */}
                                <RemarkInput
                                  textNote={textNote}
                                  setTextNote={setTextNote}
                                />
                              </div>
                              <div className="mb-8">
                                <label className="block text-[14.4px] font-medium text-gray-500 dark:text-white">
                                  <div className="mb-2 flex justify-start items-center gap-1">
                                    <span>Item picture</span>
                                  </div>
                                </label>
                                <div
                                  {...getRootProps()}
                                  className={`dark:hover:bg-bray-800 flex h-[19rem] w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-gray-50 transition-all duration-300 ease-in-out hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600 ${
                                    isDragActive
                                      ? "border-primary"
                                      : "border-gray-300"
                                  }`}
                                >
                                  <input {...getInputProps()} />
                                  {itemImage ? (
                                    <div className="relative h-full w-full">
                                      <Image
                                        src={URL.createObjectURL(itemImage)}
                                        alt="Item preview"
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-lg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 hover:opacity-100">
                                        <p className="text-center text-white">
                                          Click or drag to replace
                                        </p>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                      <svg
                                        className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 16"
                                      >
                                        <path
                                          stroke="currentColor"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                        />
                                      </svg>
                                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold">
                                          Click to upload
                                        </span>{" "}
                                        or drag and drop
                                      </p>
                                      <p className="text-xs text-gray-500 dark:text-gray-400">
                                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </Card>
                        </Tab>
                      </Tabs>
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
                    handleCloseModal()
                  }}
                >
                  Cancel
                </Button>
                <Button
                  disabled={isDisabledBtn}
                  color="primary"
                  onClick={() => {
                    setOpenAskToSave(true);
                    // onClose();
                  }}
                >
                  {loading ? <div className="custom-loader"></div> : "Save"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <AskToSaveItem openAskToSave={openAskToSave} setOpenAskToSave={setOpenAskToSave} handleSave={handleSave} />
    </div>
  );
}
