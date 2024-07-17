import ihttp from "@/api/interceptor";


export const fetchAllAssetsOfUserId = async() => {
    try {
        const response = await ihttp.get(`/api/v1/assets/allAssetsOfUserId`,{
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