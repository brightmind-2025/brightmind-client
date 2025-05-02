"use client";

import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import avatars from "../../assets/avatar.png";
import { AiOutlineCamera } from "react-icons/ai";
import {
  useEditProfileMutation,
  useUpdateAvatarMutation,
} from "@/lib/features/user/userApi";
import toast from "react-hot-toast";
import { useLoadUserQuery } from "@/lib/features/apiSlice";

type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [name, setName] = useState(user?.name || "");
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery(undefined, {
    skip: loadUser ? false : true,
  });
  const [editProfile, { isSuccess: success, error: updateError }] =
    useEditProfileMutation();

  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();
    fileReader.onload = async () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        if (typeof avatar === "string") {
          try {
            await updateAvatar(avatar).unwrap();
            setLoadUser(true);
          } catch (err) {
            toast.error("Avatar update failed!");
          }
        }
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess || success) {
      setLoadUser(true);
    }
    if (error || updateError) {
      console.log(error);
    }
    if (isSuccess) {
      toast.success("Avatar updated successfully!");
    }
    if (success) {
      toast.success("Profile updated successfully!");
    }
    if (error) {
      toast.error("Avatar update failed!");
    }
    if (updateError) {
      toast.error("Profile update failed!");
    }
  }, [isSuccess, error, success, updateError]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (name !== "") {
      await editProfile({
        name: name,
      });
    }
  };

  return (
    <div className="w-full px-8 py-6 rounded-md pb-10 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 ml-10 flex flex-col justify-center">
      <div className="max-w-xl mx-auto w-full">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Your Profile
        </h1>

        {/* Avatar Section */}
        <div className="w-full flex justify-center mb-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-[#37a39a] rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
            <Image
              src={user?.avatar?.url || avatar || avatars}
              alt={user?.name || "User Avatar"}
              width={120}
              height={120}
              className="w-[120px] h-[120px] object-cover cursor-pointer border-4 border-[#37a39a] rounded-full shadow-lg transition-all duration-300 group-hover:shadow-xl"
            />
            <input
              type="file"
              name=""
              id="avatar"
              className="hidden"
              onChange={imageHandler}
              accept="image/png, image/jpg, image/jpeg, image/webp"
            />
            <label htmlFor="avatar" className="cursor-pointer">
              <div className="w-10 h-10 bg-white dark:bg-gray-800 shadow-md rounded-full absolute bottom-0 right-0 flex items-center justify-center border-2 border-[#37a39a] hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 transform translate-x-1 translate-y-1">
                <AiOutlineCamera size={20} className="text-[#37a39a]" />
              </div>
            </label>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full bg-white dark:bg-gray-900 shadow-xl rounded-xl p-6 space-y-6 border border-gray-100 dark:border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#37a39a] dark:bg-gray-800 dark:text-gray-200 transition-all duration-200"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Email Address
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-gray-300 cursor-not-allowed"
                required
                value={user?.email}
                readOnly
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Email cannot be changed
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-[#37a39a] hover:bg-[#2e908b] text-white rounded-lg font-medium transition duration-200 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
              >
                <span>Update Profile</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
