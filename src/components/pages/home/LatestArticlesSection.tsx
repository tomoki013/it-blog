"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Post } from "@/types/post";

type Props = {
  articles: Omit<Post, "content">[];
};

const LatestArticlesSection = ({ articles }: Props) => {
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

  return (
    <section className="bg-muted py-20">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-12 text-center gradient-text"
        >
          Latest Articles
        </motion.h2>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {articles.map((article, index) => (
            <motion.div
              key={index}
              whileHover={{
                y: -10,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 10,
                },
              }}
              className="animate-float"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <Link
                href={`/blog/${article.slug}`}
                className="block bg-card rounded-xl overflow-hidden border border-border-dark hover:border-primary/20 transition-all hover:shadow-[--shadow-neon-primary]"
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                  className="aspect-video relative overflow-hidden bg-gray-800" // Added a background color for placeholder
                >
                  <Image
                    src={article.frontmatter.image}
                    alt={article.frontmatter.title}
                    fill
                    className="object-cover w-full h-full"
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent"
                  />
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6"
                >
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    className="inline-block text-sm font-medium text-secondary mb-2"
                  >
                    {article.frontmatter.category}
                  </motion.span>
                  <h3 className="text-xl font-semibold mt-2 mb-3">
                    {article.frontmatter.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {article.frontmatter.excerpt}
                  </p>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LatestArticlesSection;
