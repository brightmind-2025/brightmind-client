"use client";
import { useState } from "react";
import StepOneCourseInfo from "./stepOne";
import StepTwoCourseOptions from "./stepTwo";
import StepThreeDemoContent from  "./stepThree";
import StepFourPreviewSubmit from "./stepFour";
import CourseFormData from "./courseFormWrapper";

const CourseFormWrapper = () => {
  const [step, setStep] = useState(1);
  const [formState, setFormState] = useState<Partial<typeof CourseFormData>>({});

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateForm = (data: Record<string, unknown>) => {
    setFormState({ ...formState, ...data });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-[#354c81] rounded-lg shadow-xl text-white">
      <div className="flex gap-12">
      
        <div className="flex-1">
          {step === 1 && <StepOneCourseInfo next={nextStep} updateForm={updateForm} formData={formState} />}
          {step === 2 && <StepTwoCourseOptions next={nextStep} prev={prevStep} updateForm={updateForm} formData={formState} />}
          {step === 3 && <StepThreeDemoContent next={nextStep} prev={prevStep} updateForm={updateForm} formData={formState} />}
          {step === 4 && <StepFourPreviewSubmit prev={prevStep} formData={formState} />}
        </div>

        
        <div className="w-60 flex flex-col justify-center">
          <div className="flex flex-col gap-8 relative ml-4">
            {[
              "Course Information",
              "Course Options",
              "Course Content",
              "Course Preview",
            ].map((label, index) => {
              const current = index + 1;
              const isComplete = step > current;
              const isActive = step === current;

              return (
                <div key={label} className="flex items-start gap-4 relative">
                  {index < 3 && (
                    <span className="absolute top-5 left-2.5 w-px h-full bg-blue-600" />
                  )}

                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-sm font-bold ${
                      isComplete
                        ? "bg-blue-600 text-white"
                        : isActive
                        ? "border-2 border-blue-500 bg-blue-500 text-white"
                        : "border-2 border-gray-500 text-gray-500"
                    }`}
                  >
                    {isComplete ? "✓" : current}
                  </div>

                  <div className={`${isActive ? "text-white font-medium" : "text-gray-400"}`}>
                    {label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default CourseFormWrapper;