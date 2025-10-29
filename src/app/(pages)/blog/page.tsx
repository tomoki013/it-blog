"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

const articles = [
  {
    image: "/images/",
    category: "Development",
    title: "The Future of Web Development in 2025",
    excerpt: "Exploring upcoming trends and technologies shaping the web",
    date: "2024-03-10",
  },
  {
    image: "/images/",
    category: "AI & ML",
    title: "Understanding Large Language Models",
    excerpt: "A deep dive into the technology behind AI language models",
    date: "2024-03-09",
  },
  {
    image: "/images",
    category: "DevOps",
    title: "Kubernetes Best Practices",
    excerpt: "Essential tips for managing container orchestration",
    date: "2024-03-08",
  },
];

const Blog = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

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

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
      },
    },
  };

  return (
    <main className="min-h-screen pt-20 bg-background">
      <motion.section
        ref={containerRef}
        style={{ y }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 py-12"
      >
        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
          className="text-4xl md:text-5xl font-bold text-center mb-8"
        >
          Latest Articles
        </motion.h1>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {articles.map((article, index) => (
            <motion.article
              key={index}
              whileHover={{
                scale: 1.03,
                rotate: [0, 0.5, -0.5, 0],
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 10,
                },
              }}
              className="bg-card rounded-xl overflow-hidden border hover:border-primary/20 transition-all"
            >
              <div className="aspect-video relative overflow-hidden">
                <motion.img
                  src={article.image}
                  alt={article.title}
                  className="object-cover w-full h-full"
                  whileHover={{
                    scale: 1.2,
                    transition: { duration: 0.5 },
                  }}
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                />
              </div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="p-6"
              >
                <motion.div
                  className="flex items-center justify-between mb-3"
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.span
                    whileHover={{
                      scale: 1.1,
                      transition: { type: "spring", stiffness: 400 },
                    }}
                    className="text-sm font-medium text-primary"
                  >
                    {article.category}
                  </motion.span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(article.date).toLocaleDateString()}
                  </span>
                </motion.div>
                <h2 className="text-xl font-semibold mb-3 line-clamp-2">
                  {article.title}
                </h2>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <motion.button
                  whileHover={{ x: 10 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center text-primary hover:text-primary/80 transition-colors"
                >
                  Read more{" "}
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.span>
                </motion.button>
              </motion.div>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>
    </main>
  );
};

export default Blog;
