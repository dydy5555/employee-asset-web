"use client";

import { Buildings,  MonitorMobbile, } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import pic from "../../public/pic.jpg"


function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="w-60 shrink-0 md:block h-screen sticky top-0 overflow-hidden">
    <div className="w-full h-full bg-white border-r">

    <div className="p-4 md:p-6 flex cursor-pointer group items-center gap-2">
          <div className="h-10 outline outline-primary w-10 flex items-center bg-gradient-to-br justify-center rounded-full  text-white">
            <Image
              src={pic}
              alt="User"
              width={36}
              height={36}
              className="w-9 h-9 rounded-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-800">{"Administration"}</h1>
            <p className="text-[11px] text-gray-500 font-medium">{'Manage BizWeb Platform'}</p>
          </div>
        </div>

      <div className="flex flex-col gap-1 h-full">
        <div className=" text-gray-500 font-medium space-y-2 md:px-2 text-xs">
          <Link
            href={""}
            className={`flex ${
              pathname === "/app/company" ? "text-primary" : ""
            } hover:px-8 duration-200 px-6 py-2 items-center gap-2`}
          >
            <Buildings variant="Outline" size={16} />
            Assets User
          </Link>
        </div>
        <div className=" text-gray-500 font-medium space-y-2 md:px-2 text-xs">
          <Link
            href={""}
            className={`flex ${
              pathname === "/app/teams" ? "text-primary" : ""
            } hover:px-8 duration-200 px-6 py-2 items-center gap-2`}
          >
            <MonitorMobbile size={16}/>
            All Assets
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Sidebar;
