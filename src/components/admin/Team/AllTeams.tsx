import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import Loader from "@/components/Loader/Loader";
import {
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "@/lib/features/user/userApi";
import { styles } from "@/components/style/style";
import { toast } from "react-hot-toast";

type Props = {};

const AllTeams = (props: Props) => {
  const { theme } = useTheme();
  const { isLoading, data, error, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [active, setActive] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [emailError, setEmailError] = useState("");

  const [updateUserRole, { isLoading: isUpdating }] =
    useUpdateUserRoleMutation();

  const handleAddMember = () => {
    // Basic email validation
    if (!email) {
      setEmailError("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    // Find if user with email exists in data
    const userExists = data?.users?.find((user: any) => user.email === email);

    if (!userExists) {
      toast.error("User with this email does not exist");
      return;
    }

    updateUserRole({
      id: userExists._id?.$oid || userExists._id,
      role,
    })
      .unwrap()
      .then(() => {
        toast.success(`User role updated to ${role} successfully`);
        setActive(false);
        setEmail("");
        setRole("admin");
        refetch();
      })
      .catch((error) => {
        toast.error(error?.data?.message || "Failed to update user role");
        console.error("Failed to update user role: ", error);
      });
  };

  const handleClose = () => {
    setActive(false);
    setEmail("");
    setRole("admin");
    setEmailError("");
  };

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
    <div className="mt-[100px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="10px">
          <div className="w-full flex justify-end">
            <button
              className={`transition duration-200 ease-in-out px-5 py-2 rounded-lg shadow-md font-medium
                bg-[#4ADE80] text-white hover:bg-[#22C55E] 
                dark:bg-[#57c7a3] dark:hover:bg-[#45b191] dark:border dark:border-[#ffffff6c]
              `}
              onClick={() => setActive(true)}
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

          {/* Add New Member Dialog */}
          <Dialog
            open={active}
            onClose={handleClose}
            aria-labelledby="add-member-dialog-title"
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
              id="add-member-dialog-title"
              sx={{ fontWeight: "bold", fontSize: "1.25rem" }}
            >
              Add New Team Member
            </DialogTitle>
            <DialogContent>
              <DialogContentText
                sx={{
                  color: theme === "dark" ? "#D1D5DB" : "#4B5563",
                  marginBottom: "16px",
                }}
              >
                Enter the email address of the user you want to add to the team
                and select their role.
              </DialogContentText>

              <TextField
                autoFocus
                margin="dense"
                label="Email Address"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
                error={!!emailError}
                helperText={emailError}
                variant="outlined"
                sx={{
                  marginBottom: "16px",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: theme === "dark" ? "#4B5563" : "#D1D5DB",
                    },
                    "&:hover fieldset": {
                      borderColor: theme === "dark" ? "#6B7280" : "#9CA3AF",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme === "dark" ? "#57c7a3" : "#22C55E",
                    },
                    color: theme === "dark" ? "#F9FAFB" : "#111827",
                  },
                  "& .MuiInputLabel-root": {
                    color: theme === "dark" ? "#9CA3AF" : "#6B7280",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: theme === "dark" ? "#57c7a3" : "#22C55E",
                  },
                  "& .MuiFormHelperText-root": {
                    color: "#EF4444",
                  },
                }}
              />

              <FormControl component="fieldset" sx={{ marginTop: "8px" }}>
                <FormLabel
                  component="legend"
                  sx={{
                    color: theme === "dark" ? "#9CA3AF" : "#6B7280",
                    "&.Mui-focused": {
                      color: theme === "dark" ? "#57c7a3" : "#22C55E",
                    },
                  }}
                >
                  User Role
                </FormLabel>
                <RadioGroup
                  row
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <FormControlLabel
                    value="admin"
                    control={
                      <Radio
                        sx={{
                          color: theme === "dark" ? "#57c7a3" : "#22C55E",
                          "&.Mui-checked": {
                            color: theme === "dark" ? "#57c7a3" : "#22C55E",
                          },
                        }}
                      />
                    }
                    label="Admin"
                    sx={{
                      color: theme === "dark" ? "#F9FAFB" : "#111827",
                    }}
                  />
                  <FormControlLabel
                    value="user"
                    control={
                      <Radio
                        sx={{
                          color: theme === "dark" ? "#57c7a3" : "#22C55E",
                          "&.Mui-checked": {
                            color: theme === "dark" ? "#57c7a3" : "#22C55E",
                          },
                        }}
                      />
                    }
                    label="User"
                    sx={{
                      color: theme === "dark" ? "#F9FAFB" : "#111827",
                    }}
                  />
                </RadioGroup>
              </FormControl>
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
                onClick={handleAddMember}
                disabled={isUpdating || !email}
                sx={{
                  backgroundColor: theme === "dark" ? "#57c7a3" : "#22C55E",
                  color: "#FFFFFF",
                  "&:hover": {
                    backgroundColor: theme === "dark" ? "#45b191" : "#16A34A",
                  },
                  "&.Mui-disabled": {
                    backgroundColor: theme === "dark" ? "#374151" : "#9CA3AF",
                    color: theme === "dark" ? "#6B7280" : "#E5E7EB",
                  },
                  textTransform: "none",
                  fontWeight: "medium",
                  padding: "8px 16px",
                }}
              >
                {isUpdating ? "Adding..." : "Add Member"}
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </div>
  );
};

export default AllTeams;
