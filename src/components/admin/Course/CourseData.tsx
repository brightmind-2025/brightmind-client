"use client";

import React, { FC } from "react";
import { styles } from "@/components/style/style";
import { MdOutlineAddCircle } from "react-icons/md";
import { BiSolidMinusCircle } from "react-icons/bi";
import toast from "react-hot-toast";

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}) => {
  const handleBenefitChange = (index: number, value: string) => {
    const newBenefits = [...benefits];
    newBenefits[index].title = value;
    setBenefits(newBenefits);
  };

  const handleAddBenefit = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  const handleRemoveBenefit = (index: number) => {
    if (benefits.length > 1) {
      const newBenefits = benefits.filter((_, i) => i !== index);
      setBenefits(newBenefits);
    } else {
      toast.error("At least one benefit is required!");
    }
  };

  const handlePrerequisitesChange = (index: number, value: string) => {
    const newPrerequisites = [...prerequisites];
    newPrerequisites[index].title = value;
    setPrerequisites(newPrerequisites);
  };

  const handleAddPrerequisites = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };

  const handleRemovePrerequisite = (index: number) => {
    if (prerequisites.length > 1) {
      const newPrerequisites = prerequisites.filter((_, i) => i !== index);
      setPrerequisites(newPrerequisites);
    } else {
      toast.error("At least one prerequisite is required!");
    }
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      benefits[benefits.length - 1]?.title !== "" &&
      prerequisites[prerequisites.length - 1]?.title !== ""
    ) {
      setActive(active + 1);
    } else {
      toast.error("Please fill the fields to go to next!");
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24 block">
      {/* Benefits Section */}
      <div>
        <label className={`${styles.label} text-[20px]`} htmlFor="benefits">
          What are the benefits for students in this course?
        </label>
        <br />
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-center gap-2 my-2">
            <input
              type="text"
              name={`benefit-${index}`}
              placeholder="You will be able to build a full stack LMS Platform ..."
              required
              className={`${styles.input}`}
              value={benefit.title}
              onChange={(e) => handleBenefitChange(index, e.target.value)}
            />
            <BiSolidMinusCircle
              className="cursor-pointer mt-2 text-[#37a39a] hover:text-[#2e908b]"
              size={20}
              onClick={() => handleRemoveBenefit(index)}
            />
          </div>
        ))}
        <MdOutlineAddCircle
          className="cursor-pointer text-[#37a39a] hover:text-[#2e908b]"
          size={20}
          onClick={handleAddBenefit}
        />
      </div>

      {/* Prerequisites Section */}
      <div className="mt-8">
        <label className={`${styles.label} text-[20px]`} htmlFor="prerequisites">
          What are the prerequisites for starting this course?
        </label>
        <br />
        {prerequisites.map((prerequisite, index) => (
          <div key={index} className="flex items-center gap-2 my-2">
            <input
              type="text"
              name={`prerequisite-${index}`}
              placeholder="You need basic knowledge of MERN stack"
              required
              className={`${styles.input}`}
              value={prerequisite.title}
              onChange={(e) => handlePrerequisitesChange(index, e.target.value)}
            />
            <BiSolidMinusCircle
              className="cursor-pointer mt-2 text-[#37a39a] hover:text-[#2e908b]"
              size={20}
              onClick={() => handleRemovePrerequisite(index)}
            />
          </div>
        ))}
        <MdOutlineAddCircle
          className="cursor-pointer text-[#37a39a] hover:text-[#2e908b]"
          size={20}
          onClick={handleAddPrerequisites}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="w-full flex items-center justify-between mt-8">
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center cursor-pointer h-[40px] bg-[#37a39a] text-center text-[#fff] rounded"
          onClick={() => prevButton()}
        >
          Prev
        </div>
        <div
          className="w-full 800px:w-[180px] flex items-center cursor-pointer justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded"
          onClick={() => handleOptions()}
        >
          Next
        </div>
        
      </div>
      <br/>
      <br/>
    </div>
  );
};

export default CourseData;