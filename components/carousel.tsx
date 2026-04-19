"use client";
import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  { src: "/image/deno.jpeg", label: "Deno" },
  { src: "/image/go.png", label: "Go" },
  { src: "/image/rust.png", label: "Rust" },
  { src: "/image/py.png", label: "Python" },
  { src: "/image/docker.jpeg", label: "Docker" },
];

const ROTATE_MS = 4200;

export default function Carousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goto = useCallback((n: number) => {
    setIndex(((n % images.length) + images.length) % images.length);
  }, []);

  const next = useCallback(() => goto(index + 1), [index, goto]);
  const prev = useCallback(() => goto(index - 1), [index, goto]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % images.length), ROTATE_MS);
    return () => clearInterval(t);
  }, [paused]);

  const current = images[index];

  return (
    <div
      className="relative w-full aspect-[21/9] max-h-[440px] overflow-hidden rounded-2xl card-glass ring-soft"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current.src}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current.src}
            alt={current.label}
            className="w-full h-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
          className="absolute bottom-6 left-6 font-mono text-sm tracking-widest text-white/80"
        >
          {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")} · {current.label}
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <button
        onClick={prev}
        aria-label="previous"
        className="absolute top-1/2 -translate-y-1/2 left-3 w-10 h-10 rounded-full bg-black/30 text-white/70 hover:text-white hover:bg-black/50 backdrop-blur flex items-center justify-center transition"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={next}
        aria-label="next"
        className="absolute top-1/2 -translate-y-1/2 right-3 w-10 h-10 rounded-full bg-black/30 text-white/70 hover:text-white hover:bg-black/50 backdrop-blur flex items-center justify-center transition"
      >
        <ChevronRight size={18} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 right-6 flex gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goto(i)}
            aria-label={`go to ${i + 1}`}
            className="h-1 rounded-full transition-all duration-300"
            style={{
              width: i === index ? "24px" : "8px",
              background: i === index ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
