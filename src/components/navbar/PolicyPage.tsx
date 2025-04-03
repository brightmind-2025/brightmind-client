"use client";

import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto px-5 text-gray-800 dark:text-white pt-26">
      <h1 className="text-3xl font-bold text-center mb-6">Privacy Policy</h1>
      <p className="text-center mb-4">
        At BrightMind, we value your privacy and are committed to protecting your personal information. This policy outlines how we collect, use, and safeguard your data when you use our platform.
      </p>

      <ul className="list-decimal list-inside space-y-4">
        <li>
          <strong>Information We Collect</strong>
          <ul className="list-disc list-inside ml-4">
            <li>Personal details (name, email, contact information) when you sign up.</li>
            <li>Payment details for purchases (processed securely by third-party providers).</li>
            <li>Usage data, including course progress, interactions, and preferences.</li>
          </ul>
        </li>

        <li>
          <strong>How We Use Your Information</strong>
          <ul className="list-disc list-inside ml-4">
            <li>To provide and improve our services, including personalized learning experiences.</li>
            <li>To communicate updates, promotions, and important notifications.</li>
            <li>To ensure platform security and prevent fraudulent activities.</li>
          </ul>
        </li>

        <li>
          <strong>Data Protection & Security</strong>
          <ul className="list-disc list-inside ml-4">
            <li>We implement strict security measures to protect your data.</li>
            <li>Your payment information is encrypted and handled securely.</li>
            <li>We do not sell or share your data with unauthorized third parties.</li>
          </ul>
        </li>

        <li>
          <strong>Cookies & Tracking Technologies</strong>
          <ul className="list-disc list-inside ml-4">
            <li>We use cookies to enhance user experience and analyze platform performance.</li>
            <li>Users can manage cookie preferences in their browser settings.</li>
          </ul>
        </li>

        <li>
          <strong>Third-Party Services</strong>
          <ul className="list-disc list-inside ml-4">
            <li>Some features may rely on third-party tools (e.g., payment processors, analytics).</li>
            <li>These services have their own privacy policies, and we encourage users to review them.</li>
          </ul>
        </li>

        <li>
          <strong>User Rights</strong>
          <ul className="list-disc list-inside ml-4">
            <li>You have the right to access, update, or delete your personal data.</li>
            <li>You can opt out of marketing communications at any time.</li>
          </ul>
        </li>

        <li>
          <strong>Changes to Policy</strong>
          <ul className="list-disc list-inside ml-4">
            <li>We may update this Privacy Policy from time to time. Any changes will be posted on our website.</li>
          </ul>
        </li>
      </ul>

      <p className="text-center mt-6">
        For any questions or concerns, please contact us at <strong>brightmind@gmail.com</strong>.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
