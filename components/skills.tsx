"use client";
import { motion } from "framer-motion";
import { skills } from "@/lib/data";

export default function Skills() {
  return (
    <section id="toolkit" className="py-24 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <p className="font-mono text-xs text-cyan/80 tracking-widest mb-2">// 02 · arsenal</p>
        <h2 className="text-4xl sm:text-5xl font-bold mb-12">Daily toolkit</h2>
      </motion.div>

      <div className="space-y-10">
        {Object.entries(skills).map(([group, icons], i) => (
          <motion.div
            key={group}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <p className="font-mono text-xs text-soft/40 mb-3 uppercase tracking-widest">{group}</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://skillicons.dev/icons?i=${icons.join(",")}&perline=${icons.length}`}
              alt={group}
              className="h-12 sm:h-14 pointer-events-none select-none"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
