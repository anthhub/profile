import type { Metadata } from "next";
import ArcadeCabinet from "@/components/arcade-cabinet";

export const metadata: Metadata = {
  title: "ARCADE — anthhub · Skill Fighter",
  description:
    "Pick your fighter. 12 languages & tools rendered as pixel-art character cards.",
  openGraph: {
    title: "ARCADE — anthhub · Skill Fighter",
    description:
      "Pick your fighter. 12 languages & tools rendered as pixel-art character cards.",
    type: "website",
  },
};

export default function ArcadePage() {
  return (
    <main style={{ minHeight: "100vh", background: "#05050f" }}>
      <ArcadeCabinet variant="fullscreen" />
      <div
        style={{
          textAlign: "center",
          padding: "12px 0 20px",
          color: "#a1a1aa",
          fontFamily: "monospace",
          fontSize: 12,
          letterSpacing: 2,
        }}
      >
        <a href="/" style={{ color: "#22d3ee", textDecoration: "underline" }}>
          ← BACK TO DESKTOP
        </a>
        {" · "}
        <a
          href="https://github.com/anthhub"
          style={{ color: "#ff2d95", textDecoration: "underline" }}
          target="_blank"
          rel="noreferrer"
        >
          GITHUB.COM/ANTHHUB ↗
        </a>
      </div>
    </main>
  );
}
