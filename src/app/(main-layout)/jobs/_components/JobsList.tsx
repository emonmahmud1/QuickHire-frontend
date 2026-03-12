import { Job } from "@/types";
import JobListCard from "./JobListCard";

interface JobsListProps {
  jobs: Job[];
  search?: string;
  category?: string;
  location?: string;
}

const JobsList = ({ jobs, search, category, location }: JobsListProps) => {
  // Client-side keyword filter (category/location already filtered by API)
  const filtered = search
    ? jobs.filter(
        (j) =>
          j.title.toLowerCase().includes(search.toLowerCase()) ||
          j.company.toLowerCase().includes(search.toLowerCase())
      )
    : jobs;

  const activeFilters = [search, category, location].filter(Boolean);

  return (
    <section className="flex-1 min-w-0">
      {/* Results header */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <p className="text-sm text-[#515B6F]">
          Showing{" "}
          <span className="font-semibold text-[#25324B]">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "job" : "jobs"}
          {activeFilters.length > 0 && (
            <span>
              {" "}
              for{" "}
              <span className="text-[#4640DE] font-medium">
                {activeFilters.join(", ")}
              </span>
            </span>
          )}
        </p>
      </div>

      {/* Job cards */}
      {filtered.length > 0 ? (
        <div className="flex flex-col gap-3">
          {filtered.map((job) => (
            <JobListCard key={job._id} job={job} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">🔍</span>
          </div>
          <h3 className="font-semibold text-[#25324B] text-lg mb-1">
            No jobs found
          </h3>
          <p className="text-sm text-[#7C8493] max-w-xs">
            Try adjusting your filters or search with different keywords.
          </p>
        </div>
      )}
    </section>
  );
};

export default JobsList;
