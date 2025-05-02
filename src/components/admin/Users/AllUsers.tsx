import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  AiOutlineDelete,
  AiOutlineMail,
  AiOutlineSearch,
} from "react-icons/ai";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";
import Loader from "@/components/Loader/Loader";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "@/lib/features/user/userApi";
import { toast } from "react-hot-toast";

type Props = {};

const AllUsers = (props: Props) => {
  const { theme } = useTheme();
  const { isLoading, data, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  // State for user deletion
  const [userId, setUserId] = useState("");
  const [deleteUserName, setDeleteUserName] = useState("");
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  // State for table functionality
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  }>({
    key: "created_at",
    direction: "desc",
  });

  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  // Prepare data for the table
  const rows: any[] = [];
  if (data?.users && Array.isArray(data.users)) {
    data.users.forEach((user: any) => {
      rows.push({
        id: user._id?.$oid || user._id,
        avatar: user.avatar?.url || "/default-avatar.png",
        name: user.name,
        email: user.email,
        role: user.role,
        courses: user.courses?.length || 0,
        verified: user.isVerified,
        created_at: new Date(
          user.createdAt?.$date || user.createdAt
        ).toLocaleDateString(),
        createdAtTimestamp: new Date(
          user.createdAt?.$date || user.createdAt
        ).getTime(),
      });
    });
  }

  // Handle sorting
  const requestSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Sort and filter the data
  const sortedAndFilteredRows = React.useMemo(() => {
    let filteredRows = [...rows];

    // Apply search filter
    if (searchTerm) {
      filteredRows = filteredRows.filter(
        (row) =>
          row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          row.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          row.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    filteredRows.sort((a, b) => {
      if (sortConfig.key === "created_at") {
        return sortConfig.direction === "asc"
          ? a.createdAtTimestamp - b.createdAtTimestamp
          : b.createdAtTimestamp - a.createdAtTimestamp;
      }

      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    return filteredRows;
  }, [rows, searchTerm, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(sortedAndFilteredRows.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedAndFilteredRows.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Handle deleting a user
  const handleDelete = (id: string, name: string) => {
    setUserId(id);
    setDeleteUserName(name);
    setOpen(true);
    setConfirmText("");
  };

  const handleClose = () => {
    setOpen(false);
    setConfirmText("");
  };

  const handleConfirm = () => {
    if (confirmText.toLowerCase() !== "delete") {
      toast.error("Please type 'delete' to confirm");
      return;
    }

    deleteUser(userId)
      .unwrap()
      .then(() => {
        toast.success("User deleted successfully");
        refetch();
        setOpen(false);
        setConfirmText("");
      })
      .catch((error) => {
        toast.error(error?.data?.message || "Failed to delete user");
        console.error("Failed to delete user: ", error);
      });
  };

  // Handle selecting rows
  const toggleSelectRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === currentItems.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentItems.map((row) => row.id));
    }
  };

  // Get sort direction indicator
  const getSortDirection = (key: string) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? "↑" : "↓";
  };

  return (
    <div className="mt-20 w-full px-4 md:px-8">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[80vh]">
          <Loader />
        </div>
      ) : (
        <div className="w-full">
          <div className="mb-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              User Management
            </h1>

            {/* Search bar */}
            <div className="relative w-full md:w-64">
              <AiOutlineSearch
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-md">
            <table className="w-full bg-white dark:bg-gray-900 text-sm">
              <thead className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                <tr>
                  <th className="p-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={
                          selectedRows.length === currentItems.length &&
                          currentItems.length > 0
                        }
                        onChange={toggleSelectAll}
                        className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                  </th>
                  <th className="p-3 text-left border-b border-gray-200 dark:border-gray-700 font-medium">
                    Avatar
                  </th>
                  <th
                    className="p-3 text-left border-b border-gray-200 dark:border-gray-700 font-medium cursor-pointer"
                    onClick={() => requestSort("name")}
                  >
                    <div className="flex items-center gap-1">
                      Name {getSortDirection("name")}
                    </div>
                  </th>
                  <th
                    className="p-3 text-left border-b border-gray-200 dark:border-gray-700 font-medium cursor-pointer"
                    onClick={() => requestSort("email")}
                  >
                    <div className="flex items-center gap-1">
                      Email {getSortDirection("email")}
                    </div>
                  </th>
                  <th
                    className="p-3 text-left border-b border-gray-200 dark:border-gray-700 font-medium cursor-pointer"
                    onClick={() => requestSort("role")}
                  >
                    <div className="flex items-center gap-1">
                      Role {getSortDirection("role")}
                    </div>
                  </th>
                  <th
                    className="p-3 text-left border-b border-gray-200 dark:border-gray-700 font-medium cursor-pointer"
                    onClick={() => requestSort("courses")}
                  >
                    <div className="flex items-center gap-1">
                      Courses {getSortDirection("courses")}
                    </div>
                  </th>
                  <th
                    className="p-3 text-left border-b border-gray-200 dark:border-gray-700 font-medium cursor-pointer"
                    onClick={() => requestSort("created_at")}
                  >
                    <div className="flex items-center gap-1">
                      Created At {getSortDirection("created_at")}
                    </div>
                  </th>
                  <th className="p-3 text-left border-b border-gray-200 dark:border-gray-700 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700 dark:text-gray-300">
                {currentItems.length > 0 ? (
                  currentItems.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(row.id)}
                          onChange={() => toggleSelectRow(row.id)}
                          className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </td>
                      <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                        <img
                          src={row.avatar}
                          alt={row.name}
                          className="w-8 h-8 rounded-full object-cover"
                          onError={(
                            e: React.SyntheticEvent<HTMLImageElement>
                          ) => {
                            e.currentTarget.src = "/default-avatar.png";
                          }}
                        />
                      </td>
                      <td className="p-3 border-b border-gray-200 dark:border-gray-700 font-medium">
                        {row.name}
                      </td>
                      <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                        {row.email}
                      </td>
                      <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            row.role === "admin"
                              ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                          }`}
                        >
                          {row.role}
                        </span>
                      </td>
                      <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                        {row.courses}
                      </td>
                      <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                        {row.created_at}
                      </td>
                      <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleDelete(row.id, row.name)}
                            className="p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400"
                          >
                            <AiOutlineDelete size={20} />
                          </button>
                          <a
                            href={`mailto:${row.email}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-600 dark:text-blue-400"
                          >
                            <AiOutlineMail size={20} />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={8}
                      className="p-4 text-center text-gray-500 dark:text-gray-400"
                    >
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-4">
            <div className="text-sm text-gray-700 dark:text-gray-300 mb-2 sm:mb-0">
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, sortedAndFilteredRows.length)} of{" "}
              {sortedAndFilteredRows.length} users
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="p-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 disabled:text-gray-400 dark:disabled:text-gray-600 disabled:cursor-not-allowed"
              >
                <FiChevronsLeft size={16} />
              </button>
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 disabled:text-gray-400 dark:disabled:text-gray-600 disabled:cursor-not-allowed"
              >
                <FiChevronLeft size={16} />
              </button>

              {/* Page numbers - simplified for readability */}
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 flex items-center justify-center rounded-md border ${
                        currentPage === pageNum
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 disabled:text-gray-400 dark:disabled:text-gray-600 disabled:cursor-not-allowed"
              >
                <FiChevronRight size={16} />
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 disabled:text-gray-400 dark:disabled:text-gray-600 disabled:cursor-not-allowed"
              >
                <FiChevronsRight size={16} />
              </button>
            </div>
          </div>

          {/* Delete Confirmation Modal */}
          {open && (
            <div className="fixed inset-0 z-50 overflow-y-auto">
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                  className="fixed inset-0 transition-opacity"
                  aria-hidden="true"
                >
                  <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
                </div>

                <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true"
                >
                  &#8203;
                </span>

                <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 sm:mx-0 sm:h-10 sm:w-10">
                        <AiOutlineDelete className="h-6 w-6 text-red-600 dark:text-red-400" />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                          Confirm User Deletion
                        </h3>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">
                            You are about to permanently delete user{" "}
                            <strong>{deleteUserName}</strong>. This action
                            cannot be undone and will remove all data associated
                            with this user.
                          </p>
                          <p className="text-sm text-red-600 dark:text-red-400 font-medium mb-2">
                            To confirm deletion, please type{" "}
                            <strong>delete</strong> in the field below:
                          </p>
                          <input
                            type="text"
                            placeholder="Type 'delete' to confirm"
                            value={confirmText}
                            onChange={(e) => setConfirmText(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      onClick={handleConfirm}
                      disabled={
                        isDeleting || confirmText.toLowerCase() !== "delete"
                      }
                      className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm ${
                        confirmText.toLowerCase() === "delete"
                          ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {isDeleting ? "Deleting..." : "Delete User"}
                    </button>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllUsers;
