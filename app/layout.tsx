import type { Metadata } from "next";
import "98.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "anthhub.exe",
  description: "Windows 98 style personal site · Engineering Library · VScode Plugin · Creative Application",
  metadataBase: new URL("https://anthhub.vercel.app"),
  openGraph: {
    title: "anthhub.exe",
    description: "A Windows 98 retro desktop portfolio",
    url: "https://anthhub.vercel.app",
    siteName: "anthhub",
    type: "website",
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="overflow-hidden">{children}</body>
    </html>
  );
}
