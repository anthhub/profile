import type { Metadata } from "next";
import WantedPoster from "@/components/wanted-poster";

export const metadata: Metadata = {
  title: "WANTED — anthhub · ฿1,111,000,000",
  description: "Dead or Alive. One Piece style wanted poster for anthhub.",
  openGraph: {
    title: "WANTED — anthhub · ฿1,111,000,000",
    description: "Dead or Alive. One Piece style wanted poster for anthhub.",
    type: "website",
  },
};

export default function WantedPage() {
  return <WantedPoster variant="fullscreen" />;
}
