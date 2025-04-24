import Ratings from "@/utils/Rating";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";

type Props = {
  item: any;
  isProfile?: boolean;
};

const CourseCard: FC<Props> = ({ item, isProfile }) => {
  return (
    <Link
      href={!isProfile ? `/course/${item._id}` : `/course-access/${item._id}`}
    >
      <div
        className="w-full min-h-[35vh] p-3 rounded-lg shadow-sm dark:shadow-inner 
  backdrop-blur border border-[#00000015] dark:border-[#ffffff1d] 
  dark:bg-slate-500 dark:bg-opacity-20"
      >
        <Image
          src={item.thumbnail?.url || "/default-course.png"} // fallback if thumbnail is undefined
          width={500}
          height={300}
          objectFit="contain"
          className="rounded w-full"
          alt={item.name || "Course Thumbnail"}
        />
        <br />

        <h1 className="font-Poppins text-[16px] text-black dark:text-white">
          {item?.name}
        </h1>

        <div className="w-full flex items-center justify-between pt-2">
          <div className="relative bottom-5">
            <Ratings rating={item?.ratings} />
          </div>
          <h5
            className={`text-black dark:text-white ${
              isProfile ? "hidden 800px:inline" : ""
            }`}
          >
            {item?.purchased} Students
          </h5>
        </div>
        <div className="w-full flex items-center justify-between pt-3">
          <div className="flex">
            <h3 className="text-black dark:text-white">
              {item?.price === 0 ? "Free" : `${item?.price}$`}
            </h3>
            <h5 className="pl-3 text-[14px] mt-[-5px] line-through opacity-80 text-black dark:text-white">
              {item?.estimatedPrice}$
            </h5>
          </div>
          <div className="flex items-center pb-3">
            <AiOutlineUnorderedList
              size={20}
              className="text-black dark:text-white"
            />
            <h5 className="pl-2 text-black dark:text-white">
              {item.courseData?.length} Lectures
            </h5>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
