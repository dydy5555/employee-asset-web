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
import { ArrowSwapVertical, More } from "iconsax-react";
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
  selectedDep,
}) {
  const [openDelete, setOpenDelete] = useState(false);
  const [openMod, setOpenMod] = useState(false);
  const [itemsUser, setItemsUser] = useState([]);
  const [sendId, setSendId] = useState({});
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [haveItems, setHaveItems] = useState(false);
  const [sendUser, setSendUser] = useState({});
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [sortCriteria, setSortCriteria] = useState({
    key: "userId",
    order: "asc",
  });


  useEffect(() => {
    let filtered = allEmployeeAssets;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((employee) =>
        employee.userId.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply department filter
    if (selectedDep) {
      filtered = filtered.filter((employee) =>
        employee.dvsn_NM.toLowerCase().includes(selectedDep.toLowerCase())
      );
    }

    // Apply sorting
    const { key, order } = sortCriteria;
    filtered = filtered.sort((a, b) => {
      if (a[key] < b[key]) return order === "asc" ? -1 : 1;
      if (a[key] > b[key]) return order === "asc" ? 1 : -1;
      return 0;
    });

     // Sort by total_asset in descending order
  filtered.sort((a, b) => b.total_asset - a.total_asset);

    // Apply pagination
    const startIndex = (page - 1) * rowsPerPage;
    const paginated = filtered.slice(startIndex, startIndex + rowsPerPage);

    setFilteredAssets(paginated);
  }, [
    selectedDep,
    searchQuery,
    allEmployeeAssets,
    sortCriteria,
    page,
    rowsPerPage,
  ]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const handleSortChange = (key) => {
    setSortCriteria((prevCriteria) => ({
      key,
      order: prevCriteria.order === "asc" ? "desc" : "asc",
    }));
  };

  const handleRowClick = (user, userId, use_INTT_ID) => {
    setSendUser(user);
    console.log(userId, use_INTT_ID);
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
      return null;
    }
  };

  return (
    <>
      <div className="h-full w-full mt-4">
        <div className="flex justify-between items-center py-2 px-2">
          <span className="text-default-400 text-small">
            Total sort : {filteredAssets?.length} users
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="10">10</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </label>
        </div>

        <Card className="p-5 mt-1 shadow-small">
          <div className="min-h-[620px] max-h-[460px] overflow-auto rounded-lg pr-2">
            {!isLoading ? (
              <Table
                topContentPlacement="outside"
                isStriped
                isHeaderSticky
                removeWrapper
                className="h-full "
              >
                <TableHeader className="rounded-xl shadow-none">
                  <TableColumn>NO</TableColumn>
                  <TableColumn
                    className="hover:cursor-pointer flex items-center gap-1"
                    // onClick={() => handleSortChange("flnm")}
                  >
                    EMPLOYEE 
                    {/* <ArrowSwapVertical size="16" color="#6b7280" /> */}
                  </TableColumn>
                  <TableColumn>POSITION</TableColumn>
                  <TableColumn>DEPARTMENT</TableColumn>
                  <TableColumn>COMPANY</TableColumn>
                  <TableColumn className="text-center">ASSETS</TableColumn>
                  <TableColumn className="">
                    <p></p>
                  </TableColumn>
                </TableHeader>

                <TableBody className="">
                  {filteredAssets?.map((user, index) => (
                    <TableRow
                      key={index}
                      className="hover:cursor-pointer hover:bg-gray-100 rounded-lg"
                      onClick={() =>
                        handleRowClick(user, user?.userId, user?.use_INTT_ID)
                      }
                    >
                      <TableCell className="pl-4">
                        {(page - 1) * rowsPerPage + index + 1}
                      </TableCell>
                      <TableCell className=" ">
                        <div className="flex items-center ">
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
                        </div>
                      </TableCell>
                      <TableCell className="">{user.jbcl_NM}</TableCell>
                      <TableCell className="">{user.dvsn_NM}</TableCell>
                      <TableCell className="">
                        {user.use_INTT_ID ? user.use_INTT_ID : "KOSIGN"}
                      </TableCell>
                      <TableCell className="text-center">
                        {user?.total_asset}
                      </TableCell>
                      <TableCell>
                        <div className="items-end flex justify-end">
                          <Dropdown className="min-w-[100px]">
                            <DropdownTrigger>
                              <Button variant="flat" isIconOnly>
                                <More size="24" color="#4a6cf7" />
                              </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Static Actions">
                              <DropdownItem
                                onClick={() => {
                                  handleRowClick(
                                    user,
                                    user?.userId,
                                    user?.use_INTT_ID
                                  );
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
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="w-full flex min-h-[630px] max-h-[630px] justify-center items-center h-full">
                <div className="custom-loader"></div>
              </div>
            )}
          </div>
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
