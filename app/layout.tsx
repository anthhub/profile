import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "anthhub · AI Agent + Full-Stack",
  description:
    "Shipping AI agents that do real work · Browser-native video tooling · TS / Go / Rust / Swift polyglot",
  metadataBase: new URL("https://anthhub.vercel.app"),
  openGraph: {
    title: "anthhub · AI Agent + Full-Stack",
    description: "Shipping AI agents that do real work · Browser-native video tooling",
    url: "https://anthhub.vercel.app",
    siteName: "anthhub",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "anthhub",
    description: "AI Agent + Full-Stack + Creative Video",
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="grain">{children}</body>
    </html>
  );
}
