import Link from "next/link";
import { getAllJobs } from "@/services/api";
import { Job } from "@/types";
import SectionHeader from "@/components/shared/main/SectionHeader";

const tagColors = [
  "text-[#56CDAD] border-[#56CDAD]",
  "text-[#FFB836] border-[#FFB836]",
  "text-[#FF6550] border-[#FF6550]",
  "text-[#4640DE] border-[#4640DE]",
];

const LatestJobRow = ({ job }: { job: Job }) => {
  const colors = ["#FFB836", "#4640DE", "#56CDAD", "#FF6550", "#26A4FF", "#7B61FF"];
  const colorIndex = job.company.charCodeAt(0) % colors.length;
  const tagColor = tagColors[colorIndex % tagColors.length];

  return (
    <Link
      href={`/jobs/${job._id}`}
      className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-lg hover:border-[#4640DE] hover:shadow-sm transition-all group"
    >
      {/* Icon */}
      <div
        className="w-10 h-10 shrink-0 rounded-lg flex items-center justify-center text-white font-bold text-base"
        style={{ backgroundColor: colors[colorIndex] }}
      >
        {job.company.charAt(0).toUpperCase()}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-[#25324B] text-sm group-hover:text-[#4640DE] transition-colors truncate">
          {job.title}
        </p>
        <p className="text-[#515B6F] text-xs mt-0.5 truncate">
          {job.company} • {job.location}
        </p>
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          <span className="text-xs border rounded-full px-2 py-0.5 text-[#515B6F] border-gray-200">
            Full-Time
          </span>
          <span className={`text-xs border rounded-full px-2 py-0.5 ${tagColor}`}>
            {job.category}
          </span>
        </div>
      </div>
    </Link>
  );
};

const LatestJobsSection = async () => {
  const res = await getAllJobs();
  const jobs = res.data?.slice(0, 8) ?? [];

  // Split into 2 columns
  const col1 = jobs.filter((_, i) => i % 2 === 0);
  const col2 = jobs.filter((_, i) => i % 2 !== 0);

  return (
    <section className="py-16 bg-[#F8F8FD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Latest" highlightedText="jobs open" />

        {jobs.length === 0 ? (
          <p className="text-[#515B6F] text-center py-10">
            No jobs yet. Check back soon!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-4">
              {col1.map((job) => (
                <LatestJobRow key={job._id} job={job} />
              ))}
            </div>
            <div className="flex flex-col gap-4">
              {col2.map((job) => (
                <LatestJobRow key={job._id} job={job} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestJobsSection;
