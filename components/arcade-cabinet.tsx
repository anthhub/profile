"use client";
import { useEffect, useState } from "react";
import { FIGHTERS, type Fighter } from "@/components/language-sprites";

type Variant = "fullscreen" | "framed";

export default function ArcadeCabinet({ variant = "framed" }: { variant?: Variant }) {
  const [selected, setSelected] = useState<Fighter | null>(null);
  const [flash, setFlash] = useState(false);
  const [credits, setCredits] = useState(99);
  const [hover, setHover] = useState<string | null>(null);
  const [tick, setTick] = useState(0);
  const [phase, setPhase] = useState<"select" | "ready" | "fight">("select");

  // Blink / demo tick
  useEffect(() => {
    const i = setInterval(() => setTick((n) => (n + 1) % 1000), 500);
    return () => clearInterval(i);
  }, []);

  const pick = (f: Fighter) => {
    setSelected(f);
    setPhase("ready");
    setFlash(true);
    setCredits((c) => Math.max(0, c - 1));
    setTimeout(() => setPhase("fight"), 500);
    setTimeout(() => {
      setFlash(false);
      setPhase("select");
    }, 1800);
  };

  const hiScore = 1_111_000;

  return (
    <div className={`arcade-root arcade-${variant}`}>
      <div className="arcade-screen">
        {/* CRT overlay */}
        <div className="arcade-crt" />
        <div className="arcade-vignette" />

        {/* Top HUD */}
        <div className="arcade-hud">
          <div className="arcade-hud-block">
            <span className="arcade-hud-label">HI-SCORE</span>
            <span className="arcade-hud-value">{hiScore.toLocaleString()}</span>
          </div>
          <div className="arcade-hud-title">
            <span className="arcade-title-main">ANTHHUB&apos;S</span>
            <span className="arcade-title-sub">SKILL FIGHTER</span>
            <span className="arcade-title-year">© 19XX — UNKNOWN STUDIO</span>
          </div>
          <div className="arcade-hud-block">
            <span className="arcade-hud-label">CREDITS</span>
            <span className="arcade-hud-value">{String(credits).padStart(2, "0")}</span>
          </div>
        </div>

        {/* Select prompt */}
        <div className="arcade-prompt">
          <span className={tick % 2 === 0 ? "blink" : "blink off"}>
            ▶ SELECT YOUR FIGHTER
          </span>
        </div>

        {/* Fighter grid */}
        <div className="arcade-grid">
          {FIGHTERS.map((f) => (
            <button
              key={f.id}
              className={`arcade-card ${selected?.id === f.id ? "selected" : ""} ${hover === f.id ? "hover" : ""}`}
              style={
                {
                  ["--accent" as string]: f.color,
                } as React.CSSProperties
              }
              onMouseEnter={() => setHover(f.id)}
              onMouseLeave={() => setHover(null)}
              onClick={() => pick(f)}
            >
              <div className="arcade-card-portrait">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={f.sprite} alt={f.name} />
              </div>
              <div className="arcade-card-name">{f.name}</div>
              <div className="arcade-card-rank">
                {"★".repeat(f.rank)}
                <span className="arcade-card-rank-off">{"★".repeat(5 - f.rank)}</span>
              </div>
              <div className="arcade-card-years">{f.years}</div>
            </button>
          ))}
        </div>

        {/* Selected detail bar */}
        <div className="arcade-detail">
          {selected ? (
            <>
              <div className="arcade-detail-portrait">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={selected.sprite} alt={selected.name} />
              </div>
              <div className="arcade-detail-info">
                <div className="arcade-detail-name" style={{ color: selected.color }}>
                  {selected.name}
                </div>
                <div className="arcade-detail-sub">&quot;{selected.subtitle}&quot;</div>
                <div className="arcade-detail-special">
                  SPECIAL: <span style={{ color: selected.color }}>{selected.special}</span>
                </div>
                <div className="arcade-detail-tag">{selected.tagline}</div>
              </div>
              <div className="arcade-detail-exp">
                <div className="arcade-exp-label">EXP</div>
                <div className="arcade-exp-bar">
                  <div
                    className="arcade-exp-fill"
                    style={{
                      width: `${selected.rank * 20}%`,
                      background: `linear-gradient(90deg, ${selected.color}, #fff)`,
                    }}
                  />
                </div>
                <div className="arcade-exp-years">{selected.years}</div>
              </div>
            </>
          ) : (
            <div className="arcade-detail-empty">
              <span className={tick % 2 === 0 ? "blink" : "blink off"}>
                ▶ HOVER / CLICK A FIGHTER ◀
              </span>
            </div>
          )}
        </div>

        {/* Insert coin footer */}
        <div className="arcade-coin">
          <span className={tick % 2 === 0 ? "blink" : "blink off"}>INSERT COIN</span>
          <span className="arcade-coin-dot">●</span>
          <span>PLAYER 1 READY</span>
          <span className="arcade-coin-dot">●</span>
          <span>PRESS ANY KEY</span>
        </div>

        {/* Flash overlay */}
        {flash && (
          <div className="arcade-flash">
            <div className="arcade-flash-text">
              {phase === "ready" ? "READY?" : "FIGHT!"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
