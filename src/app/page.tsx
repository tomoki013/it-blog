"use client";

import { ArrowRight, Code2, Command, Cpu, Terminal } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const Home = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

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
        bounce: 0.6,
      },
    },
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.section
        ref={targetRef}
        style={{ opacity, scale, y }}
        className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-black"
      >
        <motion.div
          animate={{
            background: [
              "linear-gradient(45deg, #FF0080, #7928CA)",
              "linear-gradient(45deg, #7928CA, #FF0080)",
              "linear-gradient(45deg, #FF0080, #7928CA)",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute inset-0 opacity-75"
        />
        <div className="relative z-10 text-white text-center max-w-4xl mx-auto px-4">
          <motion.h1
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 0.2,
            }}
            className="text-6xl font-bold mb-6 tracking-tight gradient-text"
          >
            Tech Insights & Innovation
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl mb-8 text-gray-200"
          >
            Exploring the cutting edge of technology, one article at a time
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="group bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all flex items-center gap-2 mx-auto shadow-[0_0_15px_rgba(124,40,202,0.5)] hover:shadow-[0_0_25px_rgba(124,40,202,0.7)]"
          >
            Latest Articles
            <motion.span
              animate={{
                x: [0, 10, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <ArrowRight className="h-4 w-4" />
            </motion.span>
          </motion.button>
        </div>
      </motion.section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto py-20 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-12 text-center gradient-text"
        >
          Featured Topics
        </motion.h2>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {[
            {
              icon: <Code2 className="h-8 w-8" />,
              title: "Development",
              description: "Modern web development practices and tutorials",
              color: "from-[#FF0080] to-[#7928CA]",
            },
            {
              icon: <Terminal className="h-8 w-8" />,
              title: "DevOps",
              description: "Infrastructure and deployment strategies",
              color: "from-[#7928CA] to-[#FF0080]",
            },
            {
              icon: <Cpu className="h-8 w-8" />,
              title: "AI & ML",
              description:
                "Latest in artificial intelligence and machine learning",
              color: "from-[#FF0080] to-[#7928CA]",
            },
            {
              icon: <Command className="h-8 w-8" />,
              title: "Tools",
              description: "Reviews of developer tools and software",
              color: "from-[#7928CA] to-[#FF0080]",
            },
          ].map((category, index) => (
            <motion.div
              key={index}
              whileHover={{
                scale: 1.05,
                rotate: [0, 2, -2, 0],
                transition: { duration: 0.3 },
              }}
              className={`group relative bg-card hover:bg-gradient-to-r ${category.color} p-6 rounded-xl border hover:border-primary/20 transition-all duration-300 hover:shadow-xl animate-float`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <motion.div
                initial={{ rotate: 0 }}
                whileHover={{
                  rotate: 360,
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 0.5 }}
                className="mb-4 text-primary group-hover:text-white"
              >
                {category.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-white">
                {category.title}
              </h3>
              <p className="text-muted-foreground group-hover:text-white/80">
                {category.description}
              </p>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="absolute bottom-6 right-6 text-white"
              >
                <ArrowRight className="h-5 w-5" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Latest Articles */}
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
            {[
              {
                image: "/images/",
                category: "Development",
                title: "The Future of Web Development in 2025",
                excerpt:
                  "Exploring upcoming trends and technologies shaping the web",
              },
              {
                image: "/images/",
                category: "AI & ML",
                title: "Understanding Large Language Models",
                excerpt:
                  "A deep dive into the technology behind AI language models",
              },
              {
                image: "/images/",
                category: "DevOps",
                title: "Kubernetes Best Practices",
                excerpt: "Essential tips for managing container orchestration",
              },
            ].map((article, index) => (
              <motion.div
                key={index}
                whileHover={{
                  y: -20,
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
                  href="#"
                  className="block bg-card rounded-xl overflow-hidden border hover:border-primary/20 transition-all hover:shadow-[0_0_25px_rgba(124,40,202,0.2)]"
                >
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                    className="aspect-video relative overflow-hidden"
                  >
                    <Image
                      src={article.image}
                      alt={article.title}
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
                      className="inline-block text-sm font-medium text-primary mb-2"
                    >
                      {article.category}
                    </motion.span>
                    <h3 className="text-xl font-semibold mt-2 mb-3">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground">{article.excerpt}</p>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Home;
