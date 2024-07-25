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

function RemoveItemFromUser({openDel, setOpenDel,sendId,allItems}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
  console.log(allItems)
  console.log(sendId)
 

  const handleDeleteItem = async () => {
    
    // console.log(id);
    // console.log(userId);
    // console.log(use_INNITID);
    // (id, userId,use_INNITID)
    // deleteItem()
    setOpenDel(false)

  };

  useEffect(()=>{
    const foundItem = allItems.find((item) => item.id === sendId.itemId);
    console.log(foundItem);
    console.log(foundItem?.quantity);
  },[allItems])

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
