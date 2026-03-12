import { MapPin, Briefcase, Tag, Calendar } from "lucide-react";
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

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

interface JobDetailInfoProps {
  job: Job;
}

const JobDetailInfo = ({ job }: JobDetailInfoProps) => {
  return (
    <article className="flex-1 min-w-0">
      {/* Title card */}
      <div className="bg-white border border-gray-100 rounded-lg p-6 mb-5">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div
            className={`${getColor(job.company)} w-14 h-14 rounded-lg flex items-center justify-center text-white font-bold text-base shrink-0`}
          >
            {getInitials(job.company)}
          </div>

          {/* Heading */}
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-[#25324B] mb-1">
              {job.title}
            </h1>
            <p className="text-[#515B6F] text-sm font-medium">{job.company}</p>
          </div>
        </div>

        {/* Meta pills */}
        <div className="flex flex-wrap gap-3 mt-5">
          <span className="flex items-center gap-1.5 text-sm text-[#515B6F] bg-gray-50 border border-gray-100 rounded-full px-3 py-1">
            <MapPin size={13} className="text-[#4640DE]" />
            {job.location}
          </span>
          <span className="flex items-center gap-1.5 text-sm text-[#515B6F] bg-gray-50 border border-gray-100 rounded-full px-3 py-1">
            <Tag size={13} className="text-[#4640DE]" />
            {job.category}
          </span>
          <span className="flex items-center gap-1.5 text-sm text-[#515B6F] bg-gray-50 border border-gray-100 rounded-full px-3 py-1">
            <Briefcase size={13} className="text-[#4640DE]" />
            Full-time
          </span>
          <span className="flex items-center gap-1.5 text-sm text-[#515B6F] bg-gray-50 border border-gray-100 rounded-full px-3 py-1">
            <Calendar size={13} className="text-[#4640DE]" />
            Posted {formatDate(job.created_at)}
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white border border-gray-100 rounded-lg p-6">
        <h2 className="text-base font-bold text-[#25324B] mb-4">
          Job Description
        </h2>
        <p className="text-[#515B6F] text-sm leading-relaxed whitespace-pre-line">
          {job.description}
        </p>
      </div>
    </article>
  );
};

export default JobDetailInfo;
