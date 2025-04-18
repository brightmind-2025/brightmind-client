// components/CourseForm/StepOneCourseInfo.tsx
import { useState } from "react";

interface StepOneProps {
  next: () => void;
  updateForm: (data: {
    name: string;
    description: string;
    price: string;
    estimatedPrice: string;
    tag: string;
    level: string;
    category: string;
    demoUrl: string;
    thumbnail: File | null;
  }) => void;
  formData: {
    name?: string;
    description?: string;
    price?: string;
    estimatedPrice?: string;
    tag?: string;
    level?: string;
    category?: string;
    demoUrl?: string;
    thumbnail?: File | null;
  };
}

const StepOne = ({ next, updateForm, formData }: StepOneProps) => {
  const [localData, setLocalData] = useState({
    name: formData.name || "",
    description: formData.description || "",
    price: formData.price || "",
    estimatedPrice: formData.estimatedPrice || "",
    tag: formData.tag || "",
    level: formData.level || "",
    category: formData.category || "",
    demoUrl: formData.demoUrl || "",
    thumbnail: formData.thumbnail || null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const files = (e.target as HTMLInputElement).files;
    if (name === "thumbnail") {
      setLocalData({ ...localData, thumbnail: files ? files[0] : null });
    } else {
      setLocalData({ ...localData, [name]: value });
    }
  };

  const handleNext = () => {
    updateForm(localData);
    next();
  };

  return (
    <div className="space-y-4 justify-center p-22 px" >
      <input name="name" placeholder="Course Name" value={localData.name} onChange={handleChange} className="w-full p-2 rounded bg-gray-800" />
      <textarea name="description" placeholder="Course Description" value={localData.description} onChange={handleChange} className="w-full p-2 rounded bg-gray-800" />
      <div className="flex gap-4">
        <input name="price" placeholder="Course Price" value={localData.price} onChange={handleChange} className="w-full p-2 rounded bg-gray-800" />
        <input name="estimatedPrice" placeholder="Estimated Price" value={localData.estimatedPrice} onChange={handleChange} className="w-full p-2 rounded bg-gray-800" />
      </div>
      <input name="tag" placeholder="Course Tag" value={localData.tag} onChange={handleChange} className="w-full p-2 rounded bg-gray-800" />
      <input name="category" placeholder="Course Categories" value={localData.category} onChange={handleChange} className="w-full p-2 rounded bg-gray-800" />
      <input name="level" placeholder="Course Level" value={localData.level} onChange={handleChange} className="w-full p-2 rounded bg-gray-800" />
      <input name="demoUrl" placeholder="Demo URL" value={localData.demoUrl} onChange={handleChange} className="w-full p-2 rounded bg-gray-800" />
      <input type="file" name="thumbnail" onChange={handleChange} className="text-sm" />

      <button onClick={handleNext} className="mt-4 bg-green-500 text-white py-2 px-4 rounded">
        Next
      </button>
    </div>
  );
};

export default StepOne;
