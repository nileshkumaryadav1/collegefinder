// app/layout.js
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import MobileNavbar from "@/components/navigation/MobileNavbar";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const geist = Geist({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "College Finder",
    template: "%s | College Finder",
  },
  description: "Find your ideal College.",
  twitter: {
    card: "summary_large_image"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" data-theme="cupcake">
      <head>
        {/* Google Verification */}
        <meta
          name="google-site-verification"
          content="1sFVXvsdUNE_dPzbjjPqFU0GwE-YvxN0WX3UIrZ_ZwU"
        />
      </head>
      <body
        className={`${geist.className} bg-gray-100 dark:bg-gray-900 antialiased`}
      >
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
