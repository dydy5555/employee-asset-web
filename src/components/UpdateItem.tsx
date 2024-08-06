"use client";

import { func_GetItemById } from "@/services/item.service";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

function UpdateItem({ itemId }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [id, setID] = useState(null);
  const [allCate, setAllCate] = useState([]);
  const [subCate, setSubCate] = useState([]);

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

  console.log(data)

  const handleCategoryChange = (value) => {
    console.log(value);
    setID(value);
    // fetchByID(value);
  };
  return (
    <>
      <div>
        <div>
          <Autocomplete
            label="Categories"
            placeholder="Search an category"
            className="max-w-xs"
            radius="lg"
            variant="flat"
            color="primary"
            scrollShadowProps={{
              isEnabled: false,
            }}
            onSelectionChange={handleCategoryChange}
            // onClear={() => {
            //   setIsSelectedUser(false);
            // }}
          >
            {data?.allAssets?.map((item) => (
              <AutocompleteItem
                className="capitalize"
                color="primary"
                variant="flat"
                key={item.id}
                value={item.categoryName}
                
              >
                {item.categoryName}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        </div>
      </div>
    </>
  );
}

export default UpdateItem;
