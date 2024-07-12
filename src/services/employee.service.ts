import ihttp from "@/api/interceptor";

export const getListEmployee = async () => {
  try {
    const token =
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrb25ncmFkeSIsImV4cCI6MTcyMDgzNDk5MiwiaWF0IjoxNzIwNzQ4NTkyLCJ1c2VJbnR0SWQiOiJVVExaXzU5MCIsInVzZXJuYW1lIjoia29uZ3JhZHkifQ.H7qwoy4BG93zxfEkUJ2x3iw6WMKdf1HT9UWfJlxDE6HlICPYBt1pg1ZX3y54VgGJw4t1YwYVauuRHqVu-YmrKw"; // Replace with your actual JWT token
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await fetch("https://bizweb.kosign.dev/api/v1/auth", {
      headers,
    });
    const data = await res.json();

    console.log("All Company", data.payload);
    return data.payload;
  } catch (error) {
    console.log(error);
  }
};
