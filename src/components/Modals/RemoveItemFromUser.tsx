import { deleteItem } from "@/services/assetUser.service";
import { fun_UpdateItem } from "@/services/item.service";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function RemoveItemFromUser({
  openDel,
  setOpenDel,
  sendId,
  allItems,
  handleRowClick,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [objItem, setObjItem] = useState({});

  console.log(sendId);
  // console.log(allItems);

  useEffect(() => {
    allItems?.map((item) => {
      setObjItem(item);
    });
  }, [allItems]);

  const handleDeleteItem = async () => {
    const dataForItem = {
      allAssets: objItem.allAssets,
      status: "available",
      problem: objItem.problem,
      purchase_date: objItem.purchase_date,
      quantity: objItem.quantity,
      remain_quantity: objItem.remain_quantity,
      unit_price: objItem.unit_price,
      stock_date: objItem.stock_date,
      img_url: objItem.img_url,
      remark: objItem.remark,
      solution: objItem.solution,
      start_date_repair: objItem.start_date_repair,
      end_date_repair: objItem.end_date_repair,
    };

    console.log({dataForItem})

    try {
      fun_UpdateItem(sendId.assetId, dataForItem).then((res) => {
        console.log("Update Item ::: ", res);
      });
    } catch (error) {
      console.log("Error ::: ", error);
    }

    try {
      deleteItem(sendId.id, sendId.userId, sendId.use_INNITID).then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log("Deleted success : ", res);
          toast.success("Deleted Successfullt!");
          setOpenDel(false);
          handleRowClick(sendId.id,sendId.userId, sendId.use_INNITID, sendId.assetId);
        }
      });
    } catch (error) {
      console.log("Error ::: ", error);
    }
    
  };

  return (
    <div>
      <Modal
        className="z-40 "
        isOpen={openDel}
        onOpenChange={() => {
          setOpenDel(openDel);
        }}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Delete</ModalHeader>
              <ModalBody>
                <div className="flex flex-col justify-center items-center">
                  <div>
                    <Image
                      className="mb-3 mt-5"
                      width={50}
                      height={50}
                      src="https://cdn-icons-png.flaticon.com/512/11747/11747900.png"
                      alt="delete icons"
                    />
                  </div>
                  <p className="text-center">
                    Are you sure you want <br /> to delete this{" "}
                    <b>asset{"'"}s user</b>?
                  </p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onClick={() => setOpenDel(false)}
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  onClick={() => {
                    handleDeleteItem();
                  }}
                >
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default RemoveItemFromUser;
