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
    <header className="mb-12 text-center">
      {image && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden mb-8 shadow-[0_0_20px_theme(colors.primary/0.5)] border border-primary/20"
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </motion.div>
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <p className="text-secondary font-mono tracking-widest mb-2">
          {category}
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight gradient-text mb-4 glitch" data-text={title}>
          {title}
        </h1>
        <p className="text-muted-foreground text-sm font-mono">
          Published on {new Date(date).toLocaleDateString()}
        </p>
      </motion.div>
    </header>
  );
};

export default ArticleHeader;
