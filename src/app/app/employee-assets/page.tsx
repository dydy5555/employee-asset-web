"use client";
import { Buildings, Devices, Profile } from "iconsax-react";
import ListUsers from "@/components/ListUsers";
import PageContent from "@/components/Layout/PageContent";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getSession } from "@/api/interceptor";
import { useRouter } from "next/navigation";


function Page() {
  const [session, setSession] = useState({});
  const router = useRouter();
  useEffect(() => {
    getSession().then((res) => {
      setSession(res);
      if(res === 401) {
        router.push('error')
      }
    });

  }, []);
  console.log({ session });
  return (
    <div className="text-gray-500 w-full px-5 ">
      {/* users table */}
      {/* <p className="text-lg mx-5 font-medium pt-5 text-black border-b-[0.5px] pb-5 mb-5 flex gap-3 items-end">
       
        <Image
            width={170}
            height={170}
          src="https://www.kosign.com.kh/images/Vectors-Wrapper.svg"
          alt="logo"
          className="w-[170px] dark:block"
        />
      </p> */}
      <div>
        <p className="text-3xl font-bold mb-4 text-primary px-5 pt-10 flex gap-3">
          {/* <Devices size="32" color="#4a6cf7" />  */}
          Item{"'"}s user
        </p>
      </div>
      <ListUsers comID={session?.use_intt_id} />
    </div>
  );
}

export default Page;
