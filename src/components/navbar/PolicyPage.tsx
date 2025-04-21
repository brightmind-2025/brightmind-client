"use client";

import React from "react";
import {
  FaUserShield,
  FaDatabase,
  FaLock,
  FaCookieBite,
  FaHandshake,
  FaUserCog,
  FaClipboardList,
  FaEnvelope,
} from "react-icons/fa";

interface PolicySectionProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

const PolicySection = ({ icon, title, children }: PolicySectionProps) => (
  <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border-l-4 border-blue-500">
    <div className="flex items-center mb-4">
      <div className="mr-4 p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
        {icon}
      </div>
      <h2 className="text-xl font-bold text-gray-800 dark:text-white">
        {title}
      </h2>
    </div>
    <div className="ml-16">{children}</div>
  </div>
);

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-5 py-12 text-gray-700 dark:text-gray-200">
      <div className="text-center mb-12">
        <div className="inline-block p-2 px-4 bg-blue-100 dark:bg-blue-900 rounded-lg text-blue-800 dark:text-blue-200 font-medium mb-4">
          Updated April 2025
        </div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Privacy Policy
        </h1>
        <p className="text-lg max-w-2xl mx-auto">
          At BrightMind, we value your privacy and are committed to protecting
          your personal information. This policy outlines how we collect, use,
          and safeguard your data.
        </p>
      </div>

      <div className="space-y-6">
        <PolicySection
          icon={<FaUserShield className="text-blue-500 text-xl" />}
          title="Information We Collect"
        >
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2"></span>
              <span>
                Personal details (name, email, contact information) when you
                sign up
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2"></span>
              <span>
                Payment details for purchases (processed securely by third-party
                providers)
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2"></span>
              <span>
                Usage data, including course progress, interactions, and
                preferences
              </span>
            </li>
          </ul>
        </PolicySection>

        <PolicySection
          icon={<FaDatabase className="text-blue-500 text-xl" />}
          title="How We Use Your Information"
        >
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2"></span>
              <span>
                To provide and improve our services, including personalized
                learning experiences
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2"></span>
              <span>
                To communicate updates, promotions, and important notifications
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2"></span>
              <span>
                To ensure platform security and prevent fraudulent activities
              </span>
            </li>
          </ul>
        </PolicySection>

        <PolicySection
          icon={<FaLock className="text-blue-500 text-xl" />}
          title="Data Protection & Security"
        >
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2"></span>
              <span>
                We implement strict security measures to protect your data
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2"></span>
              <span>
                Your payment information is encrypted and handled securely
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2"></span>
              <span>
                We do not sell or share your data with unauthorized third
                parties
              </span>
            </li>
          </ul>
        </PolicySection>

        <PolicySection
          icon={<FaCookieBite className="text-blue-500 text-xl" />}
          title="Cookies & Tracking Technologies"
        >
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2"></span>
              <span>
                We use cookies to enhance user experience and analyze platform
                performance
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2"></span>
              <span>
                Users can manage cookie preferences in their browser settings
              </span>
            </li>
          </ul>
        </PolicySection>

        <PolicySection
          icon={<FaHandshake className="text-blue-500 text-xl" />}
          title="Third-Party Services"
        >
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2"></span>
              <span>
                Some features may rely on third-party tools (e.g., payment
                processors, analytics)
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2"></span>
              <span>
                These services have their own privacy policies, and we encourage
                users to review them
              </span>
            </li>
          </ul>
        </PolicySection>

        <PolicySection
          icon={<FaUserCog className="text-blue-500 text-xl" />}
          title="User Rights"
        >
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2"></span>
              <span>
                You have the right to access, update, or delete your personal
                data
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2"></span>
              <span>
                You can opt out of marketing communications at any time
              </span>
            </li>
          </ul>
        </PolicySection>

        <PolicySection
          icon={<FaClipboardList className="text-blue-500 text-xl" />}
          title="Changes to Policy"
        >
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2"></span>
              <span>
                We may update this Privacy Policy from time to time. Any changes
                will be posted on our website
              </span>
            </li>
          </ul>
        </PolicySection>
      </div>

      <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-center">
        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
          Have Questions?
        </h3>
        <p className="mb-4">
          For any questions or concerns about your privacy, please contact us
        </p>
        <a
          href="mailto:brightmind@gmail.com"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FaEnvelope className="mr-2" />
          brightmind@gmail.com
        </a>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
