import Ratings from "@/utils/Ratings";
import Image from "next/image";
import React from "react";

type Props = {
  item: any;
};

const ReviewCard = ({ item }: Props) => {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100 dark:border-gray-700">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image
              src={item.avatar}
              alt={item.name}
              width={40}
              height={40}
              className="rounded-full object-cover ring-1 ring-blue-500 dark:ring-blue-400"
            />
            <div>
              <h5 className="text-base font-bold text-gray-900 dark:text-white">
                {item.name}
              </h5>
              <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
                {item.profession}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <Ratings rating={item.ratings} />
          </div>
        </div>

        <div className="mt-2">
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {item.comment}
          </p>
        </div>

        <div className="mt-3 flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-700">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {item.date || "Recent review"}
          </div>
          <button className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline">
            Helpful
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
