import { ihttp1 } from "@/api/interceptor";

export const fetchAllEmployeeAssets = async () => {
  try {
    const response = await ihttp1.get(`/api/v1/assets/groupOfUserId`, {
      headers: {
        accept: "*/*",
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    return error;
  }
};

export const fetchAllEmplByComWithAssset = async (useInttId) => {
  try {
    const response = await ihttp1.get(`/api/v1/employeess/${useInttId}`, {
      headers: {
        accept: "*/*",
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    return error;
  }
};

export const fetchAllEmployeeByCom = async (use_INNITID) => {
  try {
    const response = await ihttp1.get(`/api/v1/employeess/${use_INNITID}`, {
      headers: {
        accept: "*/*",
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    return error;
  }
};
export const func_GetByUserID = async (userID) => {
  const token =
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrb25ncmFkeSIsImV4cCI6MTcyMDgzNDk5MiwiaWF0IjoxNzIwNzQ4NTkyLCJ1c2VJbnR0SWQiOiJVVExaXzU5MCIsInVzZXJuYW1lIjoia29uZ3JhZHkifQ.H7qwoy4BG93zxfEkUJ2x3iw6WMKdf1HT9UWfJlxDE6HlICPYBt1pg1ZX3y54VgGJw4t1YwYVauuRHqVu-YmrKw"; // Replace with your actual JWT token
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  console.log(userID);
  try {
    const response = await ihttp1.get(`api/v1/assets/user/${userID}`, headers);
    console.log(response);
    return response;
  } catch (error) {
    return error;
  }
};

export const func_CreateAsset = async (requestBody) => {
  console.log(requestBody);
  try {
    const res = await ihttp1.post(`/api/v1/assets`, requestBody, {
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (error) {
    console.log("Error : ", error);
    return error;
  }
};

export const func_UpdateAssetUser = async (userId, id, requestBody) => {
  console.log(requestBody);
  console.log(userId);
  console.log(id);
  try {
    const res = await ihttp1.put(
      `/api/v1/assets/${userId}/${id}`,
      requestBody,
      {
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  } catch (error) {
    console.log("Error : ", error);
    return error;
  }
};
export const func_DeleteAssetUser = async (userId, id) => {
  console.log(userId);
  console.log(id);
  try {
    const res = await ihttp1.delete(`/api/v1/assets/${userId}/${id}`, {
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (error) {
    console.log("Error : ", error);
    return error;
  }
};

//role user
export const getByUserAndCompany = async (userId, use_INNITID) => {
  try {
    const res = await ihttp1.get(
      `/api/v1/assets/user/${userId}/${use_INNITID}`,
      {
        headers: {
          accept: "*/*",
        },
      }
    );
    return res;
  } catch (error) {
    console.log("Error : ", error);
    return error;
  }
};


export const fun_AddAsset= async(data)=>{
  try {
    const response = await ihttp1.post(`/api/v1/assets`,data,{
      headers: {
        accept: "*/*",
        'Content-Type': 'application/json',
      },
    });
    console.log({response});
    return response;
  } catch (error) {
    return error;
  }
}