"use client";
import { useGetHeroDataQuery } from "@/lib/features/layout/layoutApi";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Faq2 = () => {
  const { data, isLoading, error } = useGetHeroDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading FAQs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Failed to load FAQs. Please try again later.</p>
      </div>
    );
  }

  const faqs = data?.layout?.faq || [];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Frequently Asked Questions
        </h1>
      <div className="space-y-4">
        {faqs.map((faq: { question: string; answer: string }, idx: number) => (
          <div
            key={idx}
            className="border border-gray-200 rounded-lg p-4 dark:border-slate-700 dark:bg-slate-800"
          >
            <button
              onClick={() => toggleFAQ(idx)}
              className="flex justify-between items-center w-full text-left"
            >
              <span className="font-medium text-gray-800 dark:text-white">
                {faq.question}
              </span>
              {openIndex === idx ? (
                <FaChevronUp className="text-gray-600 dark:text-gray-400" />
              ) : (
                <FaChevronDown className="text-gray-600 dark:text-gray-400" />
              )}
            </button>
            <div
              className={`transition-all duration-300 ease-in-out ${
                openIndex === idx ? "max-h-40 p-4" : "max-h-0 p-0"
              } overflow-hidden `}
            >
              <p className="text-sm">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq2;
