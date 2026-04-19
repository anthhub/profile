// Inline pixel-art SVG portraits for each language/tool.
// Each exported string is a data: URL so it can drop into <img src> anywhere,
// including the existing Win98 desktop-icon pipeline.
// All 32×32 viewBox, crispEdges, zero external deps.

const base = "data:image/svg+xml;utf8,";
const svg = (body: string, size = 32) =>
  `${base}${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${size} ${size}' shape-rendering='crispEdges'>${body}</svg>`,
  )}`;

// ---------- Fighters ----------

// Node.js — green hex with "NODE"
export const NodeSprite = () =>
  svg(`
    <polygon points='16,2 28,9 28,23 16,30 4,23 4,9' fill='#5fa04e' stroke='#2d5a1a'/>
    <polygon points='16,6 24,11 24,21 16,26 8,21 8,11' fill='#83c061' stroke='#2d5a1a'/>
    <rect x='11' y='13' width='2' height='6' fill='#1a3a0d'/>
    <rect x='13' y='15' width='2' height='2' fill='#1a3a0d'/>
    <rect x='15' y='17' width='2' height='2' fill='#1a3a0d'/>
    <rect x='17' y='15' width='2' height='2' fill='#1a3a0d'/>
    <rect x='19' y='13' width='2' height='6' fill='#1a3a0d'/>
    <rect x='4' y='9' width='24' height='1' fill='#fff' opacity='0.3'/>
  `);

// TypeScript — blue TS cube
export const TSSprite = () =>
  svg(`
    <rect x='3' y='3' width='26' height='26' fill='#3178c6' stroke='#1a4578'/>
    <rect x='3' y='3' width='26' height='3' fill='#5294dd'/>
    <rect x='6' y='14' width='11' height='3' fill='#fff'/>
    <rect x='10' y='14' width='3' height='13' fill='#fff'/>
    <rect x='18' y='14' width='8' height='3' fill='#fff'/>
    <rect x='18' y='20' width='8' height='3' fill='#fff'/>
    <rect x='18' y='24' width='8' height='3' fill='#fff'/>
    <rect x='18' y='14' width='3' height='6' fill='#fff'/>
    <rect x='23' y='20' width='3' height='6' fill='#fff'/>
  `);

// Go — cyan gopher face
export const GoSprite = () =>
  svg(`
    <rect x='8' y='8' width='16' height='18' fill='#00add8' stroke='#005f78'/>
    <rect x='6' y='11' width='2' height='8' fill='#00add8' stroke='#005f78'/>
    <rect x='24' y='11' width='2' height='8' fill='#00add8' stroke='#005f78'/>
    <rect x='11' y='5' width='3' height='4' fill='#00add8' stroke='#005f78'/>
    <rect x='18' y='5' width='3' height='4' fill='#00add8' stroke='#005f78'/>
    <rect x='11' y='13' width='4' height='4' fill='#fff' stroke='#000'/>
    <rect x='17' y='13' width='4' height='4' fill='#fff' stroke='#000'/>
    <rect x='12' y='14' width='2' height='2' fill='#000'/>
    <rect x='18' y='14' width='2' height='2' fill='#000'/>
    <rect x='15' y='17' width='2' height='3' fill='#f5a3b5'/>
    <rect x='13' y='20' width='6' height='1' fill='#000'/>
    <rect x='12' y='26' width='3' height='2' fill='#00add8' stroke='#005f78'/>
    <rect x='17' y='26' width='3' height='2' fill='#00add8' stroke='#005f78'/>
  `);

// Python — yellow/blue snake
export const PythonSprite = () =>
  svg(`
    <path d='M8 6 h10 a4 4 0 0 1 4 4 v6 h-8 a4 4 0 0 0 -4 4 v6 h-6 a4 4 0 0 1 -4 -4 v-6 a4 4 0 0 1 4 -4 h8 v-6 z' fill='#306998' stroke='#1a3958'/>
    <path d='M24 26 h-10 a4 4 0 0 1 -4 -4 v-6 h8 a4 4 0 0 0 4 -4 v-6 h6 a4 4 0 0 1 4 4 v6 a4 4 0 0 1 -4 4 h-8 v6 z' fill='#ffd43b' stroke='#8b7413'/>
    <rect x='12' y='9' width='2' height='2' fill='#ffd43b'/>
    <rect x='18' y='21' width='2' height='2' fill='#306998'/>
  `);

// Rust — orange gear-crab
export const RustSprite = () =>
  svg(`
    <polygon points='16,2 20,5 25,4 26,9 30,12 28,17 30,22 25,24 24,29 19,28 16,31 13,28 8,29 7,24 2,22 4,17 2,12 6,9 7,4 12,5' fill='#ce422b' stroke='#5a1a10'/>
    <circle cx='16' cy='16' r='7' fill='#000'/>
    <circle cx='16' cy='16' r='4' fill='#ce422b'/>
    <rect x='14' y='10' width='4' height='2' fill='#000'/>
    <rect x='15' y='12' width='2' height='2' fill='#000'/>
    <rect x='14' y='18' width='4' height='2' fill='#000'/>
    <rect x='10' y='14' width='2' height='4' fill='#000'/>
    <rect x='20' y='14' width='2' height='4' fill='#000'/>
  `);

// React — cyan atom
export const ReactSprite = () =>
  svg(`
    <circle cx='16' cy='16' r='3' fill='#61dafb'/>
    <ellipse cx='16' cy='16' rx='13' ry='5' fill='none' stroke='#61dafb' stroke-width='2'/>
    <g transform='rotate(60 16 16)'>
      <ellipse cx='16' cy='16' rx='13' ry='5' fill='none' stroke='#61dafb' stroke-width='2'/>
    </g>
    <g transform='rotate(120 16 16)'>
      <ellipse cx='16' cy='16' rx='13' ry='5' fill='none' stroke='#61dafb' stroke-width='2'/>
    </g>
  `);

// Next.js — black/white sphere with N
export const NextSprite = () =>
  svg(`
    <circle cx='16' cy='16' r='14' fill='#000' stroke='#444'/>
    <circle cx='12' cy='12' r='4' fill='#222' opacity='0.6'/>
    <rect x='11' y='8' width='2' height='16' fill='#fff'/>
    <rect x='19' y='8' width='2' height='13' fill='#fff'/>
    <polygon points='13,8 15,8 21,22 19,22' fill='#fff'/>
  `);

// Docker — blue whale/container
export const DockerSprite = () =>
  svg(`
    <rect x='6' y='11' width='4' height='4' fill='#2496ed' stroke='#0d5689'/>
    <rect x='11' y='11' width='4' height='4' fill='#2496ed' stroke='#0d5689'/>
    <rect x='16' y='11' width='4' height='4' fill='#2496ed' stroke='#0d5689'/>
    <rect x='21' y='11' width='4' height='4' fill='#2496ed' stroke='#0d5689'/>
    <rect x='11' y='6' width='4' height='4' fill='#2496ed' stroke='#0d5689'/>
    <rect x='16' y='6' width='4' height='4' fill='#2496ed' stroke='#0d5689'/>
    <path d='M2 16 Q2 24 10 24 h16 a6 6 0 0 0 6 -6 v-1 h-30 z' fill='#2496ed' stroke='#0d5689'/>
    <path d='M2 14 q2 2 6 2 q4 0 8 -1' fill='none' stroke='#fff' stroke-width='1'/>
  `);

// PostgreSQL — navy elephant silhouette
export const PostgresSprite = () =>
  svg(`
    <path d='M10 6 q-4 0 -4 4 v10 q0 6 6 8 l6 2 q6 -1 8 -6 v-10 q0 -6 -6 -8 q-3 -1 -5 -1 q-3 0 -5 1 z' fill='#336791' stroke='#0d1f3a'/>
    <rect x='9' y='10' width='3' height='3' fill='#fff' stroke='#000'/>
    <rect x='10' y='11' width='1' height='1' fill='#000'/>
    <rect x='14' y='8' width='3' height='4' fill='#336791' stroke='#0d1f3a'/>
    <rect x='22' y='14' width='3' height='8' fill='#336791' stroke='#0d1f3a'/>
    <path d='M18 26 q-2 3 -4 4' stroke='#0d1f3a' stroke-width='2' fill='none'/>
  `);

// Redis — red cube stack
export const RedisSprite = () =>
  svg(`
    <polygon points='16,4 28,9 16,14 4,9' fill='#dc382c' stroke='#6b1a13'/>
    <polygon points='4,9 4,13 16,18 28,13 28,9 16,14' fill='#a82a20' stroke='#6b1a13'/>
    <polygon points='16,18 28,13 28,17 16,22 4,17 4,13' fill='#c93226' stroke='#6b1a13'/>
    <polygon points='16,22 28,17 28,21 16,26 4,21 4,17' fill='#7a1f18' stroke='#6b1a13'/>
    <rect x='14' y='9' width='4' height='1' fill='#fff'/>
    <rect x='12' y='11' width='8' height='1' fill='#fff' opacity='0.6'/>
  `);

// Git — orange branch
export const GitSprite = () =>
  svg(`
    <circle cx='8' cy='8' r='3' fill='#f05032' stroke='#6b1a0a'/>
    <circle cx='8' cy='24' r='3' fill='#f05032' stroke='#6b1a0a'/>
    <circle cx='24' cy='16' r='3' fill='#f05032' stroke='#6b1a0a'/>
    <rect x='7' y='8' width='2' height='16' fill='#f05032' stroke='#6b1a0a'/>
    <path d='M9 8 q12 0 14 7' stroke='#f05032' stroke-width='2' fill='none'/>
    <path d='M9 24 q12 0 14 -7' stroke='#f05032' stroke-width='2' fill='none'/>
  `);

// LangChain / AI — purple brain + link
export const AISprite = () =>
  svg(`
    <rect x='6' y='8' width='8' height='16' fill='#8b5cf6' stroke='#3d1a78'/>
    <rect x='18' y='8' width='8' height='16' fill='#8b5cf6' stroke='#3d1a78'/>
    <rect x='14' y='14' width='4' height='4' fill='#a78bfa' stroke='#3d1a78'/>
    <rect x='8' y='11' width='2' height='2' fill='#fff'/>
    <rect x='8' y='14' width='2' height='2' fill='#fff'/>
    <rect x='8' y='17' width='2' height='2' fill='#fff'/>
    <rect x='22' y='11' width='2' height='2' fill='#fff'/>
    <rect x='22' y='14' width='2' height='2' fill='#fff'/>
    <rect x='22' y='17' width='2' height='2' fill='#fff'/>
    <rect x='14' y='10' width='4' height='2' fill='#22d3ee'/>
    <rect x='14' y='20' width='4' height='2' fill='#22d3ee'/>
  `);

// ---------- Fighter roster (data) ----------

export type Fighter = {
  id: string;
  name: string;
  subtitle: string;
  sprite: string;
  color: string; // accent
  rank: number; // 1..5 stars
  special: string;
  tagline: string;
  years: string;
};

export const FIGHTERS: Fighter[] = [
  {
    id: "node",
    name: "NODE.JS",
    subtitle: "Event-Loop Warrior",
    sprite: NodeSprite(),
    color: "#5fa04e",
    rank: 5,
    special: "EVENT LOOP FURY",
    tagline: "Shipped Bitget BFF · Koa · Eggjs · NestJS",
    years: "6Y",
  },
  {
    id: "ts",
    name: "TYPESCRIPT",
    subtitle: "Type Guardian",
    sprite: TSSprite(),
    color: "#3178c6",
    rank: 5,
    special: "GENERIC SLASH",
    tagline: "Every repo · strict mode since day one",
    years: "6Y",
  },
  {
    id: "go",
    name: "GOLANG",
    subtitle: "Concurrent Gopher",
    sprite: GoSprite(),
    color: "#00add8",
    rank: 4,
    special: "GOROUTINE STORM",
    tagline: "Microservices @ LiuLiShuo",
    years: "3Y",
  },
  {
    id: "py",
    name: "PYTHON",
    subtitle: "Dynamic Serpent",
    sprite: PythonSprite(),
    color: "#ffd43b",
    rank: 4,
    special: "PIP FINISHER",
    tagline: "ML scripts · TensorFlow · LangChain tooling",
    years: "4Y",
  },
  {
    id: "rs",
    name: "RUST",
    subtitle: "Borrow Checker",
    sprite: RustSprite(),
    color: "#ce422b",
    rank: 3,
    special: "LIFETIME COMBO",
    tagline: "CLI tooling · WASM experiments",
    years: "2Y",
  },
  {
    id: "react",
    name: "REACT",
    subtitle: "Hook Sorcerer",
    sprite: ReactSprite(),
    color: "#61dafb",
    rank: 5,
    special: "HOOK CHAIN MAX",
    tagline: "10M+ users · Bitget Telegram Minapp",
    years: "6Y",
  },
  {
    id: "next",
    name: "NEXT.JS",
    subtitle: "SSR Striker",
    sprite: NextSprite(),
    color: "#e5e7eb",
    rank: 5,
    special: "SSG BLITZ",
    tagline: "App Router · Vercel-native",
    years: "4Y",
  },
  {
    id: "docker",
    name: "DOCKER",
    subtitle: "Container Brawler",
    sprite: DockerSprite(),
    color: "#2496ed",
    rank: 4,
    special: "DEPLOY SLAM",
    tagline: "k8s · Docker · Cloud DevOps",
    years: "5Y",
  },
  {
    id: "pg",
    name: "POSTGRES",
    subtitle: "ACID Elephant",
    sprite: PostgresSprite(),
    color: "#336791",
    rank: 4,
    special: "JOIN CRUSH",
    tagline: "Drizzle · pgvector · logical replication",
    years: "5Y",
  },
  {
    id: "redis",
    name: "REDIS",
    subtitle: "Cache Berserker",
    sprite: RedisSprite(),
    color: "#dc382c",
    rank: 4,
    special: "TTL TEMPEST",
    tagline: "BullMQ · sessions · rate limit",
    years: "5Y",
  },
  {
    id: "git",
    name: "GIT",
    subtitle: "Branch Rogue",
    sprite: GitSprite(),
    color: "#f05032",
    rank: 5,
    special: "REBASE STRIKE",
    tagline: "Daily driver · rewrites history for breakfast",
    years: "8Y",
  },
  {
    id: "ai",
    name: "LANGCHAIN",
    subtitle: "Agent Oracle",
    sprite: AISprite(),
    color: "#8b5cf6",
    rank: 5,
    special: "TOOL-CALLING ULT",
    tagline: "Refly reAct Agent · MCP full stack · Vistory · Hollideo",
    years: "2Y",
  },
];
