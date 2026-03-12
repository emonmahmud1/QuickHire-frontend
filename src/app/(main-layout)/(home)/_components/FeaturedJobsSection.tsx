import { getAllJobs } from "@/services/api";
import JobCard from "./JobCard";
import SectionHeader from "@/components/shared/main/SectionHeader";

const FeaturedJobsSection = async () => {
  const res = await getAllJobs();
  const jobs = res.data?.slice(0, 8) ?? [];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Featured" highlightedText="jobs" />

        {jobs.length === 0 ? (
          <p className="text-[#515B6F] text-center py-10">
            No jobs yet. Check back soon!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedJobsSection;
