"use client";

import { Avatar, Button, Card } from "@mui/material";
import { useRouter } from "next/navigation";
import { Mail, Linkedin, Instagram } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import EditProfileModal from "./EditProfileModal";

export default function UserCard({ user }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/user/login");
  };

  return (
    <div className="h-auto bg-gray-200 border border-gray-300 rounded-xl dark:bg-gray-900 md:py-6 py-2">
      <div className="max-w-5xl mx-auto px-4">
        {/* Page Title */}
        <h1 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-5">
          Profile Details
        </h1>

        {/* user detail Section */}
        <Card className="p-4 flex flex-col items-center gap-1 shadow-md">
          {/* Profile Image */}
          <Avatar
            src={user.profileImage ? user.profileImage : null}
            sx={{ width: 80, height: 80 }}
          />
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-600 dark:text-gray-300 mt-2">{user.bio}</p>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mt-3 mb-1">
            <Link href={`mailto:${user.email || ""}`} target="_blank">
              <Mail
                className="text-gray-900 dark:text-white hover:text-blue-500 transition"
                size={28}
              />
            </Link>
            <Link href={user.instagram || ""} target="_blank">
              <Instagram
                className="text-gray-900 dark:text-white hover:text-blue-500 transition"
                size={28}
              />
            </Link>
            <Link href={user.linkedin || ""} target="_blank">
              <Linkedin
                className="text-gray-900 dark:text-white hover:text-blue-500 transition"
                size={28}
              />
            </Link>
          </div>

          {/* Edit Profile Button */}
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => setOpen(true)}
          >
            Update Profile Details
          </Button>

          {/* Logout Button */}
          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={handleLogout}
          >
            Logout
          </Button>

          {/* Edit Profile Modal */}
          <EditProfileModal
            open={open}
            onClose={() => {
              setOpen(false);
            }}
            user={user}
          />
        </Card>
      </div>
    </div>
  );
}
