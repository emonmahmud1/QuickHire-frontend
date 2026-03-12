"use client";

import { useState } from "react";
import { deleteJob } from "@/services/api";
import { Job } from "@/types";
import { Trash2, Loader2, MapPin, Tag } from "lucide-react";

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

interface ManageJobsProps {
  jobs: Job[];
  token: string | null;
  onJobDeleted: (id: string) => void;
}

const ManageJobs = ({ jobs, token, onJobDeleted }: ManageJobsProps) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [errorId, setErrorId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job?")) return;
    setDeletingId(id);
    setErrorId(null);
    try {
      const res = await deleteJob(id, token ?? "");
      if (res.success) {
        onJobDeleted(id);
      } else {
        setErrorId(id);
      }
    } catch {
      setErrorId(id);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-lg p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold text-[#25324B] text-lg">Manage Jobs</h2>
        <span className="text-sm text-[#7C8493] bg-gray-50 border border-gray-100 rounded-full px-3 py-1">
          {jobs.length} {jobs.length === 1 ? "job" : "jobs"}
        </span>
      </div>

      {jobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
            <span className="text-xl">📋</span>
          </div>
          <p className="text-sm text-[#7C8493]">No jobs posted yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="flex items-start gap-4 border border-gray-100 rounded-lg p-4 hover:border-gray-200 transition-colors"
            >
              {/* Avatar */}
              <div
                className={`${getColor(job.company)} w-10 h-10 rounded flex items-center justify-center text-white font-bold text-xs shrink-0`}
              >
                {getInitials(job.company)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[#25324B] text-sm truncate">
                  {job.title}
                </p>
                <p className="text-xs text-[#515B6F] font-medium mb-1">
                  {job.company}
                </p>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="flex items-center gap-1 text-xs text-[#7C8493]">
                    <MapPin size={11} /> {job.location}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-[#7C8493]">
                    <Tag size={11} /> {job.category}
                  </span>
                </div>
                {errorId === job._id && (
                  <p className="text-xs text-red-500 mt-1">
                    Failed to delete. Try again.
                  </p>
                )}
              </div>

              {/* Delete button */}
              <button
                onClick={() => handleDelete(job._id)}
                disabled={deletingId === job._id}
                className="shrink-0 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                title="Delete job"
              >
                {deletingId === job._id ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Trash2 size={16} />
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageJobs;
