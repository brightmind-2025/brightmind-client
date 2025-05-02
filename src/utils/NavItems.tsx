// components/NavItems.tsx
"use client";
import Link from "next/link";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NavItems: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const navLinks = useMemo(
    () => [
      { href: "/home", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/courses", label: "Courses" },
      { href: "/policy", label: "Policy" },
      { href: "/faq", label: "FAQ" },
    ],
    []
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".mobile-menu") && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="text-white font-sans relative">
      {/* Mobile Menu Toggle Button */}
      <div className="md:hidden flex justify-end px-4 py-2 z-20 relative">
        <button
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <ul
          className="mobile-menu md:hidden absolute top-14 left-4 right-4 mx-auto w-[100px] \
                     bg-gradient-to-br from-black/90 to-gray-800/90 \
                     backdrop-blur-md text-white \
                     flex flex-col items-center \
                     space-y-6 py-6 px-6 z-10 \
                     rounded-xl border border-gray-700 \
                     shadow-2xl transition-all duration-300 ease-in-out animate-fade-slide"
        >
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setIsOpen(false)}
                className="text-xl hover:underline hover:text-[#35A8CB] transition-colors"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* Desktop Menu */}
      <nav className="hidden md:flex justify-end">
        <ul className="flex space-x-6 text-lg font-medium">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="hover:underline hover:text-[#35A8CB] transition-colors"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default NavItems;
