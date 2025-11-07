"use client";

import { useState } from "react";
import { News } from "@/types/news";
import NewsArticleCard from "./NewsArticleCard";
import { motion } from "framer-motion";

type Props = {
  news: Omit<News, "content" | "headings">[];
};

const NewsArticleList = ({ news }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("すべて");
  const categories = ["すべて", ...Array.from(new Set(news.map((item) => item.frontmatter.category)))];

  const filteredNews =
    selectedCategory === "すべて"
      ? news
      : news.filter((item) => item.frontmatter.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-center mb-8 gradient-text">News</h2>
      <div className="flex justify-center gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedCategory === category
                ? "bg-cyan-500 text-white"
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {filteredNews.map((item) => (
          <NewsArticleCard key={item.slug} news={item} />
        ))}
      </motion.div>
    </div>
  );
};

export default NewsArticleList;
