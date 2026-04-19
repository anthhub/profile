"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { FIGHTERS, type Fighter } from "@/components/language-sprites";

type Variant = "fullscreen" | "framed";
type Phase = "select" | "vs-intro" | "battling" | "ko";

type HitFx = { id: number; side: "p1" | "p2"; text: string };

export default function ArcadeCabinet({ variant = "framed" }: { variant?: Variant }) {
  const [hover, setHover] = useState<string | null>(null);
  const [focusIdx, setFocusIdx] = useState(0);
  const [showHelp, setShowHelp] = useState(false);
  const [credits, setCredits] = useState(99);
  const [tick, setTick] = useState(0);

  // Battle state
  const [phase, setPhase] = useState<Phase>("select");
  const [p1, setP1] = useState<Fighter | null>(null);
  const [p2, setP2] = useState<Fighter | null>(null);
  const [hp1, setHp1] = useState(100);
  const [hp2, setHp2] = useState(100);
  const [attacking, setAttacking] = useState<"p1" | "p2" | null>(null);
  const [hits, setHits] = useState<HitFx[]>([]);
  const [winner, setWinner] = useState<Fighter | null>(null);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [flash, setFlash] = useState<"vs" | "ready" | "fight" | "ko" | null>(null);

  // Combo
  const [combo, setCombo] = useState(0);
  const [shake, setShake] = useState(false);
  const lastPickAt = useRef<number>(0);
  const comboResetRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Blink / demo tick
  useEffect(() => {
    const i = setInterval(() => setTick((n) => (n + 1) % 1000), 500);
    return () => clearInterval(i);
  }, []);

  // Clean up any battle timers on unmount
  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, []);

  const later = (fn: () => void, ms: number) => {
    const t = setTimeout(fn, ms);
    timersRef.current.push(t);
    return t;
  };

  const resetBattle = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setPhase("select");
    setP1(null);
    setP2(null);
    setHp1(100);
    setHp2(100);
    setAttacking(null);
    setHits([]);
    setWinner(null);
    setFlash(null);
  }, []);

  const hitId = useRef(0);
  const spawnHit = (side: "p1" | "p2", text: string) => {
    hitId.current++;
    const id = hitId.current;
    setHits((h) => [...h, { id, side, text }]);
    later(() => setHits((h) => h.filter((x) => x.id !== id)), 800);
  };

  /**
   * Damage model: higher-star fighter hits slightly harder,
   * but there's always RNG so matches aren't determined by rank alone.
   */
  const attackDmg = (attacker: Fighter, defender: Fighter) => {
    const base = 14 + attacker.rank * 3;
    const defense = defender.rank;
    const rng = Math.floor(Math.random() * 14);
    return Math.max(6, base - defense + rng);
  };

  const HIT_WORDS = ["BAM!", "POW!", "CRIT!", "WHAM!", "OUCH!", "KO!", "ZAP!"];

  const startBattle = useCallback(
    (fighter: Fighter) => {
      // Combo chain counter (between picks)
      const now = Date.now();
      const within = now - lastPickAt.current < 2500;
      lastPickAt.current = now;
      setCombo((c) => (within ? c + 1 : 1));
      if (within) setShake(true);
      if (comboResetRef.current) clearTimeout(comboResetRef.current);
      comboResetRef.current = setTimeout(() => setCombo(0), 2700);
      later(() => setShake(false), 400);

      // Pick a random opponent that isn't the same fighter
      const others = FIGHTERS.filter((f) => f.id !== fighter.id);
      const opponent = others[Math.floor(Math.random() * others.length)];

      setP1(fighter);
      setP2(opponent);
      setHp1(100);
      setHp2(100);
      setWinner(null);
      setCredits((c) => Math.max(0, c - 1));

      // VS splash → ready → fight → battle rounds
      setPhase("vs-intro");
      setFlash("vs");
      later(() => setFlash("ready"), 900);
      later(() => setFlash("fight"), 1500);
      later(() => {
        setFlash(null);
        setPhase("battling");
        runBattle(fighter, opponent);
      }, 2100);
    },
    // runBattle is defined below; stable reference via function declaration
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const runBattle = (a: Fighter, b: Fighter) => {
    // Track hp locally so closures stay in sync as rounds schedule
    let currentHp1 = 100;
    let currentHp2 = 100;

    const schedule = (delay: number, attacker: "p1" | "p2") => {
      later(() => {
        setAttacking(attacker);
        const dmg =
          attacker === "p1" ? attackDmg(a, b) : attackDmg(b, a);
        const word = HIT_WORDS[Math.floor(Math.random() * HIT_WORDS.length)];
        spawnHit(attacker === "p1" ? "p2" : "p1", `${word} -${dmg}`);
        if (attacker === "p1") {
          currentHp2 = Math.max(0, currentHp2 - dmg);
          setHp2(currentHp2);
        } else {
          currentHp1 = Math.max(0, currentHp1 - dmg);
          setHp1(currentHp1);
        }
        later(() => setAttacking(null), 360);

        // End if someone is out
        if (currentHp1 <= 0 || currentHp2 <= 0) {
          later(() => finish(currentHp1, currentHp2), 500);
        }
      }, delay);
    };

    // 6 alternating rounds, 900ms apart
    for (let r = 0; r < 6; r++) {
      schedule(500 + r * 900, r % 2 === 0 ? "p1" : "p2");
    }
    // Force finish after last scheduled attack even if both still have HP
    later(() => finish(currentHp1, currentHp2), 500 + 6 * 900 + 500);
  };

  const finish = (h1: number, h2: number) => {
    setPhase("ko");
    setFlash("ko");
    const won = h1 >= h2 ? p1 : p2;
    setWinner(won);
    if (won && p1 && won.id === p1.id) setWins((w) => w + 1);
    else if (won && p2 && won.id === p2.id) setLosses((l) => l + 1);
    later(() => setFlash(null), 1400);
  };

  // Keyboard support — navigate with arrows, Enter/Space to pick, Esc to reset
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (phase !== "select") {
        if (e.key === "Escape") resetBattle();
        return;
      }
      const cols = 6;
      const total = FIGHTERS.length;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setFocusIdx((i) => (i + 1) % total);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setFocusIdx((i) => (i - 1 + total) % total);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusIdx((i) => (i + cols) % total);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusIdx((i) => (i - cols + total) % total);
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        startBattle(FIGHTERS[focusIdx]);
      } else if (e.key === "Escape") {
        setShowHelp(false);
      } else if (e.key === "?" || e.key === "h") {
        setShowHelp((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, focusIdx, startBattle, resetBattle]);

  const hiScore = 1_111_000 + wins * 2500;

  return (
    <div
      className={`arcade-root arcade-${variant} ${shake ? "arcade-shake" : ""} ${attacking ? `arcade-shake` : ""}`}
    >
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
            <span className="arcade-title-year">
              © 19XX — UNKNOWN STUDIO · W {wins} / L {losses}
            </span>
          </div>
          <div className="arcade-hud-block">
            <span className="arcade-hud-label">CREDITS</span>
            <span className="arcade-hud-value">{String(credits).padStart(2, "0")}</span>
            <button
              className="arcade-help-btn"
              onClick={() => setShowHelp((v) => !v)}
              aria-label="How to play"
            >
              ? HELP
            </button>
          </div>
        </div>

        {/* How-to-play banner (always visible, compact) */}
        {phase === "select" && (
          <div className="arcade-howto">
            <span className="arcade-howto-step">
              <b className="arcade-howto-num">1</b> CLICK a fighter
            </span>
            <span className="arcade-howto-sep">→</span>
            <span className="arcade-howto-step">
              <b className="arcade-howto-num">2</b> WATCH them battle a random
              opponent
            </span>
            <span className="arcade-howto-sep">→</span>
            <span className="arcade-howto-step">
              <b className="arcade-howto-num">3</b> WIN the K.O. screen
            </span>
            <span className="arcade-howto-hotkeys">
              keys: ← → ↑ ↓ · Enter · Esc · ? for help
            </span>
          </div>
        )}

        {/* Fighter grid (select only) */}
        {phase === "select" && (
          <>
            <div className="arcade-prompt">
              <span className={tick % 2 === 0 ? "blink" : "blink off"}>
                ▶ SELECT YOUR FIGHTER
              </span>
            </div>

            <div className="arcade-grid">
              {FIGHTERS.map((f, idx) => (
                <button
                  key={f.id}
                  className={`arcade-card ${hover === f.id ? "hover" : ""} ${focusIdx === idx ? "focused" : ""}`}
                  style={
                    {
                      ["--accent" as string]: f.color,
                    } as React.CSSProperties
                  }
                  onMouseEnter={() => {
                    setHover(f.id);
                    setFocusIdx(idx);
                  }}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => startBattle(f)}
                >
                  <div className="arcade-card-portrait">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={f.sprite} alt={f.name} />
                  </div>
                  <div className="arcade-card-name">{f.name}</div>
                  <div className="arcade-card-rank">
                    {"★".repeat(f.rank)}
                    <span className="arcade-card-rank-off">
                      {"★".repeat(5 - f.rank)}
                    </span>
                  </div>
                  <div className="arcade-card-years">{f.years}</div>
                </button>
              ))}
            </div>

            {/* Hover detail */}
            <div className="arcade-detail">
              {(() => {
                const f = FIGHTERS.find((x) => x.id === hover) ?? FIGHTERS[focusIdx];
                return (
                  <>
                    <div className="arcade-detail-portrait">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={f.sprite} alt={f.name} />
                    </div>
                    <div className="arcade-detail-info">
                      <div className="arcade-detail-name" style={{ color: f.color }}>
                        {f.name}
                      </div>
                      <div className="arcade-detail-sub">&quot;{f.subtitle}&quot;</div>
                      <div className="arcade-detail-special">
                        SPECIAL:{" "}
                        <span style={{ color: f.color }}>{f.special}</span>
                      </div>
                      <div className="arcade-detail-tag">{f.tagline}</div>
                    </div>
                    <div className="arcade-detail-exp">
                      <div className="arcade-exp-label">EXP</div>
                      <div className="arcade-exp-bar">
                        <div
                          className="arcade-exp-fill"
                          style={{
                            width: `${f.rank * 20}%`,
                            background: `linear-gradient(90deg, ${f.color}, #fff)`,
                          }}
                        />
                      </div>
                      <div className="arcade-exp-years">{f.years}</div>
                    </div>
                  </>
                );
              })()}
            </div>
          </>
        )}

        {/* Battle stage */}
        {phase !== "select" && p1 && p2 && (
          <div className="arcade-stage">
            <BattlePanel
              fighter={p1}
              hp={hp1}
              side="left"
              attacking={attacking === "p1"}
              hit={hits.find((h) => h.side === "p1")?.text}
            />
            <div className="arcade-vs-sep">VS</div>
            <BattlePanel
              fighter={p2}
              hp={hp2}
              side="right"
              attacking={attacking === "p2"}
              hit={hits.find((h) => h.side === "p2")?.text}
            />

            {phase === "ko" && winner && (
              <div className="arcade-ko-panel">
                <div className="arcade-ko-text">
                  K.O.! WINNER: <span style={{ color: winner.color }}>{winner.name}</span>
                </div>
                <div className="arcade-ko-actions">
                  <button
                    onClick={() => {
                      if (p1) startBattle(p1);
                    }}
                  >
                    ⟳ REMATCH
                  </button>
                  <button onClick={resetBattle}>◀ CHANGE FIGHTER</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Insert coin footer */}
        <div className="arcade-coin">
          <span className={tick % 2 === 0 ? "blink" : "blink off"}>INSERT COIN</span>
          <span className="arcade-coin-dot">●</span>
          <span>{phase === "select" ? "PLAYER 1 READY" : "FIGHT IN PROGRESS"}</span>
          <span className="arcade-coin-dot">●</span>
          <span>{phase === "select" ? "PRESS ANY KEY" : "ESC TO FLEE"}</span>
        </div>

        {/* Flash overlays */}
        {flash === "vs" && (
          <div className="arcade-flash">
            <div className="arcade-flash-text">VS</div>
          </div>
        )}
        {flash === "ready" && (
          <div className="arcade-flash">
            <div className="arcade-flash-text">READY?</div>
          </div>
        )}
        {flash === "fight" && (
          <div className="arcade-flash">
            <div className="arcade-flash-text">FIGHT!</div>
          </div>
        )}
        {flash === "ko" && (
          <div className="arcade-flash arcade-flash-ko">
            <div className="arcade-flash-text">K.O.!</div>
          </div>
        )}

        {/* Combo counter */}
        {combo >= 2 && (
          <div className="arcade-combo" key={combo}>
            <span className="arcade-combo-x">×</span>
            <span className="arcade-combo-n">{combo}</span>
            <span className="arcade-combo-label">COMBO!</span>
          </div>
        )}

        {/* Help modal */}
        {showHelp && (
          <div
            className="arcade-help-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="arcade-help-inner">
              <div className="arcade-help-title">HOW TO PLAY</div>
              <ol>
                <li>
                  <b>CLICK</b> any fighter card to enter battle.
                </li>
                <li>
                  A random opponent appears — watch 6 alternating attacks. HP
                  drains based on star rank + RNG.
                </li>
                <li>
                  Whoever has more HP wins the <b>K.O.</b> screen. Each win
                  bumps your HI-SCORE by 2,500.
                </li>
                <li>
                  <b>REMATCH</b> replays with a fresh random opponent.
                  <b> CHANGE FIGHTER</b> returns to select.
                </li>
                <li>
                  Chain picks within 2.5s for <b>COMBO ×N</b> flash.
                </li>
              </ol>
              <div className="arcade-help-keys">
                <div><b>← → ↑ ↓</b> move · <b>Enter/Space</b> pick</div>
                <div><b>Esc</b> flee battle · <b>? / H</b> toggle help</div>
              </div>
              <button
                className="arcade-help-close"
                onClick={() => setShowHelp(false)}
              >
                GOT IT
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function BattlePanel({
  fighter,
  hp,
  side,
  attacking,
  hit,
}: {
  fighter: Fighter;
  hp: number;
  side: "left" | "right";
  attacking: boolean;
  hit?: string;
}) {
  return (
    <div
      className={`arcade-battler arcade-battler-${side} ${attacking ? "attacking" : ""} ${hp <= 0 ? "ko" : ""}`}
      style={{ ["--accent" as string]: fighter.color } as React.CSSProperties}
    >
      <div className="arcade-battler-name" style={{ color: fighter.color }}>
        {fighter.name}
      </div>
      <div className="arcade-battler-hp">
        <div className="arcade-battler-hp-bar">
          <div
            className="arcade-battler-hp-fill"
            style={{
              width: `${hp}%`,
              background: `linear-gradient(90deg, #fde047, #ef4444)`,
            }}
          />
        </div>
        <div className="arcade-battler-hp-num">{hp}</div>
      </div>
      <div className="arcade-battler-portrait">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={fighter.sprite} alt={fighter.name} />
        {hit && <div className="arcade-battler-hit">{hit}</div>}
      </div>
      <div className="arcade-battler-special">
        SPECIAL: <span style={{ color: fighter.color }}>{fighter.special}</span>
      </div>
    </div>
  );
}
