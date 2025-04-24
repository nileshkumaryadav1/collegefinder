// seo.config.js (Centralized SEO Configuration for College Finder)

export const defaultSEO = {
  title: "College Finder - Find Your Ideal College",
  description:
    "Find top colleges, exams, and scholarships with ease. Trusted by students across India.",
  keywords:
    "colleges, exams, scholarships, university admission, education portal, college ranking, education search, higher studies",
  image: "https://collegefinder.site/logo1200x630.jpg",
  openGraph: {
    type: "website",
    url: "https://collegefinder.site",
    title: "College Finder - Find Your Ideal College",
    description:
      "Find top colleges, exams, and scholarships with ease. Trusted by students across India.",
    image: "https://collegefinder.site/logo.jpg",
  },
  twitter: {
    card: "summary_large_image",
    site: "@collegefinder",
    title: "College Finder - Find Your Ideal College",
    description:
      "Find top colleges, exams, and scholarships with ease. Trusted by students across India.",
    image: "https://collegefinder.site/logo.jpg",
  },
  canonical: "https://collegefinder.site",
};

// JSON-LD Structured Data for SEO
export const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "College Finder",
  url: "https://collegefinder.site",
  description:
    "Find top colleges, exams, and scholarships with ease. Trusted by students across India.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://collegefinder.site/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

// Multilingual hreflang links for global SEO support
export function generateHreflangs() {
  const baseUrl = "https://collegefinder.site";
  return `
    <link rel="alternate" hreflang="en" href="${baseUrl}/" />
    <link rel="alternate" hreflang="es" href="${baseUrl}/es" />
    <link rel="alternate" hreflang="fr" href="${baseUrl}/fr" />
    <link rel="alternate" hreflang="de" href="${baseUrl}/de" />
  `;
}

// Internal navigation links (used in header, footer, or sitemap)
export const internalLinks = [
  { name: "Home", href: "/" },
  { name: "Colleges", href: "/colleges" },
  { name: "Exams", href: "/exams" },
  { name: "Scholarships", href: "/scholarships" },
  { name: "Insights", href: "/insights" },
  { name: "News", href: "/news" },
  { name: "Reviews", href: "/reviews" },
  { name: "Contact", href: "/contact" },
];
