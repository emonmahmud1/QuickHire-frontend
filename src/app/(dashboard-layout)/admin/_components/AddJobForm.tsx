"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createJobAuth } from "@/services/api";
import { Job, JobFormData } from "@/types";
import { useState } from "react";
import { Loader2, CheckCircle } from "lucide-react";

const schema = z.object({
  title: z.string().min(2, "Title is required"),
  company: z.string().min(2, "Company is required"),
  location: z.string().min(2, "Location is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type FormValues = z.infer<typeof schema>;

const categories = [
  "Design",
  "Sales",
  "Marketing",
  "Finance",
  "Technology",
  "Engineering",
  "Business",
  "Human Resource",
];

interface AddJobFormProps {
  token: string | null;
  onJobAdded: (job: Job) => void;
}

const AddJobForm = ({ token, onJobAdded }: AddJobFormProps) => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await createJobAuth(values as JobFormData, token ?? "");
      if (res.success && res.data) {
        setStatus("success");
        onJobAdded(res.data);
        reset();
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
        setErrorMsg(
          res.errors?.[0]?.msg || res.message || "Failed to create job."
        );
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-lg p-6">
      <h2 className="font-bold text-[#25324B] text-lg mb-5">Post a New Job</h2>

      {status === "success" && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-4 py-3 mb-5">
          <CheckCircle size={16} className="text-green-600 shrink-0" />
          <p className="text-sm text-green-700 font-medium">Job posted successfully!</p>
        </div>
      )}

      {status === "error" && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-5">
          <p className="text-sm text-red-600">{errorMsg}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-[#25324B] mb-1.5">
              Job Title <span className="text-red-500">*</span>
            </label>
            <input
              {...register("title")}
              placeholder="e.g. Frontend Engineer"
              className={`w-full text-sm border rounded px-3 py-2 outline-none placeholder:text-gray-400 text-[#25324B] focus:border-[#4640DE] transition-colors ${
                errors.title ? "border-red-400" : "border-gray-200"
              }`}
            />
            {errors.title && (
              <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Company */}
          <div>
            <label className="block text-xs font-semibold text-[#25324B] mb-1.5">
              Company <span className="text-red-500">*</span>
            </label>
            <input
              {...register("company")}
              placeholder="e.g. Acme Corp"
              className={`w-full text-sm border rounded px-3 py-2 outline-none placeholder:text-gray-400 text-[#25324B] focus:border-[#4640DE] transition-colors ${
                errors.company ? "border-red-400" : "border-gray-200"
              }`}
            />
            {errors.company && (
              <p className="text-xs text-red-500 mt-1">{errors.company.message}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-semibold text-[#25324B] mb-1.5">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              {...register("location")}
              placeholder="e.g. Remote, Dhaka"
              className={`w-full text-sm border rounded px-3 py-2 outline-none placeholder:text-gray-400 text-[#25324B] focus:border-[#4640DE] transition-colors ${
                errors.location ? "border-red-400" : "border-gray-200"
              }`}
            />
            {errors.location && (
              <p className="text-xs text-red-500 mt-1">{errors.location.message}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-[#25324B] mb-1.5">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              {...register("category")}
              className={`w-full text-sm border rounded px-3 py-2 outline-none text-[#25324B] focus:border-[#4640DE] transition-colors bg-white ${
                errors.category ? "border-red-400" : "border-gray-200"
              }`}
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-[#25324B] mb-1.5">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register("description")}
            rows={4}
            placeholder="Describe the role, responsibilities, and requirements..."
            className={`w-full text-sm border rounded px-3 py-2 outline-none placeholder:text-gray-400 text-[#25324B] focus:border-[#4640DE] transition-colors resize-none ${
              errors.description ? "border-red-400" : "border-gray-200"
            }`}
          />
          {errors.description && (
            <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-[#4640DE] text-white font-semibold text-sm px-6 py-2.5 rounded hover:bg-[#3730c0] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
        >
          {status === "loading" ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              Posting…
            </>
          ) : (
            "Post Job"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddJobForm;
