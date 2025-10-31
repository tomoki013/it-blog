"use client";

import { motion } from "framer-motion";
import { FaGithub, FaPenSquare, FaLinkedin, FaTwitter } from "react-icons/fa";
import { SiQiita, SiZenn } from "react-icons/si";
import Link from "next/link";

const Footer = () => {
  const footerLinks = [
    {
      title: "Contents",
      links: [
        { label: "About", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Social", href: "/social" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "/documentation" },
        { label: "Newsletter", href: "/newsletter" },
        { label: "RSS Feed", href: "/rss" },
        { label: "Sitemap", href: "/sitemap" },
      ],
    },
    {
      title: "Legal",
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
      href: "https://github.com/tomoki013",
    },
    {
      icon: <FaLinkedin className="h-5 w-5" />,
      href: "https://www.linkedin.com/in/tomoki-takagi-5b08a738b/",
    },
    {
      icon: <SiQiita className="h-5 w-5" />,
      href: "https://qiita.com/tomoki013",
    },
    {
      icon: <SiZenn className="h-5 w-5" />,
      href: "https://zenn.dev/tomoki013",
    },
    // {
    //   icon: <FaTwitter className="h-5 w-5" />,
    //   href: "https://note.com/tomokichidiary",
    // },
    {
      icon: <FaPenSquare className="h-5 w-5" />,
      href: "https://note.com/tomokichidiary",
    },
  ];

  return (
    <footer className="bg-card border-t border-primary/20 shadow-[0_-10px_30px_-15px_rgba(0,246,255,0.1)]">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <Link href={`/`}>
              <h2 className="text-2xl font-bold">ともきちのエンジニア成長記</h2>
            </Link>
            <p className="text-muted-foreground">
              技術の備忘録とポートフォリオ
            </p>
            <div className="flex gap-4 flex-wrap">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + index * 0.1,
                  }}
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-primary/70 hover:text-primary transition-all duration-300
                             shadow-[0_0_10px_rgba(0,246,255,0.3)] hover:shadow-[0_0_20px_rgba(0,246,255,0.7)]
                             rounded-full w-fit p-2"
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
              transition={{ duration: 0.5, delay: 0.3 + sectionIndex * 0.1 }}
              className="space-y-4"
            >
              <h3 className="font-semibold">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <motion.li
                    key={link.label}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
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
          className="mt-12 pt-8 border-t border-border/50 text-center"
        >
          <motion.p
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-muted-foreground"
          >
            &copy; {new Date().getFullYear()} ともきちのエンジニア成長記. All
            rights reserved.
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
