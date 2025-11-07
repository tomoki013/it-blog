"use client";

import { motion } from "framer-motion";
import { NewsFrontmatter } from "@/types/news";

type Props = {
  frontmatter: NewsFrontmatter;
};

const NewsArticleHeader = ({ frontmatter }: Props) => {
  const { title, date, tags } = frontmatter;

  return (
    <header className="mb-12 text-center">
      <motion.div>
        <div className="flex justify-center gap-2">
          {tags.map((tag) => (
            <p
              key={tag}
              className="text-secondary font-mono tracking-widest mb-2"
            >
              {tag}
            </p>
          ))}
        </div>
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

export default NewsArticleHeader;
