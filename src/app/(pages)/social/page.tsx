"use client";

import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa6";
import { SiZenn, SiQiita } from "react-icons/si";
import Link from "next/link";
import GlitchText from "@/components/ui/GlitchText";
import { FaLinkedin, FaPenSquare } from "react-icons/fa";

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/tomoki013/",
    icon: FaGithub,
    color: "group-hover:text-[#181717] dark:group-hover:text-[#ffffff]",
    shadow:
      "hover:shadow-[0_0_20px_#181717] dark:hover:shadow-[0_0_20px_#ffffff]",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/tomoki-takagi-5b08a738b/",
    icon: FaLinkedin,
    color: "group-hover:text-[#55C500]",
    shadow: "hover:shadow-[0_0_20px_#55C500]",
  },
  {
    name: "Qiita",
    url: "https://qiita.com/tomoki013/",
    icon: SiQiita,
    color: "group-hover:text-[#55C500]",
    shadow: "hover:shadow-[0_0_20px_#55C500]",
  },
  {
    name: "Zenn",
    url: "https://zenn.dev/tomoki013/",
    icon: SiZenn,
    color: "group-hover:text-[#3EA8FF]",
    shadow: "hover:shadow-[0_0_20px_#3EA8FF]",
  },
  // {
  //   name: "X (formerly Twitter)",
  //   url: "https://twitter.com/your-profile/",
  //   icon: FaXTwitter,
  //   color: "group-hover:text-[#000000] dark:group-hover:text-[#ffffff]",
  //   shadow: "hover:shadow-[0_0_20px_#000000] dark:hover:shadow-[0_0_20px_#ffffff]",
  // },
  {
    name: "Note",
    url: "https://note.com/tomokichidiary/",
    icon: FaPenSquare,
    color: "group-hover:text-[#55C500]",
    shadow: "hover:shadow-[0_0_20px_#55C500]",
  },
];

const SocialPage = () => {
  return (
    <div className="min-h-screen pt-20 bg-background">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[40vh] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400 opacity-30 animate-[gradient-x_5s_ease_infinite]"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-6">
            <GlitchText text="Social Links" />
          </h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl"
          >
            Follow me on my journey through the digital world.
          </motion.p>
        </div>
      </motion.section>

      {/* Social Links Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {socialLinks.map((link) => (
              <motion.div
                key={link.name}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Link href={link.url} passHref legacyBehavior>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center p-6 bg-[var(--color-light-card-bg)] dark:bg-[var(--color-dark-card-bg)] rounded-xl border border-transparent transition-all duration-300 ${link.shadow} hover:border-[var(--color-cyber-cyan)]`}
                  >
                    <link.icon className="w-10 h-10 mr-6 text-gray-400 transition-colors duration-300" />
                    <span
                      className={`text-xl font-semibold transition-colors duration-300 ${link.color}`}
                    >
                      {link.name}
                    </span>
                  </a>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SocialPage;
