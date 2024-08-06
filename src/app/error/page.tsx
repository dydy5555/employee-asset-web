"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import ErrorImage from "../../../../public/images/icon/404.svg";
import { usePathname, useRouter } from "next/navigation";

import { getSession } from "@/api/interceptor";

function page() {
  const pathname = usePathname();
  const [session, setSession] = useState({});
  const router = useRouter();
  useEffect(() => {
    getSession().then((res) => {
      setSession(res);
      if(res !== 401) {
        router.push('app/employee-assets')
      }
    });

  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className=" flex flex-col items-center justify-center">
        <Image
          width={500}
          height={500}
          src={ErrorImage}
          alt="404"
        />
        <div className="text-gray-400 text-sm">
          Go back to{" "}
          {/* <Link href={`https://bizweb.kosign.dev/signin`} legacyBehavior> */}
            <a
             href="https://bizweb.kosign.dev/signin"
             target="_blank"
             rel="noopener noreferrer"
             className="text-primary hover:underline"
            >
              signin{" "}
            </a>
          {/* </Link> */}
          page
        </div>
      </div>
    </div>
  );
}

export default page;
