import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Button,
  Card,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { Devices, NoteText, User } from "iconsax-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import think from "../../../public/images/icon/Thinkin.svg";
import sorry from "../../../public/images/icon/No data-cuate.svg";
import { getListEmployee } from "@/services/employee.service";
import {
  fetchAllCCategory,
  func_GetCategoryByID,
} from "@/services/category.service";
import moment from "moment";
import { func_CreateAsset } from "@/services/assets.service";
import toast from "react-hot-toast";
import { fetchAllItems, fun_UpdateItem } from "@/services/item.service";
import { showToastSuccess } from "@/services/commonfunc.service";
import { func_CreateHistoryItem } from "@/services/itemhistory.service";

function AddNewAsset({ allUser, toChild }) {
  let { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [id, setID] = useState(null);
  const [isSelectedUser, setIsSelectedUser] = useState(false);
  const [userSelected, setUserSeleted] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [itemRemark, setItemRemark] = useState("");
  const [allItems, setAllItems] = useState([]);
  const [isItemAvailable, setIsItemAvailable] = useState(true);
  const [quantity, setQuantity] = useState("");
  const [selectedItem, setSelectedItem] = useState([]);

  const handleItemChange = (value) => {
    console.log(value);
    setID(value);
    const foundItem = allItems.find((item) => item.id === value);
    console.log({ foundItem });
    setSelectedItem(foundItem);
    setIsSelected(true);
  };

  const handleSelectUser = (userID) => {
    console.log({ userID });
    if (userID === null || userID === undefined) {
      setIsSelectedUser(false);
    }
    const selectedUser = allUser.find((user) => user.id === userID);
    console.log(selectedUser);
    setUserSeleted(selectedUser);
    setIsSelectedUser(true);
  };

  const onChangeRemark = (value) => {
    setItemRemark(value);
  };

  useEffect(() => {
    const fetchItems = () => {
      try {
        fetchAllItems().then((res) => {
          if (res?.status == 200) {
            setAllItems(res?.data?.payload?.allItem);
            console.log("aaaa", res?.data?.payload.allItem);
          }
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
      }
    };

    fetchItems();
  }, []);

  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const increment = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
    }
  };

  const btn_save = () => {
    const mainQty = selectedItem.remain_quantity;
    let newQty = mainQty - Number(quantity);
    let newStt = "";
    const dataForItem = {
      allAssets: selectedItem.allAssets,
      status: "unavailable",
      problem: selectedItem.problem,
      purchase_date: selectedItem.purchase_date,
      quantity: selectedItem.quantity - 1,
      remain_quantity: selectedItem.remain_quantity - 1,
      unit_price: selectedItem.unit_price,
      stock_date: selectedItem.stock_date,
      img_url: selectedItem.img_url,
      remark: selectedItem.remark,
      solution: selectedItem.solution,
      start_date_repair: selectedItem.start_date_repair,
      end_date_repair: selectedItem.end_date_repair,
    };
    console.log({ dataForItem });

    try {
      fun_UpdateItem(selectedItem.id, dataForItem).then((res) => {
        console.log("dataForItem", res);
      });
    } catch (error) {
      console.log("Error ::: ", error);
    }

    const startDate = moment().format("YYYYMMDD");
    const data = {
      userId: userSelected.userId,
      employee_name: userSelected.flnm,
      team: userSelected.dvsn_NM,
      remark: itemRemark,
      department: userSelected.dvsn_NM,
      company: userSelected.use_INTT_ID,
      img_url: userSelected.prfl_PHTG,
      use_INNITID: userSelected.use_INTT_ID,
      start_date: startDate,
      end_date: "present",
      item_Id: id,
      quantity: 1,
    };

    func_CreateAsset(data).then((res) => {
      console.log({ res });
      if (res.status === 200) {
        showToastSuccess("Added new aseets successfully!");
        toChild();
      }
    });
    const dataItemHistory = {
      itemId: selectedItem.id,
      employeeId: userSelected.flnm,
      userProfile: userSelected.dvsn_NM,
      useInttId: userSelected.use_INTT_ID,
      description: itemRemark,
      givenQuantity: 1,
      givenDate: startDate,
      returnedDate: null,
      givenBy: "sokhen",
      receivedBy: userSelected.flnm,
      condition: "Good",
      status: "INUSE",
    };

    func_CreateHistoryItem(dataItemHistory).then((res) => {
      console.log({ res });
      if (res.status === 200) {
        // showToastSuccess("History have been saved!");
      }
    });

    console.log({ data });
  };

  // console.log(allItems);
  // console.log(allUser);

  return (
    <div className="text-sm">
      <Button
        onPress={onOpen}
        color="primary"
        variant="light"
        className="border-[0.5px] text-md text-semibold text-[#378CE7]"
        style={{ borderColor: "#378CE7" }}
      >
        <Devices size="22" color="#378CE7" /> Asset
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        size="xl"
        className="min-h-[400px] min-w-[500px]"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col w-full h-full gap-1 mt-2">
                <h1 className="text-center text-[#378CE7]">Add Asset</h1>
                <div className=" border-b-[1px] border-gray-100 mt-2"></div>
              </ModalHeader>
              <ModalBody className="px-8 w-full h-full py-0 ">
                {allUser?.length < 0 ? (
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
                    <div className="flex gap-5 items-center justify-between">
                      <div className="w-full">
                        <div className="text-md py-2 pl-2 font-medium">
                          Users
                        </div>
                        <Autocomplete
                          items={allUser}
                          label="Select a user"
                          className="max-w-xs w-full "
                          scrollShadowProps={{
                            isEnabled: false,
                          }}
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
                                    item.data.prfl_PHTG
                                      ? item.data.prfl_PHTG
                                      : "https://i.pinimg.com/originals/1b/0a/46/1b0a46e65b98612baa606d0c9af5f715.jpg"
                                  }
                                />
                                <div className="flex flex-col">
                                  <span>{item.data.flnm}</span>
                                </div>
                              </div>
                            ));
                          }}
                          onSelectionChange={handleSelectUser}
                          onClear={() => setIsSelectedUser(false)}
                          // startContent={<User size="18" color="#9ca3af"/>}
                        >
                          {(user) => (
                            <AutocompleteItem
                              key={user.id}
                              textValue={user.flnm}
                              className="capitalize"
                            >
                              <div className="flex gap-2 items-center">
                                <img
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

                      <div className="w-full">
                        <div className="">
                          <div className="w-full">
                            <div className="text-md py-2 pl-2 font-medium">
                              Items
                            </div>
                            <Autocomplete
                              label="Select an item"
                              className="max-w-xs"
                              scrollShadowProps={{
                                isEnabled: false,
                              }}
                              onSelectionChange={handleItemChange}
                            >
                              {allItems?.map((item) => {
                                return item.allAssets?.map((asset) => (
                                  <AutocompleteItem
                                    key={item.id}
                                    value={item.id}
                                    className={
                                      item.status === "unavailable"
                                        ? "text-[#FF0000] cursor-not-allowed disabled pointer-events-none"
                                        : ""
                                    }
                                  >
                                    {asset.subCategories?.name || "N/A"}
                                  </AutocompleteItem>
                                ));
                              })}
                            </Autocomplete>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className=" w-full h-full">
                      <p className="text-sm py-2 pl-2 font-medium flex items-end gap-2">
                        Remark
                      </p>
                      <Textarea
                        value={itemRemark}
                        size="sm"
                        placeholder="Enter your description"
                        className="h-full max-h-[200px]"
                        onValueChange={onChangeRemark}
                        startContent={<NoteText size="18" color="#9ca3af" />}
                      />
                    </div>

                    {/* <>
                        <div className="w-full h-full ">
                          <div className="w-full h-full flex flex-col justify-center items-center">
                            <Image
                              width={200}
                              height={200}
                              src={think}
                              alt="logo"
                              className="w-[350px] h-[340px] p-10 object-cover rounded-full dark:block "
                            />
                            <div className="text-gray-400 text-sm">
                              Please select a user!
                            </div>
                          </div>
                        </div>
                      </> */}

                    {/* {isSelected ? (
                      <>
                        <div className="flex mt-2 gap-5 justify-between">
                          <div className="w-full">
                            <label className="block text-[14.4px] font-medium  dark:text-white">
                              <div className="mb-2 flex justify-start pb-1 items-center gap-1">
                                <span className="capitalize text-sm font-medium">
                                  Quantity
                                </span>
                              </div>
                            </label>
                            <div className="flex justify-center items-center">
                              <Button
                                isIconOnly
                                onClick={decrement}
                                className="bg-white border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center"
                              >
                                <span className="text-xl">-</span>
                              </Button>
                              <Input
                                type="text"
                                value={quantity}
                                onChange={handleChange}
                                className="w-20 mx-2 text-center "
                                classNames={{
                                  input: "text-center",
                                  inputWrapper:
                                    "bg-transparent border border-[#DFF5FF]",
                                }}
                              />
                              <Button
                                isIconOnly
                                onClick={increment}
                                className="bg-white border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center"
                              >
                                <span className="text-xl">+</span>
                              </Button>
                            </div>
                          </div>

                          <div className=" w-full h-full">
                            <p className="capitalize pb-1 text-sm font-medium">
                              Remark
                            </p>
                            <Textarea
                              value={itemRemark}
                              placeholder="Enter your description"
                              className="max-w-xs"
                              onValueChange={onChangeRemark}
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )} */}
                  </>
                )}
              </ModalBody>

              <ModalFooter className="pb-6 px-8">
                <Button
                  variant="flat"
                  //   onClick={() => {
                  //     setIsSelectedUser(false);
                  //     setSubCate([]);
                  //     setOpenMod(false);
                  //   }}
                  onClick={() => {
                    onClose();
                    setIsSelectedUser(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  //   disabled={isDisabledBtn}
                  color="primary"
                  onClick={() => {
                    btn_save();
                    onClose();
                  }}
                >
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default AddNewAsset;
