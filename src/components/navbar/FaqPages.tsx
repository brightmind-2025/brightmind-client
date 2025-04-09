
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
    question: "Can I get a refund if I’m not satisfied with a course?",
    answer: "Yes, we offer a 7-day refund policy.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };


  return (
    <div className="max-w-2xl mx-auto p-4 h-screen text-black dark:text-white pt-26">

      <h2 className="text-2xl font-bold text-center mb-4">
        Frequently Asked Questions
      </h2>
      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center py-3 text-left"
            >
              <span>{faq.question}</span>
              {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {openIndex === index && (
              <p className="p-2 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
