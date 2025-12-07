"use client";

import { Settings } from "lucide-react";
import { useState, useEffect } from "react";
import UserCardAlt from "@/components/custom/NewUserCard";
import Link from "next/link";

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [openSettings, setOpenSettings] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/user/login";
        return;
      }

      try {
        const res = await fetch("/api/user", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (res.ok) {
          setUser(data);
        } else {
          localStorage.removeItem("token");
          window.location.href = "/user/login";
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }

      setLoading(false);
    };

    fetchUser();
  }, []);

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

  if (loading || !user)
    return (
      <>
        <div className="md:min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-950 flex items-center justify-center px-4 py-10">
          <div className="bg-[var(--background)] rounded-xl shadow-xl w-full max-w-6xl flex flex-col md:flex-row overflow-hidden">
            {/* Right - Features */}
            <div className="w-full bg-blue-50 dark:bg-slate-800 py-20 flex flex-col justify-center">
              <h3 className="md:text-3xl text-2xl font-semibold text-gray-700 dark:text-white md:mb-4 text-center">
                ✨ What you will get after signing in
              </h3>
              <ul className="flex flex-col md:items-center gap-2 text-md text-gray-700 dark:text-white p-4">
                <li className="flex items-center gap-2">
                  <span className="text-blue-500">📬</span>
                  Regular Exam Notifications
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">🎓</span>
                  College Admission Alerts
                </li>
                <li className="flex md:items-center gap-2">
                  <span className="text-purple-500">📊</span>
                  Personalized College Recommendations
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-500">📰</span>
                  Education News & Updates
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">💾</span>
                  Save Favorite Colleges
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-pink-500">⚙️</span>
                  Dashboard Access & More!
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-slate-900 md:py-5 py-4 px-4 rounded-3xl max-w-6xl mx-auto space-y-6">
      {/* title and setting btn */}
      <section className="flex justify-between items-center px-4">
        {/* title */}
        <h2 className="text-xl font-bold flex gap-1">
          Welcome <p className="text-blue-700">{user.name}</p>😊!
        </h2>

        {/* Settings */}
        <div className="">
          <button
            onClick={() => setOpenSettings(!openSettings)}
            className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 hover:bg-[var(--background)] cursor-pointer"
          >
            <Settings size={22} />
          </button>

          {openSettings && (
            <div className="absolute right-0 md:mt-2 w-48 bg-white border shadow-lg rounded-md z-10">
              {/* Delete Button */}
              <div className="">
                <button
                  onClick={() => deleteUser(user.email)}
                  className="pr-18 pt-2 pb-2 pl-4 text-sm hover:bg-red-50 text-red-500 cursor-pointer"
                >
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
      {/* usercard */}
      <div
        className="flex justify-between items-start flex-wrap gap-2"
        onClick={() => setOpenSettings(false)}
      >
        <UserCardAlt user={user} />
      </div>
      {/* Email Opt-In */}
      <div className="bg-[var(--background)] p-6 rounded-xl shadow-md border">
        <h3 className="text-xl font-semibold mb-2">Get Regular Updates</h3>
        <p className="text-gray-600 mb-4">
          Subscribe to receive emails about new colleges, exams, and
          scholarships.
        </p>
        <form className="flex flex-col sm:flex-row gap-3">
          <input
            name=""
            // value={email}
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 border rounded-md"
          />
          <p className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700">
            Subscribe
          </p>
        </form>
      </div>
      {/* Favorites Section */}
      <div className="grid md:grid-cols-3 gap-4">
        {["Colleges", "Exams", "Scholarships"].map((item) => (
          <div key={item} className="bg-[var(--background)] p-4 rounded-xl shadow-md border">
            <h4 className="text-lg font-semibold mb-2">Favorite {item}</h4>
            <p className="text-gray-600">
              You have not saved any {item.toLowerCase()} yet.
            </p>
          </div>
        ))}
      </div>
      {/* Counseling Section */}
      <div className="bg-[var(--background)] p-6 rounded-xl shadow-md border">
        <h3 className="text-xl font-semibold mb-2">Personalized Counseling</h3>
        <p className="text-gray-600 mb-4">
          Need help finding the right college? Book a session with our
          counselor.
        </p>
        <Link
          href={"/sponsors"}
          className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700"
        >
          Book a Counseling Session
        </Link>
      </div>
      {/* Helpful Links */}
      <div className="bg-[var(--background)] p-6 rounded-xl shadow-md border">
        <h3 className="text-xl font-semibold mb-4">Useful Links</h3>
        <ul className="grid sm:grid-cols-2 gap-3 text-blue-600">
          {[
            "Help",
            "Contact CollegeFinder",
            "Privacy Policy",
            "Terms of Service",
            "Share Profile",
          ].map((link) => (
            <li key={link}>
              <button className="hover:underline">{link}</button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default DashboardPage;
