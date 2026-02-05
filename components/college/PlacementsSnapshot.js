import Badge from "@/components/ui/Badge";
import SnapshotCard from "./SnapshotCard";

function ProgramPlacements({ title, data }) {
  if (!data) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">{title}</h3>

      {/* Snapshot */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <SnapshotCard label="Highest Package" value={data.highest} />
        <SnapshotCard label="Average Package" value={data.average} />
        <SnapshotCard label="Median Package" value={data.median} />
      </div>

      {/* Recruiters */}
      <div>
        <h4 className="text-sm font-medium text-[var(--muted)] mb-2">
          Recruiters
        </h4>
        <div className="flex flex-wrap gap-2">
          {data.recruiters?.length ? (
            data.recruiters.map((r, i) => <Badge key={i}>{r}</Badge>)
          ) : (
            <span className="text-sm text-gray-500">Not listed</span>
          )}
        </div>
      </div>

      {/* Logos */}
      {data.topRecruitersLogos?.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-[var(--muted)] mb-2">
            Top Recruiters
          </h4>
          <div className="flex flex-wrap gap-3">
            {data.topRecruitersLogos.map((url, i) => (
              <div
                key={i}
                className="w-20 h-12 rounded bg-gray-50 flex items-center justify-center shadow-sm"
              >
                <img
                  src={url}
                  alt={`recruiter-${i}`}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Report */}
      <SnapshotCard
        label="Placement Report"
        value={
          data.placementReportPdf ? (
            <a
              href={data.placementReportPdf}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              Download PDF
            </a>
          ) : null
        }
      />

      {/* Yearwise Table */}
      {data.yearwiseStats?.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-[var(--muted)] mb-2">
            Year-wise Statistics
          </h4>
          <div className="overflow-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-xs">
                <tr>
                  <th className="p-2">Year</th>
                  <th className="p-2">Highest</th>
                  <th className="p-2">Average</th>
                  <th className="p-2">Median</th>
                  <th className="p-2">Placed</th>
                  <th className="p-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {data.yearwiseStats.map((y, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-2">{y.year ?? "-"}</td>
                    <td className="p-2">{y.highest ?? "-"}</td>
                    <td className="p-2">{y.average ?? "-"}</td>
                    <td className="p-2">{y.median ?? "-"}</td>
                    <td className="p-2">{y.placedStudents ?? "-"}</td>
                    <td className="p-2">{y.totalStudents ?? "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PlacementsSnapshot({ college }) {
  if (!college?.placements) return null;

  return (
    <section id="placements" className="max-w-6xl mx-auto space-y-8">
      {/* ================= PLACEMENTS ================= */}
      <div className="p-6 rounded-2xl shadow bg-[var(--card)] space-y-8">
        <div>
          <h2 className="text-2xl font-semibold">Placements</h2>
          <p className="text-sm text-[var(--muted)]">
            Placement statistics for undergraduate and postgraduate programs
          </p>
        </div>

        <ProgramPlacements
          title="B.Tech Placements"
          data={college.placements.BTech}
        />

        <ProgramPlacements
          title="M.Tech Placements"
          data={college.placements.MTech}
        />

        {college.placements.placementCellContact && (
          <SnapshotCard
            label="Placement Cell Contact"
            value={college.placements.placementCellContact}
          />
        )}
      </div>
    </section>
  );
}
