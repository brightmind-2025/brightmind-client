import CoursePlayer from "@/utils/CoursePlayer";
import Ratings from "@/utils/Ratings";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { IoCheckmarkDoneOutline, IoCloseOutline } from "react-icons/io5";
import { FiClock, FiUsers, FiAward, FiDownload } from "react-icons/fi";
import { BsLightningCharge, BsBookmark, BsShare } from "react-icons/bs";
import { HiOutlineChevronDown } from "react-icons/hi";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import CourseContentList from "./CourseContentList";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../payment/CheckOutForm";
import toast from "react-hot-toast";

type Props = {
  data: any;
  stripePromise?: any;
  clientSecret: string;
};

const CourseDetails = ({ data, stripePromise, clientSecret }: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [expanded, setExpanded] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const discountPercentage =
    data?.estimatedPrice > 0
      ? ((data?.estimatedPrice - data.price) / data?.estimatedPrice) * 100
      : 0;

  const discountPercentagePrice = discountPercentage.toFixed(0);

  const isPurchased =
    user && user?.courses?.find((item: any) => item._id === data._id);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsSticky(offset > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleOrder = (e: any) => {
    if (user) {
      setConfirmOpen(true);
    } else {
      toast.error("Please login to purchase the course");
    }
  };

  const handleConfirmPurchase = () => {
    setConfirmOpen(false);
    setOpen(true);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    // Show a temporary notification
    const notification = document.getElementById("bookmark-notification");
    if (notification) {
      notification.classList.remove("opacity-0");
      notification.classList.add("opacity-100");
      setTimeout(() => {
        notification.classList.remove("opacity-100");
        notification.classList.add("opacity-0");
      }, 2000);
    }
  };

  const handleShare = () => {
    setShowShareOptions(!showShareOptions);
  };

  const shareOptions = [
    { name: "Twitter", icon: "twitter" },
    { name: "Facebook", icon: "facebook" },
    { name: "LinkedIn", icon: "linkedin" },
    { name: "Copy Link", icon: "link" },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareOptions(false);

    // Show a temporary notification
    const notification = document.getElementById("copy-notification");
    if (notification) {
      notification.classList.remove("opacity-0");
      notification.classList.add("opacity-100");
      setTimeout(() => {
        notification.classList.remove("opacity-100");
        notification.classList.add("opacity-0");
      }, 2000);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* Notifications */}
      <div
        id="bookmark-notification"
        className="fixed top-5 right-5 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg opacity-0 transition-opacity duration-300 z-50"
      >
        {bookmarked ? "Course saved!" : "Course removed from saved!"}
      </div>

      <div
        id="copy-notification"
        className="fixed top-5 right-5 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg opacity-0 transition-opacity duration-300 z-50"
      >
        Link copied to clipboard!
      </div>

      {/* Hero Section with Course Video and Purchase Card */}
      <div className="w-full bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 py-12 transition-all duration-300">
        <div className="w-[90%] 800px:w-[90%] m-auto">
          <div className="w-full flex flex-col 800px:flex-row justify-between gap-8">
            {/* Left: Course Info */}
            <div className="w-full 800px:w-[60%] animate-fadeIn">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                {data.name}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-4">
                <div className="flex items-center">
                  <Ratings rating={data.ratings} />
                  <span className="ml-2 text-gray-700 dark:text-gray-300 transition-colors">
                    {Number.isInteger(data?.ratings)
                      ? data?.ratings.toFixed(1)
                      : data?.ratings.toFixed(2)}
                  </span>
                  <span className="ml-2 text-gray-600 dark:text-gray-400 transition-colors">
                    ({data.reviews?.length} Reviews)
                  </span>
                </div>

                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 transition-colors">
                  <FiUsers className="mr-1" />
                  <span>{data.purchased} Students enrolled</span>
                </div>
              </div>

              <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 transition-colors line-clamp-2">
                {data.description.split(".")[0]}.
              </p>

              <div className="mt-6 hidden 800px:flex gap-3 relative">
                <button
                  className={`flex items-center gap-2 px-4 py-2 border rounded-full transition-all duration-300 ${
                    bookmarked
                      ? "border-blue-400 bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-400"
                      : "border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  onClick={handleBookmark}
                >
                  <BsBookmark
                    className={
                      bookmarked ? "text-blue-600 dark:text-blue-400" : ""
                    }
                  />
                  {bookmarked ? "Saved" : "Save"}
                </button>

                <div className="relative">
                  <button
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                    onClick={handleShare}
                  >
                    <BsShare /> Share
                  </button>

                  {showShareOptions && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden z-10 animate-fadeIn">
                      {shareOptions.map((option, index) => (
                        <button
                          key={index}
                          className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors"
                          onClick={
                            option.name === "Copy Link"
                              ? copyToClipboard
                              : undefined
                          }
                        >
                          <span className="w-5 h-5 flex items-center justify-center">
                            {/* Simple placeholder icons */}
                            {option.icon === "twitter" && "𝕏"}
                            {option.icon === "facebook" && "f"}
                            {option.icon === "linkedin" && "in"}
                            {option.icon === "link" && "🔗"}
                          </span>
                          {option.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Purchase Card */}
            <div className="w-full 800px:w-[40%] 800px:max-w-[400px] animate-fadeIn">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-video w-full group">
                  <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />
                </div>

                <div className="p-6">
                  <div className="flex items-baseline gap-3 mb-4">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors">
                      {data.price === 0 ? "Free" : `$${data.price}`}
                    </h1>
                    {data.price > 0 && (
                      <>
                        <h5 className="text-xl line-through opacity-70 text-gray-500 dark:text-gray-400 transition-colors">
                          ${data.estimatedPrice}
                        </h5>
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 text-sm font-medium rounded transition-colors">
                          {discountPercentagePrice}% Off
                        </span>
                      </>
                    )}
                  </div>

                  {isPurchased ? (
                    <Link
                      href={`/course-access/${data._id}`}
                      className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-center rounded-lg font-medium text-lg transition-all duration-300 flex items-center justify-center gap-2 transform hover:translate-y-[-2px]"
                    >
                      <FiAward /> Continue Learning
                    </Link>
                  ) : (
                    <button
                      onClick={handleOrder}
                      className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-center rounded-lg font-medium text-lg transition-all duration-300 flex items-center justify-center gap-2 transform hover:translate-y-[-2px] hover:shadow-lg"
                    >
                      <BsLightningCharge /> Buy Now - ${data.price}
                    </button>
                  )}

                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 transition-colors">
                      <FiClock className="text-blue-500" />
                      <span>Full lifetime access</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 transition-colors">
                      <FiDownload className="text-blue-500" />
                      <span>Source code included</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 transition-colors">
                      <FiAward className="text-blue-500" />
                      <span>Certificate of completion</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 transition-colors">
                      <IoCheckmarkDoneOutline className="text-blue-500" />
                      <span>Premium Support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Purchase Bar for Mobile */}
      {!isPurchased && (
        <div
          className={`fixed bottom-0 left-0 w-full bg-white dark:bg-gray-800 shadow-lg border-t border-gray-200 dark:border-gray-700 py-3 px-4 flex items-center justify-between 800px:hidden z-20 transition-transform duration-300 ${
            isSticky ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div>
            <div className="font-bold text-gray-900 dark:text-white transition-colors">
              {data.price === 0 ? "Free" : `$${data.price}`}
            </div>
            {data.price > 0 && (
              <div className="text-sm line-through text-gray-500 dark:text-gray-400 transition-colors">
                ${data.estimatedPrice}
              </div>
            )}
          </div>
          <button
            onClick={handleOrder}
            className="py-2 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-center rounded-lg font-medium transition-all duration-300 flex items-center"
          >
            Buy Now
          </button>
        </div>
      )}

      {/* Course Content Tabs */}
      <div className="w-[90%] 800px:w-[90%] m-auto mt-8">
        <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto hide-scrollbar">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-6 py-3 font-medium text-sm transition-colors duration-300 ${
              activeTab === "overview"
                ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("curriculum")}
            className={`px-6 py-3 font-medium text-sm transition-colors duration-300 ${
              activeTab === "curriculum"
                ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Curriculum
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-6 py-3 font-medium text-sm transition-colors duration-300 ${
              activeTab === "reviews"
                ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Reviews ({data?.reviews?.length})
          </button>
        </div>

        <div className="py-8">
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 800px:grid-cols-3 gap-8 animate-fadeIn">
              <div className="800px:col-span-2">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white transition-colors">
                    What you'll learn
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {data.benefits?.map((item: any, index: number) => (
                      <div className="flex items-start gap-2 group" key={index}>
                        <div className="mt-1 text-green-500 transition-transform duration-300 group-hover:scale-110">
                          <IoCheckmarkDoneOutline size={18} />
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 transition-colors">
                          {item.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white transition-colors">
                    Course Description
                  </h2>
                  <div className="prose prose-gray dark:prose-invert max-w-none">
                    <p
                      className={`text-gray-700 dark:text-gray-300 transition-colors whitespace-pre-line ${
                        expanded ? "" : "line-clamp-6"
                      }`}
                    >
                      {data.description}
                    </p>
                    {data.description.length > 500 && (
                      <button
                        onClick={() => setExpanded(!expanded)}
                        className="mt-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center gap-1 transition-colors"
                      >
                        {expanded ? "Show less" : "Show more"}
                        <HiOutlineChevronDown
                          className={`transform transition-transform duration-300 ${
                            expanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="800px:col-span-1">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm transition-colors hover:shadow-md duration-300">
                  <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white transition-colors">
                    Prerequisites
                  </h2>
                  <div className="space-y-3">
                    {data.prerequisites?.map((item: any, index: number) => (
                      <div className="flex items-start gap-2 group" key={index}>
                        <div className="mt-1 text-blue-500 transition-transform duration-300 group-hover:scale-110">
                          <IoCheckmarkDoneOutline size={18} />
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 transition-colors">
                          {item.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "curriculum" && (
            <div className="animate-fadeIn">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white transition-colors">
                Course Curriculum
              </h2>
              <CourseContentList
                data={data?.courseData}
                isDemo={!isPurchased}
              />
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="animate-fadeIn">
              <div className="flex flex-col md:flex-row md:items-center mb-6 gap-6">
                <div className="mr-4">
                  <div className="text-4xl font-bold text-gray-900 dark:text-white transition-colors">
                    {Number.isInteger(data?.ratings)
                      ? data?.ratings.toFixed(1)
                      : data?.ratings.toFixed(2)}
                  </div>
                  <Ratings rating={data?.ratings} />
                  <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors mt-1">
                    {data?.reviews?.length} Reviews
                  </div>
                </div>

                <div className="flex-1">
                  {/* Rating distribution bars */}
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const count =
                        data?.reviews?.filter(
                          (r: any) => Math.round(r.rating) === star
                        ).length || 0;
                      const percentage = data?.reviews?.length
                        ? (count / data.reviews.length) * 100
                        : 0;

                      return (
                        <div className="flex items-center gap-2" key={star}>
                          <div className="flex items-center w-12">
                            <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors">
                              {star}
                            </span>
                            <svg
                              className="w-4 h-4 text-yellow-400 ml-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </div>
                          <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden transition-colors">
                            <div
                              className="h-full bg-yellow-400 transition-all duration-1000 ease-out"
                              style={{
                                width: `${percentage}%`,
                                transition: "width 1s ease-out",
                              }}
                            ></div>
                          </div>
                          <div className="w-9 text-xs text-gray-600 dark:text-gray-400 transition-colors">
                            {count}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {data?.reviews && data.reviews.length > 0 ? (
                  [...data.reviews]
                    .reverse()
                    .map((item: any, index: number) => (
                      <div
                        className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 p-4 rounded-lg transition-colors"
                        key={index}
                      >
                        <div className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-medium transition-transform hover:scale-105">
                              {item.user.name.slice(0, 2).toUpperCase()}
                            </div>
                          </div>

                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="font-medium text-gray-900 dark:text-white transition-colors">
                                {item.user.name}
                              </h4>
                              <div className="text-sm text-gray-500 dark:text-gray-400 transition-colors">
                                • {format(item.createdAt)}
                              </div>
                            </div>

                            <div className="mt-1">
                              <Ratings rating={item.rating} />
                            </div>

                            <p className="mt-2 text-gray-700 dark:text-gray-300 transition-colors">
                              {item.comment}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="text-center py-12 text-gray-500 dark:text-gray-400 transition-colors">
                    No reviews yet. Be the first to review this course!
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Confirmation Dialog */}
        {confirmOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm overflow-auto p-4 flex items-center justify-center">
            <div className="w-[400px] bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-fadeIn transition-colors">
              {/* Header */}
              <div className="w-full flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white transition-colors">
                  Confirm Purchase
                </h2>
                <IoCloseOutline
                  size={28}
                  className="text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors cursor-pointer"
                  onClick={() => setConfirmOpen(false)}
                />
              </div>

              {/* Body */}
              <div className="mb-6">
                <p className="text-gray-700 dark:text-gray-300 transition-colors">
                  Are you sure you want to purchase{" "}
                  <span className="font-medium">{data.name}</span> for{" "}
                  <span className="font-medium">
                    {data.price === 0 ? "Free" : `$${data.price}`}
                  </span>
                  ?
                </p>
                {data.price > 0 && (
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 transition-colors">
                    This action will proceed to the payment page.
                  </p>
                )}
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setConfirmOpen(false)}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmPurchase}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg transition-all duration-300 transform hover:translate-y-[-2px]"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Payment Dialog */}
        {open && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm overflow-auto p-4 flex items-center justify-center">
            <div className="w-[500px] min-h-[500px] bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-fadeIn transition-colors">
              {/* Header with Title and Close Button */}
              <div className="w-full flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white transition-colors">
                  Complete Payment
                </h2>
                <IoCloseOutline
                  size={32}
                  className="text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>

              <div className="w-full">
                {stripePromise && clientSecret && (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckOutForm setOpen={setOpen} data={data} user={user}/>
                  </Elements>
                )}
              </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t flex items-center justify-center text-sm text-gray-500 dark:text-gray-400 transition-colors">
                <svg
                  className="w-4 h-4 mr-2"
                  viewBox="0 0"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 15V17M6 9V7C6 4.79086 7.79086 3 10 3H14C16.2091 3 18 4.79086 18 7V9M6 9C3.79086 9 2 10.7909 2 13V17C2 19.2091 3.79086 21 6 21H18C20.2091 21 22 19.2091 22 17V13C22 10.7909 20.2091 9 18 9M6 9H18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                Secure payment processed by Stripe
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
