"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import EditProfileModal from "./EditProfileModal";

import { Instagram, Twitter, Mail, Globe } from "lucide-react";

const UserCardAlt = ({ user }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");

    if (!confirmLogout) return;

    sessionStorage.clear();
    localStorage.removeItem("token");
    router.push("/user/login");
  };

  const deleteUser = async (email) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone!"
    );

    if (!confirmDelete) return;

    const res = await fetch("/api/user", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const result = await res.json();
    alert(result.message);

    if (res.ok) {
      localStorage.removeItem("token");
      sessionStorage.clear();
      window.location.href = "/";
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-50 shadow-lg rounded-2xl p-6 flex md:flex-row flex-col gap-3 items-center max-w-2xl mx-auto">
      <img
        src={user.profileImage ? user.profileImage : "/default-user.jpg"}
        alt={user.name}
        className="w-24 h-24 rounded-full border-4 border-white shadow-md"
      />

      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold text-blue-800">{user.name}</h2>
        <p className="text-gray-600 mt-1 text-center">{user.bio || "No bio available. Please update your Account."}</p>

        <div className="flex gap-4 mt-3 text-blue-600">
          {/* {user.email && (
            <a href={`mailto:${user.email}`} title="Email">
              <Mail size={20} />
            </a>
          )} */}
          {user.instagram && (
            <a
              href={user.instagram}
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram"
            >
              <Instagram size={20} />
            </a>
          )}
          {user.twitter && (
            <a
              href={user.twitter}
              target="_blank"
              rel="noopener noreferrer"
              title="Twitter"
            >
              <Twitter size={20} />
            </a>
          )}
          {user.website && (
            <a
              href={user.website}
              target="_blank"
              rel="noopener noreferrer"
              title="Website"
            >
              <Globe size={20} />
            </a>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="w-full flex justify-center">
        {/* Update */}
        <button
          className="border py-2 px-3 rounded-md shadow-md transition cursor-pointer"
          onClick={() => setOpen(true)}
        >
          Update Profile
        </button>
        {/* logout */}
        <button
          className="border py-2 px-3 shadow-md cursor-pointer rounded-md transition mx-2"
          onClick={handleLogout}
        >
          Logout
        </button>
        {/* Delete */}
        <div className="hidden">
          <button
            onClick={() => deleteUser(user.email)}
            className="border py-2 px-3 shadow-md cursor-pointer rounded-md transition "
          >
            Delete{""}Account
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
};

export default UserCardAlt;
