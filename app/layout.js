import { defaultSEO } from "@/lib/seo.config";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import MobileNavbar from "@/components/navigation/MobileNavbar";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geist = Geist({ subsets: ["latin"] });

export const metadata = {
  title: defaultSEO.title,
  description: defaultSEO.description,
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
      <head>
        {/* Basic Meta */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={defaultSEO.description} />
        <meta name="keywords" content={defaultSEO.keywords} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={defaultSEO.canonical} />

        {/* OpenGraph Meta */}
        <meta property="og:type" content={defaultSEO.openGraph.type} />
        <meta property="og:url" content={defaultSEO.openGraph.url} />
        <meta property="og:title" content={defaultSEO.openGraph.title} />
        <meta property="og:description" content={defaultSEO.openGraph.description} />
        <meta property="og:image" content={defaultSEO.openGraph.image} />

        {/* Twitter Card Meta */}
        <meta name="twitter:card" content={defaultSEO.twitter.card} />
        <meta name="twitter:site" content={defaultSEO.twitter.site} />
        <meta name="twitter:title" content={defaultSEO.twitter.title} />
        <meta name="twitter:description" content={defaultSEO.twitter.description} />
        <meta name="twitter:image" content={defaultSEO.twitter.image} />

        {/* Google Verification */}
        <meta name="google-site-verification" content="google150fb2c865d14fa4" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${geist.className} bg-gray-100 dark:bg-gray-900 antialiased`}>
        <SpeedInsights />
        <Navbar />
        <main className="mt-16">{children}</main>
        <MobileNavbar />
        <Footer />
      </body>
    </html>
  );
}
