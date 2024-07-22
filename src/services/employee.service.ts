import ihttp from "@/api/interceptor";

export const getListEmployee = async () => {
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
    const data = await res.json();

    console.log("All user", data.payload);
    return data.payload;
  } catch (error) {
    console.log(error);
  }
};
