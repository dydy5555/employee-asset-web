import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Image,
} from "@nextui-org/react";
import { Minus } from "iconsax-react";
import { fetchAllCCategory, func_DeleteCategory } from "@/services/category.service";
import toast from "react-hot-toast";
import { showToastSuccess } from "@/services/commonfunc.service";

export default function ConfirmDeleteCategory({ setCategoriesFromParent, setTotalSubCategories, id, isOpen, setOpenDelete }) {
  const { onOpen, onOpenChange } = useDisclosure();
  console.log(id);

  // useEffect(() => {}, id);

  const btn_DeleteCategory = async (id) => {
    await func_DeleteCategory(id);
    showToastSuccess("Deleted Successfully!");
    fetchAllCCategory().then((res) => {
      if (res?.status == 200) {
        setCategoriesFromParent(res?.data?.payload);
        setTotalSubCategories([])
        const count = res?.data?.payload.map((data) => {
          setTotalSubCategories((prev) => [...prev, data.subCategories]);
        });
      }
    });
  };


  return (
    <>
      {/* <Button onPress={onOpen} isIconOnly variant="light" color="danger">
        {" "}
        <Minus size="20" color="#FF1E00" />
      </Button> */}
      <Modal isOpen={isOpen} onOpenChange={()=>setOpenDelete(false)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center justify-center">
                {/* Delete */}
                <Image
                  // preview={false}
                  className="mb-3 mt-5"
                  width={50}
                  height={50}
                  src="https://cdn-icons-png.flaticon.com/512/11747/11747900.png"
                  alt="delete icons"
                />
              </ModalHeader>
              <ModalBody>
                <p className="text-center">Are you sure you want <br /> to delete this <b>category</b>?</p>
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
