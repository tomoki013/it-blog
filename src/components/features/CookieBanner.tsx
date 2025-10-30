"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (consent === null) {
      setIsVisible(true);
    }
  }, []);

  const handleConsent = (consent: "accepted" | "declined") => {
    localStorage.setItem("cookie_consent", consent);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed bottom-0 left-0 right-0 bg-gray-900/80 backdrop-blur-md border-t border-cyan-700 p-4 z-50 shadow-[0_-5px_25px_rgba(0,255,255,0.1)]"
        >
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-300 flex-grow">
              当サイトでは、ユーザー体験の向上とサイトのパフォーマンス分析のためにクッキーを使用しています。詳細については、
              <Link href="/cookie-policy" className="text-teal-400 underline hover:text-teal-200 transition-colors">
                クッキーポリシー
              </Link>
              をご確認ください。
            </p>
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={() => handleConsent("accepted")}
                className="px-4 py-2 bg-cyan-600/80 text-white font-bold rounded-md hover:bg-cyan-500/90 transition-all duration-300 border border-cyan-400 shadow-[0_0_8px_rgba(0,255,255,0.5)] text-sm"
              >
                同意する
              </button>
              <button
                onClick={() => handleConsent("declined")}
                className="px-4 py-2 bg-gray-700/80 text-gray-200 font-bold rounded-md hover:bg-gray-600/90 transition-all duration-300 border border-gray-500 text-sm"
              >
                拒否する
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
