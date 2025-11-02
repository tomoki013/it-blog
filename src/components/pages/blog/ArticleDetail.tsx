"use client";

import { Post } from "@/types/post";
import ArticleHeader from "./ArticleHeader";
import ArticleLoader from "./ArticleLoader";
import RecentPosts from "./RecentPosts";
import Sidebar from "./Sidebar";
import PostNavigation from "./PostNavigation";
import ShareButtons from "./ShareButtons";
import { MDXRemoteProps } from "next-mdx-remote";
import TableOfContents from "./TableOfContents";
import { motion } from "framer-motion";

type Props = {
  article: Post;
  recentPosts: Omit<Post, "content" | "headings">[];
  prevPost: Omit<Post, "content" | "headings"> | null;
  nextPost: Omit<Post, "content" | "headings"> | null;
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

const ArticleDetail = ({ article, recentPosts, prevPost, nextPost }: Props) => {
  return (
    <motion.div
      className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="lg:grid lg:grid-cols-4 lg:gap-12">
        {/* Main Content */}
        <motion.div className="lg:col-span-3" variants={itemVariants}>
          <ArticleHeader frontmatter={article.frontmatter} />

          {/* Mobile ToC */}
          <div className="lg:hidden">
            <TableOfContents headings={article.headings} />
          </div>

          {article.source && (
            <ArticleLoader
              key={article.slug}
              source={article.source as MDXRemoteProps}
            />
          )}

          <ShareButtons title={article.frontmatter.title} />
          <PostNavigation prevPost={prevPost} nextPost={nextPost} />

          {/* Mobile Recent Posts */}
          <div className="lg:hidden mt-12">
            <RecentPosts posts={recentPosts} />
          </div>
        </motion.div>

        {/* Desktop Sidebar */}
        <motion.div variants={itemVariants}>
          <Sidebar headings={article.headings} posts={recentPosts} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ArticleDetail;
