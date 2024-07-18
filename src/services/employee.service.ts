import ihttp from "@/api/interceptor";

export const getListEmployee = async () => {
  try {
    const token =
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrb25ncmFkeSIsImV4cCI6MTcyMTM1NzQ5NywiaWF0IjoxNzIxMjcxMDk3LCJ1c2VJbnR0SWQiOiJVVExaXzU5MCIsInVzZXJuYW1lIjoia29uZ3JhZHkifQ.luXXj8Vo0nmiQefrqgp0PMXGKw3ePdq2_p5Gaq2p_MH6mPBCczaJdC6BnZmufYAp079zDWHx053GYHCUaNzjMA"; // Replace with your actual JWT token
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
    const data = await res.json();

    console.log("All user", data.payload);
    return data.payload;
  } catch (error) {
    console.log(error);
  }
};
