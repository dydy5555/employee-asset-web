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
  RadioGroup,
  Radio,
  Input,
  Textarea,
  Checkbox,
  Image,
} from "@nextui-org/react";
import { Edit, Trash, Verify } from "iconsax-react";

export default function ItemDetail({ setOpenMod, openMod, itemsUser }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] =
    React.useState<ModalProps["scrollBehavior"]>("inside");
  const [user, setUser] = useState([]);
  useEffect(() => {
    itemsUser.map((user) => {
      console.log(user);
      setUser([]);
      setUser(user);
    });
  }, []);
  console.log("get assetsssssssss: ");
  return (
    <div className="flex flex-col gap-2 ">
      <Modal
        isOpen={openMod}
        onOpenChange={onOpenChange}
        scrollBehavior={scrollBehavior}
        className="max-h-[600px] max-w-[50%]"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 ">
                Item Detail
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-5">
                  <div className="flex justify-between gap-5">
                    <div className="flex gap-5">
                      <div>
                        <Image
                          src={itemsUser.prfl_PHTG}
                          alt={itemsUser?.username}
                          className="w-[45px] h-[45px] rounded-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col ">
                        <div className="flex items-center">
                          {itemsUser?.username}
                          <Verify
                            className="ml-2"
                            variant="Bold"
                            size="14"
                            color="#63F155"
                          />
                        </div>
                        <div className="text-[14px] text-gray-400">
                          {itemsUser.userId}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button isIconOnly  variant="bordered"><Trash size="24" color="#FF1E00"/></Button>
                      {/* bg-[#FF1E00] red */}
                      <Button isIconOnly  variant="bordered"><Edit size="24" color="#E8630A"/></Button>
                      {/* bg-[#E8630A] orange */}
                    </div>
                  </div>
                  <div className="w-full flex gap-5 justify-between">
                    <Input
                      size="md"
                      type="text"
                      label="Name"
                      placeholder="Laptop"
                      defaultValue={itemsUser.username}
                    />
                    <Input
                      size="md"
                      type="text"
                      label="Department"
                      placeholder="B2B"
                      defaultValue={user.department}
                    />
                  </div>
                  <div className="w-full flex gap-5 justify-between">
                    <Input
                      size="md"
                      type="text"
                      label="Category"
                      placeholder="Laptop"
                      defaultValue={user.name}
                    />
                    <Input
                      size="md"
                      type="text"
                      label="Type"
                      placeholder="B2B"
                      defaultValue={user.department}
                    />
                  </div>
                  <div className="w-full flex gap-5 justify-between">
                    <Input
                      size="md"
                      type="text"
                      label="Name"
                      placeholder="Laptop"
                      defaultValue={user.name}
                    />
                    <Input
                      size="md"
                      type="text"
                      label="Department"
                      placeholder="B2B"
                      defaultValue={user.department}
                    />
                  </div>

                  <div className="w-full flex gap-5 justify-between">
                    <Textarea
                      label="Remark"
                      placeholder="Enter your remark"
                      className="max-w-md"
                    />
                    <div className="w-full">
                      <Checkbox defaultSelected color="primary">
                        Status
                      </Checkbox>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onClick={() => {
                    setOpenMod(false);
                  }}
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  onClick={() => {
                    setOpenMod(false);
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
