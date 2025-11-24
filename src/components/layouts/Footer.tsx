"use client";

import { motion } from "framer-motion";
import { FaGithub, FaPenSquare, FaLinkedin } from "react-icons/fa";
import { SiQiita, SiZenn } from "react-icons/si";
import Link from "next/link";

const Footer = () => {
  const footerLinks = [
    {
      title: "CONTENTS",
      links: [
        { label: "About", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "News", href: "/news" },
        { label: "Social", href: "/social" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "RESOURCES",
      links: [
        { label: "Documentation", href: "/documentation" },
        { label: "Sitemap", href: "/sitemap" },
      ],
    },
    {
      title: "LEGAL",
      links: [
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms of Service", href: "/terms-of-service" },
        { label: "Cookie Policy", href: "/cookie-policy" },
      ],
    },
  ];

  const socialLinks = [
    {
      icon: <FaGithub className="h-5 w-5" />,
      href: "https://github.com/tomoki013/",
    },
    {
      icon: <FaLinkedin className="h-5 w-5" />,
      href: "https://www.linkedin.com/in/tomoki-takagi-5b08a738b/",
    },
    {
      icon: <SiQiita className="h-5 w-5" />,
      href: "https://qiita.com/tomoki013/",
    },
    {
      icon: <SiZenn className="h-5 w-5" />,
      href: "https://zenn.dev/tomoki013/",
    },
    {
      icon: <FaPenSquare className="h-5 w-5" />,
      href: "https://note.com/tomokichidiary/",
    },
  ];

  return (
    <footer className="relative mt-20 border-t border-border bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(188,19,254,0.1),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <Link href="/" className="block">
              <h2 className="text-2xl font-bold font-display tracking-widest text-primary">
                ともきちのエンジニア成長記
              </h2>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed">
              技術の備忘録とポートフォリオ
              <br />
              一歩ずつ進む
            </p>
            <div className="flex gap-4 flex-wrap">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-text-secondary hover:text-primary transition-all duration-300 p-2 rounded-full hover:bg-white/5 hover:shadow-[0_0_15px_var(--color-primary)]"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {footerLinks.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + sectionIndex * 0.1 }}
              className="space-y-6"
            >
              <h3 className="font-display font-bold text-lg tracking-wider text-white border-b border-primary/30 pb-2 w-fit">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <motion.li
                    key={link.label}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={link.href}
                      className="text-text-secondary hover:text-primary transition-colors text-sm flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-white/5 text-center"
        >
          <p className="text-text-muted text-xs font-mono">
            &copy; {new Date().getFullYear()} ともきちのエンジニア成長記. All
            rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
