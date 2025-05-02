import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Label,
} from "recharts";
import Loader from "@/components/Loader/Loader";
import { useGetOrderAnalyticsQuery } from "@/lib/features/analytics/analyticsApi";

type Props = {
  isDashboard?: boolean;
};

const OrderAnalytics: React.FC<Props> = ({ isDashboard = false }) => {
  const { data, isLoading, isError } = useGetOrderAnalyticsQuery({});

  /**
   * Transform `data.orders.last12Months` into [{ name, count }]
   * Fallback to empty array if data shape is unexpected
   */
  const analyticsData = useMemo(() => {
    if (!data || !Array.isArray(data.orders?.last12Months)) {
      return [];
    }
    return data.orders.last12Months.map((item: any) => ({
      name: item.month,
      count: item.count,
    }));
  }, [data]);

  // Calculate totals and averages
  const totalOrders = useMemo(
    () =>
      analyticsData.reduce(
        (sum: number, item: { name: string; count: number }) =>
          sum + item.count,
        0
      ),
    [analyticsData]
  );
  const averageOrders = useMemo(
    () =>
      analyticsData.length ? Math.round(totalOrders / analyticsData.length) : 0,
    [totalOrders, analyticsData]
  );
  const peakOrderPeriod = useMemo(
    () =>
      analyticsData.length
        ? analyticsData.reduce(
            (
              max: { name: string; count: number },
              item: { name: string; count: number }
            ) => (item.count > max.count ? item : max),
            analyticsData[0]
          )
        : { name: "N/A", count: 0 },
    [analyticsData]
  );

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
          Error loading order analytics data. Please try again later.
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
              Order Analytics
            </h1>
            <p className="mt-1 text-sm text-gray-400">
              Overview of order trends across periods
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
        {isDashboard && (
          <h2 className="text-xl font-medium text-white mb-4">Order Trends</h2>
        )}

        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
          {!isDashboard && (
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-white">
                Order Performance
              </h2>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-teal-900/50 text-teal-300 border border-teal-700">
                Period Analysis
              </span>
            </div>
          )}

          <div className={`${isDashboard ? "h-64" : "h-80"}`}>
            {analyticsData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-gray-400">
                No order data available
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={analyticsData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: isDashboard ? 0 : 20,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#374151"
                    opacity={0.6}
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#D1D5DB", fontSize: isDashboard ? 10 : 12 }}
                    tickLine={{ stroke: "#4B5563" }}
                    axisLine={{ stroke: "#4B5563" }}
                    padding={{ left: 10, right: 10 }}
                  />
                  <YAxis
                    tick={{ fill: "#D1D5DB", fontSize: isDashboard ? 10 : 12 }}
                    tickLine={{ stroke: "#4B5563" }}
                    axisLine={{ stroke: "#4B5563" }}
                    tickFormatter={(v) => v}
                    padding={{ top: 10 }}
                    width={isDashboard ? 30 : 40}
                  />
                  <Tooltip />
                  {!isDashboard && <Legend verticalAlign="top" height={36} />}

                  {/* Avg line */}
                  <ReferenceLine
                    y={averageOrders}
                    stroke="#5EEAD4"
                    strokeDasharray="3 3"
                  >
                    <Label
                      value="Avg"
                      position="right"
                      fill="#2DD4BF"
                      fontSize={10}
                    />
                  </ReferenceLine>

                  <Line
                    type="monotone"
                    name="Orders"
                    dataKey="count"
                    stroke="#14B8A6"
                    strokeWidth={3}
                    dot={{
                      r: 6,
                      strokeWidth: 2,
                      stroke: "#2DD4BF",
                      fill: "#0F766E",
                    }}
                    activeDot={{
                      r: 8,
                      strokeWidth: 2,
                      stroke: "#5EEAD4",
                      fill: "#14B8A6",
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {!isDashboard && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {/* Total Orders */}
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
              <h3 className="text-sm font-medium text-gray-400">
                Total Orders
              </h3>
              <p className="mt-2 text-3xl font-semibold text-white">
                {totalOrders}
              </p>
              <div className="mt-1 text-xs font-medium text-teal-400">
                ⓘ All recorded periods
              </div>
            </div>
            {/* Peak Period */}
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
              <h3 className="text-sm font-medium text-gray-400">Peak Period</h3>
              <p className="mt-2 text-3xl font-semibold text-white">
                {peakOrderPeriod.name}
              </p>
              <div className="mt-1 text-xs font-medium text-teal-400">
                ↑ {peakOrderPeriod.count} orders
              </div>
            </div>
            {/* Average Orders */}
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
              <h3 className="text-sm font-medium text-gray-400">
                Average Orders
              </h3>
              <p className="mt-2 text-3xl font-semibold text-white">
                {averageOrders}
              </p>
              <div className="mt-1 text-xs font-medium text-teal-400">
                ⓘ Per period
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderAnalytics;
