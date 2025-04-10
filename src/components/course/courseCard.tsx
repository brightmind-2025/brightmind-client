import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Course } from "@/types/types";
import Stars from "../ui/stars";

interface Props {
  course: Course;
}

const CourseCard: React.FC<Props> = ({ course }) => {
  return (
    <Link href={`/courses/${course._id}`}>
      <div className="w-full max-w-[288px] bg-white border-gray-400 border dark:bg-[#274d8e] rounded-3xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
        <div className="relative w-full h-56 overflow-hidden rounded-t-3xl">
          <Image
            src={
              course.thumbnail?.url ||
              "https://i.pinimg.com/736x/c5/a0/03/c5a00375d647591a14dd36e31151acb1.jpg"
            }
            alt={course.name}
            layout="fill"
            objectFit="cover"
            className="rounded-t-3xl transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent dark:hidden"></div>
        </div>

        <div className="p-5 space-y-3">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white line-clamp-1">
            {course.name}
          </h2>

          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {course.description}
          </p>

          <div className="flex items-center justify-between">
            <Stars rating={course.ratings ?? 0} />
            <span className="text-sm text-gray-500">
              ({(course.ratings ?? 0).toFixed(1)})
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-blue-600 dark:text-green-400 font-semibold text-lg">
              ₹{course.price}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-300 flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              {course.courseData.length} Lectures
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
