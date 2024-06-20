import React, { ReactNode, useEffect, useState } from "react";
import { Avatar, Button, Input, user } from "@nextui-org/react";

import Image from "next/image";
import {
  Briefcase,
  Buildings2,
  Lock,
  SearchNormal1,
  Setting2,
  Unlock,
  Verify,
} from "iconsax-react";
import Avatar3 from "../../public/pic.jpg";
import no_card from "../../public/pic.jpg";

import nodata from "../../public/pic.jpg";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Select, SelectItem } from "@nextui-org/react";
import {users} from "../data/users"
import ItemCards from "./ItemCards";

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
  
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      if (cachedData) {
        setLUser(cachedData);
      } else {
        try {
          const permissionData = await fetchSessionAndPermission();
          setPermission(permissionData);
          await companyList(permissionData);
          const form: any = {
            useInttId: "",
            dvsn_NM: "",
          };
          let res = await fitlerUsers(form);
          setLUser(res.data.payload);
          setCachedData(res.data.payload);
          setLoading(false);
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
      }
    };
    fetchData();
  }, [cachedData]);

  const fitlerUsers = async (form:any) => {
    return await filterAuthUser(form);
  }

  const companyList = async (permissionData: any) => {
    try {
      const listCompanies = await listCompany();
      if (permissionData.permission !== 'SUPER_ADMIN') {
        const filteredCompanies = listCompanies.data.payload.filter((company: { com_cd: any; }) => company.com_cd === permissionData.user.use_INTT_ID);
        setCompanyData(filteredCompanies);
        setSaveComCd(filteredCompanies.length > 0 ? filteredCompanies[0].com_cd : null);
        await listDepartment(filteredCompanies.length > 0 ? filteredCompanies[0].com_cd : null);
      } else {
        setCompanyData(listCompanies.data.payload);
        setSaveComCd(listCompanies.data.payload.length > 0 ? listCompanies.data.payload[0].com_cd : null); 
        await listDepartment(listCompanies.data.payload.length > 0 ? listCompanies.data.payload[0].com_cd : null);
      }
    } catch (error) {
      console.error('Error fetching company list:', error);
    }
  };

  const listDepartment = async (com_cd:any) => {
    if(com_cd != ""){
      let listDep = await listDeparment(com_cd);
      const permissionData = await fetchSessionAndPermission();
      if (permissionData?.permission !== 'SUPER_ADMIN') {
        const filteredCompanies = listDep.data.payload.filter((dep: { name: any; }) => dep.name === permissionData?.user.dvsn_NM);
        setDep(filteredCompanies);
      }else{
        setDep(listDep.data.payload);
      }
    } else {
      setDep([]);
    };
    
  }

  const clickOnEachUser = (user : any) => {
    console.log({user})
    setIsUserLock(false);
    setUserId(user?.userId);
    setClickUser(user);
    console.log({clickUser})
    // getLock(users?.userId)
    //   .then((res) => {
    //     if (res.status === 200) {
    //       if (res.data.payload.count > 4) {
    //         setIsUserLock(true);
    //       }
    //     }
    //   })
    //   .catch(() => {
    //     return;
    //   });
    // listAppByUserId(users?.userId)
    //   .then((res) => {
    //     if (res.status === 200) {
    //       setCards(res.data.payload);
    //     } else {
    //       toast.error("Failed to Fetched");
    //     }
    //   })
    //   .catch(() => {
    //     toast.error("Failed to Fetched");
    //   });
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

  const filteredUsers = lUser.filter((user: any) =>
    user.flnm.toLowerCase().includes(filterValue.toLowerCase())
  );

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
    let key = value?.currentKey || '';
    if(value.size <= 0){
      setSaveComCd("");
      await listDepartment("");
    }else{
      setSaveComCd(key);
      await listDepartment(key);
    }
    setSelectedDep(null); 
    const form = {
      useInttId: value.size <= 0 ? "" :key,
      dvsn_NM: "",
    };
    let res = await fitlerUsers(form);
    if (res && res.data && res.data.payload) {
      setLUser(res.data.payload);
    }
  };

  const handleDep = async (value: any) => {
    let key = value?.currentKey || '';
    setSelectedDep(key);
    const form: any = {
      useInttId: saveComCd,
      dvsn_NM: key,
    };
    let res = await fitlerUsers(form);
    if (res && res.data && res.data.payload) {
      setLUser(res.data.payload);
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex w-full gap-4">
        {/* Side 1 */}
        <div className="flex flex-col w-[25%]">
        <div className="flex items-center gap-1">
          <Select
            variant="bordered"
            className="w-1/2 max-w-xs mb-2"
            defaultSelectedKeys={['UTLZ_590']}
            onSelectionChange={handleCom}
            aria-label="Company"
            placeholder="Company"
            style={{ maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}
            startContent={<Buildings2 size="16" color="#596AF4" />}
          >
            {companyData.map((com:any) => (
              <SelectItem key={com.com_cd}>{com.name}</SelectItem>
            ))}
          </Select>

          <Select
            variant="bordered"
            className="w-1/2 max-w-xs mb-2"
            onSelectionChange={handleDep}
            placeholder="Department"
            aria-label="Department"
            disabled={!saveComCd || saveComCd.size <= 0}
            selectedKeys={selectedDep ? [selectedDep] : []}
            style={{ maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis'}}
            startContent={<Briefcase size="16" color="#596AF4" />}
          >
            {dep.length === 0 ? (
              <SelectItem key="no-department" isReadOnly>
                No Department
              </SelectItem>
            ) : (
              dep.map((d:any) => <SelectItem key={d.name}>{d.name}</SelectItem>)
            )}
          </Select>
        </div>

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
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          {/* User Map */}
          <div className="border w-[100%] max-h-[600px] custom-scroll rounded-lg overflow-auto h-full">
            <div className="p-2 h-full">
              {users.length > 0 ? (
                users?.map((user) => (
                  <div
                    key={user.id}
                    className={`cursor-pointer flex justify-between items-center p-2  ${
                      activeUserId === user.id
                        ? "border-l-[6px] border-primary bg-gray-100 rounded-md"
                        : ""
                    }`}
                    onClick={() => {
                      setActiveUserId(user?.id), clickOnEachUser(user);
                    }}
                  >
                    <div className="flex gap-2 items-center">
                      <Avatar
                        alt={user.userId}
                        className="flex-shrink-0"
                        size="sm"
                        src={
                          user?.prfl_PHTG ||
                          "https://i.pinimg.com/236x/cd/03/8f/cd038fc3ed09f3eddd1a647c06d79c8d.jpg"
                        }
                      />
                      <div className="flex flex-col">
                        <span className="text-sm">{user.flnm}</span>
                        <span className="text-xs text-gray-400">
                          {user.jbcl_NM}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex justify-center h-full items-center">
                  <Image
                    src={nodata}
                    alt="User"
                    width={160}
                    height={160}
                    className="rounded-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Side 2 */}

        <div className=" w-[75%] max-h-[695px] overflow-hidden rounded-lg border">
          {clickUser ? (
            <>
              <div className="flex items-center justify-between">
                <div className="gap-2 flex cursor-pointer group items-center px-4 py-3">
                  <div className="h-10 outline  w-10 flex items-center bg-gradient-to-br justify-center rounded-full  text-white">
                    <Image
                      src={Avatar3}
                      alt="User"
                      width={36}
                      height={36}
                      className="w-9 h-9 rounded-full object-cover"
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
                      {clickUser?.jbcl_NM}
                    </p>
                  </div>
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
              <div className="p-5">
                    <ItemCards />
                </div>

              {/* <hr className="mb-4" /> */}
            </>
          ) : (
            <></>
          )}

          {/* <div className="custom-scroll grid max-h-[500px] grid-cols-3 gap-3 overflow-auto p-4">
            {cards?.length > 0 ? (
              cards?.map((card, index) => (
                <div
                  className="border rounded-xl flex flex-col justify-between p-2.5 space-y-2"
                  key={card?.id}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="p-1.5 border rounded-md w-8 h-8 flex items-center justify-center">
                        <Image src={Avatar3} alt="MS Office" />
                      </div>
                      <div onClick={() => handleClickToggle(card)}>
                        <button
                          className={`${
                            card?.isEnabled === "Y" || card?.isEnabled === "R"
                              ? "justify-end bg-primary"
                              : "justify-start bg-gray-300"
                          } duration-200 w-8 h-5 border flex items-center px-1 rounded-full`}
                        >
                          <motion.span
                            layout
                            transition={{ duration: 0.2 }}
                            className={`inline-block w-3 h-3 rounded-full bg-white`}
                          />
                        </button>
                      </div>
                    </div>

                    <div>
                      <h1 className="text-gray-800 font-medium">
                        {card?.app_name}
                      </h1>
                      <p className="text-xs text-gray-500">{card?.des}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      manageApplication(card.id);
                    }}
                    className="flex text-xs group text-gray-500 font-medium rounded-lg w-full items-center justify-center gap-1 border px-2 py-1"
                  >
                    <Setting2
                      size={16}
                      className="group-hover:rotate-90 duration-300"
                    />
                    <span>Manage</span>
                  </button>
                </div>
              ))
            ) : (
              <div className="w-[100%] flex justify-center items-center col-start-2">
                <Image
                  src={no_card}
                  alt="No data available"
                  className="w-[400px] h-[400px]"
                />
              </div>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default ListUsers;
