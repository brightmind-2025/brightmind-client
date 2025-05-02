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
      {/* Overlay and Confirmation Modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-gray-800 rounded-xl p-6 w-80 shadow-2xl border border-gray-700"
            >
              <h3 className="text-xl font-bold text-white text-center">
                Confirm Logout
              </h3>
              <p className="text-gray-300 text-center mt-3">
                Are you sure you want to log out?
              </p>
              <div className="flex justify-between mt-6 gap-4">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogoutConfirmation}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors font-medium"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* User Profile Header */}
      <div className="mb-6 pt-4 px-4">
        <div className="flex items-center space-x-3 mb-6">
          <Image
            src={user.avatar || avatar ? user.avatar.url || avatar : avatars}
            alt="profile pic"
            width={42}
            height={42}
            className="w-[42px] h-[42px] rounded-full border-2 border-indigo-500 shadow-md"
          />
          <div>
            <h3 className="text-white font-medium">{user?.name || "User"}</h3>
            <p className="text-gray-400 text-xs">
              {user?.role === "admin" ? "Administrator" : "Student"}
            </p>
          </div>
        </div>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent opacity-50"></div>
      </div>

      {/* Navigation Items */}
      <div className="w-full space-y-2 px-2">
        {/* My Account */}
        <div
          className={`w-full flex items-center px-4 py-3 cursor-pointer rounded-lg transition-all duration-200 ${
            active === 1
              ? "bg-indigo-600 shadow-lg shadow-indigo-900/30"
              : "bg-transparent hover:bg-gray-800"
          }`}
          onClick={() => setActive(1)}
        >
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full ${
              active === 1 ? "bg-indigo-500" : "bg-gray-700"
            }`}
          >
            <Image
              src={user.avatar || avatar ? user.avatar.url || avatar : avatars}
              alt="profile icon"
              width={20}
              height={20}
              className="w-[20px] h-[20px] rounded-full"
            />
          </div>
          <h5 className="pl-3 font-medium text-white">My Account</h5>
        </div>

        {/* Change Password */}
        <div
          className={`w-full flex items-center px-4 py-3 cursor-pointer rounded-lg transition-all duration-200 ${
            active === 2
              ? "bg-indigo-600 shadow-lg shadow-indigo-900/30"
              : "bg-transparent hover:bg-gray-800"
          }`}
          onClick={() => setActive(2)}
        >
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full ${
              active === 2 ? "bg-indigo-500" : "bg-gray-700"
            }`}
          >
            <RiLockPasswordLine size={16} className="text-white" />
          </div>
          <h5 className="pl-3 font-medium text-white">Change Password</h5>
        </div>

        {/* Enrolled Course */}
        {user.role !== "admin" && (
          <div
            className={`w-full flex items-center px-4 py-3 cursor-pointer rounded-lg transition-all duration-200 ${
              active === 3
                ? "bg-indigo-600 shadow-lg shadow-indigo-900/30"
                : "bg-transparent hover:bg-gray-800"
            }`}
            onClick={() => setActive(3)}
          >
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                active === 3 ? "bg-indigo-500" : "bg-gray-700"
              }`}
            >
              <SiCoursera size={16} className="text-white" />
            </div>
            <h5 className="pl-3 font-medium text-white">Enrolled Course</h5>
          </div>
        )}

        {/* Admin Dashboard (conditional) */}
        {user.role === "admin" && (
          <Link
            className={`w-full flex items-center px-4 py-3 cursor-pointer rounded-lg transition-all duration-200 ${
              active === 5
                ? "bg-indigo-600 shadow-lg shadow-indigo-900/30"
                : "bg-transparent hover:bg-gray-800"
            }`}
            href={"/admin"}
          >
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                active === 5 ? "bg-indigo-500" : "bg-gray-700"
              }`}
            >
              <MdOutlineAdminPanelSettings size={16} className="text-white" />
            </div>
            <h5 className="pl-3 font-medium text-white">Admin Dashboard</h5>
          </Link>
        )}
      </div>

      {/* Logout Button */}
      <div className="absolute top-[350px] left-0 right-0 px-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full flex items-center justify-center px-4 py-2.5 cursor-pointer rounded-lg transition-all duration-200 
            ${
              active === 4 ? "bg-red-600" : "bg-red-500/10 hover:bg-red-500/20"
            }`}
          onClick={() => setShowLogoutModal(true)}
        >
          <AiOutlineLogout size={18} className="text-red-400" />
          <h5 className="pl-2  font-medium text-red-400">Logout</h5>
        </motion.div>
      </div>
    </div>
  );
};

export default SidebarProfile;
