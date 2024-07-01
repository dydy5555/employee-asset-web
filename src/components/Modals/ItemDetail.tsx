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
  Select,
  SelectItem,
} from "@nextui-org/react";
import { Edit, Trash, User, Verify } from "iconsax-react";
import NoImage from "../../../public/images/no_app.jpg";

export default function ItemDetail({ setOpenMod, openMod, itemsUser }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] =
    React.useState<ModalProps["scrollBehavior"]>("inside");
  const [user, setUser] = useState([]);

  const subCategoryKeys = [
    ...new Set(
      user.flatMap((category) =>
        category.subCategories?.flatMap((subCategory) =>
          Object.keys(subCategory)
        )
      )
    ),
  ];

  useEffect(() => {
    itemsUser.map((user) => {
      setUser([]);
      setUser(user.allAssets);
    });
  }, [user, subCategoryKeys]);

  // console.log("get assetsssssssss: ", user);
  // console.log("get assetsssssssss: ", subCategoryKeys);

  return (
    <div className="flex flex-col gap-2">
      <Modal
        isOpen={openMod}
        onOpenChange={onOpenChange}
        scrollBehavior={scrollBehavior}
        className="lg:max-h-[600px] md:max-h-[400px] max-w-[50%]"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 ">
                {/* Details */}
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-5">
                  <div className="flex justify-between gap-5">
                    {itemsUser.map((user, index) => (
                      <div key={index} className="flex gap-8">
                        <div>
                          <Image
                            src={user.prfl_PHTG}
                            alt={user?.username}
                            className="w-[150px] h-[150px] rounded-full object-cover border-2 p-[2px] border-gray-400"
                          />
                        </div>
                        <div className="flex flex-col gap-4">
                          <div className="flex flex-col">
                            <div className="flex items-center font-medium">
                              {user?.username}
                              <Verify
                                className="ml-2"
                                variant="Bold"
                                size="14"
                                color="#63F155"
                              />
                            </div>
                            <div className="text-[14px] text-gray-500">
                              {user.userId}
                            </div>
                          </div>
                          <div className="text-sm flex gap-5">
                            <div className="flex flex-col gap-1">
                              <p>Department</p>
                              <p>Company </p>
                              <p>Phone Number </p>
                            </div>
                            <div className="flex flex-col gap-1 font-medium">
                              <p> {user.department}</p>
                              <p>{user.company}</p>
                              <p>{user.tel}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="flex gap-2 items-end">
                      <Button
                        isIconOnly
                        variant="light"
                        className="border-[1px] border-[#FF1E00]"
                      >
                        <Trash size="18" color="#FF1E00" />
                      </Button>
                      {/* bg-[#FF1E00] red */}
                      <Button
                        isIconOnly
                        variant="light"
                        className="border-[1px] border-[#E8630A]"
                      >
                        <Edit size="18" color="#E8630A" />
                      </Button>
                      {/* bg-[#E8630A] orange */}
                    </div>
                  </div>

                  {/* <div className="border-b-[0.5px] border-gray-100"></div> */}

                  <div className="w-full flex gap-5 justify-between mt-2">
                    {subCategoryKeys.length > 0 ? (
                      <div className="flex capitalize rounded-lg w-full text-[14px] bg-[#F4F4F5]  font-medium text-gray-800">
                        <div className=" w-full py-2 text-center">Category</div>
                        {subCategoryKeys.map((key) => (
                          <div key={key} className=" w-full py-2 text-center">
                            {key}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <>
                        <div className="w-full h-full">
                          <div className=" border-b-[0.5px] w-full border-gray-100"></div>
                          <p className="text-lg text-gray-400 text-center pt-6 italic">
                            No asset
                          </p>
                        </div>
                      </>
                    )}
                  </div>

                  <div>
                    {user.map((category, i) => (
                      <>
                        <>
                          {category.subCategories.map((subCategory, index) => (
                            <div className=" text-[16px] flex" key={index}>
                              {index === 0 && (
                                <>
                                  {/* <div className="w-[100px] pl-5 text-center py-2">
                                    {i + 1}
                                  </div> */}
                                  <div
                                    className="w-full py-2 text-center"
                                    rowSpan={category.subCategories.length}
                                  >
                                    {category.name}
                                  </div>
                                </>
                              )}
                              {subCategoryKeys.map((key) => (
                                <>
                                  <div
                                    className="w-full py-2 text-center"
                                    key={key}
                                  >
                                    {subCategory[key] || "-"}
                                  </div>
                                </>
                              ))}
                            </div>
                          ))}
                        </>
                      </>
                    ))}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="default"
                  variant="light"
                  className="border-[1px] border-gray-200"
                  onClick={() => {
                    setOpenMod(false);
                  }}
                >
                  Close
                </Button>
                {/* <Button
                  color="primary"
                  onClick={() => {
                    setOpenMod(false);
                  }}
                >
                  Action
                </Button> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
