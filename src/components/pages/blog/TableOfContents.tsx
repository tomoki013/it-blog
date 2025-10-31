"use client";

import { Heading } from "@/types/post";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FiChevronDown, FiHash } from "react-icons/fi";
import clsx from "clsx";

type Props = {
  headings: Heading[];
};

const TableOfContents = ({ headings }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHeading, setActiveHeading] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0 || window.innerWidth < 1024) {
      return;
    }

    const headingPositions = headings
      .map((heading) => {
        const element = document.getElementById(heading.slug);
        return element ? { id: heading.slug, top: element.offsetTop } : null;
      })
      .filter((pos): pos is { id: string; top: number } => pos !== null);

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // Offset for better accuracy

      let newActiveHeading = "";
      // Find the last heading that is above the current scroll position
      for (let i = headingPositions.length - 1; i >= 0; i--) {
        if (scrollPosition >= headingPositions[i].top) {
          newActiveHeading = headingPositions[i].id;
          break;
        }
      }

      setActiveHeading((prev) =>
        prev !== newActiveHeading ? newActiveHeading : prev
      );
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headings]);

  const tocContent = (
    <ul className="space-y-2">
      {headings.map((heading) => (
        <motion.li
          key={heading.slug}
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
          style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
          className="font-mono text-sm"
        >
          <a
            href={`#${heading.slug}`}
            onClick={() => setIsOpen(false)}
            className={clsx(
              "flex items-center gap-2 text-muted-foreground transition-colors duration-300",
              activeHeading === heading.slug
                ? "text-cyan-400"
                : "hover:text-primary"
            )}
          >
            <FiHash
              className={clsx(
                "w-4 h-4 transition-all duration-300",
                activeHeading === heading.slug ? "text-cyan-400 scale-125" : ""
              )}
            />
            <span
              className={clsx(
                "transition-all duration-300",
                activeHeading === heading.slug ? "font-bold" : ""
              )}
            >
              {heading.text}
            </span>
          </a>
        </motion.li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Mobile */}
      <div className="lg:hidden mb-8">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full px-4 py-3 bg-card-bg border border-border-dark rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          <span className="font-mono tracking-widest">On This Page</span>
          <FiChevronDown
            className={clsx(
              "w-5 h-5 transition-transform duration-300",
              isOpen && "transform rotate-180"
            )}
          />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mt-4 px-4"
            >
              {tocContent}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop */}
      <aside className="sticky top-24 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h2 className="text-lg font-semibold mb-4 border-b border-border-dark pb-2 font-mono tracking-widest">
            On This Page
          </h2>
          {tocContent}
        </motion.div>
      </aside>
    </>
  );
};

export default TableOfContents;
