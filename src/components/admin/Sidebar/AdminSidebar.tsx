import { FC, JSX, useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import {
  Box,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  styled,
  Divider,
  alpha,
} from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";
import {
  HomeOutlinedIcon,
  ArrowForwardIosIcon,
  ArrowBackIosIcon,
  PeopleOutlinedIcon,
  ReceiptOutlinedIcon,
  BarChartOutlinedIcon,
  MapOutlinedIcon,
  GroupsIcon,
  OndemandVideoIcon,
  VideoCallIcon,
  WebIcon,
  QuizIcon,
  WysiwygIcon,
  ManageHistoryIcon,
  SettingsIcon,
  ExitToAppIcon,
  WarningAmberRounded as WarningIcon,
} from "./Icon";
import avatarDefault from "../../../assets/avatar.png";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/components/hooks/dispatchHook";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useRouter, usePathname } from "next/navigation";
import { logoutUser } from "@/lib/thunks/authThunks";
import { useLogoutQuery } from "@/lib/features/authApi";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

// Styled components for the dialog
const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    backgroundColor: "#1E2133",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
    maxWidth: "400px",
    width: "100%",
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: "#1E2133",
  color: "#F5F5F5",
  padding: "20px 24px 10px",
  fontSize: "1.2rem",
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
  gap: "12px",
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  backgroundColor: "#1E2133",
  color: "#B8B9BE",
  padding: "16px 24px",
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  backgroundColor: "#1E2133",
  padding: "16px 24px 20px",
  justifyContent: "center",
  gap: "12px",
}));

const CancelButton = styled(Button)(({ theme }) => ({
  backgroundColor: "transparent",
  color: "#B8B9BE",
  border: "1px solid #3A3D4E",
  borderRadius: "8px",
  padding: "8px 22px",
  textTransform: "none",
  fontSize: "0.9rem",
  fontWeight: 500,
  "&:hover": {
    backgroundColor: "rgba(184, 185, 190, 0.1)",
    borderColor: "#545766",
  },
}));

const LogoutButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#c53030",
  color: "white",
  borderRadius: "8px",
  padding: "8px 22px",
  textTransform: "none",
  fontSize: "0.9rem",
  fontWeight: 500,
  "&:hover": {
    backgroundColor: "#9b2c2c",
  },
}));

const WarningIconStyled = styled(WarningIcon)(({ theme }) => ({
  color: "#f97316",
  fontSize: "22px",
}));

interface itemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: any;
}

const Item: FC<itemProps> = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography className="!text-[16px] !font-Poppins">{title}</Typography>
      <Link href={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const { user } = useSelector((state: any) => state.auth);
  const { theme } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [mounted, setMounted] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [logout, setLogout] = useState(false);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

 
  const {} = useLogoutQuery(undefined, {
    skip: !logout ? true : false,
  });

  
  const logoutHandler = async () => {
    setOpenLogoutDialog(false);

    try {
      // First update UI state
      setLogout(true);

      // Then execute the logout operations
      await dispatch(logoutUser());

      // Show success message before navigation
      toast.success("Logged out successfully!");

      // Use Next.js signOut with redirect option
      await signOut({
        redirect: false,
        callbackUrl: "/home",
      });

      // Ensure navigation happens after signOut completes
      router.push("/home");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Try again.");
      setLogout(false);
    }
  };

  // Open the confirmation dialog
  const handleLogoutClick = () => {
    setOpenLogoutDialog(true);
  };

  // Close the dialog without logging out
  const handleCancelLogout = () => {
    setOpenLogoutDialog(false);
  };

  useEffect(() => setMounted(true), []);

  // Set the selected menu item based on the current path
  useEffect(() => {
    if (pathname) {
      if (pathname === "/admin") setSelected("Dashboard");
      else if (pathname === "/admin/users") setSelected("Users");
      else if (pathname === "/admin/invoices") setSelected("Invoices");
      else if (pathname === "/admin/create-course")
        setSelected("Create Course");
      else if (pathname === "/admin/courses") setSelected("Courses");
      else if (pathname === "/admin/hero") setSelected("Hero");
      else if (pathname === "/admin/faq") setSelected("FAQ");
      else if (pathname === "/admin/categories") setSelected("Categories");
      else if (pathname === "/admin/team") setSelected("Manage Team");
      else if (pathname === "/admin/courses-analytics")
        setSelected("Courses Analytics");
      else if (pathname === "/admin/orders-analytics")
        setSelected("Order Analytics");
      else if (pathname === "/admin/users-analytics")
        setSelected("Users Analytics");
    }
  }, [pathname]);

  if (!mounted) {
    return null;
  }

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background:
            theme === "dark" ? "#111C43 !important" : "#fff !important",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-menu-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
          opacity: 1,
        },
        "& .pro-menu-item": {
          color: theme !== "dark" ? "#000" : undefined,
        },
      }}
      className="bg-white dark:bg-[#111C43]"
    >
      <ProSidebar
        collapsed={isCollapsed}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: isCollapsed ? "0%" : "16%",
        }}
      >
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <ArrowForwardIosIcon /> : undefined}
            style={{
              margin: "10px 0px 10px 10px",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Link href="/home">
                  <h3 className="text-[25px] font-poppins uppercase dark:text-white text-black"
                  
                  >
                    BrightMind
                  </h3>
                </Link>
                <IconButton
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="inline-block"
                >
                  <ArrowBackIosIcon className="text-black dark:text-[#ffffffc1]" />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!isCollapsed && (
            <Box mb="25px">
              <Link href="/home">

              <Box display="flex" justifyContent="center" alignItems="center">
                <Image
                  alt="profile"
                  width={100}
                  height={100}
                  src={user?.avatar ? user?.avatar?.url : avatarDefault}
                  style={{
                    cursor: "pointer",
                    borderRadius: "50%",
                  }}
                  
                />
              </Box>
              </Link>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  className="!text-[20px] text-black dark:text-[#ffffffc1] "
                  sx={{ m: "10px 0px 0px 0px" }}
                >
                  {user?.name}
                </Typography>
                <Typography
                  variant="h6"
                  className="!text-[20px] text-black dark:text-[#ffffffc1]"
                  sx={{ m: "5px 0px 0px 0px" }}
                >
                  {user?.role}
                </Typography>
              </Box>
            </Box>
          )}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/admin"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h5"
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400] font-poppins"
              sx={{ m: "15px 0px 5px 25px" }}
            >
              {!isCollapsed && "Data"}
            </Typography>
            <Item
              title="Users"
              to="/admin/users"
              icon={<GroupsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Invoices"
              to="/admin/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h5"
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize!font-[400] font-poppins"
              sx={{ m: "15px 0px 5px 20px" }}
            >
              {!isCollapsed && "Content"}
            </Typography>
            <Item
              title="Create Course"
              to="/admin/create-course"
              icon={<VideoCallIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Courses"
              to="/admin/courses"
              icon={<OndemandVideoIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h5"
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
              sx={{ m: "15px 0px 5px 20px" }}
            >
              {!isCollapsed && "Customization"}
            </Typography>
            <Item
              title="Hero"
              to="/admin/hero"
              icon={<WebIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ"
              to="/admin/faq"
              icon={<QuizIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Categories"
              to="/admin/categories"
              icon={<WysiwygIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h5"
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400] font-poppins"
              sx={{ m: "15px 0px 5px 20px" }}
            >
              {!isCollapsed && "Controllers"}
            </Typography>
            <Item
              title="Manage Team"
              to="/admin/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h5"
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400] font-poppins"
              sx={{ m: "15px 0px 5px 20px" }}
            >
              {!isCollapsed && "Analytics"}
            </Typography>
            <Item
              title="Courses Analytics"
              to="/admin/courses-analytics"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Order Analytics"
              to="/admin/orders-analytics"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Users Analytics"
              to="/admin/users-analytics"
              icon={<ManageHistoryIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h5"
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400] font-poppins"
              sx={{ m: "15px 0px 5px 20px" }}
            >
              {!isCollapsed && ""}
            </Typography>

            <MenuItem
              active={selected === "Logout"}
              onClick={handleLogoutClick}
              icon={<ExitToAppIcon className="text-red-600" />}
            >
              <Typography className="!text-[16px] !font-Poppins">
                Logout
              </Typography>
            </MenuItem>
          </Box>
        </Menu>
      </ProSidebar>

      {/* Enhanced Logout Confirmation Dialog */}
      <StyledDialog
        open={openLogoutDialog}
        onClose={handleCancelLogout}
        aria-labelledby="logout-dialog-title"
        PaperProps={{
          elevation: 24,
        }}
      >
        <StyledDialogTitle id="logout-dialog-title">
          <WarningIconStyled /> Sign Out
        </StyledDialogTitle>

        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.08)" }} />

        <StyledDialogContent>
          <Typography sx={{ fontSize: "0.95rem", lineHeight: 1.5 }}>
            Are you sure you want to sign out of your BrightMind admin account?
            You will need to sign in again to access the dashboard.
          </Typography>
        </StyledDialogContent>

        <StyledDialogActions>
          <CancelButton onClick={handleCancelLogout} variant="outlined">
            Cancel
          </CancelButton>
          <LogoutButton onClick={logoutHandler} variant="contained" autoFocus>
            Sign Out
          </LogoutButton>
        </StyledDialogActions>
      </StyledDialog>
    </Box>
  );
};

export default Sidebar;
