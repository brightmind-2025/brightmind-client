import React from "react";
import Link from "next/link";
import {
  FaYoutube,
  FaInstagram,
  FaGithub,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaBookOpen,
  FaUser,
  FaTachometerAlt,
  FaInfoCircle,
  FaShieldAlt,
  FaQuestionCircle,
} from "react-icons/fa";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="bg-white dark:bg-gray-900 pt-10">
      <div className="border-t border-gray-200 dark:border-gray-800" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              About
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/about"
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
                >
                  <FaInfoCircle className="text-gray-500 dark:text-gray-400" />
                  <span>Our Story</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
                >
                  <FaShieldAlt className="text-gray-500 dark:text-gray-400" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
                >
                  <FaQuestionCircle className="text-gray-500 dark:text-gray-400" />
                  <span>FAQ</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/courses"
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
                >
                  <FaBookOpen className="text-gray-500 dark:text-gray-400" />
                  <span>Courses</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
                >
                  <FaUser className="text-gray-500 dark:text-gray-400" />
                  <span>My Account</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/course-dashboard"
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
                >
                  <FaTachometerAlt className="text-gray-500 dark:text-gray-400" />
                  <span>Course Dashboard</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Social Links
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500 transition-colors duration-200"
                >
                  <FaYoutube className="text-lg" />
                  <span>YouTube</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-500 transition-colors duration-200"
                >
                  <FaInstagram className="text-lg" />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
                >
                  <FaGithub className="text-lg" />
                  <span>GitHub</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Contact Info
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                <FaPhoneAlt className="mt-1 text-gray-500 dark:text-gray-400" />
                <span>Call Us: 1-885-665-2022</span>
              </li>
              <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                <FaMapMarkerAlt className="mt-1 text-gray-500 dark:text-gray-400" />
                <span>Address: +7011 Vermont Ave, Los Angeles, CA 90044</span>
              </li>
              <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                <FaEnvelope className="mt-1 text-gray-500 dark:text-gray-400" />
                <span>Mail Us: hello@elearning.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 dark:text-gray-400">
              Copyright © 2025 BrightMind | All Rights Reserved
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
              >
                <FaYoutube size={20} />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
              >
                <FaGithub size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
