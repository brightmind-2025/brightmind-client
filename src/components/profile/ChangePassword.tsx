import React, { FC, useEffect, useState } from "react";
import { styles } from "../style/style";
import { useUpdatePasswordMutation } from "@/lib/features/user/userApi";
import toast from "react-hot-toast";
import { FiLock, FiKey, FiCheck } from "react-icons/fi";

type Props = {};

const ChangePassword: FC<Props> = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();

  const passwordChangeHandler = async (e: any) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      await updatePassword({
        oldPassword,
        newPassword,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password updated successfully");
      // Clear form fields after successful update
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message || "Password update failed");
      }
    }
  }, [isSuccess, error]);

  return (
    <div className="w-full  800px:px-8  flex items-center flex-col mt-[-60px] ">
      <div className="mb-6 text-center">
        {/* <div className="inline-block p-3 rounded-full bg-[#37a39a] bg-opacity-20 mb-3">
          <FiKey className="w-6 h-6 text-[#37a39a]" />
        </div> */}
        <h1 className="text-[25px] 800px:text-[30px] font-Poppins font-[500] text-black dark:text-white">
          Change Password
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-md">
          Update your password to keep your account secure
        </p>
      </div>

      <form
        onSubmit={passwordChangeHandler}
        className="w-full max-w-xl bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg space-y-6 border border-gray-100 dark:border-gray-700"
      >
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Current Password
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FiLock className="text-gray-500 dark:text-gray-400" />
            </span>
            <input
              type="password"
              className={`${styles.input} w-full pl-10 text-black dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-[#37a39a] focus:ring-2 focus:ring-[#37a39a] focus:ring-opacity-30 rounded-md transition duration-200`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter your current password"
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            New Password
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FiLock className="text-gray-500 dark:text-gray-400" />
            </span>
            <input
              type="password"
              className={`${styles.input} w-full pl-10 text-black dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-[#37a39a] focus:ring-2 focus:ring-[#37a39a] focus:ring-opacity-30 rounded-md transition duration-200`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Create a strong password"
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Confirm New Password
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FiCheck className="text-gray-500 dark:text-gray-400" />
            </span>
            <input
              type="password"
              className={`${
                styles.input
              } w-full pl-10 text-black dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-[#37a39a] focus:ring-2 focus:ring-[#37a39a] focus:ring-opacity-30 rounded-md transition duration-200 ${
                confirmPassword &&
                newPassword &&
                confirmPassword !== newPassword
                  ? "border-red-500 dark:border-red-400"
                  : ""
              }`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your new password"
            />
            {confirmPassword &&
              newPassword &&
              confirmPassword !== newPassword && (
                <p className="text-red-500 text-xs mt-1">
                  Passwords do not match
                </p>
              )}
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-3 border border-[#37a39a] bg-[#37a39a] hover:bg-[#2e908b] text-white font-medium rounded-md cursor-pointer transition duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
          >
            <FiKey className="mr-2" />
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
