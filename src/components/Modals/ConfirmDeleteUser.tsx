import React, { useEffect } from "react";
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
import toast from "react-hot-toast";
import { deleteUser } from "@/services/assetUser.service";

export default function ConfirmDeleteUser({
  toChild,
  setOpenDelete,
  openDelete,
  sendId,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  console.log(sendId);
  console.log(openDelete);

  useEffect(() => {}, []);

  const deleteBtn = () => {
    deleteUser(sendId.userId, sendId.use_INNITID).then((res) => {
      if (res.status === 200) {
        toast.success("Delete succecfully!");
        toChild();
        setOpenDelete(false);
      }
    });
  };

  return (
    <>
      {/* <Button style={{all: 'unset'}} onClick={onOpen}>Open Modal</Button> */}

      <Modal
        className="z-40 "
        isOpen={openDelete}
        onOpenChange={() => {
          setOpenDelete(false);
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
                    Are you sure you want to delete this user?
                  </p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onClick={() => setOpenDelete(false)}
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  onClick={() => {
                    deleteBtn();
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
