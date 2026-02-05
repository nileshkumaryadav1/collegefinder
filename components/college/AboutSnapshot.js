export default function AboutSnapshot({ college }) {
  if (!college) return null;

  const description = college.about || college.description;

  return (
    <section id="about" className="max-w-6xl mx-auto">
      <div className="p-6 rounded-2xl shadow bg-[var(--card)] space-y-6">
        {/* Title */}
        <h2 className="text-xl font-semibold">About</h2>

        {/* Description */}
        <p className="leading-relaxed text-[var(--muted)]">
          {description || "No description added."}
        </p>

        {/* Virtual Tour */}
        {college.virtualTourLink && (
          <div className="space-y-3 pt-4 border-t border-[var(--border)]">
            <h3 className="text-lg font-medium flex items-center gap-2">
              Virtual Tour
            </h3>

            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow">
              <iframe
                src={college.virtualTourLink.replace("watch?v=", "embed/")}
                title="Virtual College Tour"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
