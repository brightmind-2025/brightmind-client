"use client";

import Image from "next/image";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import NavItems from "../utils/NavItems";
import { ModeToggle } from "@/utils/ThemeSwitcher";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { UserDetails } from "@/types/types";


const Header: FC = () => {
  const user = useSelector(
    (state: { auth: { user: UserDetails } }) => state.auth.user
  );
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;
  return (
    <div className="w-full relative z-50 pointer-events-none">
      <div
        className={`pointer-events-auto dark:bg-[#001F3F]  bg-[#274d8e] fixed top-0 left-0 w-full h-[80px] z-[80px] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500 flex items-center`}
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

            {user ? (
          
                  <button>
                    <Image
                      className=" rounded-full "
                      src={
                        typeof user.avatar === "string"
                          ? user.avatar
                          : user.avatar?.url ||
                            "https://i.pinimg.com/736x/68/3d/8f/683d8f58c98a715130b1251a9d59d1b9.jpg"
                      }
                      height={40}
                      width={40}
                      alt="User Profile"
                    
                    />
                  </button>
               
            ) : (
              <Link href={"/auth/login"} className="text-white ">
                <FaUser size={26} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
