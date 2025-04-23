
import React from "react";
import {
  FaGraduationCap,
  FaLaptopCode,
  FaClock,
  FaUsers,
} from "react-icons/fa";

const AboutPage = () => {
  return (
    <div className="max-w-5xl mx-auto py-16 px-6 text-gray-800 dark:text-white">
      <div className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 relative inline-block">
          <span className="relative z-10">WHAT IS BRIGHTMIND?</span>
          <span className="absolute bottom-0 left-0 w-full h-3 bg-yellow-400 opacity-30 z-0"></span>
        </h1>

        <p className="text-xl leading-relaxed max-w-3xl mx-auto">
          Welcome to{" "}
          <span className="font-bold text-yellow-400">BrightMind</span>, your
          gateway to limitless learning! We are an innovative e-learning
          platform dedicated to empowering students, professionals, and lifelong
          learners with high-quality educational content.
        </p>
      </div>

      {/* Feature icons section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white dark:bg-gray-800 shadow-md">
          <FaGraduationCap className="text-4xl text-yellow-400 mb-4" />
          <h3 className="font-bold text-lg mb-2">Expert Instructors</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Learn from professionals with real-world expertise and experience
          </p>
        </div>

        <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white dark:bg-gray-800 shadow-md">
          <FaLaptopCode className="text-4xl text-yellow-400 mb-4" />
          <h3 className="font-bold text-lg mb-2">Interactive Content</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Engage with quizzes, projects, and hands-on learning materials
          </p>
        </div>

        <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white dark:bg-gray-800 shadow-md">
          <FaClock className="text-4xl text-yellow-400 mb-4" />
          <h3 className="font-bold text-lg mb-2">Learn at Your Pace</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Flexible access to courses anytime, anywhere on any device
          </p>
        </div>

        <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white dark:bg-gray-800 shadow-md">
          <FaUsers className="text-4xl text-yellow-400 mb-4" />
          <h3 className="font-bold text-lg mb-2">Supportive Community</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Connect with fellow learners and instructors for guidance
          </p>
        </div>
      </div>

      <div className="space-y-8 text-lg">
        <p>
          Our mission is to make learning{" "}
          <strong>accessible, engaging, and effective</strong> for everyone.
          Whether you're looking to upskill, explore new subjects, or deepen
          your expertise, our platform provides carefully curated courses
          designed by industry experts.
        </p>

        <p>
          With a wide range of subjects, interactive content, quizzes, and
          real-world projects,{" "}
          <span className="font-bold text-yellow-400">BrightMind</span> ensures
          an <strong>immersive learning experience</strong>.
        </p>

        <p>
          Our flexible access allows you to learn{" "}
          <strong>anytime, anywhere, at your own pace</strong>, guided by
          professionals with real-world expertise. Join us today and take the
          first step toward your learning journey.
        </p>
      </div>

      <div className="mt-12 p-8 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg border-l-4 border-yellow-400">
        <p className="text-xl leading-relaxed">
          Whether you're a <strong>student, a working professional</strong>, or
          simply passionate about gaining knowledge,{" "}
          <span className="font-bold text-yellow-400">BrightMind</span> has
          something for you. Start exploring and unlock your full potential!
        </p>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Take the First Step Towards Your Dream Career
        </h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg mb-4">
            With <span className="font-bold text-yellow-400">BrightMind</span>{" "}
            by your side, there's nothing standing between you and your dream
            job. Our courses and community will provide you with the guidance,
            support, and motivation you need to become a skilled programmer.
          </p>
          <p className="text-xl font-medium mt-6">
            <span className="text-yellow-400 font-bold">
              So what are you waiting for?
            </span>{" "}
            Join the BrightMind family today and let's conquer the programming
            industry together!
          </p>
        </div>
      </div>

      <div className="mt-16 text-center flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold text-xl mb-4">
          BM
        </div>
        <h3 className="text-xl font-semibold">BM</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Founder and CEO of BrightMind
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
