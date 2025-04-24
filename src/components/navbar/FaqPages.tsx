"use client";

import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "Can I download any course videos?",
    answer: "No, course videos are only available for streaming.",
  },
  {
    question: "Will I receive a certificate for each course?",
    answer: "Yes, you will receive a certificate upon completion.",
  },
  {
    question: "Are the courses free or paid?",
    answer: "We offer both free and paid courses.",
  },
  {
    question: "How do I purchase a course?",
    answer:
      "You can purchase courses through our website using a credit card or PayPal.",
  },
  {
    question: "Can I get a refund if I'm not satisfied with a course?",
    answer: "Yes, we offer a 7-day refund policy.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-black dark:text-white">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Frequently Asked Questions</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Find answers to common questions about our courses
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`border rounded-lg overflow-hidden transition-all duration-200 ${
              openIndex === index ? "shadow-md" : "hover:shadow-sm"
            }`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className={`w-full flex justify-between items-center p-5 text-left font-medium ${
                openIndex === index ? "bg-gray-50 dark:bg-gray-800" : ""
              }`}
              aria-expanded={openIndex === index}
            >
              <span className="text-lg">{faq.question}</span>
              <span className="ml-2 flex-shrink-0 text-gray-500">
                {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </button>

            <div
              className={`overflow-hidden transition-all duration-200 ${
                openIndex === index ? "max-h-40" : "max-h-0"
              }`}
            >
              <p className="p-5 text-gray-600 dark:text-gray-300 border-t">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Still have questions?
        </p>
        <button className="px-6 py-2 font-medium border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <a href="mailto:brightmind421@gmail.com?subject=Support%20Request&body=Hello%20BrightMind%20Team">
            Contact Support
          </a>
        </button>
      </div>
    </div>
  );
}
