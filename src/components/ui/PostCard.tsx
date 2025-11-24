"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Post } from "@/types/post";

type Props = {
  post: Omit<Post, "content" | "headings">;
  index?: number;
};

const PostCard = ({ post, index = 0 }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative h-full"
    >
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className="relative h-full bg-dark-card border border-white/5 rounded-xl overflow-hidden transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]">
          {/* Holographic Overlay Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

          {/* Image Container */}
          <div className="relative aspect-video overflow-hidden">
            {post.frontmatter.image ? (
              <Image
                src={post.frontmatter.image}
                alt={post.frontmatter.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">No Image</span>
              </div>
            )}
            <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-300" />

            {/* Category Badge */}
            <div className="absolute top-4 left-4 z-20">
              <span className="px-3 py-1 text-xs font-mono font-bold text-background bg-primary rounded-sm shadow-[0_0_10px_var(--color-primary)]">
                {post.frontmatter.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col h-[calc(100%-aspect-video)]">
            <div className="flex items-center gap-2 mb-3 text-xs text-text-secondary font-mono">
              <time dateTime={post.frontmatter.date}>
                {new Date(post.frontmatter.date).toLocaleDateString("en-CA")}
              </time>
              <span>{post.frontmatter.author}</span>
            </div>

            <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300 font-display tracking-wide">
              {post.frontmatter.title}
            </h3>

            <p className="text-text-secondary text-sm line-clamp-3 mb-4 flex-grow">
              {post.frontmatter.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-auto">
              {post.frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-primary/70 bg-primary/5 px-2 py-1 rounded border border-primary/20"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Corner Accents */}
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>
    </motion.div>
  );
};

export default PostCard;
