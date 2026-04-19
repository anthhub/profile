"use client";
import { useEffect, useRef, useState } from "react";
import type { Categories } from "@/lib/data";

type Line = { kind: "input" | "output" | "error" | "ascii"; text: string };

export type TerminalHooks = {
  data: Categories;
  onOpen: (id: "arcade" | "wanted" | "tournament" | "paint" | "readme" | "about") => void;
  onTriggerParty: () => void;
  onTriggerBSOD: () => void;
  onWallpaper: (name: string) => void;
  onClose: () => void;
};

const ASCII_LOGO = `
         _   _     _           _
   __ _ | \\_| |_  | |__  _ _  | |__
  / _\` || _| | '_\\ | '_ \\| | | | '_ \\
 | (_| || | | | | || | | | |_| | |_) |
  \\__,_| \\__,_|_| |_|_| |_|\\__,_|_.__/
`;

const HELP = [
  "AVAILABLE COMMANDS",
  "  help                 show this message",
  "  ls [projects]        list categories or projects",
  "  cat <file>           print file (readme, wanted, about)",
  "  whoami               show identity",
  "  neofetch             print system info + logo",
  "  play arcade          open ARCADE.exe",
  "  open <app>           open wanted | arcade | paint | tournament | readme",
  "  theme <name>         change wallpaper (teal|sunset|space|matrix)",
  "  date                 current date",
  "  echo <text>          print text",
  "  matrix               enter the matrix (5s)",
  "  konami               party mode",
  "  sudo rm -rf /        don't do it",
  "  clear                clear the terminal",
  "  exit                 close terminal",
];

export default function TerminalApp({
  data,
  onOpen,
  onTriggerParty,
  onTriggerBSOD,
  onWallpaper,
  onClose,
}: TerminalHooks) {
  const [lines, setLines] = useState<Line[]>([
    { kind: "ascii", text: ASCII_LOGO },
    { kind: "output", text: "anthhub-terminal v1.0.0 (98-build)" },
    { kind: "output", text: "Type 'help' for the full command list." },
    { kind: "output", text: "" },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hPos, setHPos] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [lines]);

  const print = (text: string, kind: Line["kind"] = "output") => {
    setLines((ls) => [...ls, { kind, text }]);
  };

  const runCommand = (raw: string) => {
    const cmd = raw.trim();
    setLines((ls) => [...ls, { kind: "input", text: `anthhub@98 ~ $ ${cmd}` }]);
    if (!cmd) return;
    setHistory((h) => [...h, cmd]);

    const [name, ...argsArr] = cmd.split(/\s+/);
    const args = argsArr.join(" ");
    const lc = name.toLowerCase();

    if (lc === "help") {
      HELP.forEach((l) => print(l));
      return;
    }
    if (lc === "clear") {
      setLines([]);
      return;
    }
    if (lc === "exit") {
      onClose();
      return;
    }
    if (lc === "date") {
      print(new Date().toString());
      return;
    }
    if (lc === "echo") {
      print(args);
      return;
    }
    if (lc === "whoami") {
      print("anthhub — open-source pirate · frontend + fullstack · AI Agent engineer");
      print("6+ years in the trenches. Captain of cmux, Refly Agent, Vistory, Hollideo.");
      return;
    }
    if (lc === "ls") {
      const sub = (args || "").trim();
      if (sub === "" || sub === "/" || sub === "projects") {
        print("total " + Object.keys(data).length);
        Object.keys(data).forEach((k) => print(`drwxr-xr-x  anthhub  ${String(data[k].length).padStart(2)}  ${k}`));
        print("-rw-r--r--  anthhub  --  README.txt");
        print("-rw-r--r--  anthhub  --  wanted.txt");
        return;
      }
      if (sub in data) {
        data[sub].forEach((r) => print(`  📄 ${r.name}  — ${r.desc[0]?.slice(0, 60) ?? ""}`));
        return;
      }
      print(`ls: cannot access '${sub}': No such file or directory`, "error");
      return;
    }
    if (lc === "cat") {
      const f = (args || "").toLowerCase().replace(".txt", "");
      if (f === "readme" || f === "readme.txt") {
        print("WELCOME TO anthhub.exe");
        print("──────────────────────");
        print("Double-click folders on the desktop, or use commands here.");
        print("Try: ls · play arcade · open wanted · neofetch");
        return;
      }
      if (f === "wanted" || f === "wanted.txt") {
        print("     WANTED — DEAD OR ALIVE");
        print("         ANTHHUB");
        print("       ฿ 1,111,000,000 —");
        print("   crimes: Built cmux · forged Refly Agent & MCP");
        print("           shipped Bitget Telegram (10M+ users)");
        print("           abducted Next.js, React, Node, Go, Rust");
        return;
      }
      if (f === "about" || f === "about.txt") {
        print("anthhub.exe  Version 2026.04 (build 98)");
        print("Frontend / Fullstack / AI Agent engineer");
        return;
      }
      print(`cat: ${args}: No such file or directory`, "error");
      return;
    }
    if (lc === "neofetch") {
      ASCII_LOGO.split("\n").forEach((l) => print(l, "ascii"));
      print("──────────────────────────");
      print("  OS        anthhub.exe (98-build)");
      print("  Host      Browser Retro Edition");
      print("  Uptime    6+ years in the industry");
      print("  Shell     sonnet@claude");
      print("  Packages  cmux, Refly, Vistory, Hollideo, Matrox, Forwarder…");
      print("  Bounty    ฿1,111,000,000");
      print("  Clippy    ONLINE");
      return;
    }
    if (lc === "play" && args.toLowerCase() === "arcade") {
      print("> launching ARCADE.exe ...");
      onOpen("arcade");
      return;
    }
    if (lc === "open") {
      const a = (args || "").toLowerCase() as "arcade" | "wanted" | "tournament" | "paint" | "readme" | "about";
      if (["arcade", "wanted", "tournament", "paint", "readme", "about"].includes(a)) {
        print(`> opening ${a} ...`);
        onOpen(a);
        return;
      }
      print(`open: unknown app '${args}'. try: arcade | wanted | tournament | paint | readme`, "error");
      return;
    }
    if (lc === "theme" || lc === "wallpaper") {
      const n = (args || "").toLowerCase();
      if (["teal", "sunset", "space", "matrix"].includes(n)) {
        onWallpaper(n);
        print(`> wallpaper → ${n}`);
        return;
      }
      print("usage: theme <teal|sunset|space|matrix>", "error");
      return;
    }
    if (lc === "matrix") {
      print("> jacking in ...");
      onWallpaper("matrix");
      return;
    }
    if (lc === "konami") {
      print("🎉 KONAMI MODE ENGAGED");
      onTriggerParty();
      return;
    }
    if (cmd === "sudo rm -rf /" || cmd === "sudo rm -rf /*") {
      print("[sudo] password for anthhub:", "output");
      print("rm: removing everything ...", "error");
      print("rm: kernel panic — bluescreen imminent", "error");
      setTimeout(onTriggerBSOD, 400);
      return;
    }
    if (lc === "sudo") {
      print("anthhub is not in the sudoers file. This incident will be reported.", "error");
      return;
    }
    if (lc === "pwd") {
      print("/home/anthhub");
      return;
    }
    if (lc === "man") {
      print(`No manual entry for '${args}'. Try 'help'.`, "error");
      return;
    }
    if (lc === "make" || lc === "npm" || lc === "yarn" || lc === "pnpm") {
      print("> you're already IN the built site. Look around.", "output");
      return;
    }
    print(`${name}: command not found. try 'help'.`, "error");
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
      setHPos(-1);
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHPos((p) => {
        const next = p === -1 ? history.length - 1 : Math.max(0, p - 1);
        if (history[next] !== undefined) setInput(history[next]);
        return next;
      });
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHPos((p) => {
        if (p === -1) return -1;
        const next = p + 1;
        if (next >= history.length) {
          setInput("");
          return -1;
        }
        setInput(history[next]);
        return next;
      });
      return;
    }
    if (e.key === "Tab") {
      e.preventDefault();
      const all = [
        "help",
        "ls",
        "ls projects",
        "cat readme",
        "cat wanted",
        "whoami",
        "neofetch",
        "play arcade",
        "open arcade",
        "open wanted",
        "open tournament",
        "open paint",
        "theme teal",
        "theme matrix",
        "theme sunset",
        "theme space",
        "matrix",
        "konami",
        "clear",
        "exit",
        "date",
        "pwd",
      ];
      const match = all.find((c) => c.startsWith(input));
      if (match) setInput(match);
      return;
    }
  };

  return (
    <div className="term-wrap" onClick={() => inputRef.current?.focus()}>
      <div className="term-scroll" ref={scrollRef}>
        {lines.map((l, i) => (
          <pre key={i} className={`term-line term-${l.kind}`}>
            {l.text}
          </pre>
        ))}
        <div className="term-prompt">
          <span className="term-ps1">anthhub@98 ~ $</span>
          <input
            ref={inputRef}
            className="term-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
            spellCheck={false}
          />
          <span className="term-caret">▋</span>
        </div>
      </div>
    </div>
  );
}
