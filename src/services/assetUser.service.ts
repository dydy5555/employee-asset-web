import { ihttp1 } from "@/api/interceptor";


export const fetchAllAssetsOfUserId = async() => {
    try {
        const response = await ihttp1.get(`/api/v1/assets/allAssetsOfUserId`,{
            headers: {
              accept: "*/*",
            },
          });
        console.log(response)
        return response;
      } catch (error) {
        return error;
      }
}

export const deleteItem = async(id,userId,use_INNITID) => {
  console.log(id,userId,use_INNITID)
    try {
        const response = await ihttp1.delete(`/api/v1/assets/${id}/${userId}/${use_INNITID}`,{
            headers: {
              accept: "*/*",
            },
          });
        console.log(response)
        return response;
      } catch (error) {
        return error;
      }
}

export const deleteUser = async(userId,use_INNITID) => {
  console.log(userId,use_INNITID)
    try {
        const response = await ihttp1.delete(`/api/v1/assets/eachUser/${userId}/${use_INNITID}`,{
            headers: {
              accept: "*/*",
            },
          });
        console.log(response)
        return response;
      } catch (error) {
        return error;
      }
}

