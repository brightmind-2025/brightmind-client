"use client";

import {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation,
} from "@/lib/features/notification/notificationApi";
import ModeToggle from "@/utils/ThemeSwitcher";
import React, { FC, useEffect, useRef, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { io, Socket } from "socket.io-client";
import { format } from "timeago.js";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || "";
const socket: Socket = io(ENDPOINT, {
  transports: ["websocket"],
});

type Notification = {
  _id: string;
  title: string;
  message: string;
  status: "read" | "unread";
  createdAt: string;
};

type Props = {};

const DashboardHeader: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const { data, refetch, isLoading } = useGetAllNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [updateNotificationStatus, { isSuccess }] =
    useUpdateNotificationStatusMutation();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [audio] = useState(
    typeof Audio !== "undefined"
      ? new Audio(
          "https://res.cloudinary.com/df0o5yqte/video/upload/v1746160500/mixkit-software-interface-start-2574_uakabk.wav"
        )
      : null
  );

  const playNotificationSound = () => {
    if (audio) {
      audio.play().catch((error) => {
        console.error("Error playing sound:", error);
      });
    }
  };

  useEffect(() => {
    if (data) {
      setNotifications(
        data.notifications.filter(
          (item: Notification) => item.status === "unread"
        )
      );
    }
    if (isSuccess) {
      refetch();
    }
    if (audio) {
      audio.load();
    }
  }, [data, isSuccess, audio]);

  useEffect(() => {
    socket.on("newNotification", () => {
      refetch();
      playNotificationSound();
    });

    // Cleanup function to remove the event listener
    return () => {
      socket.off("newNotification");
    };
  }, [refetch]);

  // Close notifications panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNotificationStatusChange = async (id: string) => {
    await updateNotificationStatus(id);
  };

  const markAllAsRead = async () => {
    if (notifications.length === 0) return;

    for (const notification of notifications) {
      await updateNotificationStatus(notification._id);
    }
  };

  return (
    <div className="w-full flex items-center justify-end gap-4 p-6 fixed top-5 right-0">
      <ModeToggle />

      <div className="relative" ref={notificationRef}>
        <button
          aria-label="Notifications"
          onClick={() => setOpen(!open)}
          className="p-2 rounded-lg hover:bg-opacity-10 hover:bg-gray-500 transition-all"
        >
          <IoMdNotificationsOutline className="text-2xl dark:text-white text-black" />
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 bg-[#3ccba0] rounded-full w-5 h-5 text-xs flex items-center justify-center text-white transform translate-x-1/4 -translate-y-1/4">
              {notifications.length}
            </span>
          )}
        </button>

        {open && (
          <div className="absolute top-12 right-0 w-80 max-h-[60vh] overflow-y-auto dark:bg-[#111C43] bg-white shadow-xl rounded-xl border dark:border-[#ffffff23] border-[#0000000f]">
            <div className="p-4 border-b dark:border-[#ffffff23] border-[#0000000f] flex justify-between">
              <h5 className="text-lg font-semibold dark:text-white text-black">
                Notifications
              </h5>
              {notifications.length > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-[#3ccba0] hover:underline"
                >
                  Mark all as read
                </button>
              )}
            </div>

            {isLoading ? (
              <div className="p-4 text-center dark:text-gray-300 text-gray-600">
                Loading...
              </div>
            ) : notifications.length > 0 ? (
              notifications.map((item: Notification) => (
                <div
                  key={item._id}
                  className="p-4 hover:dark:bg-[#1a2a5a] hover:bg-gray-50 border-b dark:border-[#ffffff23] border-[#0000000f] last:border-b-0"
                >
                  <div className="flex justify-between items-start">
                    <p className="dark:text-white text-black font-medium">
                      {item.title}
                    </p>
                    <span className="text-xs dark:text-gray-400 text-gray-500">
                      {format(item.createdAt)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm dark:text-gray-300 text-gray-600">
                    {item.message}
                  </p>
                  <div className="text-right mt-1">
                    <button
                      className="text-xs text-[#3ccba0] hover:underline"
                      onClick={() => handleNotificationStatusChange(item._id)}
                    >
                      Mark as read
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center dark:text-gray-300 text-gray-600">
                No new notifications
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
