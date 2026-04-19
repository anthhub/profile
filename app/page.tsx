import type { Metadata } from "next";
import WantedPoster from "@/components/wanted-poster";

export const metadata: Metadata = {
  title: "WANTED — anthhub · ฿1,111,000,000",
  description: "Dead or Alive. One Piece style bounty edition of anthhub.",
};

export default function WantedEditionHome() {
  return <WantedPoster variant="fullscreen" />;
}
