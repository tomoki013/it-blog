"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Search } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      // モーダルが開いたときにインプットにフォーカスを当てる
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100); // アニメーションの時間を考慮
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-start justify-center pt-20"
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

            <h2 className="text-2xl font-bold text-center mb-6 glitch" data-text="Search Content">
              Search Content
            </h2>

            <div className="relative">
              <input
                ref={searchInputRef}
                type="search"
                placeholder="記事やトピックを検索..."
                className="w-full pl-12 pr-4 py-3 bg-background/70 border-2 border-primary/30 focus:border-primary focus:ring-primary rounded-md transition-all duration-300 placeholder:text-foreground/50"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/70 pointer-events-none" />
            </div>

            <div className="mt-6 h-64 overflow-y-auto">
                <p className="text-center text-foreground/60 pt-4">
                    検索結果はここに表示されます。
                </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
