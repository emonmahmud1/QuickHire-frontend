// Job type — matches backend model exactly
export interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
  created_at: string;
}

// Form data for submitting a job application
export interface ApplicationFormData {
  job_id: string;
  name: string;
  email: string;
  resume_link: string;
  cover_note?: string;
}

// User type
export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

// Auth types
export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Form data for creating a job (admin)
export interface JobFormData {
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
}

// Generic API response shape
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
  errors?: { msg: string; path: string }[];
}
