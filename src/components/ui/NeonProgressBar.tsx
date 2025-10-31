"use client";

import { motion, useScroll } from "framer-motion";

const NeonProgressBar = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-cyan-400/20 z-50"
      style={{
        scaleX: scrollYProgress,
        transformOrigin: "0%",
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-full bg-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.7)]" />
    </motion.div>
  );
};

export default NeonProgressBar;
