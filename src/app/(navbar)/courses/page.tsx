"use client";
import { styles } from "@/components/style/style";
import { useGetUsersAllCoursesQuery } from "@/lib/features/courses/courseApi";
import { useGetHeroDataQuery } from "@/lib/features/layout/layoutApi";
import CourseCard from "@/shared/CourseCard";
import Heading from "@/utils/Headings";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Loader from "@/components/Loader/Loader";

type Props = {};

const Page = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams?.get("title");
  const [localSearch, setLocalSearch] = useState(search || "");

  const { data, isLoading } = useGetUsersAllCoursesQuery(undefined, {});
  const { data: categoriesData } = useGetHeroDataQuery("Categories", {});
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    if (data && data.courses) {
      let filteredCourses = data.courses;

      if (category !== "All") {
        filteredCourses = filteredCourses.filter(
          (item: any) => item.categories === category
        );
      }

      if (search) {
        filteredCourses = filteredCourses.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        );
      }

      setCourses(filteredCourses);
    }
  }, [data, category, search]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/courses?title=${encodeURIComponent(localSearch)}`);
  };

  const categories = categoriesData?.layout.categories;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {isLoading ? (
        <div className="h-[80vh] flex items-center justify-center">
         <Loader/>
        </div>
      ) : (
        <>
          <div className="w-[95%] 800px:w-[85%] m-auto py-12">
            <Heading
              title="All courses - BrightMind"
              description="BrightMind is a programming community."
              keywords="programming community, coding skills, expert insights, collaboration, growth"
            />

            {/* Search Bar */}
            <motion.form
              onSubmit={handleSearchSubmit}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-2xl mx-auto mb-12 relative"
            >
              <input
                type="text"
                placeholder="Search courses..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full py-4 pl-6 pr-14 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white transition-all"
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 p-3 rounded-full text-white transition-colors"
              >
                <Search size={20} />
              </button>
            </motion.form>

            {/* Categories Filter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-wrap gap-4 justify-center mb-12"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full font-medium ${
                  category === "All"
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                } transition-colors shadow-md`}
                onClick={() => setCategory("All")}
              >
                All
              </motion.button>
              {categories?.map((item: any, index: number) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-2 rounded-full font-medium ${
                    category === item.title
                      ? "bg-blue-600 text-white"
                      : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  } transition-colors shadow-md`}
                  onClick={() => setCategory(item.title)}
                >
                  {item.title}
                </motion.button>
              ))}
            </motion.div>

            {/* Course Grid */}
            {courses.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-24"
              >
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  {search
                    ? "No courses found matching your search."
                    : "No courses found in this category."}
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              >
                {courses.map((item: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CourseCard item={item} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
