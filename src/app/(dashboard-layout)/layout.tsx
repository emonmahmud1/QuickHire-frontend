import { ReactNode } from "react";
import Link from "next/link";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-[#F8F8FD]">
      {/* Admin header */}
      <header className="bg-white border-b border-gray-100 h-14 flex items-center px-6">
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-[#4640DE] text-xl">QuickHire</span>
            <span className="text-xs bg-[#4640DE]/10 text-[#4640DE] font-semibold px-2 py-0.5 rounded">
              Admin
            </span>
          </Link>
          <Link
            href="/jobs"
            className="text-sm text-[#515B6F] hover:text-[#4640DE] transition-colors"
          >
            ← Back to site
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;