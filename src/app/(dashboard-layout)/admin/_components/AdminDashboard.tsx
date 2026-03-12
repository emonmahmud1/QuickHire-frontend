"use client";

import { useState, useEffect } from "react";
import { getAllJobs } from "@/services/api";
import { Job } from "@/types";
import { KeyRound, Loader2, AlertCircle } from "lucide-react";
import AddJobForm from "./AddJobForm";
import ManageJobs from "./ManageJobs";

const AdminDashboard = () => {
  const [adminKey, setAdminKey] = useState("");
  const [inputKey, setInputKey] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [keyError, setKeyError] = useState("");

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [fetchError, setFetchError] = useState("");

  // Fetch all jobs once unlocked
  useEffect(() => {
    if (!unlocked) return;
    setLoadingJobs(true);
    setFetchError("");
    getAllJobs()
      .then((res) => {
        if (res.success) setJobs(res.data ?? []);
        else setFetchError("Failed to load jobs.");
      })
      .catch(() => setFetchError("Network error."))
      .finally(() => setLoadingJobs(false));
  }, [unlocked]);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputKey.trim()) {
      setKeyError("Please enter the admin key.");
      return;
    }
    setAdminKey(inputKey.trim());
    setUnlocked(true);
    setKeyError("");
  };

  const handleJobAdded = (job: Job) => {
    setJobs((prev) => [job, ...prev]);
  };

  const handleJobDeleted = (id: string) => {
    setJobs((prev) => prev.filter((j) => j._id !== id));
  };

  // --- Locked state ---
  if (!unlocked) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-white border border-gray-100 rounded-lg p-8 w-full max-w-sm shadow-sm">
          <div className="flex items-center justify-center w-12 h-12 bg-[#4640DE]/10 rounded-full mb-5 mx-auto">
            <KeyRound size={22} className="text-[#4640DE]" />
          </div>
          <h1 className="text-xl font-bold text-[#25324B] text-center mb-1">
            Admin Access
          </h1>
          <p className="text-sm text-[#7C8493] text-center mb-6">
            Enter your admin key to continue.
          </p>

          <form onSubmit={handleUnlock} noValidate>
            <input
              type="password"
              value={inputKey}
              onChange={(e) => {
                setInputKey(e.target.value);
                setKeyError("");
              }}
              placeholder="Admin key"
              className={`w-full text-sm border rounded px-3 py-2.5 outline-none placeholder:text-gray-400 text-[#25324B] focus:border-[#4640DE] transition-colors mb-3 ${
                keyError ? "border-red-400" : "border-gray-200"
              }`}
            />
            {keyError && (
              <div className="flex items-center gap-1.5 mb-3">
                <AlertCircle size={13} className="text-red-500 shrink-0" />
                <p className="text-xs text-red-500">{keyError}</p>
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-[#4640DE] text-white font-semibold text-sm py-2.5 rounded hover:bg-[#3730c0] transition-colors cursor-pointer"
            >
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- Unlocked state ---
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#25324B]">Admin Dashboard</h1>
          <p className="text-sm text-[#7C8493] mt-0.5">
            Post new jobs and manage existing listings.
          </p>
        </div>
        <button
          onClick={() => {
            setUnlocked(false);
            setAdminKey("");
            setInputKey("");
            setJobs([]);
          }}
          className="text-xs text-[#515B6F] border border-gray-200 rounded px-3 py-1.5 hover:border-red-300 hover:text-red-500 transition-colors cursor-pointer"
        >
          Lock Dashboard
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {/* Add Job */}
        <AddJobForm adminKey={adminKey} onJobAdded={handleJobAdded} />

        {/* Job list */}
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
            adminKey={adminKey}
            onJobDeleted={handleJobDeleted}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
