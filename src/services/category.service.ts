import ihttp from "@/api/interceptor";

export const fetchAllCCategory = async () => {
  try {
    const response = await ihttp.get(`/api/v1/categories/allCategories`, {
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
export const func_EditCategory = async (id, requestBody) => {
  console.log(id, requestBody);
  try {
    const res = await ihttp.put(`/api/v1/categories/${id}`, requestBody, {
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
    });
    console.log(res);
  } catch (error) {
    console.log("Error : ", error);
    return error;
  }
};

export const func_DeleteCategory = async (id) => {
  console.log(id);
  try {
    const res = await ihttp.delete(`/api/v1/categories/${id}`, {
      headers: {
        accept: "*/*",
      },
    });
  } catch (error) {
    console.log("Error : ", error);
    return error;
  }
};

export const func_GetCategoryByID = async (id) => {
  console.log(id);
  try {
    const res = await ihttp.get(`/api/v1/categories/${id}`, {
      headers: {
        accept: "*/*",
      },
    });
    return res;
  } catch (error) {
    console.log("Error : ", error);
    return error;
  }
};

export const func_CreateCategory = async (requestBody) => {
  try {
    const res = await ihttp.post(`/api/v1/categories`, requestBody, {
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
    });
   
  } catch (error) {
    console.log("Error : ", error);
    return error;
  }
};
