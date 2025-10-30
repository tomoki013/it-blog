"use client";

import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const HeroSection = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  return (
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
          className="text-6xl font-bold mb-6 tracking-tight glitch"
          data-text="Tech Insights & Innovation"
        >
          Tech Insights & Innovation
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl mb-8 text-gray-300 glitch" // text-gray-200 to text-gray-300 for better contrast
        >
          Exploring the cutting edge of technology, one article at a time
        </motion.p>
        <motion.a
          href="/blog"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="group bg-transparent border border-secondary text-white px-8 py-3 rounded-full font-medium transition-all flex justify-center items-center gap-2 w-fit mx-auto shadow-[--shadow-neon-primary] hover:shadow-[--shadow-neon-secondary] hover:bg-secondary glitch"
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
        </motion.a>
      </div>
    </motion.section>
  );
};

export default HeroSection;
