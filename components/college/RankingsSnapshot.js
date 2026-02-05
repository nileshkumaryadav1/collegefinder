import SnapshotCard from "./SnapshotCard";
import Badge from "@/components/ui/Badge";

export default function RankingsSnapshot({ college }) {
  if (!college) return null;

  const hasOtherRankings = college.otherRankings?.length > 0;

  return (
    <section id="rankings" className="max-w-6xl mx-auto space-y-6">
      <div className="p-6 rounded-2xl shadow bg-[var(--card)] space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-semibold">Rankings & Recognition</h2>
          <p className="text-sm text-[var(--muted)]">
            National rankings, recognition and official reports
          </p>
        </div>

        {/* ================= SNAPSHOT ================= */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <SnapshotCard
            label="NIRF Rank"
            value={college.nirfRanking ? `#${college.nirfRanking}` : null}
          />

          <SnapshotCard
            label="NIRF Report"
            value={
              college.nirfPdf ? (
                <a
                  href={college.nirfPdf}
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  Download PDF
                </a>
              ) : null
            }
          />

          <SnapshotCard
            label="Other Rankings"
            value={hasOtherRankings ? college.otherRankings.length : null}
          />
        </div>

        {/* ================= OTHER RANKINGS ================= */}
        {hasOtherRankings && (
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Other Rankings</h3>

            <div className="space-y-3">
              {college.otherRankings.map((r, i) => (
                <div
                  key={i}
                  className="flex flex-wrap items-center gap-2 p-3 rounded-lg border bg-[var(--background)]"
                >
                  <Badge>{r.source || "Unknown Source"}</Badge>
                  <span className="text-sm text-gray-600">
                    Year: {r.year ?? "-"}
                  </span>
                  <span className="text-sm font-medium">
                    Rank: {r.rank ?? "-"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
