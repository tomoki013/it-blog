"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Stat {
  label: string;
  value: string;
}

interface Tech {
  name: string;
  version: string;
}

interface AboutClientContentProps {
  stats: Stat[];
  techStack: Tech[];
}

const AboutClientContent = ({ stats, techStack }: AboutClientContentProps) => {
  return (
    <>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative block h-[50vh] flex items-center justify-center overflow-hidden"
      >
        <Image
          src="/images/screenshot.png"
          alt="AI-driven development screenshot"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-white text-center max-w-4xl mx-auto px-4">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-bold mb-6"
          >
            About CyberNote
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl"
          >
            このスクリーンショットは、AIアシスタントと共にこのブログを開発している様子を捉えたものです。
          </motion.p>
        </div>
      </motion.section>

      {/* Concept Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold mb-6"
          >
            Concept
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            CyberNoteは、筆者の備忘録兼ポートフォリオとして、AI駆動開発で構築されたITブログです。「サイバーパンク感」と「テック感」をデザインコンセプトに、Framer Motionによる独自性の高いアニメーションと心地よいUXを追求しています。
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="text-4xl font-bold mb-2"
                >
                  {stat.value}
                </motion.div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-center mb-12"
          >
            Technology Stack
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-8">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-card rounded-xl p-6 text-center"
              >
                <h3 className="text-xl font-semibold mb-2">{tech.name}</h3>
                <p className="text-muted-foreground">{tech.version}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutClientContent;
