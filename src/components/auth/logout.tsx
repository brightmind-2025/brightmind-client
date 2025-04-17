"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch } from "@/hooks/dispatchHook";
import { logoutUser } from "@/lib/thunks/authThunks";
import { useRouter } from "next/navigation";
import { Dialog } from "@headlessui/react";
import { UserDetails } from "@/types/types";

interface Props {
  user: UserDetails;
  isOpen: boolean;
  onClose: () => void;
}

const UserModal: React.FC<Props> = ({ user, isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logoutUser());
    onClose();
    router.push("/auth/login");
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white dark:bg-[#001F3F] rounded-2xl shadow-2xl p-6 w-full max-w-sm space-y-6">
          <div className="flex flex-col items-center gap-4">
            <Image
              className="rounded-full border-4 border-blue-500 dark:border-gray-500"
              src={
                typeof user.avatar === "string"
                  ? user.avatar
                  : user.avatar?.url ||
                    "https://i.pinimg.com/736x/68/3d/8f/683d8f58c98a715130b1251a9d59d1b9.jpg"
              }
              alt="User Avatar"
              width={80}
              height={80}
            />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {user.name}
            </h2>
          </div>

          <Link
            href="/profile"
            className="block w-full text-center py-3 bg-green-400 dark:bg-blue-800 text-white dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-200"
            onClick={onClose}
          >
            Go to Profile
          </Link>

          <button
            onClick={handleLogout}
            className="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default UserModal;
