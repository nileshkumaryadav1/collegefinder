import SnapshotCard from "./SnapshotCard";
import Badge from "@/components/ui/Badge";

export default function ContactSnapshot({ college }) {
  if (!college) return null;

  const socialLinks = college.socialLinks || {};
  const hasSocials = Object.values(socialLinks).some(Boolean);

  return (
    <section id="contact" className="max-w-6xl mx-auto space-y-6">
      <div className="p-6 rounded-2xl shadow bg-[var(--card)] space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-semibold">Contact & Social</h2>
          <p className="text-sm text-[var(--muted)]">
            Official contact details and online presence
          </p>
        </div>

        {/* ================= SNAPSHOT ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <SnapshotCard
            label="Email"
            value={
              college.email ? (
                <a href={`mailto:${college.email}`} className="underline">
                  {college.email}
                </a>
              ) : null
            }
          />

          <SnapshotCard
            label="Phone"
            value={
              college.phone ? (
                <a href={`tel:${college.phone}`} className="underline">
                  {college.phone}
                </a>
              ) : null
            }
          />

          <SnapshotCard
            label="Website"
            value={
              college.websiteUrl ? (
                <a
                  href={college.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  Visit Website
                </a>
              ) : null
            }
          />
        </div>

        {/* ================= SOCIAL LINKS ================= */}
        {hasSocials && (
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Social Presence</h3>

            <div className="flex flex-wrap gap-2">
              {Object.entries(socialLinks).map(
                ([platform, url]) =>
                  url && (
                    <Badge key={platform}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm"
                      >
                        {platform}
                      </a>
                    </Badge>
                  ),
              )}
            </div>
          </div>
        )}

        {!hasSocials && (
          <p className="text-sm text-gray-500">
            No social media links available.
          </p>
        )}
      </div>
    </section>
  );
}
