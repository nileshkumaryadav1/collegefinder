import Image from "next/image";
import Badge from "@/components/ui/Badge";
import SnapshotCard from "./SnapshotCard";

export default function HeroSnapshot({ college }) {
  if (!college) return null;

  return (
    <section className="max-w-6xl mx-auto space-y-8">
      {/* ================= HERO ================= */}
      <div className="p-6 rounded-2xl shadow bg-[var(--card)]">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Banner */}
          <div className="relative w-full md:w-1/2 h-64 md:h-96">
            <Image
              src={college.imageUrl}
              alt={college.name}
              fill
              priority
              className="object-cover rounded-xl"
            />

            {/* Logo */}
            {college.logoUrl && (
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                <Image
                  src={college.logoUrl}
                  alt={`${college.name} logo`}
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-white bg-white shadow"
                />
              </div>
            )}
          </div>

          {/* Identity */}
          <div className="flex-1 pt-12 md:pt-0 space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold">{college.name}</h1>

            <Badge>
              <p className="">
                {college.location ? college.location : ""}{" "}
                {/* {college.country || "India"}. */}
                {/* {college.shortName && `${college.shortName} • `}
                {college.city}, {college.state}, {college.country || "India"}. */}
              </p>
            </Badge>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              {college.type && <Badge>{college.type}</Badge>}
              {college.affiliation && <Badge>{college.affiliation}</Badge>}
              {college.university && <Badge>{college.university}</Badge>}
              {college.nirfRanking && (
                <Badge>NIRF #{college.nirfRanking}</Badge>
              )}
              {college.approvedBy?.length > 0 && (
                <Badge>{college.approvedBy.join(", ")}</Badge>
              )}
              {college.accreditedBy?.length > 0 && (
                <Badge>{college.accreditedBy.join(", ")}</Badge>
              )}
              {college.websiteUrl && (
                <Badge>
                  <a
                    href={college.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm"
                  >
                    Visit website
                  </a>
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ================= SNAPSHOT ================= */}
      <div className="px-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <SnapshotCard label="Rating" value={college.rating} />
          <SnapshotCard label="NIRF Rank" value={college.nirfRanking} />
          <SnapshotCard
            label="Avg Package"
            value={
              college.placements?.BTech.average
                ? `₹${college.placements.BTech.average} LPA`
                : null
            }
          />
          <SnapshotCard
            label="Fees / Year"
            value={college.fees?.total ? `₹${college.fees.total}` : null}
          />
        </div>
      </div>
    </section>
  );
}
