import SnapshotCard from "./SnapshotCard";
import Badge from "@/components/ui/Badge";

export default function AnalyticsSnapshot({ college }) {
  if (!college) return null;

  return (
    <section id="analytics" className="max-w-6xl mx-auto space-y-6">
      <div className="p-6 rounded-2xl shadow bg-[var(--card)] space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-semibold">Insights & Metadata</h2>
          <p className="text-sm text-[var(--muted)]">
            Engagement metrics, SEO information and internal metadata
          </p>
        </div>

        {/* ================= ENGAGEMENT SNAPSHOT ================= */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Engagement</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <SnapshotCard label="Views" value={college.views} />
            <SnapshotCard label="Likes" value={college.likes} />
            <SnapshotCard label="Favorites" value={college.favorites} />
            <SnapshotCard label="Rating" value={college.rating} />
            <SnapshotCard label="Reviews" value={college.reviewCount} />
            <SnapshotCard label="Shares" value={college.shareCount} />
            <SnapshotCard
              label="Approved"
              value={college.approved ? "Yes" : "No"}
            />
            <SnapshotCard
              label="Verified"
              value={college.verified ? "Yes" : "No"}
            />
          </div>
        </div>

        {/* ================= SEO ================= */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium">SEO</h3>

          <div className="grid gap-3">
            {college.seo?.title && (
              <div className="p-3 rounded-lg border bg-[var(--background)]">
                <div className="text-xs text-gray-500">SEO Title</div>
                <div className="text-sm">{college.seo.title}</div>
              </div>
            )}

            {college.seo?.description && (
              <div className="p-3 rounded-lg border bg-[var(--background)]">
                <div className="text-xs text-gray-500">SEO Description</div>
                <div className="text-sm">{college.seo.description}</div>
              </div>
            )}

            {college.seo?.canonicalUrl && (
              <div className="p-3 rounded-lg border bg-[var(--background)]">
                <div className="text-xs text-gray-500">Canonical URL</div>
                <div className="text-sm break-all">
                  {college.seo.canonicalUrl}
                </div>
              </div>
            )}
          </div>

          {/* SEO Keywords */}
          {(college.seo?.keywords?.length ||
            college.keywords?.length ||
            college.tags?.length) && (
            <div className="flex flex-wrap gap-2 mt-3">
              {college.seo?.keywords?.map((k, i) => (
                <Badge key={`seo-${i}`}>{k}</Badge>
              ))}
              {college.keywords?.map((k, i) => (
                <Badge key={`model-${i}`}>{k}</Badge>
              ))}
              {college.tags?.map((t, i) => (
                <Badge key={`tag-${i}`}>{t}</Badge>
              ))}
            </div>
          )}
        </div>

        {/* ================= METADATA ================= */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Metadata</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <SnapshotCard
              label="Students"
              value={college.noOfStudents}
            />
            <SnapshotCard
              label="Faculties"
              value={college.noOfFaculties}
            />
            <SnapshotCard
              label="Last Updated By"
              value={college.lastUpdatedBy}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
