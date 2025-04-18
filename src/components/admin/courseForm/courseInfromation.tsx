// components/CourseInformationForm.tsx
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setCourseInfo } from "@/lib/features/courseSlice";
interface CourseInfoData {
  name: string;
  description: string;
  price: string;
  estimatedPrice?: string;
  tag: string;
  level: string;
  categories: string;
  demoUrl: string;
  thumbnail: File | null;
}

const CourseInformationForm = ({ onNext }: { onNext: () => void }) => {
  const {
    register,
    handleSubmit,
    setValue,
  } = useForm<CourseInfoData>();

  const dispatch = useDispatch();
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const handleThumbnailDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setThumbnail(file);
      setValue("thumbnail", file);
    }
  };

  const onSubmit = (data: CourseInfoData) => {
    dispatch(setCourseInfo({ 
      ...data, 
      price: parseFloat(data.price), 
      thumbnail: thumbnail ? { public_id: thumbnail.name, url: URL.createObjectURL(thumbnail) } : undefined 
    }));
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-[#0e1726] p-8 rounded-xl text-white space-y-4 border border-blue-500 w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Course Information</h2>

      <input {...register("name", { required: true })} placeholder="Name" className="input" />
      <textarea {...register("description", { required: true })} placeholder="Write something amazing here..." className="input h-28" />

      <div className="grid grid-cols-2 gap-4">
        <input {...register("price", { required: true })} placeholder="Price" className="input" />
        <input {...register("estimatedPrice")} placeholder="Estimated Price (optional)" className="input" />
        <input {...register("tag", { required: true })} placeholder="Tag" className="input" />
        <input {...register("categories", { required: true })} placeholder="Select Categories" className="input" />
        <input {...register("level", { required: true })} placeholder="Level" className="input" />
        <input {...register("demoUrl")} placeholder="https://demo.com" className="input" />
      </div>

      <div
        className="border-2 border-dashed p-4 text-center cursor-pointer"
        onDrop={handleThumbnailDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        Drag and drop your thumbnail here or click to browse
      </div>

      <button type="submit" className="bg-teal-500 px-4 py-2 rounded mt-4">
        Next
      </button>
    </form>
  );
};

export default CourseInformationForm;
