import { ihttp1 } from "@/api/interceptor";

export const func_GetItemHistoryByItemId = async (id) => {
    try {
      const res = await ihttp1.get(`/api/v1/item-histories/getByItemId/${id}`,{
        headers: {
          accept: "*/*",
        },
        cache: 'no-store'
      })
      return res;
    } catch (error) {
      console.log("Error : ", error);
      return error;
    }
};