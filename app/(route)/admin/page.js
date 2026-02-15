"use client";

import { useEffect, useState, useMemo } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function AdminDashboard() {
  const [data, setData] = useState({
    colleges: [],
    exams: [],
    scholarships: [],
    blogs: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ---------- Safe Array Handler ----------
  const safeArray = (value) => {
    if (Array.isArray(value)) return value;
    if (Array.isArray(value?.data)) return value.data;
    if (Array.isArray(value?.results)) return value.results;
    return [];
  };

  // ---------- Fetch ----------
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setError(null);

        const endpoints = [
          "/api/colleges",
          "/api/exams",
          "/api/scholarships",
          "/api/posts",
        ];

        const responses = await Promise.allSettled(
          endpoints.map((url) => fetch(url)),
        );

        const jsonData = await Promise.all(
          responses.map(async (res) =>
            res.status === "fulfilled" ? await res.value.json() : [],
          ),
        );

        setData({
          colleges: safeArray(jsonData[0].colleges),
          exams: safeArray(jsonData[1]),
          scholarships: safeArray(jsonData[2]),
          blogs: safeArray(jsonData[3]),
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  // ---------- Derived ----------
  const getMonthlyGrowth = (items) => {
    const month = new Date().getMonth();
    return items.filter((i) => {
      if (!i?.createdAt) return false;
      const d = new Date(i.createdAt);
      return !isNaN(d) && d.getMonth() === month;
    }).length;
  };

  const getRecent = (items) =>
    [...items]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);

  const getStateDistribution = (items) => {
    const map = {};
    items.forEach((item) => {
      const state = item?.location?.state || "Unknown";
      map[state] = (map[state] || 0) + 1;
    });

    return Object.keys(map).length
      ? Object.keys(map).map((key) => ({
          name: key,
          value: map[key],
        }))
      : [{ name: "No Data", value: 1 }];
  };

  const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#14b8a6"];

  const growthData = useMemo(
    () =>
      Array.from({ length: 6 }).map((_, i) => ({
        month: `M-${5 - i}`,
        value: Math.floor(Math.random() * 50) + 10,
      })),
    [],
  );

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading dashboard...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-[var(--background)] p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm">
            Complete platform monitoring overview
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6">
          <StatCard title="Colleges" value={data.colleges.length} />
          <StatCard title="Exams" value={data.exams.length} />
          <StatCard title="Scholarships" value={data.scholarships.length} />
          <StatCard title="Blogs" value={data.blogs.length} />
        </div>

        {/* Sections */}
        <DashboardSection
          title="Colleges"
          items={data.colleges}
          monthly={getMonthlyGrowth(data.colleges)}
          distribution={getStateDistribution(data.colleges)}
          recentField="name"
          colors={COLORS}
          growthData={growthData}
        />

        <DashboardSection
          title="Exams"
          items={data.exams}
          monthly={getMonthlyGrowth(data.exams)}
          distribution={getStateDistribution(data.exams)}
          recentField="name"
          colors={COLORS}
          growthData={growthData}
        />

        <DashboardSection
          title="Scholarships"
          items={data.scholarships}
          monthly={getMonthlyGrowth(data.scholarships)}
          distribution={getStateDistribution(data.scholarships)}
          recentField="name"
          colors={COLORS}
          growthData={growthData}
        />

        <DashboardSection
          title="Blogs"
          items={data.blogs}
          monthly={getMonthlyGrowth(data.blogs)}
          distribution={getStateDistribution(data.blogs)}
          recentField="title"
          colors={COLORS}
          growthData={growthData}
        />
      </div>
    </div>
  );
}

// ================= COMPONENTS =================

function DashboardSection({
  title,
  items,
  monthly,
  distribution,
  recentField,
  colors,
  growthData,
}) {
  return (
    <div className="space-y-6 p-4 border border-[color:var(--border)] rounded-xl shadow-sm">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">
          {title} - {items.length}
        </h2>
        <div className="text-sm text-gray-500">Added This Month: {monthly}</div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <ChartCard title="6 Month Growth">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#6366f1" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title={`${title} State Distribution`}>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={distribution}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
              >
                {distribution.map((_, i) => (
                  <Cell key={i} fill={colors[i % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <RecentList title={`Recent ${title}`} items={items} field={recentField} />
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-white border rounded-xl p-6 shadow">
      <h3 className="text-sm font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
}

function RecentList({ title, items, field }) {
  const sorted = [...items]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="bg-white border rounded-xl p-6 shadow">
      <h3 className="text-sm font-semibold mb-4">{title}</h3>

      {sorted.length === 0 ? (
        <p className="text-gray-400 text-sm">No data found.</p>
      ) : (
        sorted.map((item, i) => (
          <div
            key={item?._id || i}
            className="text-sm text-gray-600 border-b pb-2"
          >
            {item?.[field] || "Untitled"}
          </div>
        ))
      )}
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white border rounded-xl p-6 shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
}
