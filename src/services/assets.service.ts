import ihttp from "@/api/interceptor"


export const fetchAllEmployeeAssets = async() => {
    try {
        const response = await ihttp.get(`/api/v1/assets/allEmployeeAssets`,{
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