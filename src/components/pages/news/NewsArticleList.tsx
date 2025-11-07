"use client";

import { News } from "@/types/news";
import NewsArticleCard from "./NewsArticleCard";
import { motion } from "framer-motion";

type Props = {
  news: Omit<News, "content" | "headings">[];
};

const NewsArticleList = ({ news }: Props) => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-center mb-8 gradient-text">News</h2>
      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {news.map((item) => (
          <NewsArticleCard key={item.slug} news={item} />
        ))}
      </motion.div>
    </div>
  );
};

export default NewsArticleList;
