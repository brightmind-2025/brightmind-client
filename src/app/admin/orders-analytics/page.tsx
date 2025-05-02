"use client";

import React from "react";
import AdminSidebar from "../../../components/admin/Sidebar/AdminSidebar";
import OrderAnalytics from "@/components/admin/Analytics/OrderAnalytics";
import DashBoardHeader from "@/components/admin/DashBoardHeader";
import Heading from "@/utils/Headings";

type Props = {};

const Page: React.FC<Props> = (props: Props) => {
  return (
    <div>
      <Heading
        title="Elearning - Admin"
        description="ELearning is a platform for students to learn and get help from teachers"
        keywords="Programming, MERN, Redux, Machine Learning"
      />
      <div className="flex">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashBoardHeader />
          <OrderAnalytics />
        </div>
      </div>
    </div>
  );
};

export default Page;
