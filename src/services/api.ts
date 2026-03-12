import { ApiResponse, ApplicationFormData, Job, JobFormData, RegisterData, LoginData, AuthResponse } from "@/types";

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

// DELETE /api/jobs/:id — delete a job (admin, JWT)
export async function deleteJob(
  id: string,
  token: string
): Promise<ApiResponse<null>> {
  const res = await fetch(`${API_URL}/jobs/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
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

// ============ AUTH APIs ============

// POST /api/auth/register — register new user
export async function registerUser(
  data: RegisterData
): Promise<ApiResponse<AuthResponse>> {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// POST /api/auth/login — login user
export async function loginUser(
  data: LoginData
): Promise<ApiResponse<AuthResponse>> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// GET /api/auth/me — get current user
export async function getCurrentUser(
  token: string
): Promise<ApiResponse<any>> {
  const res = await fetch(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

// ============ USER JOB MANAGEMENT ============

// GET /api/jobs/my/posted - Get jobs posted by current user
export async function getMyJobs(
  token: string
): Promise<ApiResponse<Job[]>> {
  const res = await fetch(`${API_URL}/jobs/my/posted`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

// POST /api/jobs - Create a job (Protected)
export async function createJobAuth(
  data: JobFormData,
  token: string
): Promise<ApiResponse<Job>> {
  const res = await fetch(`${API_URL}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

// GET /api/applications/my - Get applications for my jobs
export async function getMyApplications(
  token: string
): Promise<ApiResponse<any[]>> {
  const res = await fetch(`${API_URL}/applications/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}
