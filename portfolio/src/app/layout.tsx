import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Cursor from "@/components/ui/Cursor";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Siddarth Bhave; Full-Send Coder",
  description:
    "Software Engineer, Data Engineer, and Co-founder. Morgan Stanley alum. Grad student at the University of Washington, Seattle.",
  keywords: [
    "Siddarth Bhave",
    "Software Engineer",
    "Data Engineer",
    "Portfolio",
    "Morgan Stanley",
    "University of Washington",
  ],
  authors: [{ name: "Siddarth Bhave" }],
  openGraph: {
    title: "Siddarth Bhave; Full-Send Coder",
    description:
      "Software Engineer, Data Engineer, and Co-founder. Morgan Stanley alum. Grad student at UW Seattle.",
    url: "https://sidbhave.vercel.app",
    siteName: "Siddarth Bhave",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Siddarth Bhave; Full-Send Coder",
    description: "Software Engineer, Data Engineer, and Co-founder.",
    creator: "@siddarthbhave",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${spaceMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <SmoothScroll>
          {children}
        </SmoothScroll>
        {/* Grain overlay — purely decorative, no JS needed */}
        <div className="grain-overlay" aria-hidden="true" />
        <Cursor />
      </body>
    </html>
  );
}
