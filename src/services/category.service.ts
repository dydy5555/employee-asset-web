import ihttp from "@/api/interceptor"


export const fetchAllCCategory = async() => {
    try {
        const response = await ihttp.get(`/api/v1/categories/allCategories`,{
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