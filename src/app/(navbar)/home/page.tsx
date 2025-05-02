"use client";

import React from "react";
import HomePage from "../../../components/navbar/HomePage";
import Courses from "../../../components/navbar/Courses";
import Reviews from "../../../components/navbar/Reviews";
import FAQ from "@/components/navbar/FaqPages2";
import Footer from "../../../components/navbar/Footer";

export default function Home() {
  return (
    <main className="bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section id="home">
        <HomePage />
      </section>

      {/* Featured Courses Section */}
      <section id="courses" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 font-medium text-sm mb-4">
              Our Courses
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
              Explore Our Featured Courses
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover our hand-picked courses designed to help you achieve your
              goals and advance your career.
            </p>
          </div>
          <Courses />
        </div>
      </section>

      {/* Student Reviews Section */}
      <section id="reviews" className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 font-medium text-sm mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
              What Our Students Say
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Read reviews from students who have transformed their lives with
              our courses.
            </p>
          </div>
          <Reviews />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 font-medium text-sm mb-4">
              Get Help
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Find answers to common questions about our courses, platform, and
              learning approach.
            </p>
          </div>
          <FAQ />
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-white">
                Subscribe to Our Newsletter
              </h2>
              <p className="mt-4 text-blue-100">
                Get the latest updates, new courses, and learning tips delivered
                straight to your inbox.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-5 py-3 rounded-full flex-grow focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button className="bg-white text-blue-600 hover:bg-blue-50 font-medium px-6 py-3 rounded-full transition duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
