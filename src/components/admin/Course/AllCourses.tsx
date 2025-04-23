import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { useTheme } from "next-themes";
import { FaRegEdit } from "react-icons/fa";
import { useGetAllCoursesQuery } from "@/lib/features/courses/courseApi";
import Loader from "@/components/Loader/Loader";

type Props = {};

const AllCourses = (props: Props) => {
  const { theme } = useTheme();
  const { isLoading, data, error } = useGetAllCoursesQuery({});

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: "Course Title", flex: 1 },
    { field: "ratings", headerName: "Ratings", flex: 0.5 },
    { field: "price", headerName: "Price", flex: 0.5 },
    { field: "purchased", headerName: "Purchased", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
    {
      field: "edit",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <Button>
            <FaRegEdit
              className={theme === "dark" ? "text-white" : "text-black"}
              size={20}
            />
          </Button>
        );
      },
    },
    {
      field: " ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: () => (
        <Button>
          <AiOutlineDelete
            className={theme === "dark" ? "text-[#EF4444]" : "text-[#DC2626]"}
            size={20}
          />
        </Button>
      ),
    },
  ];

  const rows: any[] = [];

  if (data?.courses && Array.isArray(data.courses)) {
    data.courses.forEach((item: any) => {
      rows.push({
        id: item._id?.$oid || item._id,
        title: item.name,
        ratings: item.ratings,
        price: item.price,
        purchased: item.purchased,
        created_at: new Date(
          item.createdAt?.$date || item.createdAt
        ).toLocaleDateString(),
      });
    });
  }

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
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
                "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                  color: theme === "dark" ? "#A78BFA" : "#6D28D9",
                },
                "& .MuiDataGrid-sortIcon": {
                  color: theme === "dark" ? "#D1D5DB" : "#374151",
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
                "& .MuiTablePagination-root": {
                  color: theme === "dark" ? "#E5E7EB" : "#1F2937",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                },
                "& .name-column--cell": {
                  color: theme === "dark" ? "#E5E7EB" : "#1F2937",
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
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color: "#F9FAFB !important",
                },
              }}
            />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AllCourses;
