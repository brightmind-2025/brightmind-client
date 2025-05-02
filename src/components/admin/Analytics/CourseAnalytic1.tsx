import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  LabelList,
  Label,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import Loader from "@/components/Loader/Loader";
import { useGetCoursesAnalyticsQuery } from "@/lib/features/analytics/analyticsApi";

const CourseAnalytics = () => {
  const { data, isLoading, isError } = useGetCoursesAnalyticsQuery({});
  const [totalCourses, setTotalCourses] = useState(0);
  const analyticsData: { month: string; courses: number }[] = [];

  useEffect(() => {
    // Log the entire API response to debug the structure
    console.log("Course Analytics API Response:", data);

    // Set total courses based on API response
    if (data) {
      // Try different possible paths for total courses in the data
      if (data.courses?.totalCourses !== undefined) {
        setTotalCourses(data.courses.totalCourses);
      } else if (data.totalCourses !== undefined) {
        setTotalCourses(data.totalCourses);
      } else if (Array.isArray(data.courses?.last12Months)) {
        // If total isn't provided, calculate from monthly data
        const total = data.courses.last12Months.reduce(
          (sum: number, item: { count: number }) => sum + item.count,
          0
        );
        setTotalCourses(total);
      } else {
        // Fallback to count from monthly data we've transformed
        const total = analyticsData.reduce(
          (sum, item) => sum + item.courses,
          0
        );
        setTotalCourses(total);
      }
    }
  }, [data]);

  // Transform data for the chart
  if (data && data.courses?.last12Months) {
    data.courses.last12Months.forEach(
      (item: { month: string; count: number }) => {
        analyticsData.push({
          month: item.month,
          courses: item.count,
        });
      }
    );
  }

  // Handle case when you only have data for the current month
  const getAverageMonthly = () => {
    if (analyticsData.length === 0) return 0;

    // If all data is from just one month (only development month)
    if (analyticsData.length === 1) {
      return analyticsData[0].courses;
    }

    // Filter out months with zero courses to get a more accurate average
    const activeMonths = analyticsData.filter((month) => month.courses > 0);
    if (activeMonths.length === 0) return 0;

    return Math.round(
      activeMonths.reduce((sum, obj) => sum + obj.courses, 0) /
        activeMonths.length
    );
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen dark:bg-gray-900">
        <Loader />
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center h-screen dark:bg-gray-900">
        <div className="text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 p-4 rounded-lg border border-red-200 dark:border-red-800">
          Error loading analytics data. Please try again later.
        </div>
      </div>
    );

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-12 transition-colors duration-200">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Course Analytics Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Overview of course creation activity over the last 12 months
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-gray-700/20 p-6 transition-colors duration-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Monthly Course Creation
              </h2>
              <div className="flex space-x-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                  Last 12 Months
                </span>
              </div>
            </div>

            {analyticsData.length === 0 ? (
              <div className="h-80 flex items-center justify-center text-gray-500 dark:text-gray-400">
                No course data available for the last 12 months
              </div>
            ) : (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={analyticsData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#E5E7EB"
                      strokeOpacity={0.6}
                    />
                    <XAxis
                      dataKey="month"
                      tick={{ fill: "#6B7280", fontSize: 12 }}
                      tickLine={{ stroke: "#E5E7EB" }}
                      axisLine={{ stroke: "#E5E7EB" }}
                    >
                      <Label
                        value="Month"
                        position="insideBottom"
                        offset={-10}
                        style={{
                          textAnchor: "middle",
                          fill: "#6B7280",
                          fontSize: 12,
                          fontWeight: 500,
                        }}
                      />
                    </XAxis>
                    <YAxis
                      tick={{ fill: "#6B7280", fontSize: 12 }}
                      tickLine={{ stroke: "#E5E7EB" }}
                      axisLine={{ stroke: "#E5E7EB" }}
                      tickFormatter={(value) => value}
                    >
                      <Label
                        value="Number of Courses"
                        angle={-90}
                        position="insideLeft"
                        style={{
                          textAnchor: "middle",
                          fill: "#6B7280",
                          fontSize: 12,
                          fontWeight: 500,
                        }}
                      />
                    </YAxis>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--tooltip-bg, white)",
                        border: "1px solid var(--tooltip-border, #E5E7EB)",
                        borderRadius: "6px",
                        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                        color: "var(--tooltip-text, #111827)",
                      }}
                      formatter={(value) => [
                        `${value} courses`,
                        "Courses Created",
                      ]}
                      labelFormatter={(label) => `Month: ${label}`}
                    />
                    <Legend verticalAlign="top" height={36} />
                    <Bar
                      name="Courses Created"
                      dataKey="courses"
                      fill="var(--bar-color, #4F46E5)"
                      radius={[4, 4, 0, 0]}
                      barSize={40}
                    >
                      <LabelList
                        dataKey="courses"
                        position="top"
                        style={{
                          fill: "var(--label-color, #6B7280)",
                          fontSize: 12,
                          fontWeight: 500,
                        }}
                        formatter={(value: number) => value}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Additional stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-gray-700/20 p-6 transition-colors duration-200">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Courses
              </h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
                {totalCourses}
              </p>
              <div className="mt-1 text-xs font-medium text-green-600 dark:text-green-400">
                ↑ Created overall
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-gray-700/20 p-6 transition-colors duration-200">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Most Active Month
              </h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
                {analyticsData.length > 0
                  ? analyticsData.reduce((max, obj) =>
                      obj.courses > max.courses ? obj : max
                    ).month
                  : "N/A"}
              </p>
              <div className="mt-1 text-xs font-medium text-green-600 dark:text-green-400">
                ↑ Highest course creation
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-gray-700/20 p-6 transition-colors duration-200">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {analyticsData.length <= 1
                  ? "Current Monthly Courses"
                  : "Avg. Monthly Courses"}
              </h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
                {getAverageMonthly()}
              </p>
              <div className="mt-1 text-xs font-medium text-blue-600 dark:text-blue-400">
                {analyticsData.length <= 1
                  ? "ⓘ Development month only"
                  : "ⓘ Active months only"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Theme-aware styling for Recharts */}
      <style jsx global>{`
        .recharts-wrapper {
          --bar-color: #4f46e5;
          --label-color: #6b7280;
          --tooltip-bg: white;
          --tooltip-border: #e5e7eb;
          --tooltip-text: #111827;
        }

        .dark .recharts-wrapper {
          --bar-color: #6366f1;
          --label-color: #d1d5db;
          --tooltip-bg: #1f2937;
          --tooltip-border: #374151;
          --tooltip-text: #f9fafb;
        }

        .dark .recharts-cartesian-grid-horizontal line,
        .dark .recharts-cartesian-grid-vertical line {
          stroke: #374151;
        }

        .dark .recharts-xAxis line,
        .dark .recharts-yAxis line {
          stroke: #4b5563;
        }

        .dark .recharts-text {
          fill: #d1d5db !important;
        }
      `}</style>
    </div>
  );
};

export default CourseAnalytics;
