import { styles } from "@/components/style/style";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import Loader from "@/components/Loader/Loader";
import { useGetUsersAnalyticsQuery } from "@/lib/features/analytics/analyticsApi";

type Props = {
  isDashboard?: boolean;
};

const UserAnalytics = ({ isDashboard = false }: Props) => {
  const { data, isLoading, isError } = useGetUsersAnalyticsQuery({});

  // Transform data for the chart
  type UserAnalyticsItem = {
    month: string;
    count: number;
  };

  const analyticsData = React.useMemo(() => {
    if (!data) return [];
    return data.users.last12Months.map((item: UserAnalyticsItem) => ({
      month: item.month,
      users: item.count,
    }));
  }, [data]);
  const totalUsersLast12 = React.useMemo((): number =>
    analyticsData.reduce((sum: number, item: { month: string; users: number }): number => sum + item.users, 0),
    [analyticsData]
  );

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-700 rounded-md shadow-lg p-4">
          <p className="text-gray-300 text-sm font-medium">{`Month: ${label}`}</p>
          <p className="text-indigo-400 text-base font-semibold mt-1">
            {`${payload[0].value} New Users`}
          </p>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div
        className={`${
          isDashboard ? "h-[400px]" : "h-screen"
        } w-full flex items-center justify-center bg-gray-900`}
      >
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className={`${
          isDashboard ? "h-[400px]" : "h-screen"
        } w-full flex items-center justify-center bg-gray-900`}
      >
        <div className="bg-red-900/20 text-red-400 p-4 rounded-lg border border-red-800">
          Error loading user analytics data. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${
        isDashboard ? "h-[450px]" : "min-h-screen"
      } w-full bg-gray-900 pb-6`}
    >
      {/* Header */}
      {!isDashboard && (
        <div className="bg-gray-800 shadow-md border-b border-gray-700">
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold text-white">
              User Growth Analytics
            </h1>
            <p className="mt-1 text-sm text-gray-400">
              Tracking user acquisition and growth over the last 12 months
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${
          isDashboard ? "pt-4" : "pt-8"
        }`}
      >
        {/* Title for dashboard mode */}
        {isDashboard && (
          <h2 className="text-xl font-medium text-white mb-4">User Growth</h2>
        )}

        {/* Main Chart Card */}
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
          {!isDashboard && (
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-white">
                Monthly User Registration
              </h2>
              <div className="flex space-x-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-900/50 text-indigo-300 border border-indigo-700">
                  Last 12 Months
                </span>
              </div>
            </div>
          )}

          <div className={`${isDashboard ? "h-64" : "h-80"}`}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={analyticsData}
                margin={{
                  top: 20,
                  right: 30,
                  left: isDashboard ? 0 : 20,
                  bottom: 20,
                }}
              >
                <defs>
                  <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#374151"
                  opacity={0.6}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#D1D5DB", fontSize: isDashboard ? 10 : 12 }}
                  tickLine={{ stroke: "#4B5563" }}
                  axisLine={{ stroke: "#4B5563" }}
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis
                  tick={{ fill: "#D1D5DB", fontSize: isDashboard ? 10 : 12 }}
                  tickLine={{ stroke: "#4B5563" }}
                  axisLine={{ stroke: "#4B5563" }}
                  tickFormatter={(value) => value}
                  padding={{ top: 10 }}
                  width={isDashboard ? 30 : 40}
                />
                <Tooltip content={<CustomTooltip />} />
                {!isDashboard && <Legend verticalAlign="top" height={36} />}
                <Area
                  type="monotone"
                  name="New Users"
                  dataKey="users"
                  stroke="#6366F1"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#userGradient)"
                  activeDot={{
                    r: 6,
                    strokeWidth: 2,
                    stroke: "#818CF8",
                    fill: "#6366F1",
                    strokeDasharray: "",
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stats Cards - Only show if not in dashboard mode */}
        {!isDashboard && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
              <h3 className="text-sm font-medium text-gray-400">Total Users</h3>
              <p className="mt-2 text-3xl font-semibold text-white">
                {totalUsersLast12 || 0}
              </p>
              <div className="mt-1 text-xs font-medium text-indigo-400">
                ↑ All time registrations
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
              <h3 className="text-sm font-medium text-gray-400">Peak Month</h3>
              <p className="mt-2 text-3xl font-semibold text-white">
                {analyticsData.length > 0
                  ? analyticsData.reduce(
                      (max: UserAnalyticsItem, obj: UserAnalyticsItem) =>
                        obj.count > max.count ? obj : max
                    ).month
                  : "N/A"}
              </p>
              <div className="mt-1 text-xs font-medium text-indigo-400">
                ↑ Highest user registrations
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
              <h3 className="text-sm font-medium text-gray-400">Growth Rate</h3>
              <p className="mt-2 text-3xl font-semibold text-white">
                {analyticsData.length > 1
                  ? `${calculateGrowthRate(analyticsData)}%`
                  : "N/A"}
              </p>
              <div className="mt-1 text-xs font-medium text-indigo-400">
                ⓘ Year-over-year
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to calculate growth rate
function calculateGrowthRate(data: { users: number }[]) {
  if (!data || data.length < 2) return 0;

  // Compare first and last month in the data
  const firstMonth = data[0].users;
  const lastMonth = data[data.length - 1].users;

  if (firstMonth === 0) return 0;

  const rate = ((lastMonth - firstMonth) / firstMonth) * 100;
  return Math.round(rate);
}

export default UserAnalytics;
