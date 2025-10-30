"use client";

import { Heading } from "@/types/post";
import { motion } from "framer-motion";

type Props = {
  headings: Heading[];
};

const TableOfContents = ({ headings }: Props) => {
  return (
    <aside className="sticky top-24 hidden lg:block">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <h2 className="text-lg font-semibold mb-4 border-b border-border-dark pb-2 font-mono tracking-widest">
          On This Page
        </h2>
        <ul className="space-y-2">
          {headings.map((heading) => (
            <motion.li
              key={heading.slug}
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
              className="font-mono text-sm"
            >
              <a
                href={`#${heading.slug}`}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {heading.text}
              </a>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </aside>
  );
};

export default TableOfContents;
