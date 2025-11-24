"use client";

import { motion } from "framer-motion";
import { Post } from "@/types/post";
import PostCard from "@/components/ui/PostCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = {
  articles: Omit<Post, "content" | "headings">[];
};

const LatestArticlesSection = ({ articles }: Props) => {
  return (
    <section className="relative py-24 bg-background overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
              LATEST <span className="text-primary">ARTICLES</span>
            </h2>
            <p className="text-text-secondary max-w-xl">
              Fresh insights from the digital frontier.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/blog"
              className="group flex items-center gap-2 text-text-secondary hover:text-primary transition-colors font-mono text-sm"
            >
              VIEW ALL ARCHIVES
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <PostCard key={article.slug} post={article} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestArticlesSection;
