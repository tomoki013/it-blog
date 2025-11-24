"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Post } from "@/types/post";

type Props = {
  frontmatter: Post["frontmatter"];
};

const ArticleHeader = ({ frontmatter }: Props) => {
  const { title, date, category, image } = frontmatter;

  return (
    <header className="mb-12 text-center relative">
      {image && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden mb-8 group"
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay" />

          {/* Scanline Effect */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] opacity-20 pointer-events-none" />
        </motion.div>
      )}

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="inline-block mb-4">
          <span className="px-3 py-1 text-xs font-mono font-bold text-background bg-primary rounded-sm shadow-[0_0_15px_var(--color-primary)]">
            {category}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight leading-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground to-foreground/70 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
          {title}
        </h1>

        <div className="flex items-center justify-center gap-4 text-sm font-mono text-text-secondary">
          <time dateTime={date} className="flex items-center gap-2">
            <span className="text-primary">DATE:</span>
            {new Date(date).toLocaleDateString("en-CA")}
          </time>
          <span className="text-primary/50">|</span>
          <span className="flex items-center gap-2">
            <span className="text-primary">AUTHOR:</span>
            {frontmatter.author}
          </span>
        </div>
      </motion.div>
    </header>
  );
};

export default ArticleHeader;
