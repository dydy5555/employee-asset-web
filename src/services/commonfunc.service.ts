import { debounce } from "@mui/material";
import toast from "react-hot-toast";

export const showErrorToast = debounce((message) => {
    toast.error(message);
  }, 500);

export const showToastSuccess = debounce((message) => {
    toast.success(message);
  }, 500);