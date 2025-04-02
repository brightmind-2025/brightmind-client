"use client";

import React from "react";

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 text-gray-800 dark:text-white pt-26">

      <h1 className="text-4xl font-bold text-center text-yellow-400 mb-6 uppercase">
        WHAT IS BRIGHTMIND?
      </h1>


      <p className="text-lg text-center mb-8">
        Welcome to <span className="font-bold text-yellow-400">BrightMind</span>
        , your gateway to limitless learning! We are an innovative e-learning
        platform dedicated to empowering students, professionals, and lifelong
        learners with high-quality educational content.
      </p>

  
      <div className="space-y-6 text-lg">
        <p>
          Our mission is to make learning{" "}
          <strong>accessible, engaging, and effective</strong> for everyone.
          Whether you&apos;re looking to upskill, explore new subjects, or deepen
          your expertise, our platform provides carefully curated courses
          designed by industry experts.
        </p>

        <p>
          With a wide range of subjects, interactive content, quizzes, and
          real-world projects,
          <span className="font-bold text-yellow-400"> BrightMind</span> ensures
          an <strong>immersive learning experience</strong>.
        </p>

        <p>
          Our flexible access allows you to learn{" "}
          <strong>anytime, anywhere, at your own pace</strong>, guided by
          professionals with real-world expertise. Join us today and take the
          first step toward your learning journey.
        </p>
      </div>


      <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg">
        <p className="text-lg">
          Whether you&apos;re a <strong>student, a working professional</strong>, or
          simply passionate about gaining knowledge,
          <span className="font-bold text-yellow-400"> BrightMind</span> has
          something for you. Start exploring and unlock your full potential!
        </p>
      </div>


      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Take the First Step Towards Your Dream Career
        </h2>
        <p className="text-lg">
          With <span className="font-bold text-yellow-400">BrightMind</span> by
          your side, there&apos;s nothing standing between you and your dream job.
          Our courses and community will provide you with the guidance, support,
          and motivation you need to become a skilled programmer.
        </p>
        <p className="text-lg mt-4">
          <span className="text-yellow-400 font-bold">
            So what are you waiting for?
          </span>{" "}
          Join the BrightMind family today and let&apos;s conquer the programming
          industry together!
        </p>
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-xl font-semibold"> BM</h3>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Founder and CEO of BrightMind
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
