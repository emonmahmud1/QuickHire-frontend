"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Search, MapPin, X } from "lucide-react";

const categories = [
  "Design",
  "Sales",
  "Marketing",
  "Finance",
  "Technology",
  "Engineering",
  "Business",
  "Human Resource",
];

const JobsFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [keyword, setKeyword] = useState(searchParams.get("search") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  );

  // Sync URL → state when params change (e.g. coming from homepage)
  useEffect(() => {
    setKeyword(searchParams.get("search") || "");
    setLocation(searchParams.get("location") || "");
    setSelectedCategory(searchParams.get("category") || "");
  }, [searchParams]);

  const applyFilters = (overrides?: {
    keyword?: string;
    location?: string;
    category?: string;
  }) => {
    const params = new URLSearchParams();
    const k = overrides?.keyword ?? keyword;
    const l = overrides?.location ?? location;
    const c = overrides?.category ?? selectedCategory;
    if (k) params.set("search", k);
    if (l) params.set("location", l);
    if (c) params.set("category", c);
    router.push(`/jobs?${params.toString()}`);
  };

  const handleCategoryClick = (cat: string) => {
    const next = selectedCategory === cat ? "" : cat;
    setSelectedCategory(next);
    applyFilters({ category: next });
  };

  const clearAll = () => {
    setKeyword("");
    setLocation("");
    setSelectedCategory("");
    router.push("/jobs");
  };

  const hasFilters = keyword || location || selectedCategory;

  return (
    <aside className="w-full md:w-64 shrink-0">
      {/* Search bar */}
      <div className="bg-white border border-gray-100 rounded-lg p-5 mb-4">
        <h3 className="font-semibold text-[#25324B] mb-4 text-sm">Search</h3>

        {/* Keyword */}
        <div className="flex items-center gap-2 border border-gray-200 rounded px-3 py-2 mb-3 focus-within:border-[#4640DE]">
          <Search size={15} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Job title or keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applyFilters()}
            className="text-sm outline-none flex-1 text-[#25324B] placeholder:text-gray-400"
          />
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 border border-gray-200 rounded px-3 py-2 mb-4 focus-within:border-[#4640DE]">
          <MapPin size={15} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applyFilters()}
            className="text-sm outline-none flex-1 text-[#25324B] placeholder:text-gray-400"
          />
        </div>

        <button
          onClick={() => applyFilters()}
          className="w-full bg-[#4640DE] text-white text-sm font-semibold py-2 rounded hover:bg-[#3730c0] transition-colors cursor-pointer"
        >
          Search
        </button>
      </div>

      {/* Category filter */}
      <div className="bg-white border border-gray-100 rounded-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-[#25324B] text-sm">Category</h3>
          {hasFilters && (
            <button
              onClick={clearAll}
              className="text-xs text-[#4640DE] flex items-center gap-1 hover:underline cursor-pointer"
            >
              <X size={12} /> Clear all
            </button>
          )}
        </div>

        <ul className="flex flex-col gap-2">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => handleCategoryClick(cat)}
                className={`w-full text-left text-sm px-3 py-2 rounded transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#4640DE] text-white font-semibold"
                    : "text-[#515B6F] hover:bg-gray-50 hover:text-[#4640DE]"
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default JobsFilter;
