import { ihttp1 } from "@/api/interceptor";

export const func_GetItemById = async (id) => {
    try {
      const res = await ihttp1.get(`/api/v1/items/${id}`)
      return res;
    } catch (error) {
      console.log("Error : ", error);
      return error;
    }
};

export const fetchAllItems = async () => {
  try {
    const response = await ihttp1.get(`/api/v1/items/allItems`, {
      headers: {
        accept: "*/*",
      },
    });
    console.log({response});
    return response;
  } catch (error) {
    return error;
  }
};

