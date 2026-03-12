"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, MapPin, ChevronDown } from "lucide-react";
import bannerBg from "@/assets/banner/banner_bg.png";
import bannerImg from "@/assets/banner/banner_img.png";

const popularTags = ["UI Designer", "UX Researcher", "Android", "Admin"];

const locations = [
  "Florence, Italy",
  "New York, USA",
  "London, UK",
  "Berlin, Germany",
  "Remote",
];

const HeroSection = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("Florence, Italy");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword) params.set("search", keyword);
    if (location) params.set("location", location);
    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "#F0F0FB" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] min-h-[680px] items-center">
          {/* ── Left content ── */}
          <div className="py-20 md:py-28 pr-0 md:pr-12">
            {/* Heading */}
            <h1 className="text-5xl md:text-[3.75rem] font-extrabold text-[#25324B] leading-[1.15]">
              Discover
              <br />
              more than
              <br />
              <span className="text-[#26A4FF] relative inline-block">
                5000+ Jobs
                {/* Brush-stroke underline */}
                <svg
                  className="absolute left-0 w-full"
                  style={{ bottom: "-10px" }}
                  viewBox="0 0 480 22"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  {/* Main thick stroke */}
                  <path
                    d="M2 14 C40 7, 100 17, 160 12 S280 6, 340 13 S430 18, 478 12"
                    stroke="#26A4FF"
                    strokeWidth="5.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                  {/* Second overlapping stroke for brush effect */}
                  <path
                    d="M4 17 C50 12, 110 19, 170 15 S290 10, 350 16 S435 20, 476 15"
                    stroke="#26A4FF"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.55"
                  />
                  {/* Thin accent stroke */}
                  <path
                    d="M8 11 C60 6, 120 15, 180 10 S300 4, 360 11 S440 16, 472 10"
                    stroke="#26A4FF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.35"
                  />
                </svg>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-9 text-[#515B6F] text-[1.05rem] leading-relaxed max-w-[480px]">
              Great platform for the job seeker that searching for
              <br />
              new career heights and passionate about startups.
            </p>

            {/* ── Search bar ── */}
            <form
              onSubmit={handleSearch}
              className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center bg-white rounded-lg overflow-hidden"
              style={{
                boxShadow: "0 4px 24px 0 rgba(70,64,222,0.10)",
              }}
            >
              {/* Keyword input */}
              <div className="flex items-center gap-3 flex-1 px-5 py-[1.1rem] border-b sm:border-b-0 sm:border-r border-gray-200">
                <Search size={19} className="text-gray-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Job title or keyword"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="flex-1 outline-none text-[#25324B] placeholder:text-gray-400 bg-transparent text-[0.95rem]"
                />
              </div>

              {/* Location dropdown */}
              <div className="relative flex items-center gap-2 flex-1 px-5 py-[1.1rem] border-b sm:border-b-0 sm:border-r border-gray-200">
                <MapPin size={19} className="text-gray-400 shrink-0" />
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="flex-1 outline-none text-[#25324B] bg-transparent text-[0.95rem] appearance-none cursor-pointer pr-5"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={17}
                  className="text-gray-400 shrink-0 pointer-events-none absolute right-5"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="bg-[#4640DE] text-white font-bold text-[0.95rem] px-8 py-[1.1rem] hover:bg-[#3730c0] active:bg-[#2e28a8] transition-colors whitespace-nowrap cursor-pointer"
              >
                Search my job
              </button>
            </form>

            {/* ── Popular tags ── */}
            <div className="mt-6 flex flex-wrap items-center gap-x-1 gap-y-2">
              <span className="text-[#515B6F] font-medium text-sm mr-1">
                Popular :
              </span>
              {popularTags.map((tag, index) => (
                <span key={tag} className="flex items-center">
                  <button
                    type="button"
                    onClick={() =>
                      router.push(`/jobs?search=${encodeURIComponent(tag)}`)
                    }
                    className="text-[#25324B] font-medium text-sm hover:text-[#4640DE] transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                  {index < popularTags.length - 1 && (
                    <span className="text-[#515B6F] ml-1">,</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* ── Right — hero image ── */}
          <div className="hidden md:block relative self-stretch min-h-[680px]">
            {/* Geometric pattern background */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={bannerBg}
                alt=""
                fill
                className="object-cover object-top-left"
                priority
                aria-hidden="true"
              />
            </div>

            {/* Person image — bottom-anchored */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full flex justify-center items-end">
              <Image
                src={bannerImg}
                alt="Happy job seeker pointing left"
                width={490}
                height={570}
                className="object-contain relative z-10 select-none"
                priority
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
