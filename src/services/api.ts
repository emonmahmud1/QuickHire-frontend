import { ApiResponse, ApplicationFormData, Job, JobFormData } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// GET /api/jobs — fetch all jobs with optional filters
export async function getAllJobs(params?: {
  category?: string;
  location?: string;
}): Promise<ApiResponse<Job[]>> {
  const query = new URLSearchParams();
  if (params?.category) query.append("category", params.category);
  if (params?.location) query.append("location", params.location);

  const res = await fetch(`${API_URL}/jobs?${query.toString()}`, {
    cache: "no-store",
  });
  return res.json();
}

// GET /api/jobs/:id — fetch single job
export async function getJobById(id: string): Promise<ApiResponse<Job>> {
  const res = await fetch(`${API_URL}/jobs/${id}`, { cache: "no-store" });
  return res.json();
}

// POST /api/jobs — create a job (admin)
export async function createJob(
  data: JobFormData,
  adminKey: string
): Promise<ApiResponse<Job>> {
  const res = await fetch(`${API_URL}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-admin-key": adminKey,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

// DELETE /api/jobs/:id — delete a job (admin)
export async function deleteJob(
  id: string,
  adminKey: string
): Promise<ApiResponse<null>> {
  const res = await fetch(`${API_URL}/jobs/${id}`, {
    method: "DELETE",
    headers: { "x-admin-key": adminKey },
  });
  return res.json();
}

// POST /api/applications — submit a job application
export async function submitApplication(
  data: ApplicationFormData
): Promise<ApiResponse<null>> {
  const res = await fetch(`${API_URL}/applications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
