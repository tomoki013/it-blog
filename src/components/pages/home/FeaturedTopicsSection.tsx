"use client";

import { Code2, Command, Cpu, Terminal, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const FeaturedTopicsSection = () => {
  const topics = [
    {
      icon: <Code2 className="h-8 w-8" />,
      title: "Development",
      description: "Modern web development practices and tutorials",
      color: "text-primary",
      border: "group-hover:border-primary",
      shadow: "group-hover:shadow-[0_0_20px_var(--color-primary)]",
    },
    {
      icon: <Terminal className="h-8 w-8" />,
      title: "DevOps",
      description: "Infrastructure and deployment strategies",
      color: "text-secondary",
      border: "group-hover:border-secondary",
      shadow: "group-hover:shadow-[0_0_20px_var(--color-secondary)]",
    },
    {
      icon: <Cpu className="h-8 w-8" />,
      title: "AI & ML",
      description: "Latest in artificial intelligence and machine learning",
      color: "text-accent",
      border: "group-hover:border-accent",
      shadow: "group-hover:shadow-[0_0_20px_var(--color-accent)]",
    },
    {
      icon: <Command className="h-8 w-8" />,
      title: "Tools",
      description: "Reviews of developer tools and software",
      color: "text-purple",
      border: "group-hover:border-purple",
      shadow: "group-hover:shadow-[0_0_20px_var(--color-purple)]",
    },
  ];

  return (
    <section className="relative py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold font-display mb-4">
            FEATURED <span className="text-secondary">TOPICS</span>
          </h2>
          <p className="text-text-secondary">
            Dive deep into specific areas of technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topics.map((topic, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`group relative p-6 bg-dark-card border border-white/5 rounded-xl transition-all duration-300 ${topic.border} ${topic.shadow}`}
            >
              <div
                className={`mb-4 ${topic.color} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
              >
                {topic.icon}
              </div>

              <h3 className="text-xl font-bold mb-2 font-display tracking-wide group-hover:text-white transition-colors">
                {topic.title}
              </h3>

              <p className="text-text-secondary text-sm mb-6 group-hover:text-white/80 transition-colors">
                {topic.description}
              </p>

              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                <ArrowRight className={`h-5 w-5 ${topic.color}`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTopicsSection;
