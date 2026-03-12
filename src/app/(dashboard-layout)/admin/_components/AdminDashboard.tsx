"use client";

import { useState, useEffect } from "react";
import { getAllJobs } from "@/services/api";
import { Job } from "@/types";
import { Loader2 } from "lucide-react";
import AddJobForm from "./AddJobForm";
import ManageJobs from "./ManageJobs";
import { useAuth } from "@/hooks/useAuth";

const AdminDashboard = () => {
  const { token } = useAuth(true);

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    setLoadingJobs(true);
    setFetchError("");
    getAllJobs()
      .then((res) => {
        if (res.success) setJobs(res.data ?? []);
        else setFetchError("Failed to load jobs.");
      })
      .catch(() => setFetchError("Network error."))
      .finally(() => setLoadingJobs(false));
  }, []);

  const handleJobAdded = (job: Job) => {
    setJobs((prev) => [job, ...prev]);
  };

  const handleJobDeleted = (id: string) => {
    setJobs((prev) => prev.filter((j) => j._id !== id));
  };

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 size={24} className="animate-spin text-[#4640DE]" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#25324B]">Admin Dashboard</h1>
        <p className="text-sm text-[#7C8493] mt-0.5">
          Post new jobs and manage existing listings.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <AddJobForm token={token} onJobAdded={handleJobAdded} />

        {loadingJobs ? (
          <div className="flex items-center justify-center py-16 bg-white border border-gray-100 rounded-lg">
            <Loader2 size={24} className="animate-spin text-[#4640DE]" />
          </div>
        ) : fetchError ? (
          <div className="bg-red-50 border border-red-200 rounded-lg px-5 py-4">
            <p className="text-sm text-red-600">{fetchError}</p>
          </div>
        ) : (
          <ManageJobs
            jobs={jobs}
            token={token}
            onJobDeleted={handleJobDeleted}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
