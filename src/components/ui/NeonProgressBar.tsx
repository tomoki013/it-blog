"use client";

import { motion, useScroll } from "framer-motion";

const NeonProgressBar = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1.5 bg-cyan-400/10 z-50"
      style={{
        scaleX: scrollYProgress,
        transformOrigin: "0%",
      }}
    >
      {/* Main progress bar with gradient and enhanced glow */}
      <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-r from-cyan-500/30 via-cyan-400 to-cyan-300 shadow-[0_0_12px_rgba(0,255,255,0.8)]" />

      {/* Comet-like effect at the end of the bar */}
      <div className="absolute top-1/2 right-0 h-4 w-1 -translate-y-1/2 rounded-full bg-cyan-200 shadow-[0_0_10px_2px_rgba(0,255,255,1),_0_0_20px_5px_rgba(0,255,255,0.7),_0_0_40px_15px_rgba(0,255,255,0.3)]" />
    </motion.div>
  );
};

export default NeonProgressBar;
