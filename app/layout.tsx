import type { Metadata, Viewport } from "next";
import { Open_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
});

const configuredUrl = process.env.NEXT_PUBLIC_AGENT_URL;
const siteUrl = configuredUrl?.startsWith("http")
  ? configuredUrl
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ResearchOS | Source-grounded AI research",
    template: "%s | ResearchOS",
  },
  description:
    "A source-grounded AI research workspace for evidence, memory, projects, and inspectable conclusions.",
  keywords: ["AI research", "RAG", "knowledge base", "ibl.ai", "research workspace"],
  authors: [{ name: "Byron Opaks" }],
  creator: "Byron Opaks",
  icons: { icon: "/favicon.svg" },
  alternates: { canonical: "/" },
  openGraph: {
    title: "ResearchOS | Research that shows its working",
    description:
      "Follow source material into inspectable AI-assisted analysis, durable context, and organized project work.",
    type: "website",
    siteName: "ResearchOS",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "ResearchOS | Research that shows its working",
    description:
      "A source-grounded AI research workspace built with the ibl.ai Vibe SDK.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={openSans.variable} suppressHydrationWarning>
      <head />
      <body className="font-sans antialiased">
        <Script src="/env.js" strategy="afterInteractive" />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
