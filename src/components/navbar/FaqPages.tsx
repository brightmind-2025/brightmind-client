"use client";
import { useGetHeroDataQuery } from "@/lib/features/layout/layoutApi";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiPlus } from "react-icons/fi";

const FaqPage = () => {
  const { data, isLoading, error } = useGetHeroDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });
  
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFaqs, setFilteredFaqs] = useState<any[]>([]);

  // Filter FAQs based on search term
  useEffect(() => {
    if (data?.layout?.faq) {
      const filtered = data.layout.faq.filter(
        (faq: { question: string; answer: string }) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFaqs(filtered);
    }
  }, [searchTerm, data]);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md mb-8 w-1/2 mx-auto"></div>
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
          <h3 className="text-red-800 dark:text-red-300 text-lg font-medium mb-2">Failed to load FAQs</h3>
          <p className="text-red-700 dark:text-red-400">
            We're having trouble retrieving the FAQ information. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  const faqs = data?.layout?.faq || [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 font-sans">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Find answers to common questions about our platform, courses, and learning process.
        </p>
        
        {/* Search Bar */}
        <div className="mt-8 max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-10 rounded-full border border-gray-300 dark:border-gray-700
                         shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         dark:bg-gray-800 dark:text-white text-gray-900"
            />
            <svg
              className="w-5 h-5 absolute left-3 top-3.5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {(searchTerm ? filteredFaqs : faqs).map((faq: { question: string; answer: string }, idx: number) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden
                      shadow-sm hover:shadow-md transition-shadow duration-300 bg-white dark:bg-gray-800"
          >
            <button
              onClick={() => toggleFAQ(idx)}
              className="flex justify-between items-center w-full text-left p-5"
              aria-expanded={openIndex === idx}
            >
              <span className="font-semibold text-lg text-gray-900 dark:text-white pr-4">
                {faq.question}
              </span>
              <div className="flex-shrink-0">
                {openIndex === idx ? (
                  <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <FiChevronDown className="text-blue-600 dark:text-blue-300 transform rotate-180 transition-transform duration-300" />
                  </div>
                ) : (
                  <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <FiPlus className="text-gray-600 dark:text-gray-300" />
                  </div>
                )}
              </div>
            </button>
            
            <AnimatePresence>
              {openIndex === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-5 pb-5 pt-2 border-t border-gray-100 dark:border-gray-700">
                    <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
        
        {/* Show message when no results found */}
        {searchTerm && filteredFaqs.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No results found</h3>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              We couldn't find any FAQs matching "{searchTerm}". Try different keywords or browse all questions.
            </p>
            <button 
              onClick={() => setSearchTerm("")}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
      
      {/* Contact section */}
      <div className="mt-16 text-center p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Still have questions?</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          If you can't find the answer you're looking for, please reach out to our support team.
        </p>
        <a 
          href="/contact" 
          className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
};

export default FaqPage;