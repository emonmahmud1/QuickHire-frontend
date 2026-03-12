import Link from "next/link";
import { Job } from "@/types";

interface JobCardProps {
  job: Job;
}

const JobCard = ({ job }: JobCardProps) => {
  // Generate a consistent bg color from company name
  const colors = ["#FFB836", "#4640DE", "#56CDAD", "#FF6550", "#26A4FF", "#7B61FF"];
  const colorIndex = job.company.charCodeAt(0) % colors.length;
  const bgColor = colors[colorIndex];

  return (
    <Link
      href={`/jobs/${job._id}`}
      className="group bg-white border border-gray-100 rounded-lg p-5 hover:border-[#4640DE] hover:shadow-md transition-all flex flex-col gap-3"
    >
      {/* Top: logo + badge */}
      <div className="flex items-start justify-between">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-base shrink-0"
          style={{ backgroundColor: bgColor }}
        >
          {job.company.charAt(0).toUpperCase()}
        </div>
        <span className="text-xs font-semibold text-[#56CDAD] border border-[#56CDAD] rounded-full px-3 py-0.5">
          Full Time
        </span>
      </div>

      {/* Job title + company */}
      <div>
        <h3 className="font-semibold text-[#25324B] text-base group-hover:text-[#4640DE] transition-colors line-clamp-1">
          {job.title}
        </h3>
        <p className="text-[#515B6F] text-sm mt-0.5">
          {job.company} • {job.location}
        </p>
      </div>

      {/* Description snippet */}
      <p className="text-[#7C8493] text-xs leading-relaxed line-clamp-2">
        {job.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-auto pt-2">
        <span className="text-xs font-medium text-[#FFB836] bg-orange-50 border border-orange-100 rounded-full px-3 py-0.5">
          {job.category}
        </span>
      </div>
    </Link>
  );
};

export default JobCard;
