"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { getMyJobs, getMyApplications, createJobAuth } from "@/services/api";
import { Job } from "@/types";
import { Briefcase, Users, Plus, Trash2 } from "lucide-react";

interface Application {
  _id: string;
  name: string;
  email: string;
  resume_link: string;
  cover_note?: string;
  job_id: {
    _id: string;
    title: string;
    company: string;
  };
  created_at: string;
}

const DashboardPage = () => {
  const router = useRouter();
  const { user, token, loading } = useAuth();
  const [myJobs, setMyJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [showJobForm, setShowJobForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    category: "",
    description: "",
  });

  // Redirect to admin dashboard if admin
  useEffect(() => {
    if (!loading && user?.role === "admin") {
      router.push("/admin");
    }
  }, [user, loading, router]);

  // Fetch data
  useEffect(() => {
    if (token && user?.role !== "admin") {
      fetchData();
    }
  }, [token, user]);

  const fetchData = async () => {
    if (!token) return;

    try {
      const [jobsRes, applicationsRes] = await Promise.all([
        getMyJobs(token),
        getMyApplications(token),
      ]);

      if (jobsRes.success) {
        setMyJobs(jobsRes.data ?? []);
      }

      if (applicationsRes.success) {
        setApplications(applicationsRes.data ?? []);
      }
    } catch (error: any) {
      toast.error("Failed to fetch data");
    }
  };

  const handleSubmitJob = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) return;

    if (!formData.title || !formData.company || !formData.location || !formData.category || !formData.description) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await createJobAuth(formData, token);

      if (response.success) {
        toast.success("Job posted successfully!");
        setFormData({
          title: "",
          company: "",
          location: "",
          category: "",
          description: "",
        });
        setShowJobForm(false);
        fetchData(); // Refresh data
      } else {
        toast.error(response.message || "Failed to post job");
      }
    } catch (error: any) {
      toast.error("Failed to post job");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || user?.role === "admin") {
    return <div className="text-center text-[#515B6F]">Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#25324B]">Dashboard</h1>
          <p className="text-[#515B6F] mt-1">Manage your jobs and view applications</p>
        </div>
        <button
          onClick={() => setShowJobForm(!showJobForm)}
          className="flex items-center gap-2 bg-[#4640DE] text-white px-4 py-2 rounded-lg hover:bg-[#3730c0] transition-colors"
        >
          <Plus size={18} />
          Post New Job
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="bg-[#4640DE]/10 p-3 rounded-lg">
              <Briefcase className="text-[#4640DE]" size={24} />
            </div>
            <div>
              <p className="text-[#515B6F] text-sm">Total Jobs Posted</p>
              <p className="text-3xl font-bold text-[#25324B]">{myJobs.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="bg-[#26A4FF]/10 p-3 rounded-lg">
              <Users className="text-[#26A4FF]" size={24} />
            </div>
            <div>
              <p className="text-[#515B6F] text-sm">Total Applications</p>
              <p className="text-3xl font-bold text-[#25324B]">{applications.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Job Form */}
      {showJobForm && (
        <div className="bg-white rounded-xl p-6 border border-gray-100 mb-8">
          <h2 className="text-xl font-bold text-[#25324B] mb-4">Post a New Job</h2>
          <form onSubmit={handleSubmitJob} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#25324B] mb-1">
                  Job Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4640DE]"
                  placeholder="e.g. Senior UI/UX Designer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#25324B] mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4640DE]"
                  placeholder="e.g. Google"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#25324B] mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4640DE]"
                  placeholder="e.g. Remote / Dhaka"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#25324B] mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4640DE]"
                  placeholder="e.g. Design"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#25324B] mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4640DE]"
                placeholder="Job description..."
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#4640DE] text-white px-6 py-2 rounded-lg hover:bg-[#3730c0] transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Posting..." : "Post Job"}
              </button>
              <button
                type="button"
                onClick={() => setShowJobForm(false)}
                className="bg-gray-100 text-[#25324B] px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* My Jobs */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 mb-8">
        <h2 className="text-xl font-bold text-[#25324B] mb-4">My Posted Jobs</h2>
        {myJobs.length === 0 ? (
          <p className="text-[#515B6F] text-center py-8">No jobs posted yet</p>
        ) : (
          <div className="space-y-3">
            {myJobs.map((job) => (
              <div
                key={job._id}
                className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:border-[#4640DE] transition-colors"
              >
                <div>
                  <h3 className="font-semibold text-[#25324B]">{job.title}</h3>
                  <p className="text-sm text-[#515B6F]">
                    {job.company} • {job.location} • {job.category}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#515B6F]">
                    {applications.filter((app) => app.job_id._id === job._id).length} applications
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Applications */}
      <div className="bg-white rounded-xl p-6 border border-gray-100">
        <h2 className="text-xl font-bold text-[#25324B] mb-4">Recent Applications</h2>
        {applications.length === 0 ? (
          <p className="text-[#515B6F] text-center py-8">No applications yet</p>
        ) : (
          <div className="space-y-3">
            {applications.slice(0, 10).map((app) => (
              <div
                key={app._id}
                className="p-4 border border-gray-100 rounded-lg hover:border-[#4640DE] transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-[#25324B]">{app.name}</h3>
                    <p className="text-sm text-[#515B6F]">{app.email}</p>
                    <p className="text-sm text-[#26A4FF] mt-1">
                      Applied for: {app.job_id.title}
                    </p>
                  </div>
                  <a
                    href={app.resume_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#4640DE] hover:underline"
                  >
                    View Resume →
                  </a>
                </div>
                {app.cover_note && (
                  <p className="text-sm text-[#515B6F] mt-2 italic">"{app.cover_note}"</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
