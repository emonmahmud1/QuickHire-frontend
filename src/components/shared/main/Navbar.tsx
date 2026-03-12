"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Compass } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-[#4640DE] rounded p-1.5">
              <Compass size={18} className="text-white" />
            </div>
            <span className="font-bold text-[#25324B] text-xl">QuickHire</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/jobs"
              className="text-[#515B6F] hover:text-[#4640DE] font-medium transition-colors"
            >
              Find Jobs
            </Link>
            <Link
              href="/"
              className="text-[#515B6F] hover:text-[#4640DE] font-medium transition-colors"
            >
              Browse Companies
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="text-[#4640DE] font-semibold hover:underline"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="bg-[#4640DE] text-white font-semibold px-6 py-2.5 rounded hover:bg-[#3730c0] transition-colors"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-[#25324B]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 flex flex-col gap-4 pb-5">
            <Link
              href="/jobs"
              className="text-[#515B6F] font-medium text-sm"
              onClick={() => setMenuOpen(false)}
            >
              Find Jobs
            </Link>
            <Link
              href="/"
              className="text-[#515B6F] font-medium text-sm"
              onClick={() => setMenuOpen(false)}
            >
              Browse Companies
            </Link>
            <hr className="border-gray-100" />
            <Link
              href="/login"
              className="text-[#4640DE] font-semibold text-sm"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/register"
              className="bg-[#4640DE] text-white font-semibold text-sm px-5 py-2 rounded text-center"
              onClick={() => setMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
