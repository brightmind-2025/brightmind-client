"use client";
import Heading from "@/utils/Headings";
import React from "react";
import AdminSidebar from "../../components/admin/Sidebar/AdminSidebar";
import AdminProtected from "@/components/hooks/adminProtected";
import DashboardHero from "../../components/admin/DashboardHero";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="bg-slate-900 min-h-screen">
      <AdminProtected>
        <Heading
          title="Admin"
          description="Admin page"
          keywords="Programming"
        />
        
        <div className="flex flex-col lg:flex-row min-h-screen">
          <div className="lg:w-64 fixed left-0 top-0 h-full hidden lg:block">
            <AdminSidebar />
          </div>
          
          <div className="lg:ml-64 flex-1 overflow-x-hidden">
            <DashboardHero isDashboard={true} />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Page;