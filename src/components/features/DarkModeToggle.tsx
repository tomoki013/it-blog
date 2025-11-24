"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-14 h-8 bg-muted rounded-full" />;
  }

  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative w-16 h-8 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
        isDark
          ? "bg-dark-card border border-primary/50"
          : "bg-gray-200 border border-gray-300"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle dark mode"
    >
      <div className="absolute inset-0 rounded-full overflow-hidden">
        {isDark && (
          <div className="absolute inset-0 bg-primary/10 animate-pulse-glow" />
        )}
      </div>

      <motion.div
        className={`relative w-6 h-6 rounded-full shadow-md flex items-center justify-center ${
          isDark ? "bg-primary text-dark-bg" : "bg-white text-yellow-500"
        }`}
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{
          x: isDark ? 32 : 0,
        }}
      >
        {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
      </motion.div>
    </motion.button>
  );
};

export default DarkModeToggle;
