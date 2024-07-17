import ihttp from "@/api/interceptor";

export const getListEmployee = async () => {
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

    console.log("All Company", data.payload);
    return data.payload;
  } catch (error) {
    console.log(error);
  }
};
