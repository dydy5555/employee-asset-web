import ihttp, { ihttp1 } from "@/api/interceptor";

export const getListEmployee = async (formData) => {
  try {
  
    const response = await ihttp.post(
      "https://bizweb.kosign.dev/api/v1/empl/filter",
      formData
    );
    console.log({ response });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getListDeparment = async (com_cd) => {
  try {
    const response = await ihttp1.get(
      `api/v1/employeess/${com_cd}/department`
    );
    console.log({ response });

    return response;
  } catch (error) {
    console.log("There is an error ::: ", error);
  }
};
