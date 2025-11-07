"use client";

import { News } from "@/types/news";
import NewsArticleHeader from "./NewsArticleHeader";
import ArticleLoader from "@/components/pages/blog/ArticleLoader";
import { MDXRemoteProps } from "next-mdx-remote";
import { motion } from "framer-motion";

type Props = {
  article: News;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const NewsArticleDetail = ({ article }: Props) => {
  return (
    <motion.div
      className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <NewsArticleHeader frontmatter={article.frontmatter} />
        {article.source && (
          <ArticleLoader
            key={article.slug}
            source={article.source as MDXRemoteProps}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default NewsArticleDetail;
