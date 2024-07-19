"use client";

import { Buildings, Profile } from "iconsax-react";
import ListUsers from "@/components/ListUsers";
import PageContent from "@/components/Layout/PageContent";
import Image from "next/image";
function Page() {
  return (
    <div className="text-gray-500 w-full px-10 ">
      {/* users table */}
      <p className="text-lg font-medium pt-5 text-black border-b-[0.5px] pb-5 mb-5 flex gap-3 items-end">
        {" "}
        {/* <Buildings size="32" color="#378CE7" /> Employee */}
        <Image
            width={170}
            height={170}
          src="https://www.kosign.com.kh/images/Vectors-Wrapper.svg"
          alt="logo"
          className="w-[170px] dark:block"
        />
      </p>
      <ListUsers />
    </div>
  );
}

export default Page;
