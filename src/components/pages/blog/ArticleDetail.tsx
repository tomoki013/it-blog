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

const ArticleDetail = ({ article, recentPosts, prevPost, nextPost }: Props) => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden pt-24">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(188,19,254,0.05),transparent_50%)] pointer-events-none" />

      <motion.div
        className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="lg:grid lg:grid-cols-4 lg:gap-12">
          {/* Main Content */}
          <motion.div
            className="lg:col-span-3"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <ArticleHeader frontmatter={article.frontmatter} />

            {/* Mobile ToC */}
            <div className="lg:hidden mb-8">
              <TableOfContents headings={article.headings} />
            </div>

            <div className="prose prose-invert prose-cyan max-w-none mb-12 bg-dark-card/50 p-6 md:p-10 rounded-xl border border-white/5 backdrop-blur-sm shadow-lg">
              {article.source && (
                <ArticleLoader
                  key={article.slug}
                  source={article.source as MDXRemoteProps}
                />
              )}
            </div>

            <ShareButtons title={article.frontmatter.title} />
            <PostNavigation prevPost={prevPost} nextPost={nextPost} />

            {/* Mobile Recent Posts */}
            <div className="lg:hidden mt-12">
              <RecentPosts posts={recentPosts} />
            </div>
          </motion.div>

          {/* Desktop Sidebar */}
          <motion.div
            className="hidden lg:block"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="sticky top-24 space-y-8">
              <Sidebar headings={article.headings} posts={recentPosts} />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ArticleDetail;
