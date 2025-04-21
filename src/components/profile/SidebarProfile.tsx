import Image from "next/image";
import React, { FC, useState } from "react";
import avatars from "../../assets/avatar.png";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import Link from "next/link";

type Props = {
  user: any;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logOutHandler: () => void;
};

const SidebarProfile: FC<Props> = ({
  user,
  active,
  avatar,
  setActive,
  logOutHandler,
}) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutConfirmation = () => {
    setShowLogoutModal(false);
    logOutHandler();
  };

  return (
    <div className="w-full relative z-60">
      {/* Overlay and Confirmation (covers only sidebar area) */}
      <AnimatePresence>
        {showLogoutModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/20 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 rounded-lg p-4 w-64 shadow-lg"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">
                Confirm Logout
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-2">
                Are you sure you want to log out?
              </p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogoutConfirmation}
                  className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Items */}
      <div className="w-full space-y-1">
        <div
          className={`w-full flex items-center px-3 py-4 cursor-pointer ${
            active === 1 ? "bg-slate-800" : "bg-transparent"
          }`}
          onClick={() => setActive(1)}
        >
          <Image
            src={user.avatar || avatar ? user.avatar.url || avatar : avatars}
            alt="profile pic"
            width={30}
            height={30}
            className="w-[20px] h-[20px] 800px:w-[30px] 800px:h-[30px] cursor-pointer rounded-full"
          />
          <h5 className="pl-2 800px:block hidden font-poppins text-white dark:text-white">
            My Account
          </h5>
        </div>

        <div
          className={`w-full flex items-center px-3 py-4 cursor-pointer ${
            active === 2 ? "bg-slate-800" : "bg-transparent"
          }`}
          onClick={() => setActive(2)}
        >
          <RiLockPasswordLine size={20} className="text-white" />
          <h5 className="pl-2 800px:block hidden font-poppins text-white dark:text-white">
            Change Password
          </h5>
        </div>

        <div
          className={`w-full flex items-center px-3 py-4 cursor-pointer ${
            active === 3 ? "bg-slate-800" : "bg-transparent"
          }`}
          onClick={() => setActive(3)}
        >
          <SiCoursera size={20} className="text-white" />
          <h5 className="pl-2 800px:block hidden font-poppins text-white dark:text-white">
            Enrolled Course
          </h5>
        </div>

        {user.role === "admin" && (
          <Link
            className={`w-full flex items-center px-3 py-4 cursor-pointer ${
              active === 5 ? "bg-slate-800" : "bg-transparent"
            }`}
            href={"/admin"}
          >
            <MdOutlineAdminPanelSettings size={22} className="text-white" />
            <h5 className="pl-2 800px:block hidden font-poppins text-white dark:text-white">
              Admin Dashbord
            </h5>
          </Link>
        )}
        {/* Logout Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full flex items-center px-3 py-4 cursor-pointer ${
            active === 4 ? "bg-slate-800" : "bg-transparent"
          } group transition-all duration-300 hover:bg-slate-800/50`}
          onClick={() => setShowLogoutModal(true)}
        >
          <div className="relative">
            <AiOutlineLogout
              size={20}
              className="text-white group-hover:text-red-400 transition-colors"
            />
            <div className="absolute inset-0 bg-red-500/10 rounded-full scale-0 group-hover:scale-100 transition-transform" />
          </div>
          <h5 className="pl-2 800px:block hidden font-poppins text-white dark:text-white group-hover:text-red-400 transition-colors">
            Logout
          </h5>
        </motion.div>
      </div>
    </div>
  );
};

export default SidebarProfile;
