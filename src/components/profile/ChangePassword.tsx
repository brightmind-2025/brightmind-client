import React, { FC, useEffect, useState } from "react";
import { styles } from "../style/style";
import { useUpdatePasswordMutation } from "@/lib/features/user/userApi";
import toast from "react-hot-toast";

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
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message || "Password update failed");
      }
    }
  }, [isSuccess, error]);

  return (
    <div className="w-full px-4 py-6 800px:px-8 flex flex-col items-center">
      <h1 className="text-[25px] 800px:text-[30px] font-Poppins font-[500] text-black dark:text-white pb-4">
        Change Password
      </h1>

      <form
        onSubmit={passwordChangeHandler}
        className="w-full max-w-xl bg-white dark:bg-gray-900 p-6 rounded-md shadow-md space-y-5"
      >
        <div>
          <label className="block text-sm font-medium text-black dark:text-white mb-1">
            Enter your old password
          </label>
          <input
            type="password"
            className={`${styles.input} w-full text-black dark:text-white`}
            required
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black dark:text-white mb-1">
            Enter your new password
          </label>
          <input
            type="password"
            className={`${styles.input} w-full text-black dark:text-white`}
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black dark:text-white mb-1">
            Confirm your new password
          </label>
          <input
            type="password"
            className={`${styles.input} w-full text-black dark:text-white`}
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="pt-4">
          <input
            type="submit"
            value="Update"
            className="w-full h-10 border border-[#37a39a] bg-[#37a39a] hover:bg-[#2e908b] text-white font-medium rounded-md cursor-pointer transition"
          />
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
