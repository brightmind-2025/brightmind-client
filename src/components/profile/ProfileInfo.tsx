"use client";

import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import avatars from "../../assets/avatar.png";
import { AiOutlineCamera } from "react-icons/ai";
import { styles } from "../style/style";
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
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        if (typeof avatar === "string") {
          updateAvatar(avatar);
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
    <div className="w-full px-4 md:px-8 lg:px-16 py-6">
      {/* Avatar Section */}
      <div className="w-full flex justify-center mb-6">
        <div className="relative">
          <Image
            src={user?.avatar?.url || avatar || avatars}
            alt={user?.name || "User Avatar"}
            width={140}
            height={140}
            className="w-[140px] h-[140px] object-cover cursor-pointer border-[3px] border-[#37a39a] rounded-full"
          />
          <input
            type="file"
            name=""
            id="avatar"
            className="hidden"
            onChange={imageHandler}
            accept="image/png, image/jpg, image/jpeg, image/webp"
          />
          <label htmlFor="avatar">
            <div className="w-8 h-8 bg-white shadow-md rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer border-x-stone-950">
              <AiOutlineCamera size={18} className="text-black " />
            </div>
          </label>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full max-w-xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-900 shadow-md rounded-md p-6 space-y-6"
        >
          {/* Name */}
          <div>
            <label className="block pb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
              Full Name
            </label>
            <input
              type="text"
              className={`${styles.input} w-full`}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block pb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
              Email Address
            </label>
            <input
              type="text"
              className={`${styles.input} w-full`}
              required
              value={user?.email}
              readOnly
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <input
              type="submit"
              value="Update"
              className="px-6 py-2 bg-[#37a39a] hover:bg-[#2e908b] text-white rounded-md font-medium transition duration-200"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileInfo;
