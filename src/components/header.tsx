"use client";

import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import NavItems from "../utils/NavItems";
import { ModeToggle } from "@/utils/ThemeSwitcher";


const Header: FC = () => {
  return (
    <div className="w-full relative z-50">
      <div
        className={`dark:bg-opacity-50 bg-[#0D1C42] fixed top-0 left-0 w-full h-[80px] z-[80px] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500 flex items-center`}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 flex items-center justify-between">
          <div className="flex items-center justify-center gap-1">
            <Link href={"/"} className="">
              <Image
                src="/logo.png"
                alt="BrightMind"
                width={50}
                height={50}
                className="rounded-md"
              />
            </Link>
            <h1 className="text-2xl font-Poppins font-bold flex gap-1">
              <span className="text-yellow-400">Bright</span>
              <span className="text-white">Mind</span>
            </h1>
          </div>
          <div className="flex items-center space-x-6">
            <NavItems />
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
