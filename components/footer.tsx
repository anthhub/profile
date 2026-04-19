"use client";
import { Github, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-soft/10 mt-24">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-mono text-sm text-soft/40">
            ✦ every commit is a love letter to the craft ✦
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/anthhub"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="w-10 h-10 rounded-full border border-soft/10 flex items-center justify-center text-soft/60 hover:text-magenta hover:border-magenta transition-colors"
          >
            <Github size={16} />
          </a>
          <a
            href="mailto:andyousiron@gmail.com"
            aria-label="Email"
            className="w-10 h-10 rounded-full border border-soft/10 flex items-center justify-center text-soft/60 hover:text-cyan hover:border-cyan transition-colors"
          >
            <Mail size={16} />
          </a>
        </div>
      </div>
      <p className="text-center text-xs text-soft/20 font-mono mt-12">
        © 2026 · anthhub · built with Next.js & caffeine
      </p>
    </footer>
  );
}
