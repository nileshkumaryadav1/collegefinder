function CourseCard({ course }) {
  if (!course) return null;

  return (
    <div className="rounded-xl border border-[var(--border)] p-4 space-y-3">
      {/* Header */}
      <div className="flex justify-between gap-4">
        <div>
          <h4 className="font-semibold">
            {course.program}
            {course.specialization && ` — ${course.specialization}`}
          </h4>
          <p className="text-sm text-[var(--muted)]">
            {course.duration && `${course.duration} • `}
            {course.mode}
          </p>
        </div>

        <span className="text-sm text-[var(--muted)]">
          Intake: {course.intake ?? "N/A"}
        </span>
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
        <p><span className="text-[var(--muted)]">Eligibility:</span> {course.eligibility || "N/A"}</p>
        <p><span className="text-[var(--muted)]">Entrance Exams:</span> {course.entranceExams?.join(", ") || "N/A"}</p>
        <p><span className="text-[var(--muted)]">Fees:</span> {course.totalFees || "N/A"}</p>
        <p><span className="text-[var(--muted)]">Hostel Fees:</span> {course.hostelFees || "N/A"}</p>
        <p><span className="text-[var(--muted)]">Fee Waiver:</span> {course.feeWaiver || "N/A"}</p>
        <p>
          <span className="text-[var(--muted)]">Syllabus:</span>{" "}
          {course.syllabusPdf ? (
            <a
              href={course.syllabusPdf}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2"
            >
              Download
            </a>
          ) : (
            "N/A"
          )}
        </p>
      </div>
    </div>
  );
}

export default function AcademicsSnapshot({
  college,
  openSections,
  toggle,
}) {
  if (!college) return null;

  return (
    <section id="academics" className="max-w-6xl mx-auto">
      <div className="rounded-2xl shadow bg-[var(--card)] overflow-hidden">
        {/* Header */}
        <button
          onClick={() => toggle("academics")}
          className="w-full p-6 flex justify-between items-center text-left"
        >
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">Academic Information</h2>
            <p className="text-sm text-[var(--muted)]">
              Courses, eligibility, intake, exams & cutoffs
            </p>
          </div>

          <span className="text-sm font-medium text-[var(--highlight)]">
            {openSections.academics ? "Hide" : "Show"}
          </span>
        </button>

        {/* Content */}
        {openSections.academics && (
          <div className="p-6 border-t border-[var(--border)] space-y-10">
            {/* Courses */}
            <div id="courses" className="space-y-4">
              <h3 className="text-lg font-semibold">Courses Offered</h3>

              {college.coursesOffered?.length > 0 ? (
                <div className="grid gap-4">
                  {college.coursesOffered.map((course, index) => (
                    <CourseCard key={index} course={course} />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[var(--muted)]">
                  No courses added.
                </p>
              )}
            </div>

            {/* Cutoffs */}
            <div id="cut-offs" className="space-y-4">
              <h3 className="text-lg font-semibold">Cut Offs</h3>

              {college.cutOff?.length > 0 ? (
                <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
                  <table className="w-full text-sm">
                    <thead className="bg-[var(--muted-bg)] text-left">
                      <tr>
                        <th className="p-3">Year</th>
                        <th className="p-3">Program</th>
                        <th className="p-3">Specialization</th>
                        <th className="p-3">Category</th>
                        <th className="p-3">Exam</th>
                        <th className="p-3">Closing Rank</th>
                      </tr>
                    </thead>
                    <tbody>
                      {college.cutOff.map((co, index) => (
                        <tr key={index} className="border-t">
                          <td className="p-3">{co.year ?? "-"}</td>
                          <td className="p-3">{co.program ?? "-"}</td>
                          <td className="p-3">{co.specialization ?? "-"}</td>
                          <td className="p-3">{co.category ?? "-"}</td>
                          <td className="p-3">{co.exam ?? "-"}</td>
                          <td className="p-3">{co.closingRank ?? "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-sm text-[var(--muted)]">
                  No cut-off data available.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
