"use client";
import React from "react";
import AdminSidebar from "../../../components/admin/Sidebar/AdminSidebar";
import EditCategories from "../../../components/admin/Customization/EditCategories";
import DashBoardHeader from "@/components/admin/DashBoardHeader";

type Props = {};
const page = (props: Props) => {
  return (
    <div className="dark:bg-gradient-to-b from-slate-900 to-black bg-slate-100 ">
      <div className="flex ">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashBoardHeader />
          <EditCategories />
        </div>
      </div>
    </div>
  );
};

export default page;
