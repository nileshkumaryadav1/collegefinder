function FeeItem({ label, value, highlight }) {
  if (!value) return null;

  return (
    <div
      className={`rounded-xl border border-[var(--border)] p-4 ${
        highlight ? "bg-[var(--muted-bg)]" : ""
      }`}
    >
      <p className="text-xs uppercase tracking-wide text-[var(--muted)]">
        {label}
      </p>
      <p className="mt-1 text-lg font-semibold">
        {value}
      </p>
    </div>
  );
}

function ScholarshipCard({ scholarship }) {
  if (!scholarship) return null;

  return (
    <div className="rounded-xl border border-[var(--border)] p-4 space-y-1">
      <p className="font-medium">
        {scholarship.name || "Untitled Scholarship"}
      </p>
      <p className="text-sm text-[var(--muted)]">
        Eligibility: {scholarship.eligibility || "N/A"}
      </p>
      <p className="text-sm text-[var(--muted)]">
        Amount: {scholarship.amount || "N/A"}
      </p>

      {scholarship.link && (
        <a
          href={scholarship.link}
          target="_blank"
          rel="noreferrer"
          className="text-sm underline underline-offset-2 text-[var(--highlight)]"
        >
          Learn more
        </a>
      )}
    </div>
  );
}

export default function FeesSnapshot({
  college,
  openSections,
  toggle,
}) {
  if (!college) return null;

  const fees = college.fees;

  return (
    <section id="fees-scholarships" className="max-w-6xl mx-auto">
      <div className="rounded-2xl shadow bg-[var(--card)] overflow-hidden">
        {/* Header */}
        <button
          onClick={() => toggle("fees")}
          className="w-full p-6 flex justify-between items-center text-left"
        >
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">Fees & Scholarships</h2>
            <p className="text-sm text-[var(--muted)]">
              Tuition, hostel, payments & financial aid
            </p>
          </div>

          <span className="text-sm font-medium text-[var(--highlight)]">
            {openSections.fees ? "Hide" : "Show"}
          </span>
        </button>

        {/* Content */}
        {openSections.fees && (
          <div className="p-6 border-t border-[var(--border)] space-y-10">
            {/* Fees Summary */}
            {fees && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Fee Structure</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <FeeItem label="Tuition Fees" value={fees.tuition} />
                  <FeeItem label="Hostel Fees" value={fees.hostel} />
                  <FeeItem label="Miscellaneous" value={fees.misc} />
                  <FeeItem
                    label="Total Fees"
                    value={fees.total}
                    highlight
                  />
                </div>
              </div>
            )}

            {/* Payment & Waiver */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Payment Modes */}
              {fees?.modeOfPayment?.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">
                    Payment Modes
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {fees.modeOfPayment.map((mode, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full text-xs bg-[var(--muted-bg)]"
                      >
                        {mode}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Fee Waiver */}
              {fees?.waiver && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">
                    Fee Waiver
                  </h3>
                  <div className="text-sm text-[var(--muted)] space-y-2">
                    {fees.waiver
                      .split(".")
                      .filter(Boolean)
                      .map((line, index) => (
                        <p key={index}>
                          {index + 1}. {line.trim()}.
                        </p>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* Scholarships */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Scholarships</h3>

              {college.scholarships?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {college.scholarships.map((s, index) => (
                    <ScholarshipCard
                      key={index}
                      scholarship={s}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[var(--muted)]">
                  No scholarships listed.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
