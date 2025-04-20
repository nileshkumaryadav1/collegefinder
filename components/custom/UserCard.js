"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import EditProfileModal from "./EditProfileModal";

export default function UserDashboardCard({ user }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/user/login");
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-teal-200 to-blue-300 p-3 rounded-lg">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        {/* Profile Section */}
        <div className="mb-6 text-center">
          <div className="w-24 h-24 rounded-full border-4 border-teal-500 overflow-hidden mb-4">
            <img
              src={user.profileImage ? user.profileImage : "/default-profile.png"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl font-semibold text-teal-700">{user.name}</h2>
          <p className="text-sm text-gray-600">{user.email}</p>
          <p className="mt-2 text-sm text-gray-600">{user.bio || "This user has no bio."}</p>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-6">
          {user.email && (
            <Link href={`mailto:${user.email}`}>
              <button className="text-teal-600 hover:text-teal-800 transition">
                <span className="font-medium">Email</span>
              </button>
            </Link>
          )}
          {user.instagram && (
            <Link href={user.instagram}>
              <button className="text-teal-600 hover:text-teal-800 transition">
                <span className="font-medium">Instagram</span>
              </button>
            </Link>
          )}
          {user.linkedin && (
            <Link href={user.linkedin}>
              <button className="text-teal-600 hover:text-teal-800 transition">
                <span className="font-medium">LinkedIn</span>
              </button>
            </Link>
          )}
        </div>

        {/* Buttons */}
        <div className="w-full">
          <button
            className="w-full py-2 mb-4 text-white bg-teal-600 rounded-md hover:bg-teal-700 transition"
            onClick={() => setOpen(true)}
          >
            Update Profile
          </button>
          <button
            className="w-full py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        open={open}
        onClose={() => setOpen(false)}
        user={user}
      />
    </div>
  );
}
