// components/CourseForm/StepTwoCourseOptions.tsx
import { useState } from "react";

interface StepTwoCourseOptionsProps {
  next: () => void;
  prev: () => void;
  updateForm: (data: { benefits: string; prerequisites: string }) => void;
  formData: { benefits?: string; prerequisites?: string };
}

const StepTwoCourseOptions = ({ next, prev, updateForm, formData }: StepTwoCourseOptionsProps) => {
  const [localData, setLocalData] = useState({
    benefits: formData.benefits || "",
    prerequisites: formData.prerequisites || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalData({ ...localData, [name]: value });
  };

  const handleNext = () => {
    updateForm(localData);
    next();
  };

  return (
    <div className="space-y-4">
      <input name="benefits" placeholder="Benefits" value={localData.benefits} onChange={handleChange} className="w-full p-2 rounded bg-gray-800" />
      <input name="prerequisites" placeholder="Prerequisites" value={localData.prerequisites} onChange={handleChange} className="w-full p-2 rounded bg-gray-800" />

      <div className="flex justify-between">
        <button onClick={prev} className="bg-gray-600 text-white py-2 px-4 rounded">
          Prev
        </button>
        <button onClick={handleNext} className="bg-green-500 text-white py-2 px-4 rounded">
          Next
        </button>
      </div>
    </div>
  );
};

export default StepTwoCourseOptions;
