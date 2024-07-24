import { ihttp1 } from "@/api/interceptor";

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

