"use client";
import { motion } from "framer-motion";
import { ExternalLink, Lock } from "lucide-react";
import { featured } from "@/lib/data";
import clsx from "clsx";

const accentMap = {
  magenta: "from-magenta/20 to-transparent border-magenta/30 hover:border-magenta",
  cyan: "from-cyan/20 to-transparent border-cyan/30 hover:border-cyan",
  purple: "from-purple/20 to-transparent border-purple/30 hover:border-purple",
  orange: "from-orange/20 to-transparent border-orange/30 hover:border-orange",
};
const textMap = {
  magenta: "text-magenta",
  cyan: "text-cyan",
  purple: "text-purple",
  orange: "text-orange",
};

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <p className="font-mono text-xs text-magenta/80 tracking-widest mb-2">// 01 · active</p>
        <h2 className="text-4xl sm:text-5xl font-bold mb-12">Missions in flight</h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {featured.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={clsx(
              "group relative rounded-2xl p-6 bg-gradient-to-br border transition-all duration-300 hover:-translate-y-1",
              accentMap[p.accent],
            )}
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className={clsx("text-2xl font-bold", textMap[p.accent])}>{p.name}</h3>
              {p.demo ? (
                <a
                  href={p.demo}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${p.name} demo`}
                  className="text-soft/50 hover:text-soft transition-colors"
                >
                  <ExternalLink size={18} />
                </a>
              ) : (
                <Lock size={16} className="text-soft/40" />
              )}
            </div>

            <p className="text-soft/70 text-sm leading-relaxed mb-4 min-h-[4.5em]">{p.tagline}</p>

            <div className="flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-soft/5 text-soft/60 border border-soft/10"
                >
                  {s}
                </span>
              ))}
            </div>

            {p.demo && (
              <a
                href={p.demo}
                target="_blank"
                rel="noreferrer"
                className={clsx("mt-6 inline-flex items-center gap-1 text-sm font-mono", textMap[p.accent])}
              >
                live demo →
              </a>
            )}
            {!p.demo && <span className="mt-6 inline-block text-xs font-mono text-soft/40">private study</span>}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
