"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { News } from "@/types/news";
import { FaArrowRight } from "react-icons/fa";

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

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-center gradient-text"
          >
            News
          </motion.h2>
          <Link href="/news" className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors group">
            <span>View All</span>
            <FaArrowRight className="transform transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col"
        >
          {news.map((item) => (
            <motion.div
              key={item.slug}
              variants={itemVariant}
              whileHover={{
                x: 5,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                },
              }}
            >
              <Link
                href={item.frontmatter.link || `/news/${item.slug}`}
                target={item.frontmatter.link ? "_blank" : "_self"}
                rel={item.frontmatter.link ? "noopener noreferrer" : ""}
                className="flex flex-col md:flex-row items-baseline gap-x-6 gap-y-2 p-4 border-b border-border-dark hover:bg-card/50 rounded-lg transition-all"
              >
                <time dateTime={item.frontmatter.date} className="text-sm text-gray-400 min-w-[100px]">
                  {new Date(item.frontmatter.date).toLocaleDateString("en-CA")}
                </time>
                <div className="flex-grow">
                  <h3 className="font-semibold text-base">
                    {item.frontmatter.title}
                  </h3>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {item.frontmatter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block text-xs font-medium text-secondary bg-secondary/10 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LatestNewsSection;
