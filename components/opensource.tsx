"use client";
import { motion } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";
import { openSource } from "@/lib/data";

export default function OpenSource() {
  return (
    <section id="open-source" className="py-24 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <p className="font-mono text-xs text-purple/80 tracking-widest mb-2">// 03 · open source</p>
        <h2 className="text-4xl sm:text-5xl font-bold mb-12">Libraries I've shipped</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-3">
        {openSource.map((item, i) => (
          <motion.a
            key={item.name}
            href={item.repo}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: (i % 4) * 0.08 }}
            className="group relative flex flex-col p-5 rounded-xl border border-soft/10 bg-soft/[0.02] hover:border-magenta/40 hover:bg-soft/[0.04] transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-cyan group-hover:text-magenta transition-colors">
                  {item.name}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-soft/5 text-soft/60 border border-soft/10">
                  {item.lang}
                </span>
                {item.stars && (
                  <span className="flex items-center gap-1 text-xs text-orange">
                    <Star size={12} fill="currentColor" /> {item.stars.replace("⭐", "")}
                  </span>
                )}
              </div>
              <ExternalLink size={14} className="text-soft/30 group-hover:text-magenta transition-colors" />
            </div>
            <p className="text-sm text-soft/60 leading-relaxed">{item.desc}</p>
          </motion.a>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a
          href="https://github.com/anthhub?tab=repositories"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-mono text-soft/50 hover:text-magenta transition-colors"
        >
          see all 170+ repos on github →
        </a>
      </div>
    </section>
  );
}
