import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Avatar } from "@mui/material";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import Loader from "@/components/Loader/Loader";
import { useGetAllUsersQuery } from "@/lib/features/user/userApi";
import { styles } from "@/components/style/style";

type Props = {};

const AllTeams = (props: Props) => {
  const { theme } = useTheme();
  const { isLoading, data, error } = useGetAllUsersQuery({});
  const [active, setActive] = useState(false);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.6 },
    {
      field: "avatar",
      headerName: "Avatar",
      flex: 0.5,
      renderCell: (params: any) => (
        <Avatar src={params.row.avatar} alt={params.row.name} />
      ),
    },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 1.2 },
    { field: "role", headerName: "Role", flex: 0.6 },
    {
      field: "created_at",
      headerName: "Created At",
      flex: 0.8,
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.5,
      renderCell: () => (
        <Button>
          <AiOutlineDelete
            className={theme === "dark" ? "text-[#EF4444]" : "text-[#DC2626]"}
            size={20}
          />
        </Button>
      ),
    },
    {
      field: "email2",
      headerName: "Email",
      flex: 0.4,
      renderCell: (params: any) => (
        <Button>
          <a
            href={`mailto:${params.row.email}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiOutlineMail
              className={theme === "dark" ? "text-white" : "text-black"}
              size={20}
            />
          </a>
        </Button>
      ),
    },
  ];

  const rows: any[] = [];

  if (data?.users && Array.isArray(data.users)) {
    data.users.forEach((user: any) => {
      if (user.role === "admin") {
        rows.push({
          id: user._id?.$oid || user._id,
          avatar: user.avatar?.url,
          name: user.name,
          email: user.email,
          role: user.role,
          verified: user.isVerified,
          created_at: new Date(
            user.createdAt?.$date || user.createdAt
          ).toLocaleDateString(),
        });
      }
    });
  }

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          <div className="w-full flex justify-end">
            <button
              className={`transition duration-200 ease-in-out px-5 py-2 rounded-lg shadow-md font-medium
      bg-[#4ADE80] text-white hover:bg-[#22C55E] 
      dark:bg-[#57c7a3] dark:hover:bg-[#45b191] dark:border dark:border-[#ffffff6c]
    `}
              onClick={() => setActive(!active)}
            >
              Add New Member
            </button>
          </div>

          <Box m="40px 0 0 0" height="80vh">
            <DataGrid
              rows={rows}
              columns={columns}
              checkboxSelection
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                  outline: "none",
                },
                "& .MuiDataGrid-row": {
                  color: theme === "dark" ? "#F3F4F6" : "#111827",
                  borderBottom:
                    theme === "dark"
                      ? "1px solid rgba(255,255,255,0.1) !important"
                      : "1px solid #E5E7EB !important",
                  "&:hover": {
                    backgroundColor: theme === "dark" ? "#374151" : "#E5E7EB",
                  },
                  "&.Mui-selected": {
                    backgroundColor: theme === "dark" ? "#4B5563" : "#D1D5DB",
                    "&:hover": {
                      backgroundColor: theme === "dark" ? "#4B5563" : "#D1D5DB",
                    },
                  },
                },
                "& .MuiDataGrid-columnHeader": {
                  backgroundColor: theme === "dark" ? "#1E3A8A" : "#F9FAFB",
                  color: theme === "dark" ? "#E5E7EB" : "#1E3A8A",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: theme === "dark" ? "#111827" : "#F9FAFB",
                },
                "& .MuiDataGrid-footerContainer": {
                  color: theme === "dark" ? "#E5E7EB" : "#1F2937",
                  borderTop: "none",
                  backgroundColor: theme === "dark" ? "#4338CA" : "#E0E7FF",
                },
                "& .MuiCheckbox-root": {
                  color:
                    theme === "dark"
                      ? "#A7F3D0 !important"
                      : "#10B981 !important",
                },
              }}
            />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AllTeams;
