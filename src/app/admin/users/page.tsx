"use client";

import React from "react";
import DashboardHero from "@/components/admin/DashboardHero";
import AdminProtected from "@/components/hooks/adminProtected";
import Heading from "@/utils/Headings";
import AdminSidebar from "../../../components/admin/Sidebar/AdminSidebar";
import AllUsers from "../../../components/admin/Users/AllUsers";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="dark:bg-gradient-to-b from-slate-900 to-black bg-slate-100 ">
      <AdminProtected>
        <Heading
          title="BrightMind - Admin"
          description="ELearning is a platform for students to learn and get help from teachers"
          keywords="Programming, MERN, Redux, Machine Learning"
        />
        <div className="flex h-screen">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHero />
            <AllUsers />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Page;
