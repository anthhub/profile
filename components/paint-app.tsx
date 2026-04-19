"use client";
import { useEffect, useRef, useState } from "react";

const COLORS = [
  "#000000", "#808080", "#7a1f1f", "#ff3b30",
  "#8b6f1a", "#fde047", "#1a5a1a", "#34c759",
  "#004a7a", "#22d3ee", "#2a0f5f", "#a855f7",
  "#5a2a1a", "#fdba74", "#c0c0c0", "#ffffff",
];

const GRID_W = 32;
const GRID_H = 20;
const DEFAULT_BG = "#ffffff";

type Tool = "brush" | "eraser" | "fill";

type PaintSaveHook = (dataUrl: string) => void;

export default function PaintApp({ onSave }: { onSave: PaintSaveHook }) {
  const [grid, setGrid] = useState<string[][]>(() =>
    Array.from({ length: GRID_H }, () => Array.from({ length: GRID_W }, () => DEFAULT_BG)),
  );
  const [color, setColor] = useState("#000000");
  const [tool, setTool] = useState<Tool>("brush");
  const [drawing, setDrawing] = useState(false);
  const [history, setHistory] = useState<string[][][]>([]);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  const pushHistory = (g: string[][]) => {
    setHistory((h) => [...h.slice(-29), g.map((row) => [...row])]);
  };

  const paintAt = (r: number, c: number) => {
    setGrid((g) => {
      const target = tool === "eraser" ? DEFAULT_BG : color;
      if (g[r][c] === target) return g;
      const next = g.map((row) => [...row]);
      if (tool === "fill") {
        const origin = g[r][c];
        if (origin === target) return g;
        const stack: [number, number][] = [[r, c]];
        while (stack.length) {
          const [rr, cc] = stack.pop()!;
          if (rr < 0 || cc < 0 || rr >= GRID_H || cc >= GRID_W) continue;
          if (next[rr][cc] !== origin) continue;
          next[rr][cc] = target;
          stack.push([rr + 1, cc], [rr - 1, cc], [rr, cc + 1], [rr, cc - 1]);
        }
      } else {
        next[r][c] = target;
      }
      return next;
    });
  };

  const onCellDown = (r: number, c: number) => {
    pushHistory(grid);
    setDrawing(true);
    paintAt(r, c);
  };
  const onCellEnter = (r: number, c: number) => {
    if (drawing && tool !== "fill") paintAt(r, c);
  };
  useEffect(() => {
    const up = () => setDrawing(false);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchend", up);
    };
  }, []);

  const undo = () => {
    setHistory((h) => {
      if (h.length === 0) return h;
      const prev = h[h.length - 1];
      setGrid(prev);
      return h.slice(0, -1);
    });
  };

  const clear = () => {
    pushHistory(grid);
    setGrid(Array.from({ length: GRID_H }, () => Array.from({ length: GRID_W }, () => DEFAULT_BG)));
  };

  const saveAsWallpaper = () => {
    // Render the grid to an offscreen canvas and save as a data URL
    const scale = 32; // each pixel becomes 32×32 on the wallpaper
    const canvas = document.createElement("canvas");
    canvas.width = GRID_W * scale;
    canvas.height = GRID_H * scale;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    for (let r = 0; r < GRID_H; r++) {
      for (let c = 0; c < GRID_W; c++) {
        ctx.fillStyle = grid[r][c];
        ctx.fillRect(c * scale, r * scale, scale, scale);
      }
    }
    const url = canvas.toDataURL("image/png");
    onSave(url);
    setSavedAt(new Date().toLocaleTimeString());
  };

  // Seed with a tiny friendly pattern
  useEffect(() => {
    const g = grid.map((row) => [...row]);
    const h = GRID_H;
    const w = GRID_W;
    const mid = Math.floor(w / 2);
    // Simple smiley
    g[Math.floor(h / 2) - 3][mid - 4] = "#000";
    g[Math.floor(h / 2) - 3][mid + 3] = "#000";
    for (let i = -3; i <= 3; i++) g[Math.floor(h / 2) + 2][mid + i] = "#000";
    setGrid(g);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="paint-root">
      <div className="paint-toolbar">
        <button
          className={`paint-tool ${tool === "brush" ? "active" : ""}`}
          onClick={() => setTool("brush")}
          title="Brush"
        >
          ✎
        </button>
        <button
          className={`paint-tool ${tool === "fill" ? "active" : ""}`}
          onClick={() => setTool("fill")}
          title="Fill"
        >
          ▣
        </button>
        <button
          className={`paint-tool ${tool === "eraser" ? "active" : ""}`}
          onClick={() => setTool("eraser")}
          title="Eraser"
        >
          ⌫
        </button>
        <span className="paint-sep" />
        <button className="paint-tool" onClick={undo} title="Undo">
          ↶
        </button>
        <button className="paint-tool" onClick={clear} title="Clear all">
          🗑
        </button>
        <span className="paint-sep" />
        <button className="paint-save" onClick={saveAsWallpaper}>
          Save as Wallpaper
        </button>
        {savedAt && <span className="paint-saved">saved @ {savedAt}</span>}
      </div>

      <div className="paint-palette">
        {COLORS.map((c) => (
          <button
            key={c}
            className={`paint-swatch ${color === c ? "active" : ""}`}
            style={{ background: c }}
            onClick={() => {
              setColor(c);
              setTool("brush");
            }}
            aria-label={`color ${c}`}
          />
        ))}
      </div>

      <div
        className="paint-canvas"
        style={
          {
            ["--gw" as string]: GRID_W,
            ["--gh" as string]: GRID_H,
          } as React.CSSProperties
        }
      >
        {grid.map((row, r) =>
          row.map((cell, c) => (
            <div
              key={`${r}-${c}`}
              className="paint-cell"
              style={{ background: cell }}
              onMouseDown={() => onCellDown(r, c)}
              onMouseEnter={() => onCellEnter(r, c)}
              onTouchStart={(e) => {
                e.preventDefault();
                onCellDown(r, c);
              }}
              onTouchMove={(e) => {
                const t = e.touches[0];
                const el = document.elementFromPoint(t.clientX, t.clientY) as HTMLElement | null;
                if (el?.dataset?.r && el?.dataset?.c) {
                  onCellEnter(Number(el.dataset.r), Number(el.dataset.c));
                }
              }}
              data-r={r}
              data-c={c}
            />
          )),
        )}
      </div>

      <div className="paint-hint">
        click/drag to paint · pick a swatch · Save = new wallpaper option &quot;MY CREATION&quot;
      </div>
    </div>
  );
}
