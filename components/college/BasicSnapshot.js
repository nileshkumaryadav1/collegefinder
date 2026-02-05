import SnapshotCard from "./SnapshotCard";

export default function BasicSnapshot({ college, openSections, toggle }) {
  if (!college) return null;

  return (
    <section id="basic-info" className="max-w-6xl mx-auto">
      <div className="rounded-2xl shadow bg-[var(--card)] overflow-hidden">
        {/* Header */}
        <button
          onClick={() => toggle("basics")}
          className="w-full p-6 flex items-center justify-between text-left"
        >
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">Basic Information</h2>
            <p className="text-sm text-[var(--muted)]">
              Core details, address & contact
            </p>
          </div>

          <span className="text-sm font-medium text-[var(--highlight)]">
            {openSections.basics ? "Hide" : "Show"}
          </span>
        </button>

        {/* Content */}
        {openSections.basics && (
          <div className="p-6 border-t border-[var(--border)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <SnapshotCard label="Short Name" value={college.shortName} />
              <SnapshotCard
                label="Established"
                value={college.establishedYear}
              />
              <SnapshotCard label="City & State" value={college.city + ", " + college.state} />
              <SnapshotCard label="Location" value={college.location} />
              <SnapshotCard label="Students" value={college.noOfStudents} />
              <SnapshotCard label="Faculties" value={college.noOfFaculties} />
              <SnapshotCard
                label="Phone"
                value={
                  college.phone && (
                    <a
                      href={`tel:${college.phone}`}
                      className="underline underline-offset-2"
                    >
                      {college.phone}
                    </a>
                  )
                }
              />
              <SnapshotCard
                label="Email"
                value={
                  college.email && (
                    <a
                      href={`mailto:${college.email}`}
                      className="underline underline-offset-2"
                    >
                      {college.email}
                    </a>
                  )
                }
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
