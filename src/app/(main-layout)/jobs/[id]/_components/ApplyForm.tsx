"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitApplication } from "@/services/api";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  resume_link: z.string().url("Enter a valid URL (e.g. https://...)"),
  cover_note: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

interface ApplyFormProps {
  jobId: string;
  jobTitle: string;
}

const ApplyForm = ({ jobId, jobTitle }: ApplyFormProps) => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setStatus("loading");
    setServerMessage("");
    try {
      const res = await submitApplication({ job_id: jobId, ...values });
      if (res.success) {
        setStatus("success");
        setServerMessage("Application submitted successfully!");
        reset();
      } else {
        setStatus("error");
        setServerMessage(
          res.errors?.[0]?.msg || res.message || "Something went wrong."
        );
      }
    } catch {
      setStatus("error");
      setServerMessage("Network error. Please try again.");
    }
  };

  return (
    <aside className="w-full md:w-80 shrink-0">
      <div className="bg-white border border-gray-100 rounded-lg p-6 sticky top-6">
        <h2 className="font-bold text-[#25324B] text-base mb-1">
          Apply for this job
        </h2>
        <p className="text-sm text-[#7C8493] mb-5 line-clamp-1">{jobTitle}</p>

        {/* Success state */}
        {status === "success" && (
          <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-lg p-4 mb-5">
            <CheckCircle size={18} className="text-green-600 shrink-0 mt-0.5" />
            <p className="text-sm text-green-700 font-medium">{serverMessage}</p>
          </div>
        )}

        {/* Error state */}
        {status === "error" && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4 mb-5">
            <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
            <p className="text-sm text-red-600">{serverMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-[#25324B] mb-1.5">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("name")}
              placeholder="John Doe"
              className={`w-full text-sm border rounded px-3 py-2 outline-none placeholder:text-gray-400 text-[#25324B] focus:border-[#4640DE] transition-colors ${
                errors.name ? "border-red-400" : "border-gray-200"
              }`}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-[#25324B] mb-1.5">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="john@example.com"
              className={`w-full text-sm border rounded px-3 py-2 outline-none placeholder:text-gray-400 text-[#25324B] focus:border-[#4640DE] transition-colors ${
                errors.email ? "border-red-400" : "border-gray-200"
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Resume Link */}
          <div>
            <label className="block text-xs font-semibold text-[#25324B] mb-1.5">
              Resume Link <span className="text-red-500">*</span>
            </label>
            <input
              {...register("resume_link")}
              placeholder="https://drive.google.com/..."
              className={`w-full text-sm border rounded px-3 py-2 outline-none placeholder:text-gray-400 text-[#25324B] focus:border-[#4640DE] transition-colors ${
                errors.resume_link ? "border-red-400" : "border-gray-200"
              }`}
            />
            {errors.resume_link && (
              <p className="text-xs text-red-500 mt-1">
                {errors.resume_link.message}
              </p>
            )}
          </div>

          {/* Cover Note */}
          <div>
            <label className="block text-xs font-semibold text-[#25324B] mb-1.5">
              Cover Note{" "}
              <span className="text-[#7C8493] font-normal">(optional)</span>
            </label>
            <textarea
              {...register("cover_note")}
              rows={4}
              placeholder="Tell us why you're a great fit..."
              className="w-full text-sm border border-gray-200 rounded px-3 py-2 outline-none placeholder:text-gray-400 text-[#25324B] focus:border-[#4640DE] transition-colors resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-[#4640DE] text-white font-semibold text-sm py-2.5 rounded hover:bg-[#3730c0] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
          >
            {status === "loading" ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                Submitting…
              </>
            ) : (
              "Apply Now"
            )}
          </button>
        </form>
      </div>
    </aside>
  );
};

export default ApplyForm;
