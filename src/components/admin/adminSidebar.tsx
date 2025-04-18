"use client";
import React, { useEffect, useState } from "react";
import {
  FaFileAlt,
  FaVideo,
  FaQuestionCircle,
  FaThLarge,
  FaSignOutAlt,
} from "react-icons/fa";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation"; // Import usePathname for active route detection

export type User = {
  id: string;
  name: string;
  email?: string;
  profile: string;
};

const AdminSidebar: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const currentUser = Cookies.get("user");
    if (currentUser) {
      const user = JSON.parse(currentUser);
      setLoggedInUser(user);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("user");
    setShowLogoutPopup(false);
    router.push("/login"); 
  };

  const navigateTo = (route: string) => () => {
    router.push(route);
  };

  const isActiveRoute = (route: string) => {
    return pathname === route;
  };

  return (
    <div className="h-screen w-64 bg-gray-700 dark:bg-[#0d1b4c] text-white flex flex-col justify-between py-8 px-6 shadow-lg">
      <div>
        <h1 className="text-2xl font-bold text-center text-yellow-400 mb-8"></h1>

        <div className="flex flex-col items-center space-y-4 mb-8">
          <div className="w-20 h-20 rounded-full bg-gray-300 overflow-hidden relative">
            <Image
              src={
                loggedInUser?.profile ||
                "https://www.w3schools.com/howto/img_avatar.png"
              }
              alt="Profile"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <p className="text-lg font-semibold">
            {loggedInUser?.name || "Admin"}
          </p>
          <p className="text-sm text-cyan-400">Dashboard</p>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="font-semibold text-sm text-gray-300 mb-2">Data</h2>
            <ul className="space-y-2">
           
              <li
                className={`cursor-pointer text-sm ${
                  isActiveRoute("/admin/users")
                    ? "text-cyan-400 hover:text-cyan-300"
                    : "hover:text-cyan-300"
                }`}
                onClick={navigateTo("/admin/users")}
              >
                Users
              </li>
              
              <li
                className={`cursor-pointer text-sm ${
                  isActiveRoute("/admin/invoices")
                    ? "text-cyan-400 hover:text-cyan-300"
                    : "hover:text-cyan-300"
                }`}
                onClick={navigateTo("/admin/invoices")}
              >
                Invoices
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-sm text-gray-300 mb-2">
              Content
            </h2>
            <ul className="space-y-2">
              
              <li
                className={`flex items-center gap-2 cursor-pointer text-sm ${
                  isActiveRoute("/admin/create-course")
                    ? "text-cyan-400 hover:text-cyan-300"
                    : "hover:text-cyan-300"
                }`}
                onClick={navigateTo("/admin/create-course")}
              >
                <FaFileAlt size={16} /> Create course
              </li>
       
              <li
                className={`flex items-center gap-2 cursor-pointer text-sm ${
                  isActiveRoute("admin/current-courses")
                    ? "text-cyan-400 hover:text-cyan-300"
                    : "hover:text-cyan-300"
                }`}
                onClick={navigateTo("/admin/current-courses")}
              >
                <FaVideo size={16} /> Current courses
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-sm text-gray-300 mb-2">
              Customization
            </h2>
            <ul className="space-y-2">
              <li
                className={`cursor-pointer text-sm ${
                  isActiveRoute("/admin/hero")
                    ? "text-cyan-400 hover:text-cyan-300"
                    : "hover:text-cyan-300"
                }`}
                onClick={navigateTo("/hero")}
              >
                Hero
              </li>
            
              <li
                className={`flex items-center gap-2 cursor-pointer text-sm ${
                  isActiveRoute("/admin/faq")
                    ? "text-cyan-400 hover:text-cyan-300"
                    : "hover:text-cyan-300"
                }`}
                onClick={navigateTo("/admin/faq")}
              >
                <FaQuestionCircle size={16} /> FAQ
              </li>
          
              <li
                className={`flex items-center gap-2 cursor-pointer text-sm ${
                  isActiveRoute("/admin/categories")
                    ? "text-cyan-400 hover:text-cyan-300"
                    : "hover:text-cyan-300"
                }`}
                onClick={navigateTo("/admin/categories")}
              >
                <FaThLarge size={16} /> Categories
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-sm text-gray-300 mb-2">
              Controllers
            </h2>
            <ul className="space-y-2">
           
              <li
                className={`cursor-pointer text-sm ${
                  isActiveRoute("/admin/manage-team")
                    ? "text-cyan-400 hover:text-cyan-300"
                    : "hover:text-cyan-300"
                }`}
                onClick={navigateTo("/admin/manage-team")}
              >
                Manage Team
              </li>
            </ul>
          </div>
        </div>
      </div>

      <button
        className="bg-red-500 hover:bg-red-600 text-white text-sm py-2 rounded-full w-full flex items-center justify-center gap-2 transition duration-200"
        onClick={() => setShowLogoutPopup(true)}
      >
        <FaSignOutAlt size={16} /> Logout
      </button>

      {showLogoutPopup && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-black border border-gray-700 rounded-lg shadow-lg p-4 w-64">
          <p className="text-white text-sm mb-4">
            Are you sure you want to log out?
          </p>
          <div className="flex justify-end gap-3">
            <button
              className="text-gray-400 text-sm hover:text-white transition duration-200"
              onClick={() => setShowLogoutPopup(false)}
            >
              Cancel
            </button>
            <button
              className="bg-white text-black py-1 px-4 rounded-full text-sm font-semibold hover:bg-gray-200 transition duration-200"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSidebar;