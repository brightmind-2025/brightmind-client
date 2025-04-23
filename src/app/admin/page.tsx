"use client";
import Heading from "@/utils/Headings";
import React from "react";
import AdminSidebar from "../../components/admin/Sidebar/AdminSidebar";
import AdminProtected from "@/components/hooks/adminProtected";
import DashboardHero from "../../components/admin/DashboardHero"

type Props = {};

const page = (props: Props) => {
  return (
    <div className="bg-slate-900">
      <AdminProtected>
        <Heading
          title="Admin"
          description="Admin page"
          keywords="Programming"
        />

        <div className="flex h-[200vh]">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHero/>
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
