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
import { fun_AddAsset } from "@/services/assets.service";
import toast from "react-hot-toast";
import { fetchAllItems, fun_UpdateItem } from "@/services/item.service";
import RemoveItemFromUser from "./RemoveItemFromUser";

export default function AssetDetail({ setOpenMod, openMod, itemsUser }) {
  const [scrollBehavior, setScrollBehavior] =
    React.useState<ModalProps["scrollBehavior"]>("inside");
  const [allAssets, setAllAssets] = useState([]);
  const [allCates, setAllCates] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSelected, setIsSelected] = useState(true);
  const [allItems, setAllItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [itemQty, setItemQty] = useState("");
  const [openDel, setOpenDel] = useState(false);
  const [sendId, setSendId] = useState({});
  const [user, setUser] = useState({});

  console.log({ itemsUser });
  console.log({ allItems });

  const handleItemChange = (value) => {
    console.log(value);
    const foundItem = allItems.find((item) => item.id === value);
    console.log(foundItem);
    setSelectedItem(foundItem);
  };

  const handleDeleteItem = async (id, userId, use_INNITID, itemId) => {
    const idDel = { id, userId, use_INNITID, itemId};
    setSendId(idDel);
    setOpenDel(true);
  };

  const handleChangeQty = (value) => {
    setItemQty(value);
  };

  useEffect(() => {
    itemsUser.map((res) => {
      setUser(res);
      res.allAssetOfUser.map((i) => {
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

  const subCategoryKeys = Array.from(
    new Set(
      itemsUser.flatMap((user) =>
        user?.allAssetOfUser.flatMap((i) =>
          i.item.allAssets?.flatMap((j) => Object.keys(j.subCategories))
        )
      )
    )
  );

  const handleSave = () => {
    const mainQty = selectedItem.quantity;
    let newQty = mainQty - Number(itemQty);

    const dataForItem = {
      allAssets: selectedItem.allAssets,
      status: selectedItem.status,
      problem: selectedItem.problem,
      purchase_date: selectedItem.purchase_date,
      quantity: newQty,
      remain_quantity: selectedItem.remain_quantity,
      unit_price: selectedItem.unit_price,
      stock_date: selectedItem.stock_date,
      img_url: selectedItem.img_url,
      remark: selectedItem.remark,
      solution: selectedItem.solution,
      start_date_repair: selectedItem.start_date_repair,
      end_date_repair: selectedItem.end_date_repair,
    };

    try {
      fun_UpdateItem(selectedItem.id, dataForItem).then((res) => {
        console.log("dataForItem", res);
      });
    } catch (error) {
      console.log("Error ::: ", error);
    }

    const dataSave = {
      userId: user.userId,
      employee_name: user.employee_name,
      team: user.team,
      remark: selectedItem.remark,
      department: user.team,
      company: user.company,
      img_url: selectedItem.img_url,
      use_INNITID: user.use_INNITID,
      start_date: allCates.start_date,
      end_date: allCates.end_date,
      item_Id: selectedItem.id,
      quantity: itemQty,
    };

    try {
      fun_AddAsset(dataSave).then((res) => {
        console.log({ res });
        if (res.status === 200) {
          toast.success("Updated successfully!");
        }
      });
    } catch (error) {
      console.log("Erorr ::: ", error);
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
                    {itemsUser.map((empinfo) => (
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
                            <p className="py-1">{empinfo.employee_name}</p>
                            <p className="py-1">{empinfo.userId}</p>
                            <p className="py-1">
                              {empinfo.company && empinfo.company == "UTLZ_590"
                                ? "KOSIGN"
                                : "-"}
                            </p>
                            <p className="py-1">{empinfo.department}</p>
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
                              empinfo.img_url
                                ? empinfo.img_url
                                : "https://i.pinimg.com/originals/b5/85/5b/b5855b9c2b4dd756c997882ecfbd58e9.jpg" ||
                                  ""
                            }
                            alt={empinfo?.employee_name}
                            className="w-[150px] h-[150px] object-cover p-1 rounded-full dark:block border-[1px] border-gray-100"
                          />
                        </div>
                      </>
                    ))}
                  </div>

                  {/* <div className="border-b-[0.5px] border--100"></div> */}

                  <div className="flex w-full flex-col">
                    <Tabs
                      aria-label="Options"
                      className="w-full"
                      fullWidth="true"
                    >
                      <Tab key="view" title="VIEW" className="w-full">
                        <Card className=" min-h-[300px] overflow-auto custom-scroll">
                          <CardBody className="px-4">
                            <table className="w-full text-md border-collapse text-[14px]">
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
                                {itemsUser.map((user, userIndex) =>
                                  user.allAssetOfUser.map((i, assetIndex) =>
                                    i.item?.allAssets?.map((asset) => (
                                      <tr
                                        key={`${userIndex}-${i.categoryId}`}
                                        className="py-2 border-b"
                                      >
                                        <td className="py-2 pl-3 text-center">
                                          {userIndex + 1}
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
                                              {asset?.subCategories[key] || ""}
                                            </td>
                                          )
                                        )}
                                        <td
                                          className="p-2 text-center"
                                          style={{ borderColor: "red" }}
                                        >
                                          {i.item.remark}
                                        </td>
                                      </tr>
                                    ))
                                  )
                                )}
                              </tbody>
                            </table>
                          </CardBody>
                        </Card>
                      </Tab>

                      <Tab key="edit" title="EDIT" className="w-full">
                        <Card className=" min-h-[300px] px-3 py-2 text-sm">
                          <CardBody>
                            <div className="flex h-full flex-col gap-5">
                              <div>
                                <p className="font-medium pb-2">Item's user</p>
                                <div className="w-full flex gap-3 min-h-[100px] border p-2 rounded-lg border-gray-100">
                                  {itemsUser.map((allAsset) =>
                                    allAsset.allAssetOfUser?.map((items) =>
                                      items.item?.allAssets?.map(
                                        (asset, assetIndex) => (
                                          <div className="flex">
                                            <Chip
                                              radius="md"
                                              variant="flat"
                                              size="lg"
                                              key={asset.categoryId}
                                              className="capitalize  "
                                              onClose={() => {
                                                handleDeleteItem(
                                                  items.id,
                                                  allAsset.userId,
                                                  allAsset.use_INNITID,
                                                  items.item.id
                                                );
                                              }}
                                            >
                                              {asset.name}
                                            </Chip>
                                          </div>
                                        )
                                      )
                                    )
                                  )}
                                </div>
                              </div>

                              <div className="flex mt-2 gap-5 items-center">
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
                                          endContent={
                                            <div>{item.quantity}</div>
                                          }
                                        >
                                          {asset.name}
                                        </AutocompleteItem>
                                      ));
                                    })}
                                  </Autocomplete>
                                </div>

                                <div className="flex flex-col justify-center h-full">
                                  <p className="font-medium pb-2">Quantity</p>
                                  <Input
                                    type="number"
                                    onValueChange={handleChangeQty}
                                  />
                                </div>
                              </div>

                              <div>
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
                      setIsSelected(true);
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
        openDel={openDel}
        setOpenDel={setOpenDel}
        sendId={sendId}
        allItems={allItems}
      />
    </div>
  );
}
