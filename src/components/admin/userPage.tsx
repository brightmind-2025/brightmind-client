"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "@/lib/thunks/userThunks";
import { RootState, AppDispatch } from "@/lib/store/store";
import Image from "next/image";
import { FaEnvelope } from "react-icons/fa";

// Utility function to format the date
const formatDate = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString(undefined, options);
};

const UserPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
        All Users
      </h1>

      {loading && (
        <p className="text-gray-600 dark:text-gray-400">Loading users...</p>
      )}
      {error && (
        <p className="text-red-500 dark:text-red-400">Error: {error}</p>
      )}

      {!loading && !error && (
        <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <table className="min-w-full text-sm table-auto divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              <tr>
                <th className="p-3 text-left font-medium">Avatar</th>
                <th className="p-3 text-left font-medium">Name</th>
                <th className="p-3 text-left font-medium">Email</th>
                <th className="p-3 text-left font-medium">Role</th>
                <th className="p-3 text-left font-medium">Verified</th>
                <th className="p-3 text-left font-medium">Courses Enrolled</th>
                <th className="p-3 text-left font-medium">Joined At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <td className="p-3">
                    {user.avatar?.url ? (
                      <Image
                        src={user.avatar.url}
                        alt={user.name}
                        width={32}
                        height={32}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-blue-500 dark:bg-green-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
                        {user.name[0].toUpperCase()}
                      </div>
                    )}
                  </td>
                  <td className="p-3 text-gray-800 dark:text-gray-200">
                    {user.name}
                  </td>
                  <td className="p-3 flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <FaEnvelope size={14} />
                    {user.email}
                  </td>
                  <td className="p-3 capitalize text-gray-800 dark:text-gray-200">
                    {user.role}
                  </td>
                  <td className="p-3 text-gray-800 dark:text-gray-200">
                    {user.isVerified ? (
                      <span className="text-green-600 dark:text-green-400 font-medium">
                        Yes
                      </span>
                    ) : (
                      <span className="text-red-600 dark:text-red-400 font-medium">
                        No
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-gray-800 dark:text-gray-200">
                    {user.courses?.length || 0}
                  </td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">
                    {formatDate(String(user.createdAt))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserPage;