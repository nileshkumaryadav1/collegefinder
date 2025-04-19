"use client";
import { ThemeProvider } from "@/components/theme/ThemeProvider"; // adjust path if needed

export default function ClientThemeWrapper({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}