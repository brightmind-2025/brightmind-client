import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import {
  AiOutlineUnorderedList,
  AiFillStar,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import { FaUserGraduate, FaRegClock } from "react-icons/fa";
import { BsBarChart, BsLaptop } from "react-icons/bs";
import { formatDistanceToNow } from "date-fns";

type Props = { item: any; isProfile?: boolean };

const CourseCard: FC<Props> = ({ item, isProfile }) => {
  const discount = item.estimatedPrice
    ? Math.round(
        ((item.estimatedPrice - item.price) / item.estimatedPrice) * 100
      )
    : 0;

  const totalMin = item.courseData?.reduce(
    (sum: number, s: any) => sum + (s.videoLength || 0),
    0
  );
  const fmt = (m: number) => {
    const h = Math.floor(m / 60);
    const mm = m % 60;
    return h ? `${h}h ${mm}m` : `${mm}m`;
  };
  const qs =
    item?.courseData?.flatMap((section: any) => section?.questions || [])
      .length || 0;
  const updated = item.updatedAt
    ? formatDistanceToNow(new Date(item.updatedAt), { addSuffix: true })
    : "";

  return (
    <Link
      href={!isProfile ? `/course/${item._id}` : `/course-access/${item._id}`}
      className="block group"
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
        {/* Image */}
        <div className="relative h-44 md:h-48 overflow-hidden">
          <Image
            src={item.thumbnail?.url || "/default-course.png"}
            alt={item.name}
            layout="fill"
            objectFit="cover"
            className="transform transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-2 left-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded">
            {item.price === 0 ? "Free" : `$${item.price}`}
          </div>
          {discount > 0 && (
            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
              {discount}% off
            </div>
          )}
        </div>
        <div className="p-4 space-y-1">
          <h3 className="font-semibold text-md dark:text-gray-100 line-clamp-2">
            {item.name}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
            {item.description}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-300">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <AiFillStar
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(item.ratings)
                      ? "text-yellow-400"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                />
              ))}
              <span className="ml-1">{(item.ratings || 0).toFixed(1)}</span>
            </div>
            <div className="flex items-center">
              <FaUserGraduate className="w-3 h-3 mr-1" />
              <span>{item.purchased || 0}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-300">
            <div className="flex items-center">
              <AiOutlineUnorderedList className="w-4 h-4 mr-1 text-purple-500" />
              <span>{item.courseData?.length || 0}</span>
            </div>
            <div className="flex items-center">
              <FaRegClock className="w-4 h-4 mr-1 text-purple-500" />
              <span>{fmt(totalMin || 0)}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <BsBarChart
                className={`w-4 h-4 mr-2 ${
                  item?.level === "Beginner"
                    ? "text-green-500"
                    : item?.level === "Intermediate"
                    ? "text-blue-500"
                    : item?.level === "Expert"
                    ? "text-red-500"
                    : "text-purple-500"
                }`}
              />
              <span
                className={`${
                  item?.level === "Beginner"
                    ? "text-green-600 dark:text-green-400"
                    : item?.level === "Intermediate"
                    ? "text-blue-600 dark:text-blue-400"
                    : item?.level === "Expert"
                    ? "text-red-600 dark:text-red-400"
                    : ""
                }`}
              >
                {item?.level}
              </span>
            </div>
            <div className="flex items-center">
              <AiOutlineQuestionCircle className="w-4 h-4 mr-1 text-purple-500" />
              <span>{qs}</span>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900 px-4 py-2 flex items-center justify-between text-xs border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <BsLaptop className="w-4 h-4 mr-1 text-gray-500" />
            <span>Online</span>
          </div>
          <span className="hover:underline">
            {!isProfile ? "View Course" : "Continue"}
          </span>
          <span className="text-gray-500">
            {updated && `Updated ${updated}`}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
