export default function SnapshotCard({ label, value }) {
  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 text-center">
      <p className="text-sm text-[var(--muted)]">{label}</p>
      <p className="text-2xl font-bold text-[var(--foreground)]">
        {value ?? "—"}
      </p>
    </div>
  );
}
