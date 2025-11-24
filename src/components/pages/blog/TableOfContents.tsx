"use client";

import { Heading } from "@/types/post";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
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
      <h2 className="font-display tracking-wider text-lg font-bold mb-4 text-primary border-b border-primary/30 pb-2 flex items-center gap-2">
        <span className="text-xs font-mono text-primary/50">01.</span>
        TABLE OF CONTENTS
      </h2>
      <ul className="space-y-1 relative border-l border-white/10 ml-2">
        {headings.map((heading) => (
          <li key={heading.slug} className="relative">
            <a
              href={`#${heading.slug}`}
              onClick={() => setIsOpen(false)}
              style={{ paddingLeft: `${(heading.level - 1) * 1}rem` }}
              className={clsx(
                "block py-1.5 pr-4 text-sm transition-all duration-300 relative group",
                activeHeading === heading.slug
                  ? "text-primary font-bold bg-primary/5 border-l-2 border-primary -ml-[1px]"
                  : "text-text-secondary hover:text-white border-l-2 border-transparent -ml-[1px] hover:border-white/30"
              )}
            >
              <span className="font-mono text-xs opacity-50 mr-2 group-hover:opacity-100 transition-opacity">
                {">"}
              </span>
              {heading.text}
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
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-primary/90 backdrop-blur-sm border border-primary/50 text-background flex items-center justify-center shadow-[0_0_20px_var(--color-primary)]"
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
      >
        <FiMenu size={20} />
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-dark-card border-l border-primary/30 p-8 overflow-y-auto"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 text-text-secondary hover:text-primary transition-colors"
              >
                <FiX size={24} />
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
    <div className="p-6 rounded-xl bg-dark-card/50 backdrop-blur-md border border-white/5 shadow-lg">
      {tocContent}
    </div>
  );

  return (
    <>
      {mobileToc}
      {desktopToc}
    </>
  );
};

export default TableOfContents;
