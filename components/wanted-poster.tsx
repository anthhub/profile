"use client";

export type WantedVariant = "fullscreen" | "framed" | "compact";

type Props = {
  variant?: WantedVariant;
  username?: string;
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

export default function WantedPoster({
  variant = "framed",
  username = "anthhub",
  onBackToDesktop,
}: Props) {
  // Pull the avatar directly from GitHub's public avatar endpoint.
  // https://github.com/{user}.png redirects to the current avatar file.
  // We aged it with CSS filters (sepia + contrast + vignette) so it matches
  // the torn-paper poster aesthetic instead of looking like a web screenshot.
  const avatar = `https://github.com/${username}.png?size=320`;

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
            <img
              src={avatar}
              alt={`${username} wanted portrait`}
              className="wanted-avatar wanted-avatar-photo"
              referrerPolicy="no-referrer"
              loading="eager"
            />
            <div className="wanted-photo-grain" />
            <div className="wanted-photo-label">{username}</div>
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
