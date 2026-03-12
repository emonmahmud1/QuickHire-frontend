"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Compass, LogOut } from "lucide-react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F8FD]">
        <p className="text-[#515B6F]">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F8FD]">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 h-16 flex items-center px-6">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-[#4640DE] rounded p-1.5">
              <Compass size={18} className="text-white" />
            </div>
            <span className="font-bold text-[#25324B] text-xl">QuickHire</span>
            {user?.role === "admin" && (
              <span className="text-xs bg-[#4640DE]/10 text-[#4640DE] font-semibold px-2 py-1 rounded">
                Admin
              </span>
            )}
          </Link>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#515B6F]">
              Hello, <span className="font-semibold text-[#25324B]">{user?.name}</span>
            </span>
            <button
              onClick={logout}
              className="flex items-center gap-2 text-sm text-[#515B6F] hover:text-[#4640DE] transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;