"use client";

import { motion } from "framer-motion";
import React from "react";

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

export default function AnimatedBackground({ className, style }: Props) {
  return (
    <motion.div
      aria-hidden
      initial={false}
      animate={{
        backgroundImage: [
          "linear-gradient(45deg, #FF0080, #7928CA)",
          "linear-gradient(45deg, #7928CA, #FF0080)",
          "linear-gradient(45deg, #FF0080, #7928CA)",
        ],
      }}
      transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
      className={`${
        className ?? "fixed inset-0 opacity-75 -z-10 pointer-events-none"
      }`}
      style={{ ...(style ?? {}), backgroundSize: "400% 400%" }}
    />
  );
}
