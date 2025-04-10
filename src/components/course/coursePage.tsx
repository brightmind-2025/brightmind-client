"use client";

import React, { useEffect } from "react";
import { fetchAllCourses } from "@/lib/thunks/courseThunks";
import CourseCard from "@/components/course/courseCard";
import { useAppDispatch, useAppSelector } from "@/hooks/dispatchHook";
import { Course } from "@/types/types";
import CategoryFilter from "./categoryBar";
const CoursesPage = () => {
  const dispatch = useAppDispatch();
  const { courses, loading, error } = useAppSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchAllCourses());
  }, [dispatch]);

  return (<>
<CategoryFilter/>
    <div className="p-8">
              
      <div className="flex flex-wrap gap-6 justify-start">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {Array.isArray(courses) && courses.map((course: Course) => (
  <CourseCard key={course._id} course={course} />
))}
      </div>
    </div>
    </>
  );
};

export default CoursesPage;
