import Link from "next/link";
import React from "react";

const NavItems: React.FC = () => {
  return (
    <>
      <div className=" text-white font-sans">
        <nav>
          <ul className="flex space-x-6 text-lg font-medium">
            <li>
              <Link
                href="/home"
                className="hover:underline hover:text-[#35A8CB]"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:underline hover:text-[#35A8CB]"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/courses"
                className="hover:underline hover:text-[#35A8CB]"
              >
                Courses
              </Link>
            </li>
            <li>
              <Link
                href="/policy"
                className="hover:underline hover:text-[#35A8CB]"
              >
                Policy
              </Link>
            </li>
            <li>
              <Link
                href="/faq"
                className="hover:underline hover:text-[#35A8CB]"
              >
                FAQ
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default NavItems;
