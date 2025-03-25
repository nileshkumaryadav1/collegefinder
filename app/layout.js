
import { defaultSEO } from "@/lib/seo.config";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import MobileNavbar from "@/components/navigation/MobileNavbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const Metadata = {
  title: defaultSEO.title,
  description: defaultSEO.description,
  keywords: defaultSEO.keywords,
  openGraph: {
    type: defaultSEO.openGraph.type,
    url: defaultSEO.openGraph.url,
    title: defaultSEO.openGraph.title,
    description: defaultSEO.openGraph.description,
    images: [{ url: defaultSEO.openGraph.image }],
  },
  twitter: {
    card: defaultSEO.twitter.card,
    site: defaultSEO.twitter.site,
    title: defaultSEO.twitter.title,
    description: defaultSEO.twitter.description,
    images: [{ url: defaultSEO.twitter.image }],
  },
  alternates: {
    canonical: defaultSEO.canonical,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>{/* Dynamic SEO */}</head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main className="mt-16">{children}</main>
        <MobileNavbar />
        <Footer />
      </body>
    </html>
  );
}
