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
import { Minus } from "iconsax-react";
import { func_DeleteCategory } from "@/services/category.service";
import toast from "react-hot-toast";

export default function ConfirmDeleteCategory({ id, isOpen, setOpenDelete }) {
  const { onOpen, onOpenChange } = useDisclosure();
  console.log(id);

  // useEffect(() => {}, id);

  const btn_DeleteCategory = (id) => {
    func_DeleteCategory(id);
    toast.success("Deleted Successfully!");
  };

  // const showErrorToast = debounce((message) => {
  //   toast.error(message);
  // }, 1000);

  // const showToastSuccess = debounce((message) => {
  //   toast.success(message);
  // }, 1000);

  return (
    <>
      {/* <Button onPress={onOpen} isIconOnly variant="light" color="danger">
        {" "}
        <Minus size="20" color="#FF1E00" />
      </Button> */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want tot delete this category?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={()=>{
                   setOpenDelete(false);
                }}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onClick={() => {
                    btn_DeleteCategory(id);
                    setOpenDelete(false);
                  }}
                >
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
