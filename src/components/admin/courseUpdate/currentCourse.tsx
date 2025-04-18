"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store/store";
import { fetchAllCourses } from "@/lib/thunks/courseThunks";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";

const CurrentCoursesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { courses, loading } = useSelector((state: RootState) => state.courses);

  useEffect(() => {
    dispatch(fetchAllCourses());
  }, [dispatch]);

  return (
    <div className="p-6 text-white bg-[#212b43] min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Current Courses</h1>
      <div className="overflow-x-auto rounded-lg border border-[#1E293B]">
        <table className="min-w-full bg-[#233357]">
          <thead className="bg-[#4338CA] text-white">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Course Title</th>
              <th className="py-3 px-4 text-left">Ratings</th>
              <th className="py-3 px-4 text-left">Purchased</th>
              <th className="py-3 px-4 text-left">Edit</th>
              <th className="py-3 px-4 text-left">Delete</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-6">
                  Loading...
                </td>
              </tr>
            ) : courses.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-400">
                  No courses found.
                </td>
              </tr>
            ) : (
              courses.map((course) => (
                <tr key={course._id} className="border-b border-[#1E293B]">
                  <td className="py-3 px-4">{course._id}</td>
                  <td className="py-3 px-4">{course.name}</td>
                  <td className="py-3 px-4">{course.ratings || 0}</td>
                  <td className="py-3 px-4">{course.purchased || 0}</td>
                  <td className="py-3 px-4">
                    <Link href={`/admin/edit-course/${course._id}`}>
                      <Pencil className="w-5 h-5 cursor-pointer text-blue-400 hover:text-blue-600" />
                    </Link>
                  </td>
                  <td className="py-3 px-4">
                    <button>
                      <Trash className="w-5 h-5 text-red-400 hover:text-red-600" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CurrentCoursesPage;
