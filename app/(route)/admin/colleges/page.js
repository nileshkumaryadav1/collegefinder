import Link from "next/link";
import React from "react";
import { Building2, PlusCircle, Pencil } from "lucide-react";

export default function AdminCollegesHome() {
  return (
    <section className="md:pt-24 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl md:p-10 p-4 flex flex-col items-center gap-8 border border-gray-200">
        {/* Header */}
        <div className="flex flex-col items-center gap-2">
          <Building2 className="w-12 h-12 text-accent" />
          <h1 className="md:text-3xl font-bold text-gray-900">College Management</h1>
          <p className="text-gray-500 text-sm text-center">
            Manage and update all college information from one place.
          </p>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          <Link
            href="/admin/colleges/manage"
            className="flex flex-col items-center justify-center bg-accent/10 hover:bg-accent hover:text-white text-accent border border-accent rounded-xl p-6 transition-all duration-300 shadow-sm"
          >
            <Building2 className="w-8 h-8 mb-2" />
            <span className="font-semibold">Manage Colleges</span>
          </Link>

          <Link
            href="/admin/colleges/add"
            className="flex flex-col items-center justify-center bg-green-100 hover:bg-green-500 hover:text-white text-green-600 border border-green-500 rounded-xl p-6 transition-all duration-300 shadow-sm"
          >
            <PlusCircle className="w-8 h-8 mb-2" />
            <span className="font-semibold">Add College</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
