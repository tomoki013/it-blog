"use client";

import { ContactForm } from "@/components/features/ContactForm";
import { motion } from "framer-motion";

const ContactClientPage = () => {
  return (
    <div className="container mx-auto max-w-3xl py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold glitch mb-4" data-text="CONTACT">
          CONTACT
        </h1>
        <p className="text-foreground/80 md:text-lg">
          プロジェクトのご相談、技術的なご質問など、お気軽にお問い合わせください。
        </p>
        <div className="mt-4 h-1 w-24 bg-primary mx-auto shadow-[0_0_10px_theme(colors.primary)]"></div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-background/30 border border-primary/20 rounded-lg shadow-lg shadow-primary/10 p-8 backdrop-blur-sm"
      >
        <ContactForm />
      </motion.div>
    </div>
  );
};

export default ContactClientPage;
