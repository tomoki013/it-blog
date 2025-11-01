"use client";

import { Heading } from "@/types/post";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { FiMenu, FiX, FiHash } from "react-icons/fi";
import clsx from "clsx";

type Props = {
  headings: Heading[];
};

const TableOfContents = ({ headings }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHeading, setActiveHeading] = useState<string>("");

  useEffect(() => {
    if (window.innerWidth < 1024) return;

    const headingPositions = headings
      .map((heading) => {
        const element = document.getElementById(heading.slug);
        return element ? { id: heading.slug, top: element.offsetTop } : null;
      })
      .filter((pos): pos is { id: string; top: number } => pos !== null);

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      let newActiveHeading = "";

      for (let i = headingPositions.length - 1; i >= 0; i--) {
        if (scrollPosition >= headingPositions[i].top) {
          newActiveHeading = headingPositions[i].id;
          break;
        }
      }
      setActiveHeading(newActiveHeading);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check on mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headings]);

  if (!headings || headings.length === 0) {
    return null;
  }

  const tocContent = (
    <nav>
      <h2 className="font-mono tracking-wider text-lg font-bold mb-4 text-cyan-400 border-b-2 border-cyan-400/30 pb-2">
        目次
      </h2>
      <ul className="space-y-3 relative">
        {headings.map((heading) => (
          <li
            key={heading.slug}
            style={{ paddingLeft: `${(heading.level - 2) * 1.25}rem` }}
            className="relative"
          >
            {activeHeading === heading.slug && (
              <motion.div
                layoutId="active-heading-indicator"
                className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-400 rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
            <a
              href={`#${heading.slug}`}
              onClick={() => setIsOpen(false)}
              className={clsx(
                "font-mono text-sm flex items-center gap-2 transition-colors duration-200",
                activeHeading === heading.slug
                  ? "text-white font-bold"
                  : "text-gray-400 hover:text-cyan-300"
              )}
            >
              <FiHash className="w-4 h-4 flex-shrink-0" />
              <span>{heading.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );

  // Mobile: Floating Action Button + Modal
  const mobileToc = (
    <div className="lg:hidden">
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-cyan-500/80 backdrop-blur-sm border border-cyan-400/50 text-white flex items-center justify-center shadow-lg shadow-cyan-500/30"
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
      >
        <FiMenu size={24} />
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-[#0a192f]/90 border-l-2 border-cyan-400/50 p-8 overflow-y-auto"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-white"
              >
                <FiX size={28} />
              </button>
              {tocContent}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  // Desktop: Sticky Sidebar
  const desktopToc = (
    <aside className="hidden lg:block">
      <div className="sticky top-24">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="p-6 rounded-lg bg-black/50 backdrop-blur-md border border-cyan-400/20 shadow-lg shadow-cyan-500/10"
        >
          {tocContent}
        </motion.div>
      </div>
    </aside>
  );

  return (
    <>
      {mobileToc}
      {desktopToc}
    </>
  );
};

export default TableOfContents;
