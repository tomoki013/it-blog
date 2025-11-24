"use client";

import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AnimatedBackground from "@/components/layouts/AnimatedBackground";
import Link from "next/link";

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
      className="relative h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      <AnimatedBackground className="absolute inset-0 opacity-60 -z-10" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8 relative inline-block"
        >
          <div className="absolute -inset-2 bg-primary/20 blur-xl rounded-full opacity-50 animate-pulse-glow" />
          <span className="relative px-4 py-1 rounded-full border border-primary/50 bg-primary/10 text-primary text-sm font-mono tracking-widest uppercase">
            System Online v2.0
          </span>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter font-display text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50"
        >
          TECH INSIGHTS
          <br />
          <span className="text-primary relative inline-block">
            & INNOVATION
            <span className="absolute -inset-1 bg-primary/20 blur-2xl -z-10" />
          </span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl md:text-2xl mb-12 text-text-secondary max-w-2xl mx-auto leading-relaxed"
        >
          Exploring the frontiers of code, design, and digital culture.
          <br />
          Where cyberpunk meets clean code.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col md:flex-row gap-6 justify-center items-center"
        >
          <Link
            href="/blog"
            className="group relative px-8 py-4 bg-primary/10 hover:bg-primary/20 border border-primary/50 text-primary rounded-none overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]"
          >
            <div className="absolute inset-0 w-1 bg-primary transform -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            <span className="relative flex items-center gap-2 font-mono font-bold tracking-wider">
              READ ARTICLES
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <Link
            href="/about"
            className="px-8 py-4 text-text-secondary hover:text-white border border-white/10 hover:border-white/30 transition-all duration-300 font-mono tracking-wider"
          >
            ABOUT ME
          </Link>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-dark-bg to-transparent pointer-events-none" />
    </motion.section>
  );
};

export default HeroSection;
