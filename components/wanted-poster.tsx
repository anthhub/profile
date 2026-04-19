"use client";
import { useMemo } from "react";

export type WantedVariant = "fullscreen" | "framed" | "compact";

type Props = {
  variant?: WantedVariant;
  onBackToDesktop?: () => void;
};

const CRIMES = [
  "Built cmux — programmable terminal multiplexer",
  "Forged Refly Agent & MCP — supervisor of wild Tool-calling",
  "Shipped Bitget Telegram Wallet — 10M+ users plundered",
  "Abducted Next.js, React, Node.js, Go & Rust",
  "Open-source pirate: Matrox · Forwarder · Cupboard · Taskgroup",
  "Weaves AI video potions: Vistory · Hollideo",
];

const STATS = [
  { label: "Years at Sea", value: "6+" },
  { label: "Repos Plundered", value: "50+" },
  { label: "GitHub Stars", value: "2K+" },
  { label: "Bounty (₿)", value: "1,111,000,000" },
];

export default function WantedPoster({ variant = "framed", onBackToDesktop }: Props) {
  // Inline avatar — retro pixel captain drawn in SVG so there are no external deps.
  const avatar = useMemo(
    () =>
      `data:image/svg+xml;utf8,${encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' shape-rendering='crispEdges'>
          <defs>
            <filter id='sepia' x='0' y='0'>
              <feColorMatrix type='matrix' values='.393 .769 .189 0 0   .349 .686 .168 0 0   .272 .534 .131 0 0   0 0 0 1 0'/>
            </filter>
          </defs>
          <g filter='url(#sepia)'>
            <rect width='64' height='64' fill='#e8d5a8'/>
            <!-- bandana -->
            <rect x='14' y='10' width='36' height='8' fill='#7a1f1f'/>
            <rect x='18' y='8' width='4' height='4' fill='#7a1f1f'/>
            <rect x='42' y='8' width='4' height='4' fill='#7a1f1f'/>
            <rect x='14' y='10' width='36' height='2' fill='#fff' opacity='0.15'/>
            <!-- skull on bandana -->
            <rect x='28' y='12' width='8' height='4' fill='#fff'/>
            <rect x='30' y='14' width='1' height='1' fill='#000'/>
            <rect x='33' y='14' width='1' height='1' fill='#000'/>
            <!-- face -->
            <rect x='16' y='18' width='32' height='30' fill='#f5deb3'/>
            <rect x='16' y='18' width='32' height='2' fill='#000' opacity='0.15'/>
            <!-- hair strand -->
            <rect x='20' y='18' width='2' height='4' fill='#2d1a0e'/>
            <rect x='42' y='18' width='2' height='4' fill='#2d1a0e'/>
            <!-- eyes -->
            <rect x='22' y='26' width='4' height='4' fill='#fff'/>
            <rect x='38' y='26' width='4' height='4' fill='#fff'/>
            <rect x='23' y='27' width='2' height='2' fill='#1a1a1a'/>
            <rect x='39' y='27' width='2' height='2' fill='#1a1a1a'/>
            <!-- eyebrows -->
            <rect x='22' y='24' width='5' height='1' fill='#2d1a0e'/>
            <rect x='37' y='24' width='5' height='1' fill='#2d1a0e'/>
            <!-- scar -->
            <rect x='22' y='30' width='1' height='3' fill='#a33'/>
            <!-- mouth -->
            <rect x='26' y='38' width='12' height='2' fill='#5a2a1a'/>
            <rect x='24' y='40' width='16' height='1' fill='#5a2a1a'/>
            <!-- earrings -->
            <rect x='14' y='32' width='2' height='2' fill='#e5c200'/>
            <rect x='48' y='32' width='2' height='2' fill='#e5c200'/>
            <!-- jacket -->
            <rect x='10' y='48' width='44' height='16' fill='#2f3a28'/>
            <rect x='28' y='48' width='8' height='16' fill='#f5deb3'/>
            <rect x='30' y='50' width='4' height='2' fill='#e5c200'/>
            <rect x='30' y='54' width='4' height='2' fill='#e5c200'/>
            <rect x='30' y='58' width='4' height='2' fill='#e5c200'/>
          </g>
        </svg>`,
      )}`,
    [],
  );

  return (
    <div className={`wanted-poster wanted-${variant}`}>
      <div className="wanted-paper">
        {/* Corner ornaments */}
        <Corner pos="tl" />
        <Corner pos="tr" />
        <Corner pos="bl" />
        <Corner pos="br" />

        {/* Header */}
        <div className="wanted-header">WANTED</div>

        {/* Photo frame */}
        <div className="wanted-frame">
          <div className="wanted-frame-inner">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={avatar} alt="anthhub wanted portrait" className="wanted-avatar" />
            <div className="wanted-photo-grain" />
            <div className="wanted-photo-label">anthhub</div>
          </div>
        </div>

        {/* Dead or Alive */}
        <div className="wanted-dead-alive">
          <span className="wanted-rule" />
          DEAD OR ALIVE
          <span className="wanted-rule" />
        </div>

        {/* Name */}
        <div className="wanted-name">ANTHHUB</div>

        {/* Bounty */}
        <div className="wanted-bounty">
          <span className="wanted-berry">฿</span>
          <span className="wanted-amount">1,111,000,000</span>
          <span className="wanted-dash">—</span>
        </div>

        {/* Crimes */}
        {variant !== "compact" && (
          <ul className="wanted-crimes">
            {CRIMES.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        )}

        {/* Stats strip */}
        {variant !== "compact" && (
          <div className="wanted-stats">
            {STATS.map((s) => (
              <div key={s.label} className="wanted-stat">
                <div className="wanted-stat-value">{s.value}</div>
                <div className="wanted-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="wanted-footer">
          <span className="wanted-marine-seal">⚓</span>
          <span className="wanted-marine">MARINE</span>
          <span className="wanted-marine-sub">
            — GITHUB.COM/ANTHHUB —
          </span>
        </div>

        {/* Actions */}
        {variant === "fullscreen" && (
          <div className="wanted-actions">
            <a className="wanted-btn" href="https://github.com/anthhub" target="_blank" rel="noreferrer">
              Turn In Pirate (GitHub)
            </a>
            {onBackToDesktop ? (
              <button className="wanted-btn ghost" onClick={onBackToDesktop}>
                ← Back to Desktop
              </button>
            ) : (
              <a className="wanted-btn ghost" href="/">
                ← Back to Desktop
              </a>
            )}
          </div>
        )}

        {/* Torn edges */}
        <div className="wanted-tear wanted-tear-top" />
        <div className="wanted-tear wanted-tear-bottom" />
      </div>
    </div>
  );
}

function Corner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  return (
    <svg className={`wanted-corner wanted-corner-${pos}`} viewBox="0 0 60 60" aria-hidden>
      <g stroke="#3b2510" strokeWidth="1.2" fill="none">
        <path d="M2 2 H30 M2 2 V30" />
        <path d="M8 8 Q12 4 20 8" />
        <circle cx="22" cy="10" r="1.6" fill="#3b2510" />
        <path d="M4 14 Q10 18 4 22" />
        <path d="M10 20 Q18 22 16 30" />
      </g>
    </svg>
  );
}
