"use client";
import { motion } from "framer-motion";
import { Github } from "lucide-react";

export default function Tips() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center py-12"
    >
      <a
        href="https://github.com/anthhub"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-3 px-6 py-3 rounded-full card-glass hover:ring-soft group transition-all"
      >
        <Github size={16} className="text-soft/70 group-hover:text-white transition" />
        <span className="text-sm relative">
          <span className="gradient-text animate-gradient-x font-medium">
            更多项目源码, 请移步 GitHub, 或者面基[奸笑]...
          </span>
        </span>
      </a>
    </motion.div>
  );
}
