import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "anthhub · personal site",
  description: "更多项目源码, 请移步 GitHub — Engineering Library · VScode Plugin · Creative Application",
  metadataBase: new URL("https://anthhub.vercel.app"),
  openGraph: {
    title: "anthhub",
    description: "Engineering Library · VScode Plugin · Creative Application",
    url: "https://anthhub.vercel.app",
    siteName: "anthhub",
    type: "website",
  },
  twitter: { card: "summary", title: "anthhub" },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
