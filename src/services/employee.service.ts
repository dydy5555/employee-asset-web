import ihttp from "@/api/interceptor";

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
    const response = await ihttp.get(
      `https://bizweb.kosign.dev/api/v1/auth/departments/${com_cd}`
    );
    console.log({ response });

    return response;
  } catch (error) {
    console.log("There is an error ::: ", error);
  }
};
