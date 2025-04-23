
import Image from "next/image";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import NavItems from "../utils/NavItems";
import { ModeToggle } from "@/utils/ThemeSwitcher";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import avatar from "../assets/avatar.png";
import { useSession } from "next-auth/react";
import { useLogoutQuery, useSocialAuthMutation } from "@/lib/features/authApi";
import toast from "react-hot-toast";


const Header: FC = () => {
  const { user } = useSelector((state: any) => state.auth);
  const { data } = useSession();
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();
  const [hasMounted, setHasMounted] = useState(false);
  // const [logout, setLogout] = useState(false);
  // const {} = useLogoutQuery(undefined, {
  //   skip: !logout ? true : false,
  // });
  

  useEffect(() => {
    if (!user && data) {
      socialAuth({
        email: data?.user?.email,
        name: data?.user?.name,
        avatar: data?.user?.image,
      });
    }


    if (error && "data" in error) {
      const errorData = error as any;
      toast.error(errorData?.data?.message || "Login failed");
    }
    setHasMounted(true);
  }, [data, user, isSuccess, error, socialAuth]);

  if (!hasMounted) return null;

  return (
    <div className="w-full relative z-50 pointer-events-none">
      <div className="pointer-events-auto dark:bg-[#1d3061] bg-[#0D1C42] fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500 flex items-center">
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 flex items-center justify-between">
          <div className="flex items-center justify-center gap-1">
            <Link href="/">
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
              <Link href="/profile">
                <Image
                  src={user.avatar?.url || avatar}
                  alt="user avatar"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </Link>
            ) : (
              <Link href="/auth/login">
                <FaUser size={23} className="text-white dark:text-light" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
