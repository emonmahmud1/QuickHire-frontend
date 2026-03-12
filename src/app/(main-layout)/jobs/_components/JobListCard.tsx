import Link from "next/link";
import { MapPin, Briefcase } from "lucide-react";
import { Job } from "@/types";

const getInitials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

const avatarColors = [
  "bg-[#4640DE]",
  "bg-[#56CDAD]",
  "bg-[#FF6550]",
  "bg-[#FFB836]",
  "bg-[#26A4FF]",
];

const getColor = (str: string) =>
  avatarColors[
    str.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % avatarColors.length
  ];

interface JobListCardProps {
  job: Job;
}

const JobListCard = ({ job }: JobListCardProps) => {
  return (
    <Link
      href={`/jobs/${job._id}`}
      className="flex items-start gap-4 bg-white border border-gray-100 rounded-lg p-5 hover:border-[#4640DE] hover:shadow-sm transition-all group"
    >
      {/* Avatar */}
      <div
        className={`${getColor(job.company)} w-12 h-12 rounded flex items-center justify-center text-white font-bold text-sm shrink-0`}
      >
        {getInitials(job.company)}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <h3 className="font-semibold text-[#25324B] text-base group-hover:text-[#4640DE] transition-colors">
            {job.title}
          </h3>
          <span className="shrink-0 text-xs font-semibold text-[#4640DE] bg-[#F8F8FD] border border-[#4640DE]/20 rounded-full px-3 py-1">
            {job.category}
          </span>
        </div>

        <div className="flex items-center gap-4 mt-1 flex-wrap">
          <span className="text-sm text-[#515B6F] font-medium">
            {job.company}
          </span>
          <span className="flex items-center gap-1 text-sm text-[#515B6F]">
            <MapPin size={13} className="shrink-0" />
            {job.location}
          </span>
          <span className="flex items-center gap-1 text-xs text-[#515B6F]">
            <Briefcase size={13} className="shrink-0" />
            Full-time
          </span>
        </div>

        {job.description && (
          <p className="mt-2 text-sm text-[#7C8493] line-clamp-2">
            {job.description}
          </p>
        )}
      </div>
    </Link>
  );
};

export default JobListCard;
