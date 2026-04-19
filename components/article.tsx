"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ChevronDown } from "lucide-react";
import { Categories, Repo, tagColor } from "@/lib/data";

interface Props {
  data: Categories;
}

const gradientByIndex = [
  "from-blue-500/15 via-transparent",
  "from-purple-500/15 via-transparent",
  "from-emerald-500/15 via-transparent",
  "from-rose-500/15 via-transparent",
];

export default function Article({ data }: Props) {
  return (
    <div className="space-y-20">
      {Object.entries(data).map(([category, items], ci) => (
        <section key={category} id={slugify(category)} className="scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex items-baseline gap-4"
          >
            <span className="font-mono text-xs text-soft/40 tracking-widest">
              // 0{ci + 1}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight gradient-text animate-gradient-x">
              {category}
            </h2>
            <span className="text-sm text-soft/30">· {items.length}</span>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {items.map((repo, i) => (
              <motion.div
                key={repo.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
              >
                <RepoCard repo={repo} gradient={gradientByIndex[i % gradientByIndex.length]} />
              </motion.div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function RepoCard({ repo, gradient }: { repo: Repo; gradient: string }) {
  const [expanded, setExpanded] = useState(false);
  const previewDesc = repo.desc.slice(0, 2);
  const restDesc = repo.desc.slice(2);
  const hasMore = restDesc.length > 0;

  return (
    <div
      className={`group relative rounded-2xl p-5 card-glass hover:ring-soft transition-all duration-300 bg-gradient-to-br ${gradient} to-transparent`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-xl font-bold tracking-tight">
          {repo.url ? (
            <a
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              {repo.name}
            </a>
          ) : (
            repo.name
          )}
        </h3>
        <div className="flex items-center gap-1">
          {repo.github && (
            <a
              href={repo.github}
              target="_blank"
              rel="noreferrer"
              aria-label="github"
              className="p-1.5 rounded text-soft/50 hover:text-white hover:bg-white/5 transition"
            >
              <Github size={15} />
            </a>
          )}
          {repo.url && repo.url !== repo.github && (
            <a
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              aria-label="external"
              className="p-1.5 rounded text-soft/50 hover:text-white hover:bg-white/5 transition"
            >
              <ExternalLink size={15} />
            </a>
          )}
        </div>
      </div>

      <ul className="space-y-1.5 text-sm text-soft/75 leading-relaxed">
        {previewDesc.map((d, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-soft/30 shrink-0">▪</span>
            <span>{d}</span>
          </li>
        ))}
        <AnimatePresence initial={false}>
          {expanded &&
            restDesc.map((d, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="flex gap-2"
              >
                <span className="text-soft/30 shrink-0">▪</span>
                <span>{d}</span>
              </motion.li>
            ))}
        </AnimatePresence>
      </ul>

      {hasMore && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 inline-flex items-center gap-1 text-xs font-mono text-soft/50 hover:text-blue-400 transition"
        >
          <ChevronDown
            size={14}
            className="transition-transform duration-300"
            style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
          />
          {expanded ? "收起" : `展开 +${restDesc.length}`}
        </button>
      )}

      <div className="mt-4 flex flex-wrap gap-1.5">
        {repo.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
            style={{
              color: tagColor(tag),
              borderColor: tagColor(tag) + "50",
              background: tagColor(tag) + "10",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function slugify(s: string) {
  return s.toLowerCase().replace(/\s+/g, "-");
}
