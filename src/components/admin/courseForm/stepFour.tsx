"use client";

import { AppDispatch } from "@/lib/store/store";
import { createCourse } from "@/lib/thunks/courseThunks";
import { useDispatch } from "react-redux";
import Image from "next/image";

interface StepFourProps {
  prev: () => void;
  formData: {
    name?: string;
    description?: string;
    price?: number;
    estimatedPrice?: number;
    thumbnail?: File | string | null;
    benefits?: string;
    prerequisites?: string;
    demoUrl?: string;
    videoTitle?: string;
    videoUrl?: string;
    videoLength?: number;
    videoDescription?: string;
    sourceLinks?: { title?: string; url?: string }[];
  };
}

const StepFourPreviewSubmit = ({ prev, formData }: StepFourProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = () => {
    const fd = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach((item, i) =>
            Object.entries(item).forEach(([k, v]) =>
              fd.append(`${key}[${i}][${k}]`, v && typeof v === "object" && v !== null ? JSON.stringify(v) : String(v))
            )
          );
        } else {
          fd.append(key, value as Blob | string);
        }
      }
    });

    dispatch(createCourse(fd));
  };

  const {
    name,
    description,
    price,
    estimatedPrice,
    thumbnail,
    benefits,
    prerequisites,
    demoUrl,
    videoTitle,
    videoUrl,
    videoLength,
    videoDescription,
    sourceLinks = [],
  } = formData;

  const thumbnailUrl =
    thumbnail instanceof File ? URL.createObjectURL(thumbnail) : typeof thumbnail === "string" ? thumbnail : null;

  return (
    <div className="bg-white text-black p-6 rounded-xl shadow-lg max-w-4xl mx-auto">
      
      {thumbnailUrl && (
        <div className="w-full h-64 relative mb-4 rounded overflow-hidden">
          <Image
            src={thumbnailUrl}
            alt="Course Thumbnail"
            layout="fill"
            objectFit="cover"
            className="rounded"
          />
        </div>
      )}

      
      <h2 className="text-2xl font-bold mb-1">{name || "Untitled Course"}</h2>
      <p className="text-gray-600 mb-2">{description || "No description available."}</p>

      <div className="flex flex-wrap gap-6 mb-4 text-lg font-medium">
        <span>Price: ${price || "0"}</span>
        {estimatedPrice && <span>Est. Price: ${estimatedPrice}</span>}
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="font-semibold text-lg mb-2">What You’ll Learn</h3>
          <p className="text-gray-700">{benefits || "Not specified."}</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">Prerequisites</h3>
          <p className="text-gray-700">{prerequisites || "None listed."}</p>
        </div>
      </div>

      {demoUrl && (
        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-2">Demo URL</h3>
          <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            {demoUrl}
          </a>
        </div>
      )}

     
      {videoTitle || videoUrl || videoDescription ? (
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2">Demo Content</h3>
          <p><strong>Title:</strong> {videoTitle || "N/A"}</p>
          <p><strong>URL:</strong> {videoUrl || "N/A"}</p>
          <p><strong>Length:</strong> {videoLength || "N/A"} mins</p>
          <p><strong>Description:</strong> {videoDescription || "N/A"}</p>
        </div>
      ) : null}

      
      {sourceLinks.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2">Source Code Links</h3>
          {sourceLinks.map((link: { title?: string; url?: string }, index: number) => (
            <div key={index} className="mb-1">
              <p className="text-sm text-gray-800">
                <strong>{link.title || `Link ${index + 1}`}:</strong>{" "}
                <a href={link.url} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
                  {link.url || "No URL"}
                </a>
              </p>
            </div>
          ))}
        </div>
      )}

 
      <div className="flex justify-between mt-8">
        <button
          onClick={prev}
          className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
        >
          Prev
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default StepFourPreviewSubmit;
