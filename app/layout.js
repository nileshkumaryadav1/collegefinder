import { defaultSEO } from "@/lib/seo.config";

import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import MobileNavbar from "@/components/navigation/MobileNavbar";

import { SpeedInsights } from "@vercel/speed-insights/next";
// import ClientThemeWrapper from "@/components/theme/ClientThemeWrapper";

const geist = Geist({ subsets: ["latin"] });

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
    <html lang="en" className="scroll-smooth" data-theme="cupcake">
      <head>{/* Dynamic SEO */}</head>
      <body
        className={`${geist.className} bg-gray-100 dark:bg-gray-900 antialiased`}
      >
        <SpeedInsights />
        <Navbar />
        <main className="mt-16">
          {/* <ClientThemeWrapper>{children}</ClientThemeWrapper> */}
          {children}
        </main>
        <MobileNavbar />
        <Footer />
      </body>
    </html>
  );
}
