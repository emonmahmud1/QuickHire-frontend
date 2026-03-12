"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, MapPin } from "lucide-react";
import bannerBg from "@/assets/banner/banner_bg.png";
import bannerImg from "@/assets/banner/banner_img.png";

const popularTags = ["UI Designer", "UX Researcher", "Android", "Admin"];

const HeroSection = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword) params.set("search", keyword);
    if (location) params.set("location", location);
    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background image */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
        <Image
          src={bannerBg}
          alt="background"
          fill
          className="object-cover opacity-30"
          priority
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#25324B] leading-tight">
            Discover more than
            <br />
            <span className="text-[#26A4FF] relative inline-block mt-1">
              5000+ Jobs
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
              >
                <path
                  d="M2 8 Q75 2 150 8 Q225 14 298 6"
                  stroke="#26A4FF"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-6 text-[#515B6F] text-base leading-relaxed max-w-md">
            Great platform for the job seeker that searching for new career heights and passionate about startups.
          </p>

          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center bg-white shadow-md rounded-lg overflow-hidden border border-gray-100"
          >
            {/* Keyword */}
            <div className="flex items-center gap-2 flex-1 px-4 py-3 border-b sm:border-b-0 sm:border-r border-gray-100">
              <Search size={18} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Job title or keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="flex-1 outline-none text-sm text-[#25324B] placeholder:text-gray-400 bg-transparent"
              />
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 flex-1 px-4 py-3">
              <MapPin size={18} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Florence, Italy"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1 outline-none text-sm text-[#25324B] placeholder:text-gray-400 bg-transparent"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="bg-[#4640DE] text-white font-semibold text-sm px-6 py-3 hover:bg-[#3730c0] transition-colors whitespace-nowrap cursor-pointer"
            >
              Search my job
            </button>
          </form>

          {/* Popular tags */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-[#515B6F] text-sm">Popular:</span>
            {popularTags.map((tag) => (
              <button
                key={tag}
                onClick={() => router.push(`/jobs?search=${tag}`)}
                className="text-[#25324B] text-sm font-medium hover:text-[#4640DE] transition-colors cursor-pointer underline-offset-2 hover:underline"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Right — banner image */}
        <div className="hidden md:flex justify-center items-end relative">
          <Image
            src={bannerImg}
            alt="Job seeker"
            width={420}
            height={480}
            className="object-contain drop-shadow-xl relative z-10"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
