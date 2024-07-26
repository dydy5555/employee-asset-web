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
import React, { useEffect } from "react";
import toast from "react-hot-toast";

function RemoveItemFromUser({openDel, setOpenDel,sendId,allItems,handleRowClick}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleDeleteItem = async () => {
    const foundItem = allItems.find((item) => item.id === sendId.itemId);

    const mainQty = foundItem.remain_quantity;
    let newQty = mainQty + Number(sendId.qty);
    let newStt = "";

    if (foundItem.remain_quantity === sendId.qty) {
      newStt = "unavailable";
    } else {
      newStt = foundItem.status;
    }

    const dataForItem = {
      allAssets: foundItem.allAssets,
      status: newStt,
      problem: foundItem.problem,
      purchase_date: foundItem.purchase_date,
      quantity: foundItem.quantity,
      remain_quantity: newQty,
      unit_price: foundItem.unit_price,
      stock_date: foundItem.stock_date,
      img_url: foundItem.img_url,
      remark: foundItem.remark,
      solution: foundItem.solution,
      start_date_repair: foundItem.start_date_repair,
      end_date_repair: foundItem.end_date_repair,
    };

    try {
      fun_UpdateItem(foundItem.id, dataForItem).then((res) => {
        console.log("Update Item ::: ", res);
      });
    } catch (error) {
      console.log("Error ::: ", error);
    }


    try{
      deleteItem(sendId.id,sendId.userId,sendId.use_INNITID).then((res)=>{
        console.log(res)
        if(res.status === 200){
          console.log("Deleted success : ",res)
          toast.success("Deleted Successfullt!")
          setOpenDel(false)
          handleRowClick(sendId.userId,sendId.use_INNITID)
        }
      })
    }catch(error){
      console.log("Error ::: ", error)
    }
    // console.log(userId);
    // console.log(use_INNITID);
    // (id, userId,use_INNITID)
    // deleteItem()
    // setOpenDel(false)

  };

  useEffect(()=>{
    
  },[])

  return (
    <div>
      <Modal
        className="z-40 "
        isOpen={openDel}
        onOpenChange={()=>{
            setOpenDel(openDel)
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
                    <b>asset's user</b>?
                  </p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={()=>setOpenDel(false)}>
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
