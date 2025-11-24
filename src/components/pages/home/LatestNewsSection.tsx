"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { News } from "@/types/news";
import { ArrowRight, Terminal } from "lucide-react";

type Props = {
  news: Omit<News, "content" | "headings">[];
};

const LatestNewsSection = ({ news }: Props) => {
  return (
    <section className="py-24 bg-background relative">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold font-display flex items-center gap-3">
              <Terminal className="text-accent" />
              SYSTEM <span className="text-accent">LOGS</span>
            </h2>
          </motion.div>

          <Link
            href="/news"
            className="text-sm font-mono text-text-secondary hover:text-accent transition-colors flex items-center gap-2 group"
          >
            VIEW ALL
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="space-y-4 font-mono">
          {news.map((item, index) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link
                href={item.frontmatter.link || `/news/${item.slug}`}
                target={item.frontmatter.link ? "_blank" : "_self"}
                rel={item.frontmatter.link ? "noopener noreferrer" : ""}
                className="group block p-4 border-l-2 border-white/10 hover:border-accent bg-white/5 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <time className="text-xs text-text-muted min-w-[100px]">
                    {new Date(item.frontmatter.date).toLocaleDateString(
                      "en-CA"
                    )}
                  </time>

                  <h3 className="text-sm md:text-base font-medium text-text-primary group-hover:text-accent transition-colors flex-grow">
                    <span className="text-accent mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {">"}
                    </span>
                    {item.frontmatter.title}
                  </h3>

                  <div className="flex gap-2">
                    {item.frontmatter.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-black/20 text-text-secondary border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNewsSection;
