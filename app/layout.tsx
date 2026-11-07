import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CyberShield AI — Security Operations Reimagined",
  description: "CyberShield AI 2.0, a professional phishing investigation experience. Frontend demo: connect the Python detection engine in Phase 2.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
