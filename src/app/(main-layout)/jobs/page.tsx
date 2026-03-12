import { Suspense } from "react";
import { getAllJobs } from "@/services/api";
import JobsFilter from "./_components/JobsFilter";
import JobsList from "./_components/JobsList";

interface JobsPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    location?: string;
  }>;
}

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const { search, category, location } = await searchParams;

  // Fetch with API-level filters (category, location)
  const res = await getAllJobs({ category, location });
  const jobs = res.success ? res.data ?? [] : [];

  return (
    <main className="min-h-screen bg-[#F8F8FD]">
      {/* Page header */}
      <section className="bg-white border-b border-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-[#25324B] mb-1">
            Find your <span className="text-[#4640DE]">dream job</span>
          </h1>
          <p className="text-[#515B6F] text-sm">
            Browse all available positions and apply with ease.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Sidebar filter — client component needs Suspense (uses useSearchParams) */}
          <Suspense fallback={<div className="w-full md:w-64 h-48 bg-white rounded-lg animate-pulse" />}>
            <JobsFilter />
          </Suspense>

          {/* Results */}
          <JobsList
            jobs={jobs}
            search={search}
            category={category}
            location={location}
          />
        </div>
      </div>
    </main>
  );
}
