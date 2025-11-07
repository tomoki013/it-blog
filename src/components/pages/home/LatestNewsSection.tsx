"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { News } from "@/types/news";

type Props = {
  news: Omit<News, "content" | "headings">[];
};

const LatestNewsSection = ({ news }: Props) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <section className="bg-muted py-20">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-12 text-center gradient-text"
        >
          Latest News
        </motion.h2>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {news.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{
                y: -10,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 10,
                },
              }}
            >
              <Link
                href={`/news/${item.slug}`}
                className="block bg-card rounded-xl p-6 border border-border-dark hover:border-primary/20 transition-all hover:shadow-[--shadow-neon-primary]"
              >
                <motion.span
                  className="inline-block text-sm font-medium text-secondary mb-2"
                >
                  {item.frontmatter.category}
                </motion.span>
                <h3 className="text-xl font-semibold mt-2 mb-3">
                  {item.frontmatter.title}
                </h3>
                <p className="text-muted-foreground">
                  {item.frontmatter.description}
                </p>
                <p className="text-xs text-gray-400 mt-4">
                  {new Date(item.frontmatter.date).toLocaleDateString("ja-JP")}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        <div className="text-center mt-12">
            <Link href="/news" className="inline-block bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-primary-dark transition-colors">
                View All News
            </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestNewsSection;
