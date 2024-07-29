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
  Chip,
} from "@nextui-org/react";
import Image from "next/image";
import { fun_AddAsset, getByUserAndCompany } from "@/services/assets.service";
import toast from "react-hot-toast";
import { fetchAllItems, fun_UpdateItem } from "@/services/item.service";
import RemoveItemFromUser from "./RemoveItemFromUser";
import { func_CreateHistoryItem } from "@/services/itemhistory.service";
import moment from "moment";
import NoImage from "../../../public/images/no_app.jpg";
import { showToastSuccess } from "@/services/commonfunc.service";

export default function AssetDetail({
  setOpenMod,
  openMod,
  itemsUser,
  toChild,
  handleRowClick,
  haveItems,
  sendUser,
}) {
  const [scrollBehavior, setScrollBehavior] =
    React.useState<ModalProps["scrollBehavior"]>("inside");
  const [allAssets, setAllAssets] = useState([]);
  const [allCates, setAllCates] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSelected, setIsSelected] = useState(true);
  const [allItems, setAllItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [openDel, setOpenDel] = useState(false);
  const [sendId, setSendId] = useState({});
  const [user, setUser] = useState({});
  const [getUser, setGetUser] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [tempUser, setTempUser] = useState({});

  console.log({ itemsUser });
  console.log(sendUser.userId, sendUser.use_INTT_ID);
  console.log({ sendUser });

  const handleItemChange = (value) => {
    console.log(value);
    const foundItem = allItems.find((item) => item.id === value);
    console.log(foundItem);
    setSelectedUserId(foundItem?.userId);
    setSelectedItem(foundItem);
  };

  const handleDeleteItem = async (id, userId, use_INNITID, qty) => {
    const idDel = { id, userId, use_INNITID, qty };
    setSendId(idDel);
    setOpenDel(true);
  };

  useEffect(() => {
    // itemsUser?.map((res) => {
    //   setTempUser([])
    //   setTempUser(res);
    // });

    getByUserAndCompany(sendUser.userId, sendUser.use_INTT_ID).then((res) => {
      console.log(res);
      setTempUser([]);
      setTempUser(res?.data?.payload);
    });
  }, [itemsUser]);

  console.log({ tempUser });
  useEffect(() => {
    setGetUser(itemsUser);
    itemsUser.map((res) => {
      setUser(res);
      res.allAssetOfUser?.map((i) => {
        setAllCates([]);
        setAllCates(i);
      });
    });

    const fetchItems = () => {
      try {
        fetchAllItems().then((res) => {
          if (res?.status == 200) {
            setAllItems([]);
            setAllItems(res?.data?.payload?.allItem);
          }
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
      }
    };
    fetchItems();
  }, [itemsUser]);

  console.log(getUser);
  console.log(allItems);

  const subCategoryKeys = Array.from(
    // new Set(
    //   allItems.flatMap((user) =>
    //     user?.allAssets?.flatMap((j) => Object.keys(j.subCategories))
    //     )

    // )
    new Set(
      getUser?.flatMap((user) =>
        user?.allAssetOfUser?.flatMap((i) =>
          i.item?.allAssets?.flatMap((j) => Object.keys(j.subCategories))
        )
      )
    )
  );
  console.log(subCategoryKeys);
  console.log(allCates);
  const startDate = moment().format("YYYYMMDD");

  const handleSave = () => {
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

    const dataSave = {
      userId: tempUser.userId,
      employee_name: tempUser.employee_name,
      team: tempUser.team,
      remark: selectedItem.remark,
      department: tempUser.team,
      company: tempUser.company,
      img_url: tempUser.img_url,
      use_INNITID: tempUser.use_INNITID,
      start_date: allCates.start_date,
      end_date: allCates.end_date,
      item_Id: selectedItem.id,
      quantity: 1,
    };

    try {
      fun_UpdateItem(selectedItem.id, dataForItem).then((res) => {
        console.log("dataForItem", res);
      });
      fun_AddAsset(dataSave).then((res) => {
        console.log({ res });
        if (res.status === 200) {
          toast.success("Updated successfully!");
          // console.log("ksksksks ", selectedUserId, selectedItem)
          // addNewAsset("selok", selectedItem)
          handleRowClick(user.userId, user.use_INNITID);
          toChild();
          const dataItemHistory = {
            itemId: selectedItem.id,
            employeeId: tempUser.flnm,
            userProfile: tempUser.dvsn_NM,
            useInttId: tempUser.use_INTT_ID,
            description: selectedItem.remark,
            givenQuantity: 1,
            givenDate: startDate,
            returnedDate: null,
            givenBy: "sokhen",
            receivedBy: tempUser.flnm,
            condition: "Good",
            status: "INUSE",
          };
          func_CreateHistoryItem(dataItemHistory).then((res) => {
            console.log({ res });
            if (res.status === 200) {
              showToastSuccess("History have been saved!");
            }
          });
        }
      });
    } catch (error) {
      console.log("Error ::: ", error);
    }
  };

  return (
    <div className="flex flex-col gap-2 ">
      <Modal
        isOpen={openMod}
        onOpenChange={() => {
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
                    {/* {getUser.map((empinfo) => ( */}
                    <>
                      <div className="grid grid-cols-6 w-3/5 gap-6">
                        <div className="col-span-2 font-medium flex flex-col justify-center">
                          <p className="py-1">Employee </p>
                          <p className="py-1">User ID </p>
                          <p className="py-1">Company </p>
                          <p className="py-1">Department </p>
                          <p className="py-1">Position </p>
                        </div>

                        <div className="col-span-4 flex flex-col justify-center">
                          <p className="py-1">{sendUser.flnm}</p>
                          <p className="py-1">{sendUser.userId}</p>
                          <p className="py-1">
                            {sendUser.use_INTT_ID &&
                            sendUser.use_INTT_ID == "UTLZ_590"
                              ? "KOSIGN"
                              : "-"}
                          </p>
                          <p className="py-1">{sendUser.dvsn_NM}</p>
                          <p className="py-1">
                            {sendUser.jbcl_NM ? sendUser.jbcl_NM : "-"}
                          </p>
                        </div>
                      </div>

                      <div className="w-2/5 flex justify-center item-center">
                        <Image
                          width={150}
                          height={150}
                          src={
                            sendUser.prfl_PHTG
                              ? sendUser.prfl_PHTG
                              : "https://i.pinimg.com/originals/b5/85/5b/b5855b9c2b4dd756c997882ecfbd58e9.jpg"
                          }
                          alt={sendUser?.flnm}
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
                    >
                      <Tab key="view" title="VIEW" className="w-full">
                        <Card className=" min-h-[305px] overflow-auto custom-scroll">
                          <CardBody className="px-4 h-full">
                            {tempUser?.allAssetOfUser?.length > 0 ? (
                              <table className="w-full h-full text-md border-collapse text-[14px]">
                                <thead>
                                  <tr className="bg-gray-100 py-2  hover:bg-gray-200 hover:cursor-pointer">
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
                                      className="pl-5 text-left "
                                      style={{
                                        borderRadius: "0px 0 0 0px",
                                        borderColor: "red",
                                      }}
                                    >
                                      Category Name
                                    </th>
                                    {subCategoryKeys?.map((key, index) => (
                                      <th
                                        key={index}
                                        className="p-2 text-center capitalize"
                                        style={{ borderColor: "red" }}
                                      >
                                        {key}
                                      </th>
                                    ))}
                                    <th
                                      className="p-2 text-center "
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
                                  {tempUser?.allAssetOfUser.map((items, k) =>
                                    items.item.allAssets?.map(
                                      (asset, index) => (
                                        <tr key={k} className="py-2 border-b">
                                          <td className="py-2 pl-3 text-center">
                                            {k + 1}
                                          </td>
                                          <td className="py-2 pl-6 capitalize">
                                            {asset.name}
                                          </td>
                                          {subCategoryKeys.map(
                                            (key, subIndex) => (
                                              <td
                                                key={subIndex}
                                                className="p-2 text-center"
                                                style={{ borderColor: "red" }}
                                              >
                                                {asset?.subCategories[key] ||
                                                  ""}
                                              </td>
                                            )
                                          )}
                                          <td
                                            className="p-2 text-center"
                                            style={{ borderColor: "red" }}
                                          >
                                            {allCates?.item?.remark}
                                          </td>
                                        </tr>
                                      )
                                    )
                                  )}
                                </tbody>
                              </table>
                            ) : (
                              <>
                                <div className="flex flex-col justify-center items-center min-h-[280px] h-full w-full">
                                  <Image
                                    src={NoImage}
                                    alt="No asset"
                                    className="w-28 h-w-28 mb-4 "
                                  />
                                  <p className="text-md text-default-500">
                                    No asset found
                                  </p>
                                </div>{" "}
                              </>
                            )}
                          </CardBody>
                        </Card>
                      </Tab>

                      <Tab key="edit" title="EDIT" className="w-full">
                        <Card className=" min-h-[300px] px-3 py-2 text-sm">
                          <CardBody>
                            <div className="flex h-full flex-col gap-5">
                              <div>
                                <p className="font-medium pb-2">
                                  Item{"'"}s user
                                </p>
                                <div className="w-full  flex flex-wrap gap-3 min-h-[100px] border p-2 rounded-lg border-gray-100">
                                  {tempUser?.allAssetOfUser?.length > 0 ? (
                                    tempUser?.allAssetOfUser.map((items, k) =>
                                      items.item.allAssets?.map(
                                        (asset, assetIndex) => (
                                          <div key={assetIndex} className="">
                                            <Chip
                                              radius="md"
                                              variant="flat"
                                              size="lg"
                                              key={asset.categoryId}
                                              className="capitalize  "
                                              onClose={() => {
                                                handleDeleteItem(
                                                  items?.id,
                                                  sendUser.userId,
                                                  sendUser.use_INTT_ID,
                                                  items?.quantity
                                                );
                                              }}
                                            >
                                              {asset.name}
                                            </Chip>
                                          </div>
                                        )
                                      )
                                    )
                                  ) : (
                                    <div className="text-gray-400 flex justify-center items-center w-full -full">
                                      No item
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="flex mt-2 gap-5 items-end">
                                <div>
                                  <p className="font-medium pb-2">
                                    Add New Item{" "}
                                  </p>
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
                                          endContent={<div>{}</div>}
                                        >
                                          {asset.name}
                                        </AutocompleteItem>
                                      ));
                                    })}
                                  </Autocomplete>
                                </div>

                                <div className="mt-17">
                                  <Button
                                    color="primary"
                                    className="border-[1px] text-white font-medium border-gray-200"
                                    onClick={() => {
                                      handleSave();
                                    }}
                                  >
                                    Add
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </Tab>
                    </Tabs>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <>
                  <Button
                    color="default"
                    variant="light"
                    className="border-[1px] border-gray-200"
                    onClick={() => {
                      setSelectedCategory(null);
                      setOpenMod(false);
                      setAllAssets([]);
                      setAllCates([]);
                      setTempUser([]);
                      setIsSelected(true);
                      toChild();
                    }}
                  >
                    Close
                  </Button>
                </>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <RemoveItemFromUser
        handleRowClick={handleRowClick}
        openDel={openDel}
        setOpenDel={setOpenDel}
        sendId={sendId}
        allItems={allItems}
      />
    </div>
  );
}
