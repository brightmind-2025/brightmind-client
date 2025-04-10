"use client";

import { useState } from "react";

const categories = [
  "All",
  "Programming",
  "Digital Marketing",
  "Graphic Design",
  "Machine Learning",
  "AI Development",
  "Data Science",
  "Cybersecurity",
  "UI/UX Design",
  "Cloud Computing",
  "Blockchain",
 

];

const CategoryFilter = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="flex gap-3 p-4 overflow-x-auto scrollbar-hide">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveCategory(category)}
          className={`px-5 py-2 rounded-full font-medium text-sm transition-all duration-200 shadow-md focus:outline-none whitespace-nowrap ${
            activeCategory === category
              ? "bg-gradient-to-r from-blue-400 to-cyan-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
