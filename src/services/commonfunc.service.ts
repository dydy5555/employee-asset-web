import { debounce } from "@mui/material";
import toast from "react-hot-toast";

export const showErrorToast = debounce((message) => {
    toast.error(message);
  }, 500);

export const showToastSuccess = debounce((message) => {
    toast.success(message);
  }, 500);


  // item Detail mapping
 export const processPayload = (payload) => {
    return payload.map(item => ({
      ...item,
      allAssets: item.allAssets.map(asset => ({
        ...asset,
        subCategories: Object.entries(asset.subCategories), // Convert subCategories to array of key-value pairs
      })),
    }));
  };
  