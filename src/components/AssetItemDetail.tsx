"use client";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  Button,
  CheckboxIcon,
  Chip,
  Image,
} from "@nextui-org/react";
import {
  formatDateForUi,
  processItemHistory,
  processPayload,
} from "@/services/commonfunc.service";
import { func_GetItemById } from "@/services/item.service";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import { PlusIcon } from "../../public/icons/PlusIcon";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MoreOutlinedIcon from "@mui/icons-material/MoreOutlined";
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
const AssetItemDetail = ({ itemId }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      func_GetItemById(itemId).then((res) => {
        console.log(res?.data?.payload);
        setData(res?.data?.payload);
        setLoading(false);
      });
    };

    fetchData();
  }, []);


  return (
    <>
      <div className="grid grid-cols-2 justify-start items-start gap-5 w-full">
        <Image
          isBlurred
          isZoomed
          width={800}
          alt="item photo"
          src={data?.img_url}
        />
        {loading ? (
          <div className="w-full rounded-md customShadow h-[44vh] flex justify-center items-center">
            <div className="custom-loader"></div>
          </div>
        ) : (
          <div className="w-full h-[44vh] space-y-3 customShadow p-3 rounded-md">
            {data?.allAssets?.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center">
                {/* <h1 className="font-bold text-[14px]">Name</h1> */}
                <h1 className="font-bold text-[16px]">
                  {item?.subCategories?.name || "N/A"}
                </h1>
                <Button
                  variant="light"
                  color="primary"
                  className="w-fit h-fit"
                  endContent={<PersonOutlineOutlinedIcon />}
                >
                  Assign to
                </Button>
              </div>
            ))}
            <hr />
            {data?.allAssets?.map((item, idx) => (
              <div key={idx} className="w-full space-y-3">
                <div className="grid grid-cols-3 justify-between">
                  <div className="flex justify-start items-center gap-1">
                    <h1 className="font-semibold text-[14px]">Category: </h1>
                    <h1 className="font-normal text-gray-500 text-[14px]">
                      {item.name}
                    </h1>
                  </div>
                  <div className="flex justify-start items-center gap-1">
                    <h1 className="font-semibold  text-[14px]">Quantity:</h1>
                    <h1 className="font-normal text-gray-500 text-[14px]">
                      {data.quantity}
                    </h1>
                  </div>
                  <div className="flex justify-start items-center gap-1">
                    <h1 className="font-semibold  text-[14px]">Unit price:</h1>
                    <h1 className="font-normal text-gray-500 text-[14px]">
                      {data.unit_price}
                    </h1>
                  </div>
                </div>
                <div className="flex justify-start items-center gap-1">
                  <CalendarMonthOutlinedIcon fontSize="small" className="" />
                  <h1 className="font-semibold  text-[14px]">Purchase date:</h1>
                  <h1 className="font-normal text-gray-500 text-[14px] flex justify-center items-center">
                    {formatDateForUi(data.purchase_date) || "N/A"}
                  </h1>
                </div>
                <div className="flex justify-start items-center gap-1">
                  <CalendarMonthOutlinedIcon fontSize="small" className="" />
                  <h1 className="font-semibold  text-[14px]">Stock date:</h1>
                  <h1 className="font-normal text-gray-500 text-[14px]">
                    {formatDateForUi(data.stock_date) || "N/A"}
                  </h1>
                </div>
                <div className="flex justify-start items-center gap-2">
                  <div className="flex justify-start items-center gap-2">
                    {/* <h1 className="font-bold text-[14px]">Status:</h1> */}
                    <h1 className="font-normal text-gray-500 text-[14px]">
                      <Chip
                        startContent={
                          data?.status === "unavailable" ? (
                            <CloseRoundedIcon
                              utlineRoundedIcon
                              fontSize="small"
                            />
                          ) : (
                            <CheckCircleOutlineRoundedIcon fontSize="small" />
                          )
                        }
                        variant="flat"
                        color={
                          data?.status === "unavailable" ? "danger" : "success"
                        }
                      >
                        {data?.status || "N/A"}
                      </Chip>
                    </h1>
                  </div>
                  <div className="flex justify-start items-center gap-2">
                    {/* <h1 className="font-bold text-[14px]">Status:</h1> */}
                    <h1 className="font-normal text-gray-500 text-[14px]">
                      <Chip
                        startContent={<CategoryOutlinedIcon fontSize="small" />}
                        variant="flat"
                        color={"primary"}
                      >
                        remain: {data?.remain_quantity}
                      </Chip>
                    </h1>
                  </div>
                </div>
                <div className="w-full border h-[22vh] mt-3 p-3 rounded-md space-y-3 overflow-y-auto custom-scroll">
                  <div className="flex justify-start items-start gap-2">
                    <MoreOutlinedIcon
                      fontSize="small"
                      className="text-primary"
                    />
                    <h1 className="font-medium text-[14px]">Others & Remark</h1>
                  </div>
                  <hr />
                  <div>
                    <div className="grid grid-cols-1 justify-start items-start gap-2 ">
                      {data?.allAssets?.map((item, idx) =>
                        Object.entries(item.subCategories).map(
                          ([key, value], index) => (
                            <div
                              key={index}
                              className="flex justify-start items-center gap-1"
                            >
                              <h1 className="font-medium text-[14px] capitalize">
                                {key}:{" "}
                              </h1>
                              <h1 className="font-normal text-gray-500 text-[14px]">
                                {value}
                              </h1>
                            </div>
                          )
                        )
                      )}

                      <hr />
                      <div className="flex justify-start items-center gap-1">
                        <PushPinOutlinedIcon fontSize="small" className="text-danger" />
                        <h1 className="font-medium text-[14px] capitalize">
                          remark:
                        </h1>
                        <h1 className="font-normal text-gray-500 text-[14px]">
                         {data?.remark}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AssetItemDetail;
