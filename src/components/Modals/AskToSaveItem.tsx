"use client";
import React, { useState } from "react";
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
import toast from "react-hot-toast";
import { debounce } from "@mui/material";
import ForwardToInboxRoundedIcon from "@mui/icons-material/ForwardToInboxRounded";
import { useRouter } from "next/navigation";
export default function AskToSaveItem({
  openAskToSave,
  setOpenAskToSave,
  handleSave,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleClose = () => {
    setOpenAskToSave(false);
  };

  const handleCreate = () => {
    handleSave();
    setOpenAskToSave(false);
  };

  return (
    <>
      <Modal
        isOpen={openAskToSave}
        onOpenChange={() => setOpenAskToSave(false)}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center justify-center">
                <Image
                  preview={false}
                  className="mb-3 mt-5"
                  width={100}
                  height={100}
                  src="https://cdn-icons-png.freepik.com/512/9459/9459041.png"
                  alt="icons"
                />
              </ModalHeader>
              <ModalBody>
                <p className="text-center text-[14.4px]">
                  Are you sure want to create this item?<br></br>Click{" "}
                  <b>Yes, sure </b> to save.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="w-full"
                  color="default"
                  onClick={() => {
                    handleClose();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="w-full flex items-center justify-center gap-1"
                  color="primary"
                  onClick={() => handleCreate()}
                >
                  Yes, sure
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
