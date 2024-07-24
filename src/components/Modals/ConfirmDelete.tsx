import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import { Minus } from "iconsax-react";
import { deleteItemById } from "@/services/item.service";
import toast from "react-hot-toast";

export default function ConfirmDelete({id, userId}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  console.log(id, userId)
  const deleteBtn = () => {
    // func_DeleteAssetUser(id, usereId).then((res)=>{
    //   if(res.status === 200){
    //     toast.success("Delete succecfully!")
    //   }
    // })
  };

  return (
    <>
      {/* <Button style={{all: 'unset'}} onClick={onOpen}>Open Modal</Button> */}
      <Button onPress={onOpen} isIconOnly variant="flat" color="danger">
        <Minus size={18} />
      </Button>
      <Modal
        className="z-40 "
        isOpen={isOpen}
        onOpenChange={onOpenChange}
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
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onClick={() => {
                    deleteBtn();
                    onClose();
                  }}
                >
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
