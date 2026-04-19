"use client";
import { motion } from "framer-motion";
import { Github, Mail } from "lucide-react";

export default function Header() {
  return (
    <header className="relative py-16 sm:py-24">
      <div className="flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs text-soft/40 tracking-[0.4em] uppercase mb-6"
        >
          · anthhub.vercel.app ·
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tighter gradient-text animate-gradient-x"
        >
          anthhub
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-4 text-base sm:text-lg text-soft/60 max-w-xl"
        >
          Frontend / Fullstack Engineer · 记录有趣的代码与项目
        </motion.p>

        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex items-center gap-6 text-sm text-soft/60"
        >
          <a href="#engineering-library" className="hover:text-white transition">Engineering</a>
          <span className="text-soft/20">·</span>
          <a href="#vscode-plugin" className="hover:text-white transition">VScode Plugin</a>
          <span className="text-soft/20">·</span>
          <a href="#creative-application" className="hover:text-white transition">Creative</a>
          <span className="text-soft/20">·</span>
          <a href="https://github.com/anthhub" target="_blank" rel="noreferrer" className="hover:text-white transition inline-flex items-center gap-1">
            <Github size={14} /> GitHub
          </a>
        </motion.nav>
      </div>
    </header>
  );
}
