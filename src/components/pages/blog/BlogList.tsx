"use client";

import { motion } from "framer-motion";
import { Post } from "@/types/post";
import PostCard from "@/components/ui/PostCard";
import { Terminal } from "lucide-react";

type Props = {
  posts: Omit<Post, "content" | "headings">[];
};

const BlogList = ({ posts }: Props) => {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,240,255,0.05),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary font-mono text-sm mb-6">
            <Terminal className="w-4 h-4" />
            <span>/var/www/blog</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">
            KNOWLEDGE <span className="text-primary">BASE</span>
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            Technical articles, tutorials, and insights from my journey as a
            developer.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <PostCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
