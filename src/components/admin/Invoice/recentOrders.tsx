import React, { useMemo } from "react";
import { FiPackage, FiChevronRight, FiClock } from "react-icons/fi";
import { useGetAllOrdersQuery } from "@/lib/features/order/orderApi";
import { useGetAllUsersQuery } from "@/lib/features/user/userApi";
import { useGetAllCoursesQuery } from "@/lib/features/courses/courseApi";
import Loader from "@/components/Loader/Loader";

type Props = {
  limit?: number;
};

const RecentOrders: React.FC<Props> = ({ limit = 5 }) => {
  const { data: orderData, isLoading: ordersLoading } = useGetAllOrdersQuery(
    {}
  );
  const { data: usersData } = useGetAllUsersQuery({});
  const { data: coursesData } = useGetAllCoursesQuery({});

  const recentOrders = useMemo(() => {
    if (!orderData?.orders) return [];

    // Sort by latest first
    const sortedOrders = [...orderData.orders].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Take only the specified limit
    return sortedOrders.slice(0, limit);
  }, [orderData, limit]);

  const enrichedOrders = useMemo(() => {
    return recentOrders.map((order) => {
      const user = usersData?.users.find((u: any) => u._id === order.userId);
      const course = coursesData?.courses.find(
        (c: any) => c._id === order.courseId
      );
      return { ...order, user, course };
    });
  }, [recentOrders, usersData, coursesData]);

  const formatDate = (date: string) => {
    const orderDate = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - orderDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return orderDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (ordersLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (enrichedOrders.length === 0) {
    return (
      <div className="bg-gray-800/70 rounded-lg p-6 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-gray-700 rounded-full mb-3">
          <FiPackage className="h-6 w-6 text-gray-400" />
        </div>
        <h3 className="text-white text-sm font-medium">No recent orders</h3>
        <p className="text-gray-400 text-xs mt-1">
          New orders will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/70 rounded-lg shadow-md border border-gray-700 overflow-hidden">
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-white text-sm font-medium flex items-center">
          <FiPackage className="mr-2 text-indigo-400" />
          Recent Orders
        </h2>
        <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded-full">
          {enrichedOrders.length}
        </span>
      </div>

      <ul className="divide-y divide-gray-700">
        {enrichedOrders.map((order) => (
          <li
            key={order._id}
            className="hover:bg-gray-750 transition-colors duration-150"
          >
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center min-w-0">
                <div className="flex-shrink-0 h-10 w-10 bg-indigo-900/30 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-indigo-400 font-bold text-xs">
                    {(order.course?.name || "").substring(0, 2).toUpperCase()}
                  </span>
                </div>
                <div className="min-w-0">
                  <p
                    className="text-sm font-medium text-white truncate"
                    title={order.course?.name || "Unknown Course"}
                  >
                    {order.course?.name || "Unknown Course"}
                  </p>
                  <p
                    className="text-xs text-gray-400 truncate"
                    title={order.user?.name || "Unknown User"}
                  >
                    by {order.user?.name || "Unknown User"}
                  </p>
                </div>
              </div>

              <div className="flex items-center ml-4">
                <div className="text-right mr-4">
                  <p className="text-sm font-medium text-white">
                    {order.course?.price
                      ? formatCurrency(order.course.price)
                      : "N/A"}
                  </p>
                  <p className="text-xs text-gray-400 flex items-center justify-end">
                    <FiClock className="mr-1" size={12} />
                    {formatDate(order.createdAt)}
                  </p>
                </div>
                <FiChevronRight className="text-gray-500" />
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="p-3 border-t border-gray-700 bg-gray-800/70">
        <a
          href="/admin/invoices"
          className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center justify-center"
        >
          View all orders
          <FiChevronRight className="ml-1" size={14} />
        </a>
      </div>
    </div>
  );
};

export default RecentOrders;
