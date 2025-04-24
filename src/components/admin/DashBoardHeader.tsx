"use client";

import { ModeToggle } from "@/utils/ThemeSwitcher";
import React, { FC, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";

type Props = {};

const DashBoardHeader: FC<Props> = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full flex items-center justify-end gap-4 p-6 fixed top-5 right-0">
      <ModeToggle />

      <div className="relative">
        <button
          aria-label="Notifications"
          onClick={() => setOpen(!open)}
          className="p-2 rounded-lg hover:bg-opacity-10 hover:bg-gray-500 transition-all"
        >
          <IoMdNotificationsOutline className="text-2xl dark:text-white text-black" />
          <span className="absolute top-0 right-0 bg-[#3ccba0] rounded-full w-5 h-5 text-xs flex items-center justify-center text-white transform translate-x-1/4 -translate-y-1/4">
            3
          </span>
        </button>

        {open && (
          <div className="absolute top-12 right-0 w-80 max-h-[60vh] overflow-y-auto dark:bg-[#111C43] bg-white shadow-xl rounded-xl border dark:border-[#ffffff23] border-[#0000000f]">
            <div className="p-4 border-b dark:border-[#ffffff23] border-[#0000000f]">
              <h5 className="text-lg font-semibold text-center dark:text-white text-black">
                Notifications
              </h5>
            </div>

            <div className="divide-y dark:divide-[#ffffff23] divide-[#0000000f]">
              {/* Notification Item */}
              <div className="p-4 hover:dark:bg-[#1a2a5a] hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex justify-between items-start">
                  <p className="dark:text-white text-black font-medium">
                    New Question Received
                  </p>
                  <span className="text-xs dark:text-gray-400 text-gray-500">
                    5d ago
                  </span>
                </div>
                <p className="mt-1 text-sm dark:text-gray-300 text-gray-600">
                  What is react js?
                </p>
              </div>

              {/* Add more notification items here */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashBoardHeader;
