export default function GallerySnapshot({
  college
}) {
  if (!college) return null;

  const hasGallery = college.gallery?.length > 0;

  return (
    <section id="gallery" className="max-w-6xl mx-auto">
      <div className="rounded-2xl shadow bg-[var(--card)] overflow-hidden">
        {/* Header */}
        <button
          onClick={() => toggle("gallery")}
          className="w-full p-6 flex items-center justify-between text-left"
        >
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">Gallery</h2>
            <p className="text-sm text-[var(--muted)]">Campus images</p>
          </div>

          <span className="text-sm font-medium text-[var(--highlight)]">
            {college.gallery ? "Hide" : "Show"}
          </span>
        </button>

        {/* Content */}
        {college.gallery && (
          <div className="p-6 border-t border-[var(--border)]">
            {hasGallery ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {college.gallery.map((src, index) => (
                  <div
                    key={index}
                    className="relative h-40 rounded-xl overflow-hidden bg-[var(--muted-bg)] shadow"
                  >
                    {src ? (
                      <img
                        src={src}
                        alt={`Gallery image ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-sm text-[var(--muted)]">
                        No image
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[var(--muted)]">
                No gallery images available.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
