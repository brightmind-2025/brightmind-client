import React, { useMemo } from "react";
import DashBoardHeader from "./DashBoardHeader";
import UserAnalytics from "./Analytics/UserAnalytics";
import OrderAnalytics from "./Analytics/OrderAnalytics";
import RecentOrders from "./Invoice/recentOrders";
import {
  FiUsers,
  FiShoppingBag,
  FiTrendingUp,
  FiCalendar,
  FiDollarSign,
} from "react-icons/fi";
import {
  useGetUsersAnalyticsQuery,
  useGetOrderAnalyticsQuery,
  useGetCoursesAnalyticsQuery,
} from "@/lib/features/analytics/analyticsApi";
import Loader from "@/components/Loader/Loader";

type Props = {
  isDashboard?: boolean;
};

const DashboardHero = ({ isDashboard = true }: Props) => {
  const { data: userData, isLoading: userLoading } = useGetUsersAnalyticsQuery({});
  const { data: orderData, isLoading: orderLoading } = useGetOrderAnalyticsQuery({});
  const { data: courseData, isLoading: courseLoading } = useGetCoursesAnalyticsQuery({});

  const userMetrics = useMemo(() => {
    if (!userData?.users?.last12Months) return { total: 0, growth: 0 };
    const total = userData.users.last12Months.reduce(
      (sum: number, item: any) => sum + item.count,
      0
    );
    const months = userData.users.last12Months;
    const lastMonth = months[months.length - 1]?.count || 0;
    const prevMonth = months[months.length - 2]?.count || 0;
    const growth = prevMonth
      ? Math.round(((lastMonth - prevMonth) / prevMonth) * 100)
      : 0;
    return { total, growth };
  }, [userData]);

  const orderMetrics = useMemo(() => {
    if (!orderData?.orders?.last12Months) return { total: 0, growth: 0 };
    const total = orderData.orders.last12Months.reduce(
      (sum: number, item: any) => sum + item.count,
      0
    );
    const months = orderData.orders.last12Months;
    const lastMonth = months[months.length - 1]?.count || 0;
    const prevMonth = months[months.length - 2]?.count || 0;
    const growth = prevMonth
      ? Math.round(((lastMonth - prevMonth) / prevMonth) * 100)
      : 0;
    return { total, growth };
  }, [orderData]);

  const courseMetrics = useMemo(() => {
    if (!courseData?.courses?.last12Months) return { total: 0, growth: 0 };
    const total = courseData.courses.last12Months.reduce(
      (sum: number, item: any) => sum + item.count,
      0
    );
    const months = courseData.courses.last12Months;
    const lastMonth = months[months.length - 1]?.count || 0;
    const prevMonth = months[months.length - 2]?.count || 0;
    const growth = prevMonth
      ? Math.round(((lastMonth - prevMonth) / prevMonth) * 100)
      : 0;
    return { total, growth };
  }, [courseData]);

  const avgOrderValue = useMemo(() => {
    if (!orderMetrics.total || !courseMetrics.total) return 0;
    return Math.round((courseMetrics.total / orderMetrics.total) * 100) / 100;
  }, [orderMetrics.total, courseMetrics.total]);

  if (userLoading || orderLoading || courseLoading) {
    return (
      <div className="w-full bg-gray-900 min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-900 min-h-screen">
      <DashBoardHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-2 sm:mb-0">Dashboard Overview</h1>
          <div className="bg-gray-800 rounded-md px-3 py-1.5 text-sm text-gray-300 flex items-center">
            <FiCalendar className="mr-2" />
            Last 12 Months
          </div>
        </div>

        {/* Stats cards section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Users card */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-md border border-gray-700 p-4">
            <div className="flex items-center">
              <div className="bg-indigo-900/30 p-3 rounded-lg mr-4">
                <FiUsers className="text-xl text-indigo-400" />
              </div>
              <div>
                <p className="text-gray-400 text-xs font-medium">Total Users</p>
                <h3 className="text-white text-lg font-bold mt-1">{userMetrics.total}</h3>
                <p className={`text-xs mt-1 ${userMetrics.growth >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {userMetrics.growth >= 0 ? "↑" : "↓"} {Math.abs(userMetrics.growth)}%
                </p>
              </div>
            </div>
          </div>

          {/* Orders card */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-md border border-gray-700 p-4">
            <div className="flex items-center">
              <div className="bg-teal-900/30 p-3 rounded-lg mr-4">
                <FiShoppingBag className="text-xl text-teal-400" />
              </div>
              <div>
                <p className="text-gray-400 text-xs font-medium">Total Orders</p>
                <h3 className="text-white text-lg font-bold mt-1">{orderMetrics.total}</h3>
                <p className={`text-xs mt-1 ${orderMetrics.growth >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {orderMetrics.growth >= 0 ? "↑" : "↓"} {Math.abs(orderMetrics.growth)}%
                </p>
              </div>
            </div>
          </div>

          {/* Courses card */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-md border border-gray-700 p-4">
            <div className="flex items-center">
              <div className="bg-purple-900/30 p-3 rounded-lg mr-4">
                <FiTrendingUp className="text-xl text-purple-400" />
              </div>
              <div>
                <p className="text-gray-400 text-xs font-medium">Total Courses</p>
                <h3 className="text-white text-lg font-bold mt-1">{courseMetrics.total}</h3>
                <p className={`text-xs mt-1 ${courseMetrics.growth >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {courseMetrics.growth >= 0 ? "↑" : "↓"} {Math.abs(courseMetrics.growth)}%
                </p>
              </div>
            </div>
          </div>

          {/* AVG Order Value card */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-md border border-gray-700 p-4">
            <div className="flex items-center">
              <div className="bg-emerald-900/30 p-3 rounded-lg mr-4">
                <FiDollarSign className="text-xl text-emerald-400" />
              </div>
              <div>
                <p className="text-gray-400 text-xs font-medium">Avg Order Value</p>
                <h3 className="text-white text-lg font-bold mt-1">${avgOrderValue}</h3>
                <p className="text-xs text-emerald-400 mt-1">Per transaction</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* User Growth Chart */}
          <div className="bg-gray-800/50 rounded-lg shadow-md border border-gray-700 overflow-hidden lg:col-span-2">
            <div className="p-4 border-b border-gray-700">
              <h2 className="text-white text-sm font-medium">User Growth</h2>
            </div>
            <div className="p-2">
              <UserAnalytics isDashboard={true} />
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-gray-800/50 rounded-lg shadow-md border border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-700">
              <h2 className="text-white text-sm font-medium">Recent Orders</h2>
            </div>
            <RecentOrders limit={5} />
          </div>
        </div>

        {/* Bottom section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Trends chart */}
          <div className="bg-gray-800/50 rounded-lg shadow-md border border-gray-700 overflow-hidden lg:col-span-2">
            <div className="p-4 border-b border-gray-700">
              <h2 className="text-white text-sm font-medium">Order Trends</h2>
            </div>
            <div className="p-2">
              <OrderAnalytics isDashboard={true} />
            </div>
          </div>

          {/* Small stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            <div className="bg-gray-800 rounded-lg shadow-md border border-gray-700 p-4">
              <h3 className="text-gray-400 text-xs mb-2">Active Users</h3>
              <div className="flex items-center">
                <span className="inline-block h-3 w-3 rounded-full bg-emerald-600 mr-2 animate-pulse"></span>
                <p className="text-white text-lg font-bold">{Math.round(userMetrics.total * 0.4)}</p>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg shadow-md border border-gray-700 p-4">
              <h3 className="text-gray-400 text-xs mb-2">Conversion Rate</h3>
              <p className="text-white text-lg font-bold">
                {userMetrics.total > 0
                  ? Math.round((orderMetrics.total / userMetrics.total) * 100)
                  : 0}%
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg shadow-md border border-gray-700 p-4">
              <h3 className="text-gray-400 text-xs mb-2">Latest Month</h3>
              <p className="text-white text-lg font-bold">
                {userData?.users?.last12Months?.[userData.users.last12Months.length - 1]?.month || "N/A"}
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg shadow-md border border-gray-700 p-4">
              <h3 className="text-gray-400 text-xs mb-2">Peak Order Month</h3>
              <p className="text-white text-lg font-bold">
                {orderData?.orders?.last12Months?.reduce(
                  (max: any, current: any) => (current.count > max.count ? current : max),
                  { count: 0, month: "N/A" }
                ).month}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHero;