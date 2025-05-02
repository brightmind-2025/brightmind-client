import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { useTheme } from "next-themes";
import { FaRegEdit } from "react-icons/fa";
import {
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
} from "@/lib/features/courses/courseApi";
import Link from "next/link";
import Loader from "@/components/Loader/Loader";
import { toast } from "react-hot-toast";

type Props = {};

const AllCourses = (props: Props) => {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [confirmText, setConfirmText] = useState("");

  const [deleteCourse, { isLoading: isDeleting }] = useDeleteCourseMutation({});
  const { isLoading, data, refetch } = useGetAllCoursesQuery({});

  const handleDelete = (id: string, title: string) => {
    setCourseId(id);
    setCourseName(title);
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

    deleteCourse(courseId)
      .unwrap()
      .then(() => {
        toast.success("Course deleted successfully");
        refetch();
        setOpen(false);
        setConfirmText("");
      })
      .catch((error) => {
        toast.error(error?.data?.message || "Failed to delete course");
        console.error("Failed to delete course: ", error);
      });
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: "Course Title", flex: 1 },
    { field: "ratings", headerName: "Ratings", flex: 0.3 },
    { field: "price", headerName: "Price", flex: 0.3 },
    { field: "purchased", headerName: "Purchased", flex: 0.3 },
    { field: "created_at", headerName: "Created At", flex: 0.4 },
    {
      field: "edit",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <Link href={`/admin/edit-course/${params.row.id}`}>
            <FaRegEdit
              className="dark:text-white text-black cursor-pointer mt-4 ml-2"
              size={20}
            />
          </Link>
        );
      },
    },
    {
      field: " ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => (
        <Button onClick={() => handleDelete(params.row.id, params.row.title)}>
          <AiOutlineDelete
            className={`mr-3 ${theme === "dark" ? "text-[#EF4444]" : "text-[#DC2626]"}`}
         
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

          {/* Course Delete Confirmation Dialog */}
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="course-delete-dialog-title"
            PaperProps={{
              style: {
                backgroundColor: theme === "dark" ? "#1F2937" : "#FFFFFF",
                color: theme === "dark" ? "#F9FAFB" : "#111827",
                borderRadius: "8px",
                padding: "16px",
                width: "500px",
                maxWidth: "90vw",
              },
            }}
          >
            <DialogTitle
              id="course-delete-dialog-title"
              sx={{ fontWeight: "bold", fontSize: "1.25rem" }}
            >
              Confirm Course Deletion
            </DialogTitle>
            <DialogContent>
              <DialogContentText
                sx={{
                  color: theme === "dark" ? "#D1D5DB" : "#4B5563",
                  marginBottom: "16px",
                }}
              >
                You are about to permanently delete the course{" "}
                <strong>{courseName}</strong>. This action cannot be undone and
                will remove all data associated with this course, including
                student enrollments and progress.
              </DialogContentText>

              <DialogContentText
                sx={{
                  color: theme === "dark" ? "#FCA5A5" : "#DC2626",
                  fontWeight: "medium",
                  marginBottom: "16px",
                }}
              >
                To confirm deletion, please type <strong>delete</strong> in the
                field below:
              </DialogContentText>

              <TextField
                autoFocus
                margin="dense"
                placeholder="Type 'delete' to confirm"
                fullWidth
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: theme === "dark" ? "#4B5563" : "#D1D5DB",
                    },
                    "&:hover fieldset": {
                      borderColor: theme === "dark" ? "#6B7280" : "#9CA3AF",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#EF4444",
                    },
                    color: theme === "dark" ? "#F9FAFB" : "#111827",
                  },
                }}
              />
            </DialogContent>
            <DialogActions sx={{ padding: "16px 0 0 0" }}>
              <Button
                onClick={handleClose}
                sx={{
                  backgroundColor: theme === "dark" ? "#4B5563" : "#E5E7EB",
                  color: theme === "dark" ? "#F9FAFB" : "#111827",
                  "&:hover": {
                    backgroundColor: theme === "dark" ? "#6B7280" : "#D1D5DB",
                  },
                  textTransform: "none",
                  fontWeight: "medium",
                  padding: "8px 16px",
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirm}
                disabled={isDeleting || confirmText.toLowerCase() !== "delete"}
                sx={{
                  backgroundColor:
                    confirmText.toLowerCase() === "delete"
                      ? "#EF4444"
                      : theme === "dark"
                      ? "#374151"
                      : "#9CA3AF",
                  color: "#FFFFFF",
                  "&:hover": {
                    backgroundColor:
                      confirmText.toLowerCase() === "delete"
                        ? "#DC2626"
                        : theme === "dark"
                        ? "#374151"
                        : "#9CA3AF",
                  },
                  textTransform: "none",
                  fontWeight: "medium",
                  padding: "8px 16px",
                }}
              >
                {isDeleting ? "Deleting..." : "Delete Course"}
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </div>
  );
};

export default AllCourses;
