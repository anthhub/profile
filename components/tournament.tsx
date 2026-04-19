"use client";
import { useEffect, useRef, useState } from "react";
import { FIGHTERS, type Fighter } from "@/components/language-sprites";

type Match = {
  id: string;
  round: number;
  slot: number;
  a?: Fighter;
  b?: Fighter;
  winner?: Fighter;
  hpA: number;
  hpB: number;
  phase: "waiting" | "fighting" | "done";
  attacking?: "a" | "b" | null;
  lastHit?: { side: "a" | "b"; text: string };
};

// Seed top-8 by rank (stable sort) into standard 1v8, 4v5, 3v6, 2v7 pairings
function seedBracket(): Match[] {
  const sorted = [...FIGHTERS].sort((a, b) => b.rank - a.rank || a.name.localeCompare(b.name)).slice(0, 8);
  const pairs: [Fighter, Fighter][] = [
    [sorted[0], sorted[7]],
    [sorted[3], sorted[4]],
    [sorted[1], sorted[6]],
    [sorted[2], sorted[5]],
  ];
  const qf: Match[] = pairs.map((p, i) => ({
    id: `qf-${i}`,
    round: 0,
    slot: i,
    a: p[0],
    b: p[1],
    hpA: 100,
    hpB: 100,
    phase: "waiting",
    attacking: null,
  }));
  const sf: Match[] = [0, 1].map((i) => ({
    id: `sf-${i}`,
    round: 1,
    slot: i,
    hpA: 100,
    hpB: 100,
    phase: "waiting",
    attacking: null,
  }));
  const f: Match[] = [
    {
      id: "f-0",
      round: 2,
      slot: 0,
      hpA: 100,
      hpB: 100,
      phase: "waiting",
      attacking: null,
    },
  ];
  return [...qf, ...sf, ...f];
}

const ROUND_LABEL = ["Quarterfinal", "Semifinal", "Final"];
const HIT = ["BAM!", "POW!", "WHAM!", "CRIT!", "KO!", "ZAP!"];

export default function Tournament() {
  const [bracket, setBracket] = useState<Match[]>(() => seedBracket());
  const [running, setRunning] = useState(false);
  const [champion, setChampion] = useState<Fighter | null>(null);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [flash, setFlash] = useState<string | null>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  const later = (fn: () => void, ms: number) => {
    const t = setTimeout(fn, ms);
    timersRef.current.push(t);
    return t;
  };

  const damage = (attacker: Fighter, defender: Fighter) => {
    const base = 16 + attacker.rank * 3;
    const rng = Math.floor(Math.random() * 14);
    return Math.max(8, base - defender.rank + rng);
  };

  const runMatch = (matchIdx: number, all: Match[], done: () => void) => {
    const m = all[matchIdx];
    if (!m.a || !m.b) {
      done();
      return;
    }
    setCurrentId(m.id);
    setBracket((prev) => prev.map((x, i) => (i === matchIdx ? { ...x, phase: "fighting" } : x)));
    setFlash(`${ROUND_LABEL[m.round]} — ${m.a.name} vs ${m.b.name}`);
    later(() => setFlash(null), 1400);

    let hpA = 100;
    let hpB = 100;

    const round = (n: number, attacker: "a" | "b") => {
      later(() => {
        const att = attacker === "a" ? m.a! : m.b!;
        const def = attacker === "a" ? m.b! : m.a!;
        const dmg = damage(att, def);
        if (attacker === "a") hpB = Math.max(0, hpB - dmg);
        else hpA = Math.max(0, hpA - dmg);
        const word = HIT[Math.floor(Math.random() * HIT.length)];
        setBracket((prev) =>
          prev.map((x, i) =>
            i === matchIdx
              ? {
                  ...x,
                  hpA,
                  hpB,
                  attacking: attacker,
                  lastHit: { side: attacker === "a" ? "b" : "a", text: `${word} -${dmg}` },
                }
              : x,
          ),
        );
        later(() => {
          setBracket((prev) =>
            prev.map((x, i) => (i === matchIdx ? { ...x, attacking: null, lastHit: undefined } : x)),
          );
        }, 350);
        if ((hpA <= 0 || hpB <= 0) && n < 7) {
          later(finish, 600);
          return;
        }
      }, 500 + n * 700);
    };
    const finish = () => {
      const winner = hpA >= hpB ? m.a! : m.b!;
      setBracket((prev) =>
        prev.map((x, i) => {
          if (i === matchIdx) return { ...x, phase: "done", winner, attacking: null };
          // Advance winner into next round
          if (x.round === m.round + 1 && x.slot === Math.floor(m.slot / 2)) {
            return m.slot % 2 === 0 ? { ...x, a: winner } : { ...x, b: winner };
          }
          return x;
        }),
      );
      later(done, 700);
    };

    for (let n = 0; n < 7; n++) {
      round(n, n % 2 === 0 ? "a" : "b");
    }
    later(finish, 500 + 7 * 700 + 300);
  };

  const runAll = async () => {
    setRunning(true);
    const order = [0, 1, 2, 3, 4, 5, 6]; // qf x4, sf x2, f x1
    // Need to re-read bracket between runs because advancement mutates it
    const step = (i: number) => {
      if (i >= order.length) {
        // After final
        setBracket((prev) => {
          const finalMatch = prev[6];
          if (finalMatch?.winner) setChampion(finalMatch.winner);
          return prev;
        });
        setRunning(false);
        setCurrentId(null);
        return;
      }
      // Grab latest bracket
      setBracket((prev) => {
        runMatch(order[i], prev, () => step(i + 1));
        return prev;
      });
    };
    step(0);
  };

  const reset = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setBracket(seedBracket());
    setChampion(null);
    setCurrentId(null);
    setRunning(false);
    setFlash(null);
  };

  return (
    <div className="tourn-root">
      <div className="tourn-header">
        <div className="tourn-title">SKILL FIGHTER · CHAMPIONSHIP</div>
        <div className="tourn-actions">
          {!running && !champion && (
            <button className="tourn-btn" onClick={runAll}>
              ▶ START TOURNAMENT
            </button>
          )}
          {(running || champion) && (
            <button className="tourn-btn" onClick={reset}>
              ⟳ NEW BRACKET
            </button>
          )}
        </div>
      </div>

      {flash && <div className="tourn-flash">{flash}</div>}

      <div className="tourn-bracket">
        {/* Quarterfinals (round 0) */}
        <BracketColumn
          title="QUARTERFINALS"
          matches={bracket.filter((m) => m.round === 0)}
          activeId={currentId}
        />
        {/* Semifinals (round 1) */}
        <BracketColumn
          title="SEMIFINALS"
          matches={bracket.filter((m) => m.round === 1)}
          activeId={currentId}
        />
        {/* Final (round 2) */}
        <BracketColumn
          title="FINAL"
          matches={bracket.filter((m) => m.round === 2)}
          activeId={currentId}
          final
        />
      </div>

      {champion && (
        <div className="tourn-champion">
          <div className="tourn-champ-crown">👑</div>
          <div className="tourn-champ-name" style={{ color: champion.color }}>
            CHAMPION: {champion.name}
          </div>
          <div className="tourn-champ-sub">&quot;{champion.subtitle}&quot; · {champion.special}</div>
        </div>
      )}
    </div>
  );
}

function BracketColumn({
  title,
  matches,
  activeId,
  final,
}: {
  title: string;
  matches: Match[];
  activeId: string | null;
  final?: boolean;
}) {
  return (
    <div className={`tourn-col ${final ? "tourn-col-final" : ""}`}>
      <div className="tourn-col-title">{title}</div>
      <div className="tourn-col-matches">
        {matches.map((m) => (
          <MatchCard key={m.id} m={m} active={activeId === m.id} />
        ))}
      </div>
    </div>
  );
}

function MatchCard({ m, active }: { m: Match; active: boolean }) {
  const row = (
    f: Fighter | undefined,
    hp: number,
    side: "a" | "b",
  ) => (
    <div
      className={`tourn-row ${m.winner && f && m.winner.id === f.id ? "won" : ""} ${
        m.winner && f && m.winner.id !== f.id ? "lost" : ""
      } ${m.attacking === side ? "attacking" : ""}`}
      style={f ? ({ ["--accent" as string]: f.color } as React.CSSProperties) : undefined}
    >
      {f ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={f.sprite} alt={f.name} className="tourn-sprite" />
          <span className="tourn-name">{f.name}</span>
          <span className="tourn-hp">
            <span className="tourn-hp-bar">
              <span className="tourn-hp-fill" style={{ width: `${hp}%` }} />
            </span>
            <span className="tourn-hp-num">{hp}</span>
          </span>
          {m.lastHit?.side === side && (
            <span className="tourn-hit">{m.lastHit.text}</span>
          )}
        </>
      ) : (
        <span className="tourn-tbd">TBD</span>
      )}
    </div>
  );
  return (
    <div className={`tourn-match ${active ? "active" : ""} ${m.phase}`}>
      {row(m.a, m.hpA, "a")}
      <div className="tourn-vs">VS</div>
      {row(m.b, m.hpB, "b")}
    </div>
  );
}
