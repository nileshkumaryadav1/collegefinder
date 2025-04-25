// app/(route)/(viewable)/colleges/[slug]/layout.js

export async function generateMetadata({ params }) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/colleges/${params.slug}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch college:", res.status);
      return {
        title: "College Not Found | College Finder",
        description: "We couldn't find the college you're looking for.",
      };
    }
    const data = await res.json();

    if (!data?.data) {
      return {
        title: "College Not Found | College Finder",
        description: "We couldn't find the college you're looking for.",
      };
    }

    const college = data.data;

    return {
      title: `${college.name} | College Finder`,
      description: `Explore detailed information about ${college.name}. Find admission process, placements, courses, and more.`,
      openGraph: {
        title: `${college.name} | College Finder`,
        description: `Explore details of ${college.name} including rankings, courses, and placements.`,
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/colleges/${params.slug}`,
        siteName: "College Finder",
        type: "website",
        images: [
          {
            url:
              college.coverImage ||
              `${process.env.NEXT_PUBLIC_BASE_URL}/default-og-image.jpg`,
            width: 1200,
            height: 630,
            alt: `${college.name} Cover Image`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${college.name} | College Finder`,
        description: `Learn about ${college.name} - admission, placements, facilities and more.`,
        images: [
          college.coverImage ||
            `${process.env.NEXT_PUBLIC_BASE_URL}/default-og-image.jpg`,
        ],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "College Finder",
      description: "Find your ideal college in India.",
    };
  }
}

export default function CollegeLayout({ children }) {
  return <>{children}</>;
}
