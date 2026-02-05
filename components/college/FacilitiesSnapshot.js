import Image from "next/image";
import Badge from "@/components/ui/Badge";
import SnapshotCard from "./SnapshotCard";

export default function FacilitiesSnapshot({ college }) {
  if (!college) return null;

  return (
    <section id="facilities" className="max-w-6xl mx-auto space-y-6">
      {/* ================= FACILITIES ================= */}
      <div className="p-6 rounded-2xl shadow bg-[var(--card)] space-y-6">
        <h2 className="text-2xl font-semibold">Facilities & Campus</h2>

        {/* Campus */}
        <SnapshotCard
          label="Campus Area"
          value={college.campusArea || "Not specified"}
        />

        {/* Hostels */}
        <SnapshotCard
          label="Hostels"
          value={
            college.hostels
              ? `Boys: ${college.hostels.boys ? "Yes" : "No"} • Girls: ${
                  college.hostels.girls ? "Yes" : "No"
                } • Capacity: ${college.hostels.capacity || "N/A"}`
              : null
          }
        />

        {/* Sports */}
        <div>
          <h4 className="text-sm font-medium text-[var(--muted)] mb-2">
            Sports Facilities
          </h4>
          <div className="flex flex-wrap gap-2">
            {college.sportsFacilities?.length > 0 ? (
              college.sportsFacilities.map((sport, i) => (
                <Badge key={i}>{sport}</Badge>
              ))
            ) : (
              <span className="text-sm text-gray-500">
                Not listed
              </span>
            )}
          </div>
        </div>

        {/* Image */}
        <Image
          src="https://avit.ac.in/wp-content/uploads/2024/11/facilities-img.webp"
          alt="College facilities"
          width={900}
          height={600}
          className="rounded-xl shadow"
        />

        {/* Clubs */}
        <div>
          <h4 className="text-sm font-medium text-[var(--muted)] mb-2">
            Clubs
          </h4>
          <div className="flex flex-wrap gap-2">
            {college.clubs?.length > 0 ? (
              college.clubs.map((club, i) => (
                <Badge key={i}>{club}</Badge>
              ))
            ) : (
              <span className="text-sm text-gray-500">
                No clubs listed
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
