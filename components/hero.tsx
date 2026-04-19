"use client";
import { motion } from "framer-motion";
import { Github, Mail, ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 relative">
      {/* ambient grid */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(#ff006e10 1px, transparent 1px), linear-gradient(90deg, #00f5ff10 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
        }}
      />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-mono text-xs sm:text-sm text-magenta tracking-widest mb-6"
      >
        $ whoami
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tight text-gradient animate-gradient-x text-center"
      >
        anthhub
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-8 text-lg sm:text-xl md:text-2xl text-soft/70 text-center max-w-2xl font-light"
      >
        <span className="text-cyan">AI Agent</span> <span className="text-soft/30 mx-2">·</span>
        <span className="text-magenta">Full-Stack</span> <span className="text-soft/30 mx-2">·</span>
        <span className="text-purple">Creative Video</span>
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-4 text-sm sm:text-base text-soft/50 text-center max-w-xl italic"
      >
        Shipping AI agents that do real work. Browser-native video tooling.
        <br className="hidden sm:block" />
        Reverse-engineering editors from sourcemaps at 2am.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-12 flex flex-wrap items-center justify-center gap-4"
      >
        <a
          href="https://github.com/anthhub"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-magenta text-ink font-semibold hover:glow-pink transition-all hover:scale-105"
        >
          <Github size={18} /> GitHub
        </a>
        <a
          href="mailto:andyousiron@gmail.com"
          className="flex items-center gap-2 px-6 py-3 rounded-full border border-cyan/40 text-cyan hover:bg-cyan/10 hover:glow-cyan transition-all hover:scale-105"
        >
          <Mail size={18} /> Email
        </a>
      </motion.div>

      <motion.a
        href="#projects"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-8 animate-float text-soft/40 hover:text-magenta transition-colors"
        aria-label="Scroll down"
      >
        <ArrowDown size={24} />
      </motion.a>
    </section>
  );
}
