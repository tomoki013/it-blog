"use client";

import { Code2, Command, Cpu, Terminal, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const FeaturedTopicsSection = () => {
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
    <section className="relative z-10 max-w-7xl mx-auto pt-40 pb-20 px-4 bg-background">
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
              color: "from-primary to-secondary",
          },
          {
            icon: <Terminal className="h-8 w-8" />,
            title: "DevOps",
            description: "Infrastructure and deployment strategies",
              color: "from-secondary to-primary",
          },
          {
            icon: <Cpu className="h-8 w-8" />,
            title: "AI & ML",
            description:
              "Latest in artificial intelligence and machine learning",
              color: "from-primary to-secondary",
          },
          {
            icon: <Command className="h-8 w-8" />,
            title: "Tools",
            description: "Reviews of developer tools and software",
              color: "from-secondary to-primary",
          },
        ].map((category, index) => (
          <motion.div
            key={index}
            variants={item}
            whileHover={{
              scale: 1.05,
              rotate: [0, 2, -2, 0],
              transition: { duration: 0.3 },
            }}
              className={`group relative bg-card hover:bg-gradient-to-r ${category.color} p-6 rounded-xl border border-border-dark hover:border-primary/20 transition-all duration-300 hover:shadow-[--shadow-neon-primary] animate-float`}
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
  );
};

export default FeaturedTopicsSection;
