import React, { FC, useState, useEffect } from "react";
import SidebarProfile from "./SidebarProfile";
import { useAppDispatch } from "../hooks/dispatchHook";
import { logoutUser } from "@/lib/thunks/authThunks";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import { useLogoutQuery } from "@/lib/features/authApi";
import { signOut } from "next-auth/react";

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState(1);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [logout, setLogout] = useState(false);
  
  const {} = useLogoutQuery(undefined, {
    skip: !logout ? true : false,
  });

  const logOutHandler = async () => {
    try {
      await dispatch(logoutUser());
      await signOut();
      setLogout(true);
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Try again.");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 85);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-[85%] flex mx-auto">
      <div
        className={`
          w-[60%] 
          800px:w-[310px] 
          h-[450px] 
          bg-gradient-to-b from-slate-900 to-slate-800
          border border-[#ffffff1d] 
          rounded-lg
          shadow-lg 
          mt-[80px] mb-[80px] 
          sticky 
          ${scroll ? "top-[12px]" : "top-[30px]"} 
          left-[30px]
          transition-all duration-300 ease-in-out
        `}
      >
        <SidebarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logOutHandler={logOutHandler}
        />
      </div>

      <div className="w-full ml-6">
        {active === 1 && (
          <div className="w-full h-full bg-transparent mt-[80px] transition-all duration-300 ease-in-out">
            <ProfileInfo avatar={avatar} user={user} />
          </div>
        )}
        
        {active === 2 && (
          <div className="w-full h-full bg-transparent mt-[80px] transition-all duration-300 ease-in-out">
            <ChangePassword />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;