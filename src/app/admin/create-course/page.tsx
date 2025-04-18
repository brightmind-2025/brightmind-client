"use client";

import CourseFormWrapper from "@/components/admin/courseForm/courseFormWrapper";
import AdminSidebar from "@/components/admin/adminSidebar";

 const  CreateCoursePage = () => {
  return (
    <div className="flex min-h-screen bg-[#0F172A] text-white">
    
      <div className="w-64">
        <AdminSidebar/>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        <CourseFormWrapper/>
      </div>
    </div>
  );
};

export default CreateCoursePage;
