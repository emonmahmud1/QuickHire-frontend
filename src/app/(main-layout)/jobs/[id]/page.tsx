import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getJobById } from "@/services/api";
import JobDetailInfo from "./_components/JobDetailInfo";
import ApplyForm from "./_components/ApplyForm";

interface JobDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = await params;
  const res = await getJobById(id);

  if (!res.success || !res.data) {
    notFound();
  }

  const job = res.data;

  return (
    <main className="min-h-screen bg-[#F8F8FD]">
      {/* Breadcrumb / back */}
      <section className="bg-white border-b border-gray-100 py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-1.5 text-sm text-[#515B6F] hover:text-[#4640DE] transition-colors"
          >
            <ArrowLeft size={15} />
            Back to Jobs
          </Link>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <JobDetailInfo job={job} />
          <ApplyForm jobId={job._id} jobTitle={job.title} />
        </div>
      </div>
    </main>
  );
}
