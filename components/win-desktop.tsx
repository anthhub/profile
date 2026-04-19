"use client";
import { useState, useEffect, useCallback } from "react";
import { Rnd } from "react-rnd";
import type { Categories, Repo } from "@/lib/data";
import {
  FolderIcon,
  GithubIcon,
  ComputerIcon,
  DocIcon,
  MailIcon,
  StartLogo,
  WantedIcon,
  ArcadeIcon,
} from "@/components/icons";
import WantedPoster from "@/components/wanted-poster";
import ArcadeCabinet from "@/components/arcade-cabinet";
import {
  CursorTrail,
  AmbientParticles,
  useKonami,
  PartyOverlay,
  BSOD,
} from "@/components/desktop-fx";

type Wallpaper = "teal" | "sunset" | "space" | "matrix";
const WALLPAPERS: Record<Wallpaper, string> = {
  teal: "Teal (Classic)",
  sunset: "Sunset Orange",
  space: "Deep Space",
  matrix: "Matrix Green",
};

type WindowKind =
  | { type: "category"; key: string }
  | { type: "repo"; repo: Repo }
  | { type: "about" }
  | { type: "readme" }
  | { type: "wanted" }
  | { type: "arcade" };

type OpenWindow = {
  id: string;
  title: string;
  icon: string;
  kind: WindowKind;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  minimized?: boolean;
};

const categoryFolderColor: Record<string, string> = {
  "Engineering Library": "#f4d76b",
  "VScode Plugin": "#6ad0f4",
  "Creative Application": "#f29abb",
};

const clippyMessages = [
  "👋 Hi! I'm Clippy. Double-click any folder to see projects!",
  "💡 Tip: Engineering Library has my open-source libs (Matrox, Forwarder…)",
  "🧩 VScode Plugin → editor extensions I published to the marketplace",
  "🎨 Creative Application → fun Web / WASM experiments",
  "☠️ Secret: open WANTED.exe for the One Piece bounty poster!",
  "🕹️ Try ARCADE.exe — pick your fighter from 12 pixel-art languages!",
  "🎮 Power users: try the Konami code ↑↑↓↓←→←→BA 🎉",
  "🖱️ Right-click the desktop for wallpapers, scanlines & properties",
  "⌨️ Press ESC to close any window. Click Start for the full menu.",
  "📺 Want full CRT vibes? Start → \"CRT scanlines\"",
];

export default function WinDesktop({ data }: { data: Categories }) {
  const [windows, setWindows] = useState<OpenWindow[]>([]);
  const [zCounter, setZCounter] = useState(100);
  const [startOpen, setStartOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [clock, setClock] = useState("");
  const [booted, setBooted] = useState(false);
  const [scanlines, setScanlines] = useState(false);
  const [clippyOpen, setClippyOpen] = useState(true);
  const [clippyMsg, setClippyMsg] = useState(0);
  const [highlightIcons, setHighlightIcons] = useState(true);
  const [idleHint, setIdleHint] = useState(false);
  const [party, setParty] = useState(false);
  const [bsod, setBsod] = useState(false);
  const [wallpaper, setWallpaper] = useState<Wallpaper>("teal");
  const [startClicks, setStartClicks] = useState<number[]>([]);
  const [contextMenu, setContextMenu] = useState<
    | { x: number; y: number; sub?: "wallpaper" | null }
    | null
  >(null);
  const [closingIds, setClosingIds] = useState<string[]>([]);

  // Konami code → party mode
  useKonami(() => setParty(true));

  // BSOD: 5 rapid Start clicks in 1.5s
  const onStartClick = () => {
    const now = Date.now();
    setStartClicks((arr) => {
      const fresh = [...arr, now].filter((t) => now - t < 1500);
      if (fresh.length >= 5) {
        setBsod(true);
        return [];
      }
      return fresh;
    });
    setStartOpen((v) => !v);
  };

  // Boot screen (show for 1.2s)
  useEffect(() => {
    const t = setTimeout(() => setBooted(true), 1200);
    return () => clearTimeout(t);
  }, []);

  // Cycle Clippy messages
  useEffect(() => {
    if (!booted) return;
    const i = setInterval(() => setClippyMsg((n) => (n + 1) % clippyMessages.length), 5000);
    return () => clearInterval(i);
  }, [booted]);

  // Fade the icon-pulse after 10s so it doesn't distract forever
  useEffect(() => {
    if (!booted) return;
    const t = setTimeout(() => setHighlightIcons(false), 10000);
    return () => clearTimeout(t);
  }, [booted]);

  // Auto-open welcome windows so content is visible at first glance
  useEffect(() => {
    if (!booted) return;
    const firstCat = Object.keys(data)[0];
    const base = typeof window !== "undefined" ? window.innerWidth : 1280;
    const isMobile = base < 820;
    const readmeW = isMobile ? Math.min(360, base - 24) : 440;
    const readmeH = isMobile ? 300 : 340;
    const catW = isMobile ? Math.min(360, base - 24) : 560;
    const catH = isMobile ? 320 : 420;
    const items: OpenWindow[] = [
      {
        id: "readme",
        title: "README.txt",
        icon: DocIcon("#888"),
        kind: { type: "readme" },
        x: isMobile ? 12 : 80,
        y: isMobile ? 12 : 50,
        w: readmeW,
        h: readmeH,
        z: 100,
      },
    ];
    if (firstCat) {
      items.push({
        id: `cat-${firstCat}`,
        title: firstCat,
        icon: FolderIcon(categoryFolderColor[firstCat] ?? "#f4d76b"),
        kind: { type: "category", key: firstCat },
        x: isMobile ? 12 : 80 + readmeW + 24,
        y: isMobile ? 12 + readmeH + 12 : 90,
        w: catW,
        h: catH,
        z: 101,
      });
    }
    setWindows(items);
    setZCounter(101 + items.length);
  }, [booted, data]);

  // Idle hint: if the user stops interacting for 8s, nudge them
  useEffect(() => {
    if (!booted) return;
    let t: ReturnType<typeof setTimeout>;
    const reset = () => {
      setIdleHint(false);
      clearTimeout(t);
      t = setTimeout(() => setIdleHint(true), 8000);
    };
    reset();
    window.addEventListener("mousemove", reset);
    window.addEventListener("click", reset);
    window.addEventListener("keydown", reset);
    return () => {
      clearTimeout(t);
      window.removeEventListener("mousemove", reset);
      window.removeEventListener("click", reset);
      window.removeEventListener("keydown", reset);
    };
  }, [booted]);

  // ESC closes the top-most window
  useEffect(() => {
    if (!booted) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setWindows((ws) => {
          if (ws.length === 0) return ws;
          const top = ws.reduce((a, b) => (a.z > b.z ? a : b));
          return ws.filter((w) => w.id !== top.id);
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [booted]);

  // Live clock
  useEffect(() => {
    const update = () => {
      const d = new Date();
      const hh = d.getHours() % 12 || 12;
      const mm = String(d.getMinutes()).padStart(2, "0");
      const ampm = d.getHours() >= 12 ? "PM" : "AM";
      setClock(`${hh}:${mm} ${ampm}`);
    };
    update();
    const i = setInterval(update, 10000);
    return () => clearInterval(i);
  }, []);

  const focusWindow = (id: string) => {
    const next = zCounter + 1;
    setZCounter(next);
    setWindows((ws) =>
      ws.map((w) => (w.id === id ? { ...w, z: next, minimized: false } : w)),
    );
  };

  const openWindow = useCallback(
    (kind: WindowKind) => {
      let id: string;
      let title: string;
      let icon: string;
      let w = 520;
      let h = 380;
      let x = 80;
      let y = 60;

      if (kind.type === "category") {
        id = `cat-${kind.key}`;
        title = kind.key;
        icon = FolderIcon(categoryFolderColor[kind.key] ?? "#f4d76b");
        w = 560;
        h = 420;
      } else if (kind.type === "repo") {
        id = `repo-${kind.repo.name}`;
        title = kind.repo.name;
        icon = DocIcon("#4a6cd4");
        w = 480;
        h = 440;
      } else if (kind.type === "about") {
        id = "about";
        title = "About anthhub.exe";
        icon = ComputerIcon();
        w = 420;
        h = 260;
      } else if (kind.type === "wanted") {
        id = "wanted";
        title = "WANTED.exe";
        icon = WantedIcon();
        w = 600;
        h = 560;
      } else if (kind.type === "arcade") {
        id = "arcade";
        title = "ARCADE.exe — Skill Fighter";
        icon = ArcadeIcon();
        w = 720;
        h = 560;
      } else {
        id = "readme";
        title = "README.txt";
        icon = DocIcon("#888");
        w = 440;
        h = 320;
      }

      setWindows((ws) => {
        if (ws.find((o) => o.id === id)) {
          return ws.map((o) => (o.id === id ? { ...o, minimized: false, z: zCounter + 1 } : o));
        }
        // Offset stack so new windows don't overlap perfectly
        const offset = ws.length * 24;
        return [
          ...ws,
          { id, title, icon, kind, x: x + offset, y: y + offset, w, h, z: zCounter + 1 },
        ];
      });
      setZCounter((n) => n + 1);
      setStartOpen(false);
    },
    [zCounter],
  );

  const closeWindow = (id: string) => {
    setClosingIds((ids) => [...ids, id]);
    setTimeout(() => {
      setWindows((ws) => ws.filter((w) => w.id !== id));
      setClosingIds((ids) => ids.filter((x) => x !== id));
    }, 220);
  };

  const minimizeWindow = (id: string) =>
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, minimized: true } : w)));

  // Click outside icons deselects
  const onDesktopClick = () => {
    setSelectedIcon(null);
    setStartOpen(false);
    setContextMenu(null);
  };

  const onDesktopContext = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, sub: null });
    setStartOpen(false);
  };

  if (!booted) return <BootScreen />;

  const categoryKeys = Object.keys(data);
  const desktopIcons = [
    ...categoryKeys.map((k) => ({
      id: `icon-${k}`,
      label: k,
      img: FolderIcon(categoryFolderColor[k] ?? "#f4d76b"),
      onOpen: () => openWindow({ type: "category", key: k }),
    })),
    {
      id: "icon-computer",
      label: "My Computer",
      img: ComputerIcon(),
      onOpen: () => openWindow({ type: "about" }),
    },
    {
      id: "icon-readme",
      label: "README.txt",
      img: DocIcon("#888"),
      onOpen: () => openWindow({ type: "readme" }),
    },
    {
      id: "icon-github",
      label: "GitHub",
      img: GithubIcon(),
      onOpen: () => window.open("https://github.com/anthhub", "_blank"),
    },
    {
      id: "icon-arcade",
      label: "ARCADE.exe",
      img: ArcadeIcon(),
      onOpen: () => openWindow({ type: "arcade" }),
    },
    {
      id: "icon-wanted",
      label: "WANTED.exe",
      img: WantedIcon(),
      onOpen: () => openWindow({ type: "wanted" }),
    },
    {
      id: "icon-mail",
      label: "Send Email",
      img: MailIcon(),
      onOpen: () => (window.location.href = "mailto:andyousiron@gmail.com"),
    },
  ];

  return (
    <div className={`${scanlines ? "scanlines" : ""} wp-${wallpaper} ${party ? "party-mode" : ""}`}>
      <AmbientParticles count={42} wallpaper={wallpaper} enabled={!bsod} />
      <CursorTrail enabled={!bsod} />
      <div
        className="desktop"
        onClick={onDesktopClick}
        onContextMenu={onDesktopContext}
      >
        <div className="desktop-grid">
          {desktopIcons.map((icon, idx) => (
            <DesktopIcon
              key={icon.id}
              label={icon.label}
              src={icon.img}
              selected={selectedIcon === icon.id}
              pulse={highlightIcons && idx < 3}
              onSelect={(e) => {
                e.stopPropagation();
                setSelectedIcon(icon.id);
              }}
              onOpen={() => {
                setHighlightIcons(false);
                icon.onOpen();
              }}
            />
          ))}
        </div>

        {/* Sticky Note — pinned welcome card */}
        <div className="sticky-note" onClick={(e) => e.stopPropagation()}>
          <div className="sticky-tape" />
          <div className="sticky-title">hi, i&apos;m anthhub 👋</div>
          <div className="sticky-body">
            frontend · fullstack · AI agent<br />
            open-source author · 98-style nerd
          </div>
          <div className="sticky-hint">
            ↖ <b>double-click</b> a folder to explore my projects
          </div>
          <div className="sticky-links">
            <a
              href="https://github.com/anthhub"
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              github.com/anthhub
            </a>
          </div>
        </div>

        {/* Idle-hint arrow (appears after inactivity) */}
        {idleHint && (
          <div className="idle-hint" aria-hidden>
            <div className="idle-hint-bubble">try me! 👉</div>
            <div className="idle-hint-arrow" />
          </div>
        )}

        {windows.map((w) => !w.minimized && (
          <Rnd
            key={w.id}
            default={{ x: w.x, y: w.y, width: w.w, height: w.h }}
            minWidth={280}
            minHeight={180}
            bounds="parent"
            dragHandleClassName="title-bar"
            style={{ zIndex: w.z, display: w.minimized ? "none" : "block" }}
            onMouseDown={() => focusWindow(w.id)}
          >
            <div
              className={`window win-frame win-anim ${closingIds.includes(w.id) ? "win-closing" : ""}`}
              style={{ width: "100%", height: "100%" }}
            >
              <div className="title-bar">
                <div className="title-bar-text" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={w.icon} alt="" width={16} height={16} style={{ imageRendering: "pixelated" }} />
                  <span>{w.title}</span>
                </div>
                <div className="title-bar-controls">
                  <button aria-label="Minimize" onClick={() => minimizeWindow(w.id)} />
                  <button aria-label="Maximize" />
                  <button aria-label="Close" onClick={() => closeWindow(w.id)} />
                </div>
              </div>
              <WindowContent kind={w.kind} data={data} onOpenRepo={(r) => openWindow({ type: "repo", repo: r })} />
            </div>
          </Rnd>
        ))}
      </div>

      {/* Taskbar */}
      <div className="taskbar" onClick={(e) => e.stopPropagation()}>
        <button
          className={`taskbar-start ${startOpen ? "active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onStartClick();
          }}
          style={{
            fontWeight: "bold",
            fontSize: 12,
            padding: "2px 10px",
            height: 24,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={StartLogo()} alt="" width={20} height={16} style={{ imageRendering: "pixelated" }} />
          Start
        </button>

        {windows.map((w) => (
          <div
            key={w.id}
            className={`taskbar-item ${!w.minimized ? "active" : ""}`}
            onClick={() => focusWindow(w.id)}
            title={w.title}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={w.icon} alt="" />
            <span>{w.title}</span>
          </div>
        ))}

        <div className="taskbar-clock" title="System clock">{clock}</div>
      </div>

      {/* Clippy-style pixel assistant */}
      {clippyOpen && booted && (
        <Clippy
          message={clippyMessages[clippyMsg]}
          onClose={() => setClippyOpen(false)}
          onCycle={() => setClippyMsg((n) => (n + 1) % clippyMessages.length)}
        />
      )}

      {/* Start menu */}
      {startOpen && (
        <div className="start-menu" onClick={(e) => e.stopPropagation()}>
          <div className="start-menu-sidebar">anthhub 98</div>
          <div className="start-menu-items">
            {categoryKeys.map((k) => (
              <div
                key={k}
                className="start-menu-item"
                onClick={() => openWindow({ type: "category", key: k })}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={FolderIcon(categoryFolderColor[k] ?? "#f4d76b")} alt="" />
                {k}
              </div>
            ))}
            <div className="start-menu-sep" />
            <div className="start-menu-item" onClick={() => openWindow({ type: "readme" })}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={DocIcon("#888")} alt="" />
              README.txt
            </div>
            <div className="start-menu-item" onClick={() => openWindow({ type: "arcade" })}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ArcadeIcon()} alt="" />
              ARCADE.exe
            </div>
            <div className="start-menu-item" onClick={() => openWindow({ type: "wanted" })}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={WantedIcon()} alt="" />
              WANTED.exe
            </div>
            <div
              className="start-menu-item"
              onClick={() => window.open("https://github.com/anthhub", "_blank")}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={GithubIcon()} alt="" />
              GitHub...
            </div>
            <div className="start-menu-item" onClick={() => openWindow({ type: "about" })}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ComputerIcon()} alt="" />
              About anthhub.exe
            </div>
            <div className="start-menu-sep" />
            <div
              className="start-menu-item"
              onClick={() => {
                setScanlines((v) => !v);
                setStartOpen(false);
              }}
            >
              📺 CRT scanlines ({scanlines ? "ON" : "OFF"})
            </div>
            <div
              className="start-menu-item"
              onClick={() => {
                if (confirm("Really shut down? (just reloads the page)")) location.reload();
              }}
            >
              ⏻ Shut Down...
            </div>
          </div>
        </div>
      )}

      {/* Right-click desktop context menu */}
      {contextMenu && (
        <div
          className="ctx-menu"
          style={{ left: contextMenu.x, top: contextMenu.y }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="ctx-item"
            onClick={() => {
              setContextMenu(null);
              // "Refresh" = quick flash
              const d = document.querySelector(".desktop") as HTMLElement | null;
              if (d) {
                d.classList.remove("refreshing");
                void d.offsetWidth;
                d.classList.add("refreshing");
              }
            }}
          >
            <span className="ctx-ic">↻</span>Refresh
          </div>
          <div
            className="ctx-item"
            onMouseEnter={() => setContextMenu({ ...contextMenu, sub: "wallpaper" })}
          >
            <span className="ctx-ic">🖼️</span>
            Change Wallpaper ▶
            {contextMenu.sub === "wallpaper" && (
              <div className="ctx-submenu">
                {(Object.keys(WALLPAPERS) as Wallpaper[]).map((w) => (
                  <div
                    key={w}
                    className={`ctx-item ${wallpaper === w ? "active" : ""}`}
                    onClick={() => {
                      setWallpaper(w);
                      setContextMenu(null);
                    }}
                  >
                    {WALLPAPERS[w]}
                    {wallpaper === w ? " ✓" : ""}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div
            className="ctx-item"
            onClick={() => {
              setScanlines((v) => !v);
              setContextMenu(null);
            }}
          >
            <span className="ctx-ic">📺</span>
            CRT scanlines ({scanlines ? "ON" : "OFF"})
          </div>
          <div className="ctx-sep" />
          <div
            className="ctx-item"
            onClick={() => {
              openWindow({ type: "about" });
              setContextMenu(null);
            }}
          >
            <span className="ctx-ic">ℹ️</span>Properties
          </div>
        </div>
      )}

      {/* Konami party overlay */}
      <PartyOverlay active={party} onEnd={() => setParty(false)} />

      {/* BSOD easter egg */}
      <BSOD active={bsod} onExit={() => setBsod(false)} />
    </div>
  );
}

// ============== subcomponents ==============

function DesktopIcon({
  label,
  src,
  selected,
  pulse,
  onSelect,
  onOpen,
}: {
  label: string;
  src: string;
  selected: boolean;
  pulse?: boolean;
  onSelect: (e: React.MouseEvent) => void;
  onOpen: () => void;
}) {
  const lastClickRef = { current: 0 } as { current: number };
  return (
    <div
      className={`desktop-icon ${selected ? "selected" : ""} ${pulse ? "pulse" : ""}`}
      onClick={(e) => {
        onSelect(e);
        const now = Date.now();
        if (now - lastClickRef.current < 350) onOpen();
        lastClickRef.current = now;
      }}
      onDoubleClick={onOpen}
      title={`Double-click to open ${label}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="desktop-icon-img" />
      <div className="desktop-icon-label">{label}</div>
    </div>
  );
}

function WindowContent({
  kind,
  data,
  onOpenRepo,
}: {
  kind: WindowKind;
  data: Categories;
  onOpenRepo: (r: Repo) => void;
}) {
  if (kind.type === "category") {
    const items = data[kind.key] || [];
    return (
      <div className="window-body" style={{ background: "#fff", padding: 0 }}>
        <div style={{ background: "#c0c0c0", padding: "6px 8px", borderBottom: "1px solid #808080" }}>
          <div style={{ fontSize: 11, color: "#000" }}>
            {items.length} object(s) · Click twice to open a project
          </div>
        </div>
        <div style={{ padding: 4 }}>
          {items.map((repo) => (
            <div
              key={repo.name}
              className="project-row"
              onDoubleClick={() => onOpenRepo(repo)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={DocIcon("#4a6cd4")} alt="" className="project-icon" />
              <div className="project-meta">
                <div className="project-name">{repo.name}</div>
                <div className="project-desc">
                  {(repo.desc[0] || "").slice(0, 120)}
                  {repo.desc[0] && repo.desc[0].length > 120 ? "…" : ""}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (kind.type === "repo") {
    const r = kind.repo;
    return (
      <div className="window-body">
        <div className="readme-scroll">
          <div style={{ fontWeight: "bold", fontSize: 14, marginBottom: 6 }}>{r.name}</div>
          <ul>
            {r.desc.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
          <div style={{ marginTop: 10 }}>
            {r.tags.map((t) => (
              <span key={t} className="tag-chip">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 8, display: "flex", gap: 6, justifyContent: "flex-end" }}>
          {r.github && (
            <button onClick={() => window.open(r.github, "_blank")}>Open in GitHub</button>
          )}
          {r.url && r.url !== r.github && (
            <button onClick={() => window.open(r.url, "_blank")}>Visit...</button>
          )}
        </div>
      </div>
    );
  }

  if (kind.type === "arcade") {
    return (
      <div className="window-body" style={{ padding: 0, background: "#000" }}>
        <ArcadeCabinet variant="framed" />
        <div
          style={{
            position: "sticky",
            bottom: 0,
            padding: "6px 10px",
            background: "#c0c0c0",
            borderTop: "1px solid #808080",
            display: "flex",
            gap: 8,
            justifyContent: "flex-end",
          }}
        >
          <button onClick={() => window.open("/arcade", "_blank")}>
            Open fullscreen ↗
          </button>
        </div>
      </div>
    );
  }

  if (kind.type === "wanted") {
    return (
      <div className="window-body" style={{ padding: 0, background: "#2b1706" }}>
        <WantedPoster variant="framed" />
        <div
          style={{
            position: "sticky",
            bottom: 0,
            padding: "6px 10px",
            background: "#c0c0c0",
            borderTop: "1px solid #808080",
            display: "flex",
            gap: 8,
            justifyContent: "flex-end",
          }}
        >
          <button onClick={() => window.open("/wanted", "_blank")}>
            Open fullscreen ↗
          </button>
          <button onClick={() => window.open("https://github.com/anthhub", "_blank")}>
            Turn in pirate
          </button>
        </div>
      </div>
    );
  }

  if (kind.type === "about") {
    return (
      <div className="window-body">
        <div style={{ padding: 16, textAlign: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ComputerIcon()} alt="" width={48} height={48} style={{ imageRendering: "pixelated", marginBottom: 12 }} />
          <div style={{ fontWeight: "bold", fontSize: 14 }}>anthhub.exe</div>
          <div style={{ fontSize: 12, marginTop: 4 }}>Version 2026.04 (build 98)</div>
          <div style={{ fontSize: 11, color: "#444", marginTop: 12, lineHeight: 1.5 }}>
            Frontend / Fullstack engineer · Shanghai<br />
            Engineering Library · VScode Plugin · Creative Application
          </div>
          <div
            className="field-row"
            style={{ justifyContent: "center", marginTop: 16 }}
          >
            <button onClick={() => window.open("https://github.com/anthhub", "_blank")}>
              Visit GitHub
            </button>
          </div>
        </div>
      </div>
    );
  }

  // readme
  return (
    <div className="window-body">
      <div className="readme-scroll" style={{ fontFamily: "Courier New, monospace" }}>
        <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>
{`WELCOME TO anthhub.exe
────────────────────────────

Double-click a folder on the desktop to browse projects.
Each folder maps to a category:

  🗂  Engineering Library   - open-source libs & tools
  🗂  VScode Plugin          - editor extensions
  🗂  Creative Application   - fun / hack / WebAssembly

Tip: drag window title bars to move windows around.
     click "Start" for the menu.
     try "CRT scanlines" in the Start menu for full retro vibes.

更多项目源码, 请移步 GitHub, 或者面基 [奸笑]...

— anthhub@2026`}
        </pre>
      </div>
    </div>
  );
}

function Clippy({
  message,
  onClose,
  onCycle,
}: {
  message: string;
  onClose: () => void;
  onCycle: () => void;
}) {
  return (
    <div className="clippy-wrap" role="dialog" aria-label="Assistant">
      <div className="clippy-bubble">
        <button className="clippy-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <div className="clippy-msg">{message}</div>
        <button className="clippy-next" onClick={onCycle}>
          Next tip →
        </button>
        <div className="clippy-tail" />
      </div>
      <div className="clippy-body" onClick={onCycle} title="Click me for another tip">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="pixel assistant"
          width={72}
          height={72}
          style={{ imageRendering: "pixelated" }}
          src={`data:image/svg+xml;utf8,${encodeURIComponent(
            `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' shape-rendering='crispEdges'>
              <rect x='8' y='4' width='16' height='20' fill='#e8e8f0' stroke='#000'/>
              <rect x='8' y='4' width='16' height='3' fill='#8cb4ff' stroke='#000'/>
              <rect x='11' y='10' width='3' height='3' fill='#fff' stroke='#000'/>
              <rect x='18' y='10' width='3' height='3' fill='#fff' stroke='#000'/>
              <rect x='12' y='11' width='1' height='1' fill='#000'/>
              <rect x='19' y='11' width='1' height='1' fill='#000'/>
              <rect x='13' y='17' width='6' height='2' fill='#d65b77' stroke='#000'/>
              <rect x='7' y='13' width='2' height='5' fill='#e8e8f0' stroke='#000'/>
              <rect x='23' y='13' width='2' height='5' fill='#e8e8f0' stroke='#000'/>
              <rect x='10' y='24' width='4' height='4' fill='#e8e8f0' stroke='#000'/>
              <rect x='18' y='24' width='4' height='4' fill='#e8e8f0' stroke='#000'/>
              <rect x='15' y='7' width='2' height='1' fill='#ff5' />
              <rect x='14' y='8' width='4' height='1' fill='#ff5' />
            </svg>`,
          )}`}
        />
      </div>
    </div>
  );
}

function BootScreen() {
  return (
    <div className="boot">
      <div style={{ opacity: 0.7 }}>
        <div>Starting anthhub.exe ...</div>
        <div style={{ marginTop: 4 }}>Loading Windows 98 shell...</div>
        <div style={{ marginTop: 4 }}>Mounting /public/const/repo.json ... OK</div>
        <div style={{ marginTop: 4 }}>Initializing React 19 + Next 15 ... OK</div>
        <div style={{ marginTop: 4 }}>Press any key to continue_</div>
      </div>
    </div>
  );
}
