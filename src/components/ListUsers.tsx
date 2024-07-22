import React, { ReactNode, useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  user,
} from "@nextui-org/react";
import {
  Back,
  Briefcase,
  Buildings2,
  Devices,
  Lock,
  Note,
  SearchNormal1,
  Setting2,
  Unlock,
  Verify,
} from "iconsax-react";
import Avatar3 from "../../public/pic.jpg";
import no_card from "../../public/pic.jpg";

import NoImage from "../../public/images/no_app.jpg";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Select, SelectItem } from "@nextui-org/react";
import { users } from "../data/users";
import ItemCards from "./ItemCards";
import AssestByUserList from "./AssestByUserList";
import { log } from "console";
import { fetchSessionAndPermission } from "@/api/interceptor";
import { func_GetByUserID } from "@/services/assets.service";
import CreateAssetByUser from "./Modals/CreateAssetByUser";
import CreateCategory from "./Modals/CreateCategory";
import { fetchAllCCategory } from "@/services/category.service";
import Image from "next/image";
import ChartThree from "./Charts/ChartThree";
import AddNewItem from "./Modals/AddNewItem";
import ConfirmDelete from "./Modals/ConfirmDelete";
import AddNewAsset from "./Modals/AddNewAsset";

function ListUsers() {
  const [lUser, setLUser] = useState<any>([]);
  const [cachedData, setCachedData] = useState(null);
  const [activeUserId, setActiveUserId] = useState("");
  const [userId, setUserId] = useState("");
  const [filterValue, setFilterValue] = React.useState("");
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isUserLock, setIsUserLock] = useState(false);
  const [clickUser, setClickUser] = useState();
  const [companyData, setCompanyData] = useState<any>([]);
  const [dep, setDep] = useState<any>([]);
  const [saveComCd, setSaveComCd] = useState<any>("");
  const [selectedDep, setSelectedDep] = useState(null);
  const [permission, setPermission] = useState<any>();
  const [items, setItems] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [company, setCompany] = useState([]);
  const [asset_user, setAssetUser] = useState([]);
  const [allCate, setAllCate] = useState([]);
  const [openMod, setOpenMod] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      if (cachedData) {
        setLUser(cachedData);
      } else {
        try {
          // const permissionData = await fetchSessionAndPermission();
          // setPermission(permissionData);
          // await companyList(permissionData);
          await companyList();
          const form: any = {
            type: "admin",
            useInttId: "",
            appId: "",
            dvsn_NM: "",
          };
          const data = await fitlerUsers(form); // Note: data is already parsed JSON
          // console.log("data",data)
          setLUser(data); // Assuming data is already data.payload
          setCachedData(data);
          setLoading(false);
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
      }
    };

    const getAllCate = () => {
      fetchAllCCategory().then((res) => {
        console.log(res);
        setAllCate(res.data.payload);
      });
    };

    fetchData();
    getAllCate();
  }, [cachedData]);

  // console.log(allCate)

  const fitlerUsers = async (form: any) => {
    try {
      const token =
        "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrb25ncmFkeSIsImV4cCI6MTcyMTY5OTIxNywiaWF0IjoxNzIxNjEyODE3LCJ1c2VJbnR0SWQiOiJVVExaXzU5MCIsInVzZXJuYW1lIjoia29uZ3JhZHkifQ.fYo51MXnghhPoNfSZWXSG73QnpX9MTuER_zbqLu9COdMzERaf0Ggu-Q6xGzUFLjyTnwvIjTqckUNfzaXjPxMoA"; // Replace with your actual JWT token
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const formTemp = {
        comId: "UTLZ_590",
        appId: "string",
        status: "ALL",
      };

      const res = await fetch("https://bizweb.kosign.dev/api/v1/empl/filter", {
        method: "POST",
        headers,
        body: JSON.stringify(formTemp),
      });

      // console.log("all user", res);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      // console.log("Filtered Users", data.payload);
      setAssetUser(data?.payload.user);

      return data.payload; // Return the filtered users data
    } catch (error) {
      console.error("Error fetching filtered users", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    }
  };

  // const companyList = async (permissionData: any) => {
  const companyList = async () => {
    try {
      const listCompanies = await fetch(
        "https://bizweb-adm.kosign.dev/api/v1/companies/allCompanies"
      );
      const data = await listCompanies.json();
      console.log("All data ", data.payload);

      // if (permissionData.permission !== "SUPER_ADMIN") {
      // const filteredCompanies =data.payload.filter(
      //   (company: { com_cd: any }) =>
      //     company.com_cd === permissionData.user.use_INTT_ID
      // );
      const filteredCompanies = data.payload;
      setCompanyData(filteredCompanies);
      setSaveComCd(
        filteredCompanies.length > 0 ? filteredCompanies[0].com_cd : null
      );
      await listDepartment(
        filteredCompanies.length > 0 ? filteredCompanies[0].com_cd : null
      );
      // }
      // else {
      //   setCompanyData(data.payload);
      //   setSaveComCd(
      //     data.payload.length > 0
      //       ?data.payload[0].com_cd
      //       : null
      //   );
      //   await listDepartment(
      //     data.payload.length > 0
      //       ? data.payload[0].com_cd
      //       : null
      //   );
      // }
    } catch (error) {
      console.error("Error fetching company list:", error);
    }
  };

  const listDepartment = async (com_cd: any) => {
    localStorage.setItem("com_id", com_cd);
    if (com_cd != "") {
      // let listDep = await fetch(`https://bizweb.kosign.dev/api/v1/auth/departments/${com_cd}`)
      // let data = await listDep.json();
      // console.log("get department", data.payload);
      try {
        const token =
          "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrb25ncmFkeSIsImV4cCI6MTcyMTY5OTIxNywiaWF0IjoxNzIxNjEyODE3LCJ1c2VJbnR0SWQiOiJVVExaXzU5MCIsInVzZXJuYW1lIjoia29uZ3JhZHkifQ.fYo51MXnghhPoNfSZWXSG73QnpX9MTuER_zbqLu9COdMzERaf0Ggu-Q6xGzUFLjyTnwvIjTqckUNfzaXjPxMoA"; // Replace with your actual JWT token
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        const res = await fetch(
          `https://bizweb.kosign.dev/api/v1/auth/departments/${com_cd}`,
          {
            headers,
          }
        );
        const data = await res.json();
        // console.log("all department", data.payload);

        // const permissionData = await fetchSessionAndPermission();
        // if (permissionData?.permission !== "SUPER_ADMIN") {
        //   const filteredCompanies = data.payload.filter(
        //     (dep: { name: any }) => dep.name === permissionData?.user.dvsn_NM
        //   );
        //   setDep(filteredCompanies);
        // } else {
        setDep(data.payload);
        // }
      } catch (error) {
        console.log("error");
      }
    } else {
      setDep([]);
    }
  };

  const clickOnEachUser = (user: any) => {
    console.log({ user });
    setIsUserLock(false);
    setUserId(user?.userId);
    setClickUser(user);
  };

  const handleUnlock = (userId: any) => {
    removeLock(userId)
      .then((res) => {
        if (res.status === 200) {
          setIsUserLock(false);
          toast.success(`This account had been unlocked`);
        }
      })
      .catch(() => {
        return;
      });
  };

  const onSearchChange = React.useCallback((value: any) => {
    if (value) {
      setFilterValue(value);
    } else {
      setFilterValue("");
    }
  }, []);

  // const filteredUsers = lUser.filter((user: any) =>
  //   user.flnm.toLowerCase().includes(filterValue.toLowerCase())
  // );

  const handleClickToggle = (cardClick: any) => {
    const updatedCards = cards.map((c) => {
      if (c.id === cardClick.id) {
        return { ...c, isEnabled: c.isEnabled === "Y" ? "N" : "Y" };
      }
      return c;
    });
    setCards(updatedCards);

    if (cardClick.isEnabled === "N") {
      addUserToApp({
        appId: cardClick.id,
        userId: userId,
      })
        .then((res) => {
          if (res.status === 200) {
            toast.success(`Added user to ${cardClick.app_name}`);
          }
        })
        .catch(() => {
          toast.error(`Failed to Add`);
        });
    } else if (cardClick.isEnabled === "Y") {
      removeUser(userId, cardClick.id).then((res) => {
        if (res.status === 200) {
          toast.error(`Removed user from ${cardClick.app_name}`);
        }
      });
    }
  };

  const router = useRouter();
  const manageApplication = (id: any) => {
    router.push(`/app/applications/${id}`);
  };

  const handleCom = async (value: any) => {
    let key = value?.currentKey || "";
    if (value.size <= 0) {
      setSaveComCd("");
      await listDepartment("");
    } else {
      setSaveComCd(key);
      await listDepartment(key);
    }
    setSelectedDep(null);
    const form = {
      type: "admin",
      useInttId: value.size <= 0 ? "" : key,
      appId: "1",
      dvsn_NM: "",
    };
    let res = await fitlerUsers(form);
    if (res && res.data && res.data.payload) {
      setLUser(res.data.payload);
    }
  };

  const handleDep = async (value: any) => {
    let key = value?.currentKey || "";
    setSelectedDep(key);
    const form: any = {
      type: "admin",
      useInttId: saveComCd,
      appId: "1",
      dvsn_NM: key,
    };
    let res = await fitlerUsers(form);
    if (res && res.data && res.data.payload) {
      setLUser(res.data.payload);
    }
  };

  const getAllUsers = async () => {
    try {
      const token =
        "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrb25ncmFkeSIsImV4cCI6MTcyMTA5MzY5NiwiaWF0IjoxNzIxMDA3Mjk2LCJ1c2VJbnR0SWQiOiJVVExaXzU5MCIsInVzZXJuYW1lIjoia29uZ3JhZHkifQ.2NlCn6YyRRr5cl905dABjdXEvT6JuosIqwQi376N6aosA9tUevUKGVv3P3gKmmWKUUrpMeoXKjjpvrWbInJPkA"; // Replace with your actual JWT token
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const res = await fetch("https://bizweb.kosign.dev/api/v1/auth", {
        headers,
      });
      const data = await res.json();

      // console.log("All Company", data.payload);
    } catch (error) {
      console.log("Data fetch error", error);
    }
  };

  useEffect(() => {
    // getAllUsers();
  }, []);

  const filteredUser = asset_user.filter((user) =>
    user?.flnm?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // console.log(lUser)
  return (
    <div className="w-full  overflow-x-auto">
      <div className="flex w-full gap-4">
        {/* Side 1 */}
        <div className="flex flex-col w-full">
          <div className="flex py-5 gap-5">
            <div className="w-full">
              {/* Search */}
              <Input
                isClearable
                classNames={{
                  base: "w-full",
                  inputWrapper: "border-1",
                }}
                placeholder="Enter user's name to search..."
                size="md"
                className="mb-2"
                startContent={<SearchNormal1 className="text-default-300" />}
                variant="bordered"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClear={() => {
                  console.log("input cleared");
                  setSearchQuery("");
                }}
              />
              <div className="flex w-3/6 items-center gap-1">
                <Select
                  variant="bordered"
                  className="w-full max-w-md mb-2"
                  onSelectionChange={handleDep}
                  placeholder="Department"
                  aria-label="Department"
                  disabled={!saveComCd || saveComCd.size <= 0}
                  selectedKeys={selectedDep ? [selectedDep] : []}
                  style={{
                    maxWidth: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  startContent={<Briefcase size="16" color="#596AF4" />}
                >
                  {dep.length === 0 ? (
                    <SelectItem key="no-department" isReadOnly>
                      No Department
                    </SelectItem>
                  ) : (
                    dep.map((d: any) => (
                      <SelectItem key={d.name}>{d.name}</SelectItem>
                    ))
                  )}
                </Select>
              </div>
            </div>
            <div className="flex  w-full items-start">
              <div className="flex w-full gap-5 justify-start">
                {/* <CreateCategory /> */}

                <AddNewAsset></AddNewAsset>
              </div>
            </div>
            <>
              <div className="flex w-full justify-end gap-5">
                <div className="min-w-[200px] min-h-[130px]">
                  <Card className=" h-full flex items-start justify-end px-3 py-4">
                    <div className=" font-medium p-3">
                      <div className="bg-gray-100 rounded-full w-[50px] p-2 h-[50px] flex items-center justify-center mb-3">
                        <svg
                          className="fill-primary dark:fill-white "
                          width="22"
                          height="18"
                          viewBox="0 0 22 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z"
                            fill=""
                          />
                          <path
                            d="M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z"
                            fill=""
                          />
                          <path
                            d="M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z"
                            fill=""
                          />
                        </svg>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <span> {asset_user.length} </span>
                        <p className="">Total Employees </p>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="min-w-[200px] min-h-[130px]">
                  <Card className="flex h-full items-start justify-end px-3 py-4">
                    <div className=" font-medium p-3">
                      <div className="bg-gray-100 rounded-full w-[50px] p-2 h-[50px] flex items-center justify-center mb-3">
                        <Note size="28" color="#4A6CF7" />
                      </div>
                      <div className="flex gap-2 mt-2">
                        <span> {allCate.length} </span>
                        <p className=""> Total Assets </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </>
          </div>

          <div className=" overflow-hidden">
            {clickUser ? (
              <>
                <div className="pt-5 pl-5">
                  <Button
                    className="text-[#378CE7] font-medium"
                    variant="light"
                    onClick={() => setClickUser(false)}
                  >
                    <Back size="28" color="#378CE7" /> Back
                  </Button>
                </div>
                <div className="flex items-center justify-between  px-5">
                  <div className="gap-2 flex cursor-pointer group items-center px-4 py-3">
                    <div className="outline flex items-center bg-gradient-to-br justify-center rounded-full  text-white">
                      <Image
                        src={
                          clickUser?.prfl_PHTG
                            ? clickUser?.prfl_PHTG
                            : "https://d2u8k2ocievbld.cloudfront.net/memojis/female/3.png"
                        }
                        alt={clickUser?.flnm}
                        width={50}
                        height={50}
                        className="w-[45px] h-[45px] rounded-full object-cover border-1 p-[2px] border-gray-400"
                      />
                    </div>
                    <div>
                      <h1 className="text-sm font-bold text-gray-800">
                        <div className="flex items-center">
                          {clickUser?.flnm}
                          {isUserLock ? (
                            <Lock
                              className="ml-2"
                              variant="Bold"
                              size="14"
                              color="#f93f3f"
                            />
                          ) : (
                            <Verify
                              className="ml-2"
                              variant="Bold"
                              size="14"
                              color="#63F155"
                            />
                          )}
                        </div>
                      </h1>
                      <p className="text-xs text-gray-500 font-medium">
                        {clickUser?.userId}
                      </p>
                    </div>
                  </div>
                  <div className="px-4">
                    {/* <ConfirmDelete /> */}
                    <CreateAssetByUser clickUser={clickUser} />
                  </div>

                  {isUserLock ? (
                    <button
                      onClick={() => handleUnlock(clickUser?.userId)}
                      className="flex mr-5 text-xs group bg-primary  font-medium rounded-lg w-[120px] items-center justify-center gap-2  px-2 py-2"
                    >
                      <Unlock variant="Bold" size="14" color="#FFFFFF" />
                      <span className="text-white">Unlock</span>
                    </button>
                  ) : (
                    ""
                  )}
                </div>

                <AssestByUserList
                  clickUser={clickUser.userId}
                  empInfo={clickUser}
                />
              </>
            ) : (
              <>
                <div className="flex flex-col gap-5  p-5">
                  {/* <div className="flex justify-between items-end">
                    <div className="flex w-full gap-5 py-4 justify-end">
                      <CreateCategory />

                      <Button
                        onClick={() => {
                          setOpenMod(true);
                        }}
                        color="primary"
                        variant="light"
                        className="border-[0.5px] text-md text-semibold text-[#378CE7]"
                        style={{ borderColor: "#378CE7" }}
                      >
                        <Devices size="22" color="#378CE7" /> Asset
                      </Button>
                    </div>
                  </div> */}

                  <div className="">
                    <ItemCards />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User Map */}
          {/* <div className="border w-[100%] max-h-[700px] min-h-[700px] custom-scroll rounded-lg overflow-auto h-full">
            <div className="p-2 h-full">
              {filteredUser.length > 0 ? (
                filteredUser?.map((user) => (
                  <div
                    key={user.userId}
                    className={`cursor-pointer flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg ${
                      activeUserId === user.userId
                        ? "border-l-[6px] border-primary bg-gray-100 rounded-md"
                        : ""
                    }`}
                    onClick={() => {
                      setActiveUserId(user?.id), clickOnEachUser(user);
                    }}
                  >
                    <div className="flex gap-2 items-center ">
                      <Image
                        src={
                          user?.prfl_PHTG
                            ? user?.prfl_PHTG
                            : "https://d2u8k2ocievbld.cloudfront.net/memojis/female/3.png"
                        }
                        alt={user?.userId}
                        width={35}
                        height={35}
                        className="w-[35px] h-[35px] rounded-full object-cover border-[0.5px] p-[1px] border-gray-400"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm">{user.flnm}</span>
                        <span className="text-xs text-gray-400">
                          {user.userId}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex justify-center h-full items-center">
                  <Image
                    src={NoImage}
                    alt="No data"
                    width={500}
                    height={500}
                    className="w-[300px] h-[250px] object-cover"
                  />
                </div>
              )}
            </div>
          </div> */}
        </div>
        {/* Side 2 */}
      </div>
    </div>
  );
}

export default ListUsers;
