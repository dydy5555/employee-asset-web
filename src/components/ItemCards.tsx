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
} from "@nextui-org/react";

import ItemDetail from "./Modals/ItemDetail";

export default function ItemCards({ allEmployeeAssets }) {
  const [allAssets, setAllAssets] = useState([]);

  const [openMod, setOpenMod] = useState(false);
  const [itemsUser, setItemsUser] = useState([]);

  const handleRowClick = (user) => {
    setItemsUser([]);
    setItemsUser((prev) => [...prev, user]);
    setOpenMod(true);
  };

  console.log({ allEmployeeAssets });

  useEffect(() => {}, []);

  return (
    <>
      <div className="">
        <Card className=" min-h-[600px] max-h-[600px] overflow-auto p-5">
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
              <TableColumn>TEAM</TableColumn>
              <TableColumn>DEPARTMENT</TableColumn>
              <TableColumn>COMPANY</TableColumn>
              <TableColumn className="text-center">ASSETS</TableColumn>
              <TableColumn>REMARK</TableColumn>
            </TableHeader>

            <TableBody>
              {allEmployeeAssets.map((user, index) => (
                <TableRow
                  key={index}
                  className=""
                  onClick={() => handleRowClick(user)}
                >
                  <TableCell className=" pl-4">{index + 1}</TableCell>
                  <TableCell className="flex items-center ">
                    <User
                      className="h-full "
                      avatarProps={{
                        radius: "full",
                        src: user.img_url
                          ? user.img_url
                          : "https://d2u8k2ocievbld.cloudfront.net/memojis/female/3.png",
                      }}
                      description={user.userId}
                      name={user.employee_name}
                    >
                      {user.employee_name}
                    </User>
                  </TableCell>
                  <TableCell className="">{user.team}</TableCell>
                  <TableCell className="">{user.department}</TableCell>
                  <TableCell className="">{user.company}</TableCell>
                  <TableCell className="text-center">
                    {user?.allAssetOfUser?.length}
                  </TableCell>
                  <TableCell className="">{user.remark}</TableCell>
                  {/* <TableCell >
                  <div className="flex h-full  justify-end">
                  <Button isIconOnly variant="light" color="danger">
                    <Trash size="22" color="#E4003A"></Trash>
                  </Button>
                  <ConfirmDelete id={user.id} userId={user.userId}/>
                  </div>
                </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
      <ItemDetail
        setOpenMod={setOpenMod}
        openMod={openMod}
        itemsUser={itemsUser}
      ></ItemDetail>
    </>
  );
}
