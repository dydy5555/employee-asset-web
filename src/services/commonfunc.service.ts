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
  return payload.map((item) => ({
    ...item,
    allAssets: item.allAssets.map((asset) => ({
      ...asset,
      subCategories: Object.entries(asset.subCategories),
    })),
  }));
};

export const formatDateTime = (dateTimeString) => {
  const year = dateTimeString.substring(0, 4);
  const month = dateTimeString.substring(4, 6);
  const day = dateTimeString.substring(6, 8);
  const hours = dateTimeString.substring(8, 10);
  const minutes = dateTimeString.substring(10, 12);
  const seconds = dateTimeString.substring(12, 14);

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};


export const formatDateForUi = (dateString) => {
  const year = dateString?.substring(0, 4);
  const month = dateString?.substring(4, 6);
  const day = dateString?.substring(6, 8);

  const hours = dateString?.substring(8, 10);
  const minutes = dateString?.substring(10, 12);
  const seconds = dateString?.substring(12, 14);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthName = monthNames[parseInt(month) - 1];

  const formattedDate = `${parseInt(day)} ${monthName}, ${year}`;

  const formattedTime = `${hours}:${minutes}:${seconds}`;

  const formattedDateTime = `${formattedDate} ${formattedTime}`;

  return formattedDateTime;
};
