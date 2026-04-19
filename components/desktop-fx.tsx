"use client";
import { useEffect, useRef, useState } from "react";

// Respect prefers-reduced-motion everywhere — single hook used across all FX.
function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

// ---------- 1. Cursor trail (pixel stars) ----------

type TrailPoint = { id: number; x: number; y: number; hue: number };

export function CursorTrail({ enabled = true }: { enabled?: boolean }) {
  const reduced = useReducedMotion();
  const [points, setPoints] = useState<TrailPoint[]>([]);
  const counterRef = useRef(0);
  const lastRef = useRef(0);

  useEffect(() => {
    if (!enabled || reduced) return;
    const MIN_DIST = 14;
    let lastX = -9999;
    let lastY = -9999;

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastRef.current < 16) return; // ~60fps cap
      lastRef.current = now;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      if (dx * dx + dy * dy < MIN_DIST * MIN_DIST) return;
      lastX = e.clientX;
      lastY = e.clientY;
      counterRef.current++;
      const id = counterRef.current;
      const hue = (counterRef.current * 23) % 360;
      setPoints((ps) =>
        [...ps, { id, x: e.clientX, y: e.clientY, hue }].slice(-14),
      );
      // Auto-remove after animation
      setTimeout(() => {
        setPoints((ps) => ps.filter((p) => p.id !== id));
      }, 900);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled, reduced]);

  if (!enabled || reduced) return null;
  return (
    <div className="fx-trail" aria-hidden>
      {points.map((p) => (
        <span
          key={p.id}
          className="fx-trail-dot"
          style={
            {
              left: p.x,
              top: p.y,
              ["--hue" as string]: p.hue,
            } as React.CSSProperties
          }
        >
          ✦
        </span>
      ))}
    </div>
  );
}

// ---------- 2. Ambient particles (3-layer drift) ----------

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  char: string;
  color: string;
  layer: 1 | 2 | 3;
  drift: number; // horizontal sway amplitude
  phase: number;
};

const PARTICLE_CHARS_TEAL = ["✦", "·", "•", "◇", "+", "☆", "*", "◦"];
const PARTICLE_CHARS_MATRIX = ["0", "1", "ア", "カ", "サ", "タ", "ナ", "ハ", "マ", "ヤ", "0", "1", "Z"];
const PARTICLE_CHARS_CODE = ["{", "}", "<", ">", "/", ";", "=", "(", ")", "[", "]"];

export function AmbientParticles({
  count = 40,
  wallpaper,
  enabled = true,
}: {
  count?: number;
  wallpaper: string;
  enabled?: boolean;
}) {
  const reduced = useReducedMotion();
  const [particles, setParticles] = useState<Particle[]>([]);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || reduced) {
      setParticles([]);
      return;
    }
    const chars =
      wallpaper === "matrix"
        ? PARTICLE_CHARS_MATRIX
        : wallpaper === "space"
          ? PARTICLE_CHARS_TEAL
          : wallpaper === "sunset"
            ? PARTICLE_CHARS_CODE
            : PARTICLE_CHARS_TEAL;
    const palette =
      wallpaper === "matrix"
        ? ["#38f97a", "#10b981", "#84cc16"]
        : wallpaper === "space"
          ? ["#f0f9ff", "#c4b5fd", "#fde68a"]
          : wallpaper === "sunset"
            ? ["#fde68a", "#fdba74", "#fca5a5"]
            : ["#a7f3d0", "#bae6fd", "#ecfeff"];

    setParticles(
      Array.from({ length: count }, (_, i) => {
        const layer = ((i % 3) + 1) as 1 | 2 | 3;
        return {
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: layer === 1 ? 8 : layer === 2 ? 12 : 16,
          speed: 18 + Math.random() * 40 + (3 - layer) * 10,
          char: chars[Math.floor(Math.random() * chars.length)],
          color: palette[Math.floor(Math.random() * palette.length)],
          layer,
          drift: 10 + Math.random() * 30,
          phase: Math.random() * 360,
        };
      }),
    );
  }, [count, wallpaper, enabled, reduced]);

  if (!enabled || reduced) return null;
  return (
    <div className="fx-particles" ref={wrapRef} aria-hidden>
      {particles.map((p) => (
        <span
          key={p.id}
          className={`fx-particle fx-particle-l${p.layer}`}
          style={
            {
              left: `${p.x}%`,
              top: `${p.y}%`,
              fontSize: p.size,
              color: p.color,
              animationDuration: `${p.speed}s`,
              animationDelay: `${-Math.random() * p.speed}s`,
              ["--drift" as string]: `${p.drift}px`,
              ["--phase" as string]: `${p.phase}deg`,
            } as React.CSSProperties
          }
        >
          {p.char}
        </span>
      ))}
    </div>
  );
}

// ---------- 3. Konami party mode ----------

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function useKonami(onTrigger: () => void) {
  useEffect(() => {
    let idx = 0;
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === KONAMI[idx]) {
        idx++;
        if (idx === KONAMI.length) {
          onTrigger();
          idx = 0;
        }
      } else {
        idx = key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onTrigger]);
}

type Confetti = {
  id: number;
  x: number;
  color: string;
  size: number;
  duration: number;
  delay: number;
  rot: number;
  char: string;
};

export function PartyOverlay({
  active,
  onEnd,
}: {
  active: boolean;
  onEnd: () => void;
}) {
  const [confetti, setConfetti] = useState<Confetti[]>([]);

  useEffect(() => {
    if (!active) return;
    const pieces: Confetti[] = Array.from({ length: 80 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      color: [
        "#ff2d95",
        "#22d3ee",
        "#fde047",
        "#a855f7",
        "#34d399",
        "#fb923c",
      ][Math.floor(Math.random() * 6)],
      size: 8 + Math.random() * 10,
      duration: 2.4 + Math.random() * 2.4,
      delay: Math.random() * 1.2,
      rot: Math.random() * 720,
      char: ["★", "✦", "◆", "●", "■", "▲"][
        Math.floor(Math.random() * 6)
      ],
    }));
    setConfetti(pieces);
    const t = setTimeout(onEnd, 10_000);
    return () => clearTimeout(t);
  }, [active, onEnd]);

  if (!active) return null;
  return (
    <>
      <div className="fx-rainbow" aria-hidden />
      <div className="fx-confetti" aria-hidden>
        {confetti.map((c) => (
          <span
            key={c.id}
            className="fx-confetti-piece"
            style={
              {
                left: `${c.x}%`,
                color: c.color,
                fontSize: c.size,
                animationDuration: `${c.duration}s`,
                animationDelay: `${c.delay}s`,
                ["--rot" as string]: `${c.rot}deg`,
              } as React.CSSProperties
            }
          >
            {c.char}
          </span>
        ))}
      </div>
      <div className="fx-konami-banner" aria-hidden>
        K · O · N · A · M · I
        <span className="fx-konami-sub">PARTY MODE UNLOCKED — 10s</span>
      </div>
    </>
  );
}

// ---------- 4. BSOD ----------

export function BSOD({ active, onExit }: { active: boolean; onExit: () => void }) {
  const [phase, setPhase] = useState<"blue" | "recover">("blue");
  useEffect(() => {
    if (!active) return;
    setPhase("blue");
    const t1 = setTimeout(() => setPhase("recover"), 3800);
    const t2 = setTimeout(onExit, 6200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [active, onExit]);

  if (!active) return null;
  return (
    <div className="fx-bsod" role="alert" onClick={onExit}>
      {phase === "blue" ? (
        <div className="fx-bsod-content">
          <div className="fx-bsod-header">
            &nbsp;Windows&nbsp;
          </div>
          <p>
            A fatal exception 0E has occurred at anthhub:C0DE:1337 in VXD
            VMM(01) + FUN. The current application will be terminated.
          </p>
          <ul>
            <li>✱ Press any key to admire the developer behind this machine.</li>
            <li>✱ Press CTRL+ALT+DEL to restart your computer.</li>
            <li>✱ Did you try turning it off and on again?</li>
          </ul>
          <p>
            If you do this, you will lose any unsaved information in all
            unopened applications.
          </p>
          <p className="fx-bsod-prompt">Press any key to continue _</p>
        </div>
      ) : (
        <div className="fx-bsod-content fx-bsod-recover">
          <pre>{`> ctrl-alt-del
> reboot...
> loading anthhub.sys ............ OK
> mounting /projects ............. OK
> goodbye blue screen ............ OK
`}</pre>
        </div>
      )}
    </div>
  );
}
