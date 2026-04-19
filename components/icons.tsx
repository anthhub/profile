// Classic Windows-style pixel icons as inline SVG (no external dep).
// Scalable and crisp via `image-rendering: pixelated`.
import React from "react";

const base = "data:image/svg+xml;utf8,";

export const FolderIcon = (color = "#f4d76b") => `${base}${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' shape-rendering='crispEdges'>
    <path fill='${color}' stroke='#000' stroke-width='1' d='M2 9 h10 l2 2 h16 v18 H2 Z'/>
    <path fill='#fff8d6' d='M4 12 h24 v2 H4 Z' opacity='0.6'/>
    <path fill='#8a6f1a' stroke='#000' d='M2 9 h10 l2 2 h16 v2 H2 Z'/>
  </svg>`,
)}`;

export const GithubIcon = () => `${base}${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>
    <circle cx='16' cy='16' r='14' fill='#fff' stroke='#000'/>
    <path fill='#000' d='M16 5C9.9 5 5 9.9 5 16c0 4.9 3.2 9 7.6 10.5.6.1.8-.2.8-.5v-2c-3.1.7-3.8-1.4-3.8-1.4-.5-1.2-1.3-1.6-1.3-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 1.7 2.7 1.2 3.4.9.1-.7.4-1.2.7-1.5-2.5-.3-5-1.2-5-5.5 0-1.2.4-2.3 1.1-3.1-.1-.3-.5-1.4.1-3 0 0 .9-.3 3 1.2 1.7-.5 3.7-.5 5.4 0 2-1.5 3-1.2 3-1.2.6 1.6.2 2.7.1 3 .7.8 1.1 1.8 1.1 3.1 0 4.3-2.6 5.3-5 5.5.4.4.8 1.1.8 2.2v3.3c0 .3.2.6.8.5C23.8 25 27 20.9 27 16c0-6.1-4.9-11-11-11z'/>
  </svg>`,
)}`;

export const ComputerIcon = () => `${base}${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' shape-rendering='crispEdges'>
    <rect x='2' y='3' width='28' height='20' fill='#c0c0c0' stroke='#000'/>
    <rect x='4' y='5' width='24' height='14' fill='#008080'/>
    <rect x='6' y='7' width='20' height='2' fill='#fff' opacity='0.5'/>
    <rect x='6' y='11' width='10' height='1' fill='#fff' opacity='0.8'/>
    <rect x='6' y='14' width='14' height='1' fill='#fff' opacity='0.8'/>
    <rect x='12' y='23' width='8' height='2' fill='#808080' stroke='#000'/>
    <rect x='8' y='25' width='16' height='2' fill='#c0c0c0' stroke='#000'/>
  </svg>`,
)}`;

export const DocIcon = (accent = "#4a6cd4") => `${base}${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' shape-rendering='crispEdges'>
    <path fill='#fff' stroke='#000' d='M6 2 h16 l6 6 v22 H6 Z'/>
    <path fill='${accent}' d='M22 2 l6 6 h-6 Z' stroke='#000'/>
    <line x1='10' x2='23' y1='14' y2='14' stroke='#000' stroke-width='1'/>
    <line x1='10' x2='23' y1='18' y2='18' stroke='#000' stroke-width='1'/>
    <line x1='10' x2='23' y1='22' y2='22' stroke='#000' stroke-width='1'/>
  </svg>`,
)}`;

export const StartLogo = () => `${base}${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 24' shape-rendering='crispEdges'>
    <rect x='1' y='2' width='13' height='9' fill='#ff3b30'/>
    <rect x='15' y='2' width='13' height='9' fill='#34c759'/>
    <rect x='1' y='13' width='13' height='9' fill='#007aff'/>
    <rect x='15' y='13' width='13' height='9' fill='#ffcc00'/>
  </svg>`,
)}`;

export const MailIcon = () => `${base}${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' shape-rendering='crispEdges'>
    <rect x='2' y='7' width='28' height='18' fill='#fff' stroke='#000'/>
    <path fill='#f0f0f0' stroke='#000' d='M2 7 L16 18 L30 7'/>
  </svg>`,
)}`;

// WANTED.exe — a tiny sepia parchment icon with skull
export const WantedIcon = () => `${base}${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' shape-rendering='crispEdges'>
    <rect x='4' y='2' width='24' height='28' fill='#e8d4a2' stroke='#3b2510' stroke-width='1'/>
    <rect x='4' y='2' width='24' height='3' fill='#d4b877'/>
    <rect x='4' y='27' width='24' height='3' fill='#d4b877'/>
    <rect x='6' y='7' width='20' height='1' fill='#3b2510'/>
    <rect x='6' y='9' width='20' height='1' fill='#3b2510'/>
    <text x='16' y='15' font-family='serif' font-size='5' font-weight='900' fill='#3b2510' text-anchor='middle'>WANT</text>
    <circle cx='16' cy='21' r='3' fill='#fff' stroke='#3b2510'/>
    <rect x='14' y='20' width='1' height='1' fill='#000'/>
    <rect x='17' y='20' width='1' height='1' fill='#000'/>
    <rect x='15' y='23' width='2' height='1' fill='#000'/>
    <rect x='13' y='25' width='1' height='1' fill='#3b2510'/>
    <rect x='15' y='25' width='2' height='1' fill='#3b2510'/>
    <rect x='18' y='25' width='1' height='1' fill='#3b2510'/>
  </svg>`,
)}`;

// Usage: <img src={FolderIcon()} /> or <img src={DocIcon("#ffaa00")} />
export const IconImg: React.FC<{ src: string; alt: string; size?: number }> = ({ src, alt, size = 32 }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={src} alt={alt} width={size} height={size} style={{ imageRendering: "pixelated" }} />
);
