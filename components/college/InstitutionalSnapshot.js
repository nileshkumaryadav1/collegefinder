import SnapshotCard from "./SnapshotCard";

export default function InstitutionalSnapshot({
  college,
  openSections,
  toggle,
}) {
  if (!college) return null;

  return (
    <section id="institute-details" className="max-w-6xl mx-auto">
      <div className="rounded-2xl shadow bg-[var(--card)] overflow-hidden">
        {/* Header */}
        <button
          onClick={() => toggle("institutional")}
          className="w-full p-6 flex items-center justify-between text-left"
        >
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">Institutional Details</h2>
            <p className="text-sm text-[var(--muted)]">
              Type, approvals, departments & governance
            </p>
          </div>

          <span className="text-sm font-medium text-[var(--highlight)]">
            {openSections.institutional ? "Hide" : "Show"}
          </span>
        </button>

        {/* Content */}
        {openSections.institutional && (
          <div className="p-6 border-t border-[var(--border)] space-y-8">
            {/* Core Institutional Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <SnapshotCard label="Type" value={college.type} />
              <SnapshotCard label="Affiliation" value={college.affiliation} />
              <SnapshotCard label="University" value={college.university} />
              <SnapshotCard
                label="Governing Body"
                value={college.governingBody}
              />

              <SnapshotCard
                label="Approved By"
                value={
                  college.approvedBy?.length && college.approvedBy.join(", ")
                }
              />

              <SnapshotCard
                label="Accredited By"
                value={
                  college.accreditedBy?.length &&
                  college.accreditedBy.join(", ")
                }
              />
            </div>

            {/* Departments */}
            {college.departments?.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-wide text-[var(--muted)]">
                  Departments
                </p>
                <div className="flex flex-wrap gap-2">
                  {college.departments.map((dept, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-xs bg-[var(--muted-bg)]"
                    >
                      {dept}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Description (optional, muted) */}
            {college.description && (
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-wide text-[var(--muted)]">
                  Description
                </p>
                <p className="text-sm leading-relaxed text-[var(--muted)]">
                  {college.description}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
