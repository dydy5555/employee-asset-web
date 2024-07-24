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

export const func_GetAllItem = async () => {
  try {
    const res = await ihttp1.get(`/api/v1/items/allItems`)
    return res;
  } catch (error) {
    console.log("Error : ", error);
    return error;
  }
}
