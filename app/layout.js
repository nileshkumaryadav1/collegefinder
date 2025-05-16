// app/layout.js
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import MobileNavbar from "@/components/navigation/MobileNavbar";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
// import PopUp from "@/components/ad/PopUp";

const geist = Geist({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://collegefinder.site"),
  title: {
    default: "College Finder - Find Your Ideal College",
    template: "%s | College Finder",
  },
  description:
    "Explore top colleges, exams, scholarships, placements and more with College Finder. Find your ideal college easily!",
  keywords:
    "College Finder, Find Colleges, Colleges, Exams, Scholarships, Placements, University, Colleges in India, Top Colleges, Best Colleges, Best Colleges in India",
  authors: [{ name: "Nilesh Kumar", url: "https://collegefinder.site" }],
  creator: "Nilesh Kumar",
  openGraph: {
    title: "College Finder - Find Your Ideal College",
    description:
      "Discover and compare colleges across India by courses, fees, placements, reviews, and more.",
    url: "https://collegefinder.site",
    siteName: "College Finder",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "College Finder – Discover Top Colleges in India",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "College Finder - Find Your Ideal College",
    description:
      "Search, compare and choose the best colleges in India with real data on placements, courses, and scholarships.",
    creator: "@collegefinder",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxVideoPreview: -1,
      maxImagePreview: "large",
      maxSnippet: -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" data-theme="cupcake">
      <head>
        <meta name="application-name" content="College Finder" />
        {/* Google Search Console Verification */}
        <meta
          name="google-site-verification"
          content="1sFVXvsdUNE_dPzbjjPqFU0GwE-YvxN0WX3UIrZ_ZwU"
        />
      </head>
      <body
        className={`${geist.className} bg-gray-100 dark:bg-gray-900 antialiased`}
      >
        {/* <PopUp /> */}
        <Navbar />
        <main className="mt-16">{children}</main>
        <MobileNavbar />
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
