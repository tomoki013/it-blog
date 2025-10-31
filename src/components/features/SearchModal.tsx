"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Search, LoaderCircle, FileText } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { searchPostsAction, SearchResult } from "@/actions/searchActions";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    } else {
      setTimeout(() => {
        setQuery("");
        setResults([]);
      }, 200);
    }
  }, [isOpen]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    startTransition(async () => {
      if (newQuery.trim().length > 1) {
        const searchResults = await searchPostsAction(newQuery);
        setResults(searchResults);
      } else {
        setResults([]);
      }
    });
  };

  const handleResultClick = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-background/90 backdrop-blur-sm flex items-start justify-center pt-20"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: "-20px" }}
            animate={{ opacity: 1, scale: 1, y: "0px" }}
            exit={{ opacity: 0, scale: 0.9, y: "-20px" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative bg-background/50 border-2 border-primary/30 rounded-lg shadow-lg shadow-primary/20 w-full max-w-2xl mx-4 p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4"
              onClick={onClose}
              aria-label="検索モーダルを閉じる"
            >
              <X className="h-6 w-6" />
            </Button>

            <h2
              className="text-2xl font-bold text-center mb-6 glitch"
              data-text="Search Content"
            >
              Search Content
            </h2>

            <div className="relative">
              <input
                ref={searchInputRef}
                type="search"
                value={query}
                onChange={handleSearch}
                placeholder="記事やトピックを検索..."
                className="w-full pl-12 pr-4 py-3 bg-background/70 border-2 border-primary/30 focus:border-primary focus:ring-primary rounded-md transition-all duration-300 placeholder:text-foreground/50"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/70 pointer-events-none" />
            </div>

            <div className="mt-6 h-96 overflow-y-auto custom-scrollbar pr-4">
              {isPending && (
                <div className="flex justify-center items-center h-full">
                  <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
                </div>
              )}

              {!isPending && query.trim().length > 1 && results.length === 0 && (
                <p className="text-center text-foreground/60 pt-4">
                  検索結果が見つかりませんでした。
                </p>
              )}

              {!isPending && query.trim().length <= 1 && (
                <p className="text-center text-foreground/60 pt-4">
                  2文字以上入力してください。
                </p>
              )}

              {!isPending && results.length > 0 && (
                <ul className="space-y-4">
                  {results.map(({ slug, frontmatter }) => (
                    <li key={slug}>
                      <Link
                        href={`/blog/${slug}`}
                        className="block p-4 rounded-md transition-all duration-300 hover:bg-primary/10 border border-transparent hover:border-primary/30"
                        onClick={handleResultClick}
                      >
                        <h3 className="font-bold text-lg text-foreground mb-1">
                          {frontmatter.title}
                        </h3>
                        <p className="text-foreground/70 text-sm">
                          {frontmatter.excerpt}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
