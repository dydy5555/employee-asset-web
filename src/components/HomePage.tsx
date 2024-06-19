"use client";

import React from "react";
import {
  Navbar,
  NavbarContent,
  Input,
  Select,
  SelectItem,
  Button,
} from "@nextui-org/react";
import { Add, SearchNormal1 } from "iconsax-react";
import ItemCards from "./ItemCards";

function HomePage() {
  const types = [
    { type: "Laptop" },
    { type: "Mouse" },
    { type: "desktop" },
    { type: "keyboad" },
    { type: "USB" },
  ];

  return (
    <div className="w-full h-full mt-5 ">
      <ItemCards />
    </div>
  );
}

export default HomePage;
