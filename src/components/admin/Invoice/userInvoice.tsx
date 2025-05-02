import React, { useState, useMemo } from "react";
import { useGetAllOrdersQuery } from "@/lib/features/order/orderApi";
import { useGetAllUsersQuery } from "@/lib/features/user/userApi";
import { useGetAllCoursesQuery } from "@/lib/features/courses/courseApi";
import Loader from "@/components/Loader/Loader";
import {
  FiDownload,
  FiSearch,
  FiFileText,
  FiCalendar,
  FiDollarSign,
  FiUser,
  FiBook,
} from "react-icons/fi";

type Props = {};

const UserInvoices: React.FC<Props> = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  const {
    data: orderData,
    isLoading: ordersLoading,
    error: ordersError,
  } = useGetAllOrdersQuery({});
  const { data: usersData } = useGetAllUsersQuery({});
  const { data: coursesData } = useGetAllCoursesQuery({});

  const filteredOrders = useMemo(() => {
    if (!orderData?.orders) return [];
    let list = [...orderData.orders];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      list = list.filter(
        (o) =>
          o._id.toLowerCase().includes(term) ||
          o.courseId.toLowerCase().includes(term)
      );
    }
    if (sortBy === "latest") {
      list.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else {
      list.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }
    return list;
  }, [orderData, searchTerm, sortBy]);

  const enrichedOrders = useMemo(() => {
    return filteredOrders.map((order) => {
      const user = usersData?.users.find((u: any) => u._id === order.userId);
      const course = coursesData?.courses.find(
        (c: any) => c._id === order.courseId
      );
      return { ...order, user, course };
    });
  }, [filteredOrders, usersData, coursesData]);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const handleDownloadInvoice = (order: any) => {
    // Create a new window for printing the invoice instead of using jsPDF
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Please allow popups for this website to download invoices");
      return;
    }

    const coursePrice = order.course?.price || 0;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice #${order._id}</title>
        <meta charset="utf-8">
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 40px;
            color: #333;
          }
          .invoice-container {
            max-width: 800px;
            margin: 0 auto;
            border: 1px solid #eee;
            padding: 30px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
          }
          .invoice-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
          }
          .invoice-title {
            font-size: 24px;
            font-weight: bold;
            color: #5a67d8;
          }
          .invoice-details {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
          }
          .invoice-details-left, .invoice-details-right {
            flex: 1;
          }
          .invoice-details-title {
            font-weight: bold;
            margin-bottom: 8px;
            color: #5a67d8;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            padding: 12px 15px;
            border-bottom: 1px solid #eee;
            text-align: left;
          }
          th {
            background-color: #f8f9fa;
            font-weight: bold;
          }
          .total-row {
            font-weight: bold;
          }
          .text-right {
            text-align: right;
          }
          .footer {
            margin-top: 30px;
            text-align: center;
            color: #777;
            font-size: 14px;
          }
          @media print {
            .no-print {
              display: none;
            }
            body {
              padding: 0;
            }
            .invoice-container {
              box-shadow: none;
              border: none;
            }
          }
          .print-button {
            background-color: #5a67d8;
            color: white;
            border: none;
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
            border-radius: 4px;
            margin-top: 20px;
          }
          .print-button:hover {
            background-color: #4c51bf;
          }
        </style>
      </head>
      <body>
        <div class="invoice-container">
          <div class="invoice-header">
            <div>
              <div class="invoice-title">INVOICE</div>
              <div>Learning Platform</div>
            </div>
            <div class="text-right">
              <div><strong>Invoice #:</strong> ${order._id}</div>
              <div><strong>Date:</strong> ${formatDate(order.createdAt)}</div>
            </div>
          </div>
          
          <div class="invoice-details">
            <div class="invoice-details-left">
              <div class="invoice-details-title">Billed To:</div>
              <div>${order.user?.name || "N/A"}</div>
              <div>${order.user?.email || "N/A"}</div>
            </div>
            <div class="invoice-details-right">
              <div class="invoice-details-title">Payment Information:</div>
              <div><strong>Method:</strong> Credit Card</div>
              <div><strong>Status:</strong> Completed</div>
            </div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th class="text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${order.course?.name || "Course"} - Full Access</td>
                <td class="text-right">${formatCurrency(coursePrice)}</td>
              </tr>
              <tr class="total-row">
                <td>Total</td>
                <td class="text-right">${formatCurrency(coursePrice)}</td>
              </tr>
            </tbody>
          </table>
          
          <div class="footer">
            <p>Thank you for your purchase! If you have any questions about this invoice, please contact support.</p>
          </div>
          
          <div class="no-print" style="text-align: center;">
            <button class="print-button" onclick="window.print(); setTimeout(function(){ window.close(); }, 500);">
              Print or Save as PDF
            </button>
          </div>
        </div>
      </body>
      </html>
    `);

    printWindow.document.close();

    // Let the content render before triggering print
    setTimeout(() => {
      printWindow.focus();
    }, 250);
  };

  if (ordersLoading) {
    return (
      <div className="h-64 flex items-center justify-center bg-gray-900">
        <Loader />
      </div>
    );
  }

  if (ordersError) {
    return (
      <div className="h-64 flex items-center justify-center bg-gray-900">
        <div className="bg-red-900/20 text-red-400 p-4 rounded-lg border border-red-800">
          Error loading invoices.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">
              Invoices & Payments
            </h1>
            <p className="text-gray-400">
              View and download your purchase records
            </p>
          </div>
          <div className="hidden md:flex items-center bg-gray-800 rounded-lg p-2 text-gray-400 text-sm">
            <FiFileText className="mr-2" />
            {enrichedOrders.length}{" "}
            {enrichedOrders.length === 1 ? "Invoice" : "Invoices"}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 mb-6 flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FiSearch className="text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search by order ID or course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg block w-full pl-10 p-2.5 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <label className="text-sm text-gray-400 whitespace-nowrap">
              Sort by:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg p-2.5 flex-grow sm:flex-grow-0 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {enrichedOrders.length === 0 ? (
          <div className="bg-gray-800 rounded-lg shadow-md p-12 text-center">
            <div className="inline-flex items-center justify-center p-4 bg-gray-700 rounded-full mb-4">
              <FiFileText className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="mt-2 text-lg font-semibold text-white">
              No invoices found
            </h3>
            <p className="mt-1 text-gray-400 max-w-md mx-auto">
              {searchTerm
                ? "Try adjusting your search terms or clear the filter."
                : "Your purchase history will appear here once you've enrolled in a course."}
            </p>
          </div>
        ) : (
          <>
            <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Course
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {enrichedOrders.map((order) => (
                      <tr
                        key={order._id}
                        className="hover:bg-gray-750 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-300">
                          #{order._id.substring(0, 8)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 bg-indigo-900/30 rounded-md flex items-center justify-center mr-3">
                              <FiBook className="text-indigo-400" />
                            </div>
                            <div className="truncate max-w-xs">
                              {order.course?.name || "Unknown Course"}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 bg-indigo-900/30 rounded-md flex items-center justify-center mr-3">
                              <FiUser className="text-indigo-400" />
                            </div>
                            <div className="truncate max-w-xs">
                              {order.user?.name || "Unknown User"}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          <div className="flex items-center">
                            <FiCalendar className="mr-2 text-gray-500" />
                            {formatDate(order.createdAt)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          <div className="flex items-center">
                            <FiDollarSign className="mr-1 text-gray-500" />
                            {order.course?.price
                              ? formatCurrency(order.course.price)
                              : "N/A"}
                          </div>
                        </td>
                       
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleDownloadInvoice(order)}
                            className="inline-flex items-center px-3 py-2 border border-indigo-700 text-xs font-medium rounded-md text-indigo-300 bg-indigo-900/30 hover:bg-indigo-900/50 transition-colors duration-150"
                            aria-label={`Download invoice for ${order.course?.name}`}
                          >
                            <FiDownload className="mr-1.5" />
                            Invoice
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800 rounded-lg shadow-md border border-gray-700 p-5 flex items-center transition-transform duration-200 hover:transform hover:scale-105">
                <div className="bg-indigo-900/30 p-3 rounded-lg mr-4">
                  <FiFileText className="text-xl text-indigo-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wide">
                    Total Purchases
                  </p>
                  <h3 className="text-white text-xl font-bold">
                    {enrichedOrders.length}
                  </h3>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg shadow-md border border-gray-700 p-5 flex items-center transition-transform duration-200 hover:transform hover:scale-105">
                <div className="bg-teal-900/30 p-3 rounded-lg mr-4">
                  <FiCalendar className="text-xl text-teal-400" />
                </div>

                <div>
                  <p className="text-gray-400 text-xs">Latest Purchase</p>
                  <h3 className="text-white text-xl font-bold">
                    {formatDate(enrichedOrders[0].createdAt)}
                  </h3>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg shadow-md border border-gray-700 p-5 flex items-center transition-transform duration-200 hover:transform hover:scale-105">
                <div className="bg-emerald-900/30 p-3 rounded-lg mr-4">
                  <FiDollarSign className="text-xl text-emerald-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wide">
                    Payment Method
                  </p>
                  <h3 className="text-white text-xl font-bold">Credit Card</h3>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserInvoices;
