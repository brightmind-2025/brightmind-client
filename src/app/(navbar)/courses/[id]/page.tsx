"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store/store";
import { fetchCourseById } from "@/lib/thunks/courseThunks";
import { useParams } from "next/navigation";
import Image from "next/image";

const CourseDetailsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  const { currentCourse, loading, error } = useSelector(
    (state: RootState) => state.courses
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchCourseById(id as string));
    }
  }, [dispatch, id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#1d3061]">
        <p className="text-lg text-gray-700 dark:text-gray-300">Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#1d3061]">
        <p className="text-red-600 dark:text-red-400">Error: {error}</p>
      </div>
    );
  if (!currentCourse)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#1d3061]">
        <p className="text-gray-700 dark:text-gray-300">Course not found.</p>
      </div>
    );

  return (
    <div className=" p-8">
      
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#2a3b75] rounded-3xl shadow-lg p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {currentCourse.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{currentCourse.description}</p>

        
        <div className="space-y-6">
          {currentCourse.courseData?.length > 0 ? (
            currentCourse.courseData.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-[#2a3b75] rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-lg"
              >
               
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  {item.description}
                </p>

                <div className="mt-3 space-y-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Section:</span> {item.videoSection}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Length:</span> {item.videoLength} minutes
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Player:</span> {item.videoPlayer}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Suggestion:</span> {item.suggestion}
                  </p>
                </div>

                <a
                  href={item.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 px-4 py-2 bg-blue-600 dark:bg-yellow-500 text-white rounded-full font-medium text-sm hover:bg-blue-700 dark:hover:bg-yellow-600 transition-colors duration-200"
                >
                  Watch Video
                </a>

          
                {item.videoThumbnail && (
                  <div className="mt-4">
                    <Image
                      src={item.videoThumbnail}
                      alt="Video Thumbnail"
                      width={400}
                      height={250}
                      className="rounded-lg object-cover w-full h-auto"
                    />
                  </div>
                )}

                {item.links?.length > 0 && (
                  <div className="mt-4">
                    <p className="font-semibold text-gray-700 dark:text-gray-300">
                      Related Links:
                    </p>
                    <ul className="list-disc ml-5 space-y-1">
                      {item.links.map((link, idx) => (
                        <li key={idx}>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-yellow-400 underline hover:text-blue-700 dark:hover:text-yellow-500 transition-colors duration-200"
                          >
                            {link.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

               
                {item.questions?.length > 0 && (
                  <div className="mt-4">
                    <p className="font-semibold text-gray-700 dark:text-gray-300">
                      Questions:
                    </p>
                    <ul className="list-disc ml-5 text-sm space-y-1">
                    {item.questions.map((q: { question: string }, idx: number) => (
                      <li key={idx}>{q.question}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-700 dark:text-gray-300">No course content available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;