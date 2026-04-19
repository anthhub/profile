export type Project = {
  name: string;
  tagline: string;
  stack: string[];
  demo?: string;
  repo?: string;
  accent: "magenta" | "cyan" | "purple" | "orange";
};

export const featured: Project[] = [
  {
    name: "Vistory",
    tagline: "Browser-based AI storybook & video creator. Script → shot → frame → rendered video.",
    stack: ["nano-banana", "Sora", "Canvas", "Web Audio", "FFmpeg-wasm"],
    demo: "https://vistory.vercel.app",
    accent: "magenta",
  },
  {
    name: "Hollideo",
    tagline: "Two-day multi-agent build. Agents self-dispatch to produce scripts, scenes, key frames.",
    stack: ["LangGraph", "MCP", "Tool calling", "Anthropic caching"],
    demo: "https://hollideo.vercel.app",
    accent: "cyan",
  },
  {
    name: "chatcut-replica",
    tagline: "2-week personal study rebuilding a production browser video editor from public sourcemaps.",
    stack: ["Dockview", "xstate", "Remotion", "Rocicorp Zero", "E2B"],
    accent: "purple",
  },
];

export type OSSItem = {
  name: string;
  lang: string;
  desc: string;
  stars?: string;
  repo: string;
};

export const openSource: OSSItem[] = [
  {
    name: "forwarder",
    lang: "Go",
    desc: "Kubernetes service/pod port forwarder — one-command local debugging.",
    stars: "30⭐",
    repo: "https://github.com/anthhub/forwarder",
  },
  {
    name: "matrox",
    lang: "TypeScript",
    desc: "Mobx × Redux state library. Middleware, dependency tracking, batch updates.",
    repo: "https://github.com/anthhub/matrox",
  },
  {
    name: "codex-dispatch",
    lang: "Shell",
    desc: "Multi-agent orchestration for Claude Code — dispatch parallel Codex workers.",
    repo: "https://github.com/anthhub/codex-dispatch",
  },
  {
    name: "codex-reviewer",
    lang: "Shell",
    desc: "Dual-AI cross-validation — Codex reviews Claude's changes.",
    repo: "https://github.com/anthhub/codex-reviewer",
  },
  {
    name: "taskgroup",
    lang: "Go",
    desc: "Goroutine concurrency library — context aware, rate-limited, auto recover.",
    repo: "https://github.com/anthhub/taskgroup",
  },
  {
    name: "cupboard",
    lang: "Go",
    desc: "Programmatic Docker container lifecycle — multi-container, env injection.",
    repo: "https://github.com/anthhub/cupboard",
  },
  {
    name: "fat-json",
    lang: "TS + Rust",
    desc: "Blazing-fast huge-JSON formatter VSCode plugin (WebAssembly).",
    repo: "https://github.com/anthhub/fat-json",
  },
  {
    name: "open-claude-code",
    lang: "Jupyter",
    desc: "Hands-on guide to Claude Code's architecture and implementation.",
    repo: "https://github.com/anthhub/open-claude-code",
  },
];

export const skills = {
  Languages: ["ts", "js", "go", "rust", "py", "swift", "bash", "lua"],
  "AI · agents": ["anthropic", "openai", "langchain", "ollama", "hugginface", "pytorch", "tensorflow"],
  "Frontend · video": ["react", "next", "vite", "tailwind", "threejs", "webgl", "redux", "styledcomponents"],
  "Backend · data": ["nodejs", "nestjs", "express", "graphql", "prisma", "postgres", "redis", "mongodb"],
  "Infra · cloud": ["docker", "kubernetes", "aws", "gcp", "vercel", "githubactions", "nginx", "linux"],
  Tools: ["vscode", "figma", "tauri", "electron", "webpack", "rollup", "vim", "github"],
};
