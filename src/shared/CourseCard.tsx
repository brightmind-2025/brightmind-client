import Ratings from "@/utils/Rating";

import React from "react";

function CourseCard() {
  return (
    <div className="w-64 bg-[#1E3A8A] shadow-[0px_0px_15px_rgba(0,0,0,0.2)] p-6 space-y-4 relative overflow-hidden rounded-lg">
    
      <div className="flex justify-end">
        <div className="w-10 h-10 bg-[#4F46E5] rounded-full flex items-center justify-center">
      
        </div>
      </div>

    
      <h1 className="font-bold text-xl text-white">Course Title</h1>

     
      <div className="w-full h-32 bg-gray-700 rounded-md overflow-hidden border-2 border-blue-500">
      
      </div>

      <p className="text-sm text-gray-300 leading-6">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse fuga
        adipisicing elit Lorem ipsum dolor sit.
      </p>

      <div className="flex items-center space-x-2">
        <Ratings rating={4} />
        <span className="text-xs text-gray-400">(4.0)</span>
      </div>
    </div>
  );
}

export default CourseCard;