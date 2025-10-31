"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={!isHomePage ? "pt-16" : ""}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
