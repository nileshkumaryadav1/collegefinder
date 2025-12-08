"use client";

import { useEffect, useState, Fragment } from "react";
import { useRouter, useParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

/**
 * EditCollegePage (Vertical Sidebar Tabs)
 *
 * - Uses single PUT /api/colleges/[slug] to save whole form.
 * - Fetches existing college and merges with defaultData.
 * - Each tab is a small component that receives formData + setFormData.
 *
 * NOTE: add `uuid` dependency or replace uuidv4 with Date.now() if you prefer.
 */

/* -----------------------------
   DEFAULT DATA (matches schema)
   Keep this minimal but include all keys so merge works.
   You can expand or change field defaults later.
   ----------------------------- */
const defaultData = {
  // Basic
  name: "",
  slug: "",
  shortName: "",
  establishedYear: "",
  location: "",
  address: "",
  state: "",
  city: "",
  pincode: "",
  phone: "",
  email: "",
  websiteUrl: "",
  logoUrl: "",
  imageUrl: "",
  gallery: [],
  virtualTourLink: "",
  about: "",
  description: "",

  // Institutional
  type: "",
  affiliation: "",
  approvedBy: [],
  accreditedBy: [],
  departments: [],
  governingBody: "",
  university: "",

  // Academic
  coursesOffered: [], // array of objects
  admissionProcess: "",
  cutOff: [],

  // Fees & Scholarships
  fees: {
    tuition: "",
    hostel: "",
    misc: "",
    waiver: "",
    total: "",
    modeOfPayment: [],
    scholarshipAvailable: false,
  },
  scholarships: [],

  // Facilities
  facilities: [],
  campusArea: "",
  hostels: { boys: false, girls: false, capacity: "", description: "" },
  sportsFacilities: [],
  clubs: [],
  events: [],

  // Placements
  placements: {
    BTech: {
      highest: "",
      average: "",
      median: "",
      ratio: "",
      recruiters: [],
      topRecruitersLogos: [],
      placementReportPdf: "",
      yearwiseStats: [],
    },
    MTech: {
      highest: "",
      average: "",
      median: "",
      ratio: "",
      recruiters: [],
      topRecruitersLogos: [],
      placementReportPdf: "",
      yearwiseStats: [],
    },
    placementCellContact: "",
  },

  // Rankings
  nirfRanking: "",
  otherRankings: [], // array objects
  nirfPdf: "",

  // Social
  socialLinks: {
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    youtube: "",
  },

  // Analytics & SEO & Meta
  views: 0,
  likes: 0,
  favorites: 0,
  rating: 0,
  reviewCount: 0,
  shareCount: 0,
  approved: false,
  verified: false,

  keywords: [],
  tags: [],
  seo: {
    title: "",
    description: "",
    keywords: [],
    canonicalUrl: "",
  },

  // Stats & metadata
  noOfStudents: "",
  noOfFaculties: "",
  lastUpdatedBy: "",
  // timestamps handled by backend
};

/* -----------------------------
   Utilities
   - mergeDeep: safe deep merge
   - updateAtPath: for nested updates using dot path
   - array helpers: add/remove/update
   ----------------------------- */
const isPlainObject = (v) =>
  typeof v === "object" && v !== null && !Array.isArray(v);

function mergeDeep(target, source) {
  // returns a new merged object (doesn't mutate source)
  const out = { ...(target || {}) };
  for (const key of Object.keys(source || {})) {
    const sv = source[key];
    if (isPlainObject(sv)) {
      out[key] = mergeDeep(out[key] || {}, sv);
    } else {
      out[key] = sv;
    }
  }
  return out;
}

function updateAtPath(obj, path, value) {
  // path: "fees.tuition" or "placements.BTech.highest"
  const keys = path.split(".");
  const out = { ...obj };
  let cur = out;
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i];
    if (cur[k] === undefined || cur[k] === null) cur[k] = {};
    cur[k] = Array.isArray(cur[k]) ? [...cur[k]] : { ...cur[k] };
    cur = cur[k];
  }
  cur[keys[keys.length - 1]] = value;
  return out;
}

/* -----------------------------
   Tab list
   ----------------------------- */
const TABS = [
  { id: "basic", label: "Basic Info" },
  { id: "institution", label: "Institutional" },
  { id: "academic", label: "Academic" },
  { id: "cutoff", label: "Cutoffs" },
  { id: "fees", label: "Fees & Scholarships" },
  { id: "facilities", label: "Facilities" },
  { id: "placements", label: "Placements" },
  { id: "rankings", label: "Rankings" },
  { id: "social", label: "Social Links" },
  { id: "seo", label: "SEO" },
  { id: "analytics", label: "Analytics" },
  { id: "stats", label: "Stats & Verification" },
  { id: "gallery", label: "Gallery" },
  { id: "metadata", label: "Metadata" },
];

/* -----------------------------
   MAIN COMPONENT
   ----------------------------- */
export default function EditCollegePage() {
  const { slug } = useParams();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("basic");
  const [formData, setFormData] = useState(defaultData);
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingFetch, setLoadingFetch] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  /* Fetch existing college */
  useEffect(() => {
    if (!slug) return;
    setLoadingFetch(true);
    setError("");
    (async () => {
      try {
        const res = await fetch(`/api/colleges/${slug}`);
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.message || "Failed to fetch college");
        }
        const payload = await res.json();
        const existing = payload.data || payload || {};
        // safe deep merge: default <- existing
        const merged = mergeDeep(defaultData, existing);
        setFormData(merged);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load college");
      } finally {
        setLoadingFetch(false);
      }
    })();
  }, [slug]);

  /* Generic change handlers */
  const handleFieldChange = (e) => {
    const { name, value, type, checked } = e.target;
    // support checkbox
    const val = type === "checkbox" ? checked : value;
    if (name.includes(".")) {
      setFormData((prev) => updateAtPath(prev, name, val));
    } else {
      setFormData((prev) => ({ ...prev, [name]: val }));
    }
  };

  // helper to set arbitrary value at path (used by child components)
  const setAtPath = (path, value) => {
    setFormData((prev) => updateAtPath(prev, path, value));
  };

  /* Array helpers */
  const pushToArray = (path, item) => {
    setFormData((prev) => {
      // get current array:
      const keys = path.split(".");
      let cur = prev;
      for (let i = 0; i < keys.length; i++) {
        cur = cur?.[keys[i]];
        if (cur === undefined) break;
      }
      const arr = Array.isArray(cur) ? cur : [];
      // build new object with inserted item
      const newArr = [...arr, item];
      return updateAtPath(prev, path, newArr);
    });
  };

  const removeFromArray = (path, index) => {
    setFormData((prev) => {
      const keys = path.split(".");
      let cur = prev;
      for (let i = 0; i < keys.length; i++) cur = cur?.[keys[i]];
      const arr = Array.isArray(cur) ? cur : [];
      const newArr = arr.filter((_, i) => i !== index);
      return updateAtPath(prev, path, newArr);
    });
  };

  const updateArrayItem = (path, index, newItem) => {
    // path points to array, e.g., "coursesOffered"
    setFormData((prev) => {
      const keys = path.split(".");
      let cur = prev;
      for (let i = 0; i < keys.length; i++) cur = cur?.[keys[i]];
      const arr = Array.isArray(cur) ? cur : [];
      const newArr = [...arr];
      newArr[index] = newItem;
      return updateAtPath(prev, path, newArr);
    });
  };

  /* Save handler: single PUT */
  const handleSave = async () => {
    setLoadingSave(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch(`/api/colleges/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Update failed");
      }
      setMessage("College updated successfully!");
      // optional: refresh or route
      // router.push("/admin/colleges");
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to save");
    } finally {
      setLoadingSave(false);
    }
  };

  /* UI */
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6">
      <div className="max-w-7xl mx-auto bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden">
        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 border-r border-slate-200 dark:border-slate-700 p-4">
            <h2 className="text-xl font-semibold mb-4">Edit College</h2>

            <div className="space-y-1">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`w-full text-left px-3 py-2 rounded-md transition ${
                    activeTab === t.id
                      ? "bg-blue-600 text-white"
                      : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="mt-6">
              <p className="text-sm text-slate-500">
                Slug: <span className="font-medium">{slug}</span>
              </p>
              <div className="mt-4">
                <button
                  onClick={handleSave}
                  disabled={loadingSave}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
                >
                  {loadingSave ? "Saving..." : "Save All Changes"}
                </button>
              </div>

              {message && <p className="mt-3 text-sm text-green-600">{message}</p>}
              {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
              {loadingFetch && <p className="mt-3 text-sm text-slate-500">Loading data...</p>}
            </div>
          </aside>

          {/* Content */}
          <main className="flex-1 p-6">
            <div className="mb-4">
              <h1 className="text-2xl font-bold">{formData.name || "New College"}</h1>
              <p className="text-sm text-slate-500 mt-1">{formData.description?.slice(0, 140)}</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 rounded-md p-4">
              {/* Tab content switch */}
              <div>
                {activeTab === "basic" && (
                  <BasicInfoTab
                    formData={formData}
                    onChange={handleFieldChange}
                    setAtPath={setAtPath}
                    pushToArray={pushToArray}
                    removeFromArray={removeFromArray}
                  />
                )}

                {activeTab === "institution" && (
                  <InstitutionalTab
                    formData={formData}
                    onChange={handleFieldChange}
                    pushToArray={pushToArray}
                    removeFromArray={removeFromArray}
                    setAtPath={setAtPath}
                  />
                )}

                {activeTab === "academic" && (
                  <AcademicTab
                    formData={formData}
                    setAtPath={setAtPath}
                    pushToArray={pushToArray}
                    removeFromArray={removeFromArray}
                    updateArrayItem={updateArrayItem}
                  />
                )}

                {activeTab === "cutoff" && (
                  <CutoffTab
                    formData={formData}
                    pushToArray={pushToArray}
                    removeFromArray={removeFromArray}
                    updateArrayItem={updateArrayItem}
                  />
                )}

                {activeTab === "fees" && (
                  <FeesTab formData={formData} onChange={handleFieldChange} setAtPath={setAtPath} />
                )}

                {activeTab === "facilities" && (
                  <FacilitiesTab
                    formData={formData}
                    onChange={handleFieldChange}
                    pushToArray={pushToArray}
                    removeFromArray={removeFromArray}
                    setAtPath={setAtPath}
                  />
                )}

                {activeTab === "placements" && (
                  <PlacementsTab
                    formData={formData}
                    setAtPath={setAtPath}
                    pushToArray={pushToArray}
                    removeFromArray={removeFromArray}
                    updateArrayItem={updateArrayItem}
                  />
                )}

                {activeTab === "rankings" && (
                  <RankingsTab
                    formData={formData}
                    onChange={handleFieldChange}
                    pushToArray={pushToArray}
                    removeFromArray={removeFromArray}
                  />
                )}

                {activeTab === "social" && (
                  <SocialTab formData={formData} onChange={handleFieldChange} />
                )}

                {activeTab === "seo" && <SeoTab formData={formData} onChange={handleFieldChange} />}

                {activeTab === "analytics" && (
                  <AnalyticsTab formData={formData} onChange={handleFieldChange} />
                )}

                {activeTab === "stats" && (
                  <StatsTab formData={formData} onChange={handleFieldChange} setAtPath={setAtPath} />
                )}

                {activeTab === "gallery" && (
                  <GalleryTab
                    formData={formData}
                    pushToArray={pushToArray}
                    removeFromArray={removeFromArray}
                    setAtPath={setAtPath}
                  />
                )}

                {activeTab === "metadata" && (
                  <MetadataTab formData={formData} />
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

/* -----------------------------
   TAB COMPONENTS (lightweight)
   Each tab receives formData + helpers and updates parent state.
   Expand each later with validation, nested editors, and file uploads.
   ----------------------------- */

/* Basic Info Tab */
function BasicInfoTab({ formData, onChange, setAtPath, pushToArray, removeFromArray }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Basic Information</h3>

      <div className="grid grid-cols-2 gap-4">
        <input
          name="name"
          value={formData.name || ""}
          onChange={onChange}
          placeholder="College Name"
          className="border rounded p-2"
        />
        <input
          name="slug"
          value={formData.slug || ""}
          onChange={onChange}
          placeholder="Slug"
          className="border rounded p-2"
        />
        <input
          name="shortName"
          value={formData.shortName || ""}
          onChange={onChange}
          placeholder="Short Name (e.g., IITB)"
          className="border rounded p-2"
        />
        <input
          name="establishedYear"
          value={formData.establishedYear || ""}
          onChange={onChange}
          placeholder="Established Year"
          className="border rounded p-2"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <input name="location" value={formData.location || ""} onChange={onChange} placeholder="Location" className="border rounded p-2" />
        <input name="city" value={formData.city || ""} onChange={onChange} placeholder="City" className="border rounded p-2" />
        <input name="state" value={formData.state || ""} onChange={onChange} placeholder="State" className="border rounded p-2" />
        <input name="pincode" value={formData.pincode || ""} onChange={onChange} placeholder="Pincode" className="border rounded p-2" />
        <input name="address" value={formData.address || ""} onChange={onChange} placeholder="Address" className="border rounded p-2 col-span-2" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <input name="phone" value={formData.phone || ""} onChange={onChange} placeholder="Phone" className="border rounded p-2" />
        <input name="email" value={formData.email || ""} onChange={onChange} placeholder="Email" className="border rounded p-2" />
        <input name="websiteUrl" value={formData.websiteUrl || ""} onChange={onChange} placeholder="Website URL" className="border rounded p-2" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input name="logoUrl" value={formData.logoUrl || ""} onChange={onChange} placeholder="Logo URL" className="border rounded p-2" />
        <input name="imageUrl" value={formData.imageUrl || ""} onChange={onChange} placeholder="Cover Image URL" className="border rounded p-2" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Gallery</label>
        <div className="space-y-2">
          {(formData.gallery || []).map((g, i) => (
            <div key={i} className="flex gap-2">
              <input
                className="border rounded p-2 flex-1"
                value={g}
                onChange={(e) => setAtPath(`gallery.${i}`, e.target.value)}
              />
              <button type="button" className="px-2 rounded bg-red-500 text-white" onClick={() => removeFromArray("gallery", i)}>Remove</button>
            </div>
          ))}
          <div>
            <button type="button" className="px-3 py-1 rounded bg-blue-600 text-white" onClick={() => pushToArray("gallery", "")}>
              Add Image
            </button>
          </div>
        </div>
      </div>

      <div>
        <textarea name="about" value={formData.about || ""} onChange={onChange} placeholder="About (short)" className="w-full border rounded p-2 h-24" />
      </div>

      <div>
        <textarea name="description" value={formData.description || ""} onChange={onChange} placeholder="Full Description" className="w-full border rounded p-2 h-32" />
      </div>
    </div>
  );
}

/* Institutional Tab */
function InstitutionalTab({ formData, onChange, pushToArray, removeFromArray, setAtPath }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Institutional Details</h3>

      <div className="grid grid-cols-2 gap-4">
        <select name="type" value={formData.type || ""} onChange={onChange} className="border rounded p-2">
          <option value="">Select Type</option>
          <option value="Government">Government</option>
          <option value="Private">Private</option>
          <option value="Deemed">Deemed</option>
          <option value="Autonomous">Autonomous</option>
        </select>

        <input name="affiliation" value={formData.affiliation || ""} onChange={onChange} placeholder="Affiliation" className="border rounded p-2" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Approved By (comma-separated editable list)</label>
        <div className="space-y-2">
          {(formData.approvedBy || []).map((v, i) => (
            <div className="flex gap-2" key={i}>
              <input value={v} onChange={(e) => setAtPath(`approvedBy.${i}`, e.target.value)} className="flex-1 border rounded p-2" />
              <button type="button" className="px-2 rounded bg-red-500 text-white" onClick={() => removeFromArray("approvedBy", i)}>Remove</button>
            </div>
          ))}
          <div>
            <button type="button" className="px-3 py-1 rounded bg-blue-600 text-white" onClick={() => pushToArray("approvedBy", "")}>Add Approved</button>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Accredited By</label>
        <div className="space-y-2">
          {(formData.accreditedBy || []).map((v, i) => (
            <div className="flex gap-2" key={i}>
              <input value={v} onChange={(e) => setAtPath(`accreditedBy.${i}`, e.target.value)} className="flex-1 border rounded p-2" />
              <button type="button" className="px-2 rounded bg-red-500 text-white" onClick={() => removeFromArray("accreditedBy", i)}>Remove</button>
            </div>
          ))}
          <div>
            <button type="button" className="px-3 py-1 rounded bg-blue-600 text-white" onClick={() => pushToArray("accreditedBy", "")}>Add Accredited</button>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Departments</label>
        <div className="space-y-2">
          {(formData.departments || []).map((v, i) => (
            <div className="flex gap-2" key={i}>
              <input value={v} onChange={(e) => setAtPath(`departments.${i}`, e.target.value)} className="flex-1 border rounded p-2" />
              <button type="button" className="px-2 rounded bg-red-500 text-white" onClick={() => removeFromArray("departments", i)}>Remove</button>
            </div>
          ))}
          <div>
            <button type="button" className="px-3 py-1 rounded bg-blue-600 text-white" onClick={() => pushToArray("departments", "")}>Add Department</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input name="governingBody" value={formData.governingBody || ""} onChange={onChange} placeholder="Governing Body" className="border rounded p-2" />
        <input name="university" value={formData.university || ""} onChange={onChange} placeholder="University" className="border rounded p-2" />
      </div>
    </div>
  );
}

/* Academic Tab */
function AcademicTab({ formData, setAtPath, pushToArray, removeFromArray, updateArrayItem }) {
  const addEmptyCourse = () => {
    pushToArray("coursesOffered", {
      id: uuidv4(),
      program: "B.Tech",
      specialization: "",
      duration: "",
      eligibility: "",
      intake: "",
      entranceExams: [],
      mode: "Full-time",
      totalFees: "",
      hostelFees: "",
      feeWaiver: "",
      syllabusPdf: "",
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Academic Information</h3>

      <div>
        <label className="block text-sm font-medium mb-1">Admission Process</label>
        <textarea value={formData.admissionProcess || ""} onChange={(e) => setAtPath("admissionProcess", e.target.value)} className="w-full border rounded p-2 h-24" />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h4 className="font-medium">Courses Offered</h4>
          <button className="px-3 py-1 rounded bg-blue-600 text-white" onClick={addEmptyCourse}>Add Course</button>
        </div>

        <div className="space-y-3 mt-3">
          {(formData.coursesOffered || []).map((course, idx) => (
            <div key={course.id || idx} className="border rounded p-3 bg-white dark:bg-slate-800">
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm font-medium">{course.program} — {course.specialization || "Untitled"}</div>
                <div className="flex gap-2">
                  <button className="px-2 py-1 rounded bg-red-500 text-white" onClick={() => removeFromArray("coursesOffered", idx)}>Remove</button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <select value={course.program || "B.Tech"} onChange={(e) => updateArrayItem("coursesOffered", idx, { ...course, program: e.target.value })} className="border rounded p-1">
                  <option value="B.Tech">B.Tech</option>
                  <option value="M.Tech">M.Tech</option>
                </select>
                <input value={course.specialization || ""} placeholder="Specialization" onChange={(e) => updateArrayItem("coursesOffered", idx, { ...course, specialization: e.target.value })} className="border rounded p-1" />
                <input value={course.duration || ""} placeholder="Duration" onChange={(e) => updateArrayItem("coursesOffered", idx, { ...course, duration: e.target.value })} className="border rounded p-1" />
              </div>

              <div className="grid grid-cols-3 gap-2 mt-2">
                <input value={course.eligibility || ""} placeholder="Eligibility" onChange={(e) => updateArrayItem("coursesOffered", idx, { ...course, eligibility: e.target.value })} className="border rounded p-1" />
                <input value={course.intake || ""} placeholder="Intake" onChange={(e) => updateArrayItem("coursesOffered", idx, { ...course, intake: e.target.value })} className="border rounded p-1" />
                <input value={(course.entranceExams || []).join(", ")} placeholder="Entrance Exams (comma-separated)" onChange={(e) => updateArrayItem("coursesOffered", idx, { ...course, entranceExams: e.target.value.split(",").map(s => s.trim()) })} className="border rounded p-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Cutoff Tab */
function CutoffTab({ formData, pushToArray, removeFromArray, updateArrayItem }) {
  const addEmptyCutoff = () => {
    pushToArray("cutOff", { year: new Date().getFullYear(), program: "", specialization: "", category: "", exam: "", closingRank: "" });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Cutoffs</h3>

      <div>
        <div className="flex items-center justify-between">
          <h4 className="font-medium">Cutoff entries</h4>
          <button className="px-3 py-1 rounded bg-blue-600 text-white" onClick={addEmptyCutoff}>Add Cutoff</button>
        </div>

        <div className="space-y-2 mt-3">
          {(formData.cutOff || []).map((c, idx) => (
            <div key={idx} className="grid grid-cols-6 gap-2 items-center border rounded p-2">
              <input value={c.year || ""} onChange={(e) => updateArrayItem("cutOff", idx, { ...c, year: Number(e.target.value) })} className="border rounded p-1" placeholder="Year" />
              <select value={c.program || ""} onChange={(e) => updateArrayItem("cutOff", idx, { ...c, program: e.target.value })} className="border rounded p-1">
                <option value="">Program</option>
                <option value="B.Tech">B.Tech</option>
                <option value="M.Tech">M.Tech</option>
              </select>
              <input value={c.specialization || ""} onChange={(e) => updateArrayItem("cutOff", idx, { ...c, specialization: e.target.value })} className="border rounded p-1" placeholder="Specialization" />
              <input value={c.category || ""} onChange={(e) => updateArrayItem("cutOff", idx, { ...c, category: e.target.value })} className="border rounded p-1" placeholder="Category" />
              <input value={c.closingRank || ""} onChange={(e) => updateArrayItem("cutOff", idx, { ...c, closingRank: e.target.value })} className="border rounded p-1" placeholder="Closing Rank" />
              <div className="flex gap-2">
                <button className="px-2 py-1 rounded bg-red-500 text-white" onClick={() => removeFromArray("cutOff", idx)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Fees Tab */
function FeesTab({ formData, onChange, setAtPath }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Fees & Scholarships</h3>

      <div className="grid grid-cols-3 gap-3">
        <input name="fees.tuition" value={formData.fees?.tuition || ""} onChange={onChange} placeholder="Tuition" className="border rounded p-2" />
        <input name="fees.hostel" value={formData.fees?.hostel || ""} onChange={onChange} placeholder="Hostel" className="border rounded p-2" />
        <input name="fees.misc" value={formData.fees?.misc || ""} onChange={onChange} placeholder="Misc" className="border rounded p-2" />
        <input name="fees.waiver" value={formData.fees?.waiver || ""} onChange={onChange} placeholder="Waiver Info" className="border rounded p-2" />
        <input name="fees.total" value={formData.fees?.total || ""} onChange={onChange} placeholder="Total" className="border rounded p-2" />
        <input name="fees.scholarshipAvailable" value={formData.fees?.scholarshipAvailable ? "true" : ""} onChange={(e) => setAtPath("fees.scholarshipAvailable", e.target.value === "true")} placeholder="Scholarship Available? true/false" className="border rounded p-2" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Mode Of Payment (comma separated)</label>
        <input value={(formData.fees?.modeOfPayment || []).join(", ")} onChange={(e) => setAtPath("fees.modeOfPayment", e.target.value.split(",").map(s => s.trim()))} className="border rounded p-2 w-full" placeholder="Online, DD, Bank Transfer" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Scholarships</label>
        <div className="space-y-2">
          {(formData.scholarships || []).map((s, i) => (
            <div key={i} className="grid grid-cols-4 gap-2 items-center">
              <input value={s.name || ""} onChange={(e) => setAtPath(`scholarships.${i}.name`, e.target.value)} className="border rounded p-1" placeholder="Name" />
              <input value={s.eligibility || ""} onChange={(e) => setAtPath(`scholarships.${i}.eligibility`, e.target.value)} className="border rounded p-1" placeholder="Eligibility" />
              <input value={s.amount || ""} onChange={(e) => setAtPath(`scholarships.${i}.amount`, e.target.value)} className="border rounded p-1" placeholder="Amount" />
              <input value={s.link || ""} onChange={(e) => setAtPath(`scholarships.${i}.link`, e.target.value)} className="border rounded p-1" placeholder="Link" />
            </div>
          ))}
        </div>
        <div className="mt-2">
          <button className="px-3 py-1 rounded bg-blue-600 text-white" onClick={() => pushToArray("scholarships", { name: "", eligibility: "", amount: "", link: "" })}>Add Scholarship</button>
        </div>
      </div>
    </div>
  );
}

/* Facilities Tab */
function FacilitiesTab({ formData, onChange, pushToArray, removeFromArray, setAtPath }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Facilities</h3>

      <div>
        <label className="block text-sm font-medium mb-1">Facilities (list)</label>
        <div className="space-y-2">
          {(formData.facilities || []).map((f, i) => (
            <div key={i} className="flex gap-2">
              <input className="flex-1 border rounded p-2" value={f} onChange={(e) => setAtPath(`facilities.${i}`, e.target.value)} />
              <button className="px-2 py-1 rounded bg-red-500 text-white" onClick={() => removeFromArray("facilities", i)}>Remove</button>
            </div>
          ))}
          <button className="px-3 py-1 rounded bg-blue-600 text-white" onClick={() => pushToArray("facilities", "")}>Add Facility</button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <input name="campusArea" value={formData.campusArea || ""} onChange={onChange} placeholder="Campus Area" className="border rounded p-2" />
        <input name="hostels.capacity" value={formData.hostels?.capacity || ""} onChange={onChange} placeholder="Hostel Capacity" className="border rounded p-2" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Hostels Available</label>
        <div className="flex gap-3">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={!!formData.hostels?.boys} onChange={(e) => setAtPath("hostels.boys", e.target.checked)} />
            Boys
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={!!formData.hostels?.girls} onChange={(e) => setAtPath("hostels.girls", e.target.checked)} />
            Girls
          </label>
        </div>

        <textarea value={formData.hostels?.description || ""} onChange={(e) => setAtPath("hostels.description", e.target.value)} placeholder="Hostel description" className="w-full border rounded p-2 mt-2" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Sports Facilities (list)</label>
        <div className="space-y-2">
          {(formData.sportsFacilities || []).map((f, i) => (
            <div key={i} className="flex gap-2">
              <input className="flex-1 border rounded p-2" value={f} onChange={(e) => setAtPath(`sportsFacilities.${i}`, e.target.value)} />
              <button className="px-2 py-1 rounded bg-red-500 text-white" onClick={() => removeFromArray("sportsFacilities", i)}>Remove</button>
            </div>
          ))}
          <button className="px-3 py-1 rounded bg-blue-600 text-white" onClick={() => pushToArray("sportsFacilities", "")}>Add Facility</button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Clubs (list)</label>
        <div className="space-y-2">
          {(formData.clubs || []).map((f, i) => (
            <div key={i} className="flex gap-2">
              <input className="flex-1 border rounded p-2" value={f} onChange={(e) => setAtPath(`clubs.${i}`, e.target.value)} />
              <button className="px-2 py-1 rounded bg-red-500 text-white" onClick={() => removeFromArray("clubs", i)}>Remove</button>
            </div>
          ))}
          <button className="px-3 py-1 rounded bg-blue-600 text-white" onClick={() => pushToArray("clubs", "")}>Add Club</button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Events (list)</label>
        {formData.events.map((f, i) => (
          <div key={i} className="flex gap-2">
            <input className="flex-1 border rounded p-2" value={f} onChange={(e) => setAtPath(`events.${i}`, e.target.value)} />
            <button className="px-2 py-1 rounded bg-red-500 text-white" onClick={() => removeFromArray("events", i)}>Remove</button>
          </div>
        ))}
         <button className="px-3 py-1 rounded bg-blue-600 text-white" onClick={() => pushToArray("events", "")}>Add Event</button>
      </div>
    </div>
  );
}

/* Placements Tab */
function PlacementsTab({ formData, setAtPath, pushToArray, removeFromArray, updateArrayItem }) {
  const addBtechYearStat = () => {
    pushToArray("placements.BTech.yearwiseStats", { year: new Date().getFullYear(), highest: "", average: "", median: "", placedStudents: 0, totalStudents: 0 });
  };

  const addMtechYearStat = () => {
    pushToArray("placements.MTech.yearwiseStats", { year: new Date().getFullYear(), highest: "", average: "", median: "", placedStudents: 0, totalStudents: 0 });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Placements</h3>

      <div className="grid grid-cols-3 gap-3">
        <input value={formData.placements?.BTech?.highest || ""} onChange={(e) => setAtPath("placements.BTech.highest", e.target.value)} placeholder="BTech Highest" className="border rounded p-2" />
        <input value={formData.placements?.BTech?.average || ""} onChange={(e) => setAtPath("placements.BTech.average", e.target.value)} placeholder="BTech Average" className="border rounded p-2" />
        <input value={formData.placements?.BTech?.median || ""} onChange={(e) => setAtPath("placements.BTech.median", e.target.value)} placeholder="BTech Median" className="border rounded p-2" />
      </div>

      <div>
        <label className="block font-medium">BTech Yearwise Stats</label>
        {(formData.placements?.BTech?.yearwiseStats || []).map((s, i) => (
          <div key={i} className="grid grid-cols-6 gap-2 items-center border rounded p-2 mt-2">
            <input value={s.year || ""} onChange={(e) => updateArrayItem("placements.BTech.yearwiseStats", i, { ...s, year: Number(e.target.value) })} placeholder="Year" className="border rounded p-1" />
            <input value={s.highest || ""} onChange={(e) => updateArrayItem("placements.BTech.yearwiseStats", i, { ...s, highest: e.target.value })} placeholder="Highest" className="border rounded p-1" />
            <input value={s.average || ""} onChange={(e) => updateArrayItem("placements.BTech.yearwiseStats", i, { ...s, average: e.target.value })} placeholder="Average" className="border rounded p-1" />
            <input value={s.median || ""} onChange={(e) => updateArrayItem("placements.BTech.yearwiseStats", i, { ...s, median: e.target.value })} placeholder="Median" className="border rounded p-1" />
            <input value={s.placedStudents || ""} onChange={(e) => updateArrayItem("placements.BTech.yearwiseStats", i, { ...s, placedStudents: Number(e.target.value) })} placeholder="Placed Students" className="border rounded p-1" />
            <button className="px-2 py-1 rounded bg-red-500 text-white" onClick={() => removeFromArray("placements.BTech.yearwiseStats", i)}>Remove</button>
          </div>
        ))}
        <div className="mt-2">
          <button className="px-3 py-1 rounded bg-blue-600 text-white" onClick={addBtechYearStat}>Add BTech Year Stat</button>
        </div>
      </div>

      <div className="mt-4 border-t pt-4">
        <h4 className="font-medium">MTech</h4>
        <div className="grid grid-cols-3 gap-3">
          <input value={formData.placements?.MTech?.highest || ""} onChange={(e) => setAtPath("placements.MTech.highest", e.target.value)} placeholder="MTech Highest" className="border rounded p-2" />
          <input value={formData.placements?.MTech?.average || ""} onChange={(e) => setAtPath("placements.MTech.average", e.target.value)} placeholder="MTech Average" className="border rounded p-2" />
          <input value={formData.placements?.MTech?.median || ""} onChange={(e) => setAtPath("placements.MTech.median", e.target.value)} placeholder="MTech Median" className="border rounded p-2" />
        </div>

        <div className="mt-3">
        <label className="block font-medium">MTech Yearwise Stats</label>
          {(formData.placements?.MTech?.yearwiseStats || []).map((s, i) => (
            <div key={i} className="grid grid-cols-6 gap-2 items-center border rounded p-2 mt-2">
              <input value={s.year || ""} onChange={(e) => updateArrayItem("placements.MTech.yearwiseStats", i, { ...s, year: Number(e.target.value) })} placeholder="Year" className="border rounded p-1" />
              <input value={s.highest || ""} onChange={(e) => updateArrayItem("placements.MTech.yearwiseStats", i, { ...s, highest: e.target.value })} placeholder="Highest" className="border rounded p-1" />
              <input value={s.average || ""} onChange={(e) => updateArrayItem("placements.MTech.yearwiseStats", i, { ...s, average: e.target.value })} placeholder="Average" className="border rounded p-1" />
              <input value={s.median || ""} onChange={(e) => updateArrayItem("placements.MTech.yearwiseStats", i, { ...s, median: e.target.value })} placeholder="Median" className="border rounded p-1" />
              <input value={s.placedStudents || ""} onChange={(e) => updateArrayItem("placements.MTech.yearwiseStats", i, { ...s, placedStudents: Number(e.target.value) })} placeholder="Placed students" className="border rounded p-1" />
              <button className="px-2 py-1 rounded bg-red-500 text-white" onClick={() => removeFromArray("placements.MTech.yearwiseStats", i)}>Remove</button>
            </div>
          ))}
          <div className="mt-2">
            <button className="px-3 py-1 rounded bg-blue-600 text-white" onClick={addMtechYearStat}>Add MTech Year Stat</button>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <input value={formData.placements?.placementCellContact || ""} onChange={(e) => setAtPath("placements.placementCellContact", e.target.value)} placeholder="Placement Cell Contact" className="border rounded p-2 w-full" />
      </div>
    </div>
  );
}

/* Rankings Tab */
function RankingsTab({ formData, onChange, pushToArray, removeFromArray }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Rankings</h3>

      <div className="grid grid-cols-3 gap-3">
        <input name="nirfRanking" value={formData.nirfRanking || ""} onChange={onChange} placeholder="NIRF Ranking" className="border rounded p-2" />
        <input name="nirfPdf" value={formData.nirfPdf || ""} onChange={onChange} placeholder="NIRF PDF URL" className="border rounded p-2" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Other Rankings</label>
        <div className="space-y-2">
          {(formData.otherRankings || []).map((r, i) => (
            <div key={i} className="grid grid-cols-4 gap-2">
              <input value={r.source || ""} onChange={(e) => setAtPath(`otherRankings.${i}.source`, e.target.value)} placeholder="Source" className="border rounded p-1" />
              <input value={r.year || ""} onChange={(e) => setAtPath(`otherRankings.${i}.year`, e.target.value)} placeholder="Year" className="border rounded p-1" />
              <input value={r.rank || ""} onChange={(e) => setAtPath(`otherRankings.${i}.rank`, e.target.value)} placeholder="Rank" className="border rounded p-1" />
              <button className="px-2 py-1 rounded bg-red-500 text-white" onClick={() => removeFromArray("otherRankings", i)}>Remove</button>
            </div>
          ))}
          <div>
            <button className="px-3 py-1 rounded bg-blue-600 text-white" onClick={() => pushToArray("otherRankings", { source: "", year: "", rank: "" })}>Add Ranking</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Social Tab */
function SocialTab({ formData, onChange }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Social Links</h3>
      <div className="grid grid-cols-2 gap-3">
        <input name="socialLinks.facebook" value={formData.socialLinks?.facebook || ""} onChange={onChange} placeholder="Facebook URL" className="border rounded p-2" />
        <input name="socialLinks.instagram" value={formData.socialLinks?.instagram || ""} onChange={onChange} placeholder="Instagram URL" className="border rounded p-2" />
        <input name="socialLinks.twitter" value={formData.socialLinks?.twitter || ""} onChange={onChange} placeholder="Twitter URL" className="border rounded p-2" />
        <input name="socialLinks.linkedin" value={formData.socialLinks?.linkedin || ""} onChange={onChange} placeholder="LinkedIn URL" className="border rounded p-2" />
        <input name="socialLinks.youtube" value={formData.socialLinks?.youtube || ""} onChange={onChange} placeholder="YouTube URL" className="border rounded p-2" />
      </div>
    </div>
  );
}

/* SEO Tab */
function SeoTab({ formData, onChange }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">SEO</h3>
      <input name="seo.title" value={formData.seo?.title || ""} onChange={onChange} placeholder="SEO Title" className="border rounded p-2 w-full" />
      <textarea name="seo.description" value={formData.seo?.description || ""} onChange={onChange} placeholder="SEO Description" className="border rounded p-2 w-full h-24" />
      <input name="seo.keywords" value={(formData.seo?.keywords || []).join(", ")} onChange={(e) => onChange({ target: { name: "seo.keywords", value: e.target.value.split(",").map(s => s.trim()) } })} placeholder="Keywords (comma separated)" className="border rounded p-2 w-full" />
      <input name="seo.canonicalUrl" value={formData.seo?.canonicalUrl || ""} onChange={onChange} placeholder="Canonical URL" className="border rounded p-2 w-full" />

      <div>
        <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
        <input name="tags" value={(formData.tags || []).join(", ")} onChange={(e) => onChange({ target: { name: "tags", value: e.target.value.split(",").map(s => s.trim()) } })} className="border rounded p-2 w-full" />
      </div>
    </div>
  );
}

/* Analytics Tab */
function AnalyticsTab({ formData, onChange }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Analytics & Engagement</h3>
      <div className="grid grid-cols-3 gap-3">
        <input name="views" value={formData.views || 0} onChange={onChange} placeholder="Views" className="border rounded p-2" />
        <input name="likes" value={formData.likes || 0} onChange={onChange} placeholder="Likes" className="border rounded p-2" />
        <input name="favorites" value={formData.favorites || 0} onChange={onChange} placeholder="Favorites" className="border rounded p-2" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <input name="rating" value={formData.rating || 0} onChange={onChange} placeholder="Rating" className="border rounded p-2" />
        <input name="reviewCount" value={formData.reviewCount || 0} onChange={onChange} placeholder="Review Count" className="border rounded p-2" />
        <input name="shareCount" value={formData.shareCount || 0} onChange={onChange} placeholder="Share Count" className="border rounded p-2" />
      </div>
      <div className="mt-2">
        <label className="flex items-center gap-2">
          <input type="checkbox" name="approved" checked={!!formData.approved} onChange={onChange} />
          Approved
        </label>
        <label className="flex items-center gap-2 mt-2">
          <input type="checkbox" name="verified" checked={!!formData.verified} onChange={onChange} />
          Verified
        </label>
      </div>
    </div>
  );
}

/* Stats & Verification Tab */
function StatsTab({ formData, onChange, setAtPath }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Stats & Verification</h3>
      <div className="grid grid-cols-3 gap-3">
        <input name="noOfStudents" value={formData.noOfStudents || ""} onChange={onChange} placeholder="No of Students" className="border rounded p-2" />
        <input name="noOfFaculties" value={formData.noOfFaculties || ""} onChange={onChange} placeholder="No of Faculties" className="border rounded p-2" />
        <input name="lastUpdatedBy" value={formData.lastUpdatedBy || ""} onChange={onChange} placeholder="Last Updated By" className="border rounded p-2" />
      </div>
      <div>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={!!formData.verified} onChange={(e) => setAtPath("verified", e.target.checked)} />
          Verified
        </label>
        <label className="flex items-center gap-2 mt-2">
          <input type="checkbox" checked={!!formData.approved} onChange={(e) => setAtPath("approved", e.target.checked)} />
          Approved
        </label>
      </div>
    </div>
  );
}

/* Gallery Tab */
function GalleryTab({ formData, pushToArray, removeFromArray, setAtPath }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Gallery</h3>

      <div className="space-y-2">
        {(formData.gallery || []).map((g, i) => (
          <div key={i} className="flex gap-2 items-center">
            <input value={g || ""} onChange={(e) => setAtPath(`gallery.${i}`, e.target.value)} className="flex-1 border rounded p-2" />
            <button className="px-2 py-1 rounded bg-red-500 text-white" onClick={() => removeFromArray("gallery", i)}>Remove</button>
          </div>
        ))}
        <button className="px-3 py-1 rounded bg-blue-600 text-white" onClick={() => pushToArray("gallery", "")}>Add Gallery Image</button>
      </div>
    </div>
  );
}

/* Metadata Tab (readonly timestamps) */
function MetadataTab({ formData }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Metadata</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-slate-500">Created At</label>
          <div className="mt-1 text-sm">{formData.createdAt ? new Date(formData.createdAt).toLocaleString() : "—"}</div>
        </div>
        <div>
          <label className="text-sm text-slate-500">Updated At</label>
          <div className="mt-1 text-sm">{formData.updatedAt ? new Date(formData.updatedAt).toLocaleString() : "—"}</div>
        </div>
      </div>
      <div>
        <label className="text-sm text-slate-500">Document ID</label>
        <div className="mt-1 text-sm">{formData._id || "—"}</div>
      </div>
    </div>
  );
}
