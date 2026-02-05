"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Building2, PlusCircle, Search } from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#6366f1", "#22c55e", "#f97316", "#ef4444"];

export default function AdminCollegePage() {
  const router = useRouter();
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(false);

  // filters
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  /* =======================
     Fetch colleges
  ======================= */
  const fetchColleges = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/colleges");
      const data = await res.json();
      setColleges(data.colleges || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  /* =======================
     Delete
  ======================= */
  const handleDelete = async (id) => {
    if (!confirm("Delete this college permanently?")) return;
    await fetch(`/api/admin/colleges/delete/${id}`, { method: "DELETE" });
    fetchColleges();
  };

  /* =======================
     Utils
  ======================= */
  const groupByCount = (items, key) =>
    Object.entries(
      items.reduce((acc, item) => {
        const v = item[key] || "Unknown";
        acc[v] = (acc[v] || 0) + 1;
        return acc;
      }, {}),
    ).map(([name, count]) => ({ name, count }));

  /* =======================
     Filtered Data
  ======================= */
  const filteredColleges = useMemo(() => {
    return colleges.filter((c) => {
      const matchesSearch =
        c.name?.toLowerCase().includes(search.toLowerCase()) ||
        c.city?.toLowerCase().includes(search.toLowerCase()) ||
        c.state?.toLowerCase().includes(search.toLowerCase());

      const matchesType = typeFilter === "All" || c.type === typeFilter;

      const matchesCategory =
        categoryFilter === "All" || c.category === categoryFilter;

      return matchesSearch && matchesType && matchesCategory;
    });
  }, [colleges, search, typeFilter, categoryFilter]);

  /* =======================
     Chart Data
  ======================= */
  const typeData = groupByCount(colleges, "type");
  const categoryData = groupByCount(colleges, "category");
  const stateData = groupByCount(colleges, "state");

  return (
    <section className="min-h-screen bg-[var(--background)] p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* ================= HEADER ================= */}
        <div className="text-center space-y-2">
          <Building2 className="mx-auto w-10 h-10 text-accent" />
          <h1 className="text-3xl font-bold">College Management</h1>
          <p className="text-gray-500">
            Manage colleges, insights, and data from one place
          </p>
        </div>

        {/* ================= ACTION BUTTONS ================= */}
        <div className="grid sm:grid-cols-2 gap-6">
          <Link href="/admin/colleges/manage" className="admin-card border border-[var(--border)] rounded-half p-4">
            <Building2 />
            <span>Manage Colleges</span>
          </Link>

          <Link
            href="/admin/colleges/add"
            className="admin-card bg-green-50 border-green-500 text-green-600 hover:bg-green-500 hover:text-white border border-[var(--border)] rounded-half p-4"
          >
            <PlusCircle />
            <span>Add College</span>
          </Link>
        </div>

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[var(--background)] border rounded-xl p-4 text-[var(--text)]">
          <Stat title="Total Colleges" value={colleges.length} />
          <Stat
            title="Govt Colleges"
            value={typeData.find((t) => t.name === "Government")?.count || 0}
          />
          <Stat
            title="Private Colleges"
            value={typeData.find((t) => t.name === "Private")?.count || 0}
          />
          <Stat title="Categories" value={categoryData.length} />
        </div>

        {/* ================= CHARTS ================= */}
        <div className="grid md:grid-cols-2 gap-6">
          <ChartCard title="Colleges by Type">
            <PieChart>
              <Pie
                data={typeData}
                dataKey="count"
                nameKey="name"
                outerRadius={90}
                label
              >
                {typeData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ChartCard>

          <ChartCard title="Colleges by Category">
            <BarChart data={categoryData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" />
            </BarChart>
          </ChartCard>
        </div>

        <ChartCard title="Colleges by State" height={320}>
          <BarChart data={stateData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" />
          </BarChart>
        </ChartCard>

        {/* ================= FILTERS ================= */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              className="pl-10 border rounded-lg p-2"
              placeholder="Search college / city / state"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option>All</option>
            {typeData.map((t) => (
              <option key={t.name}>{t.name}</option>
            ))}
          </select>

          <select
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option>All</option>
            {categoryData.map((c) => (
              <option key={c.name}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* ================= TABLE ================= */}
        <div className="border rounded-xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="">
              <tr>
                {["Name", "Type", "Category", "City", "State", "Actions"].map(
                  (h) => (
                    <th key={h} className="p-3 text-left border">
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {filteredColleges.map((c, i) => (
                <tr key={c._id} className="">
                  <td className="p-3 border font-medium">{i + 1}{" "}{c.name}</td>
                  <td className="p-3 border">{c.type}</td>
                  <td className="p-3 border">{c.category}</td>
                  <td className="p-3 border">{c.city}</td>
                  <td className="p-3 border">{c.state}</td>
                  <td className="p-3 border space-x-3">
                    <button
                      onClick={() => router.push(`/admin/colleges/${c.slug}`)}
                      className="text-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!loading && filteredColleges.length === 0 && (
            <p className="p-6 text-center text-gray-500">No colleges found</p>
          )}
        </div>
      </div>
    </section>
  );
}

/* =======================
   Reusable Components
======================= */

const Stat = ({ title, value }) => (
  <div className="border rounded-xl p-4 text-center shadow-sm">
    <p className="text-sm text-[var(--foreground)]">{title}</p>
    <p className="text-2xl font-bold text-[var(--foreground)]">{value}</p>
  </div>
);

const ChartCard = ({ title, children, height = 250 }) => (
  <div className="border rounded-xl p-5 shadow-sm">
    <h3 className="font-semibold mb-4">{title}</h3>
    <ResponsiveContainer width="100%" height={height}>
      {children}
    </ResponsiveContainer>
  </div>
);
