import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import Image from "next/image";
import { Minus } from "iconsax-react";

export default function ConfirmDelete() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      {/* <Button style={{all: 'unset'}} onClick={onOpen}>Open Modal</Button> */}
      <Button
                          isIconOnly
                          variant="flat"
                          color="danger"
                        >
                          <Minus size={18} />
                        </Button>
      <Modal className="z-40 " isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Delete</ModalHeader>
              <ModalBody>
                <><Image
                    className="mb-3 mt-5"
                    width={50}
                    height={50}
                    src="https://cdn-icons-png.flaticon.com/512/11747/11747900.png"
                    alt="delete icons"
                  /></>
                 <p className="text-center">Are you sure you want <br /> to delete this <b>assets user</b>?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
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
