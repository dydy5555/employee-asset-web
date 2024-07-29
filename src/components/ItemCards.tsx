"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Card,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

import AssetDetail from "./Modals/AssetDetail";
import { More } from "iconsax-react";
import ConfirmDeleteUser from "./Modals/ConfirmDeleteUser";
import { getByUserAndCompany } from "@/services/assets.service";
import NoApp from "../../public/images/no_app.jpg";
import Image from "next/image";

export default function ItemCards({
  allEmployeeAssets,
  toChild,
  asset_user,
  isLoading,
  searchQuery,
  selectedDep
}) {
  const [openDelete, setOpenDelete] = useState(false);
  const [openMod, setOpenMod] = useState(false);
  const [itemsUser, setItemsUser] = useState([]);
  const [sendId, setSendId] = useState({});
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [haveItems, setHaveItems] = useState(false);
  const [sendUser, setSendUser] = useState({})
  useEffect(() => {
    // Filter the allEmployeeAssets based on searchQuery
    if (searchQuery) {
      const filtered = allEmployeeAssets.filter((employee) =>
        employee.userId.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredAssets(filtered);
    } else {
      setFilteredAssets(allEmployeeAssets);
    }
    if(selectedDep){
      const filtered = allEmployeeAssets.filter((employee) =>
        employee.dvsn_NM.toLowerCase().includes(selectedDep.toLowerCase())
      );
      setFilteredAssets(filtered);
    }else{
      setFilteredAssets(allEmployeeAssets);
    }
  }, [selectedDep, searchQuery, allEmployeeAssets]);


  const handleRowClick = (user, userId, use_INTT_ID) => {
    setSendUser(user);
    getByUserAndCompany(userId, use_INTT_ID).then((res) => {
      if (res?.status == 200) {
        setItemsUser([]);
        setItemsUser((prev) => [...prev, res?.data?.payload]);
        setOpenMod(true);
        setHaveItems(true);
      } else {
        setHaveItems(false);
        setOpenMod(true);
      }
    });
  };

  const handleClickDelete = (userId, use_INNITID) => {
    setOpenDelete(true);
    const idDel = { userId, use_INNITID };
    setSendId(idDel);
  };

  const handleGetUserAsset = (userId, use_INTT_ID) => {
    const matchedEmployee = allEmployeeAssets.find(
      (employee) =>
        employee.userId === userId && employee.use_INNITID === use_INTT_ID
    );

    if (matchedEmployee) {
      return matchedEmployee.total_asset;
    } else {
      return null; // or any default value or action when no match is found
    }
  };

  return (
    <>
      <div className="">
        <Card className="min-h-[670px] max-h-[670px] overflow-auto p-5">
          {!isLoading ? (
            <Table
              topContentPlacement="outside"
              isStriped
              isHeaderSticky
              removeWrapper
              className="h-full"
            >
              <TableHeader>
                <TableColumn>NO</TableColumn>
                <TableColumn>EMPLOYEE</TableColumn>
                <TableColumn>POSITION</TableColumn>
                <TableColumn>DEPARTMENT</TableColumn>
                <TableColumn>COMPANY</TableColumn>
                <TableColumn className="text-center">ASSETS</TableColumn>
                <TableColumn className="">
                  <p></p>
                </TableColumn>
              </TableHeader>

              <TableBody>
                {filteredAssets.length > 0 ? (
                  filteredAssets.map((user, index) => (
                    <TableRow
                      key={index}
                      className=""
                      onClick={() =>
                        handleRowClick(user, user?.userId, user?.use_INNITID)
                      }
                    >
                      <TableCell className="pl-4">{index + 1}</TableCell>
                      <TableCell className="flex items-center ">
                        <User
                          className="h-full "
                          avatarProps={{
                            radius: "full",
                            src: user.prfl_PHTG
                              ? user.prfl_PHTG
                              : "https://d2u8k2ocievbld.cloudfront.net/memojis/female/3.png",
                          }}
                          description={user.userId}
                          name={user.flnm}
                        >
                          {user.flnm}
                        </User>
                      </TableCell>
                      <TableCell className="">{user.jbcl_NM}</TableCell>
                      <TableCell className="">{user.dvsn_NM}</TableCell>
                      <TableCell className="">
                        {user.use_INTT_ID ? user.use_INTT_ID : "KOSIGN"}
                      </TableCell>
                      <TableCell className="text-center">
                        {user?.total_asset}
                      </TableCell>
                      <TableCell className="items-end flex justify-end">
                        <Dropdown className="min-w-[100px]">
                          <DropdownTrigger>
                            <Button variant="flat" isIconOnly>
                              <More size="24" color="#FF8A65" />
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu aria-label="Static Actions">
                            <DropdownItem
                              onClick={() => {
                                handleRowClick(user?.userId, user?.use_INTT_ID);
                              }}
                            >
                              Detail
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => {
                                handleClickDelete(
                                  user?.userId,
                                  user?.use_INTT_ID
                                );
                              }}
                            >
                              Delete
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                      <div className="w-full mt-18 h-full flex flex-col justify-center items-center">
                        <Image
                          width={500}
                          height={700}
                          src={NoApp}
                          alt="logo"
                          className="w-[500px] h-500px] p-10 object-cover dark:block "
                        />
                        <div className="text-gray-400 text-sm">
                          There{"'"}s no user found!
                        </div>
                      </div>
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          ) : (
            <div className="w-full justify-center items-center h-full">
              <div className="custom-loader"></div>
            </div>
          )}
        </Card>
      </div>

      <AssetDetail
        toChild={toChild}
        setOpenMod={setOpenMod}
        openMod={openMod}
        itemsUser={itemsUser}
        handleRowClick={handleRowClick}
        haveItems={haveItems}
        sendUser={sendUser}
      />

      <ConfirmDeleteUser
        toChild={toChild}
        setOpenDelete={setOpenDelete}
        openDelete={openDelete}
        sendId={sendId}
      />
    </>
  );
}
