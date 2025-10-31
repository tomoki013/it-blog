"use client";

import { usePathname } from "next/navigation";
import {
  FiShare2,
  FiTwitter,
  FiCopy,
  FiExternalLink,
} from "react-icons/fi";
import { SiFacebook, SiLine } from "react-icons/si";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

type Props = {
  title: string;
};

const ShareButtons = ({ title }: Props) => {
  const pathname = usePathname();
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}${pathname}`;
  const [isShareSupported, setIsShareSupported] = useState(false);

  useEffect(() => {
    if (navigator.share !== undefined) {
      setTimeout(() => setIsShareSupported(true), 0);
    }
  }, []);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    toast.success("URLをコピーしました！");
  };

  const shareOnSocial = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    }
  };

  const socialButtons = [
    {
      name: "Twitter",
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: <FiTwitter size={20} />,
    },
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <SiFacebook size={20} />,
    },
    {
      name: "LINE",
      url: `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`,
      icon: <SiLine size={20} />,
    },
  ];

  const actionButtons = [
    {
      name: "URLをコピー",
      action: copyToClipboard,
      icon: <FiCopy size={20} />,
    },
  ];

  if (isShareSupported) {
    actionButtons.push({
      name: "共有",
      action: shareOnSocial,
      icon: <FiExternalLink size={20} />,
    });
  }

  const buttonClass =
    "flex items-center justify-center gap-2 p-3 rounded-full bg-white/10 text-cyan-400 border-2 border-cyan-400/50 hover:bg-cyan-400/20 hover:text-cyan-300 transition-all duration-300 ease-in-out transform hover:scale-105";

  return (
    <div className="mt-8 py-8 border-t border-white/10">
      <h2 className="text-xl font-bold text-cyan-400 mb-6 text-center flex items-center justify-center gap-2">
        <FiShare2 />
        この記事をシェアする
      </h2>
      <div className="flex flex-wrap justify-center items-center gap-4">
        {actionButtons.map((button) => (
          <button
            key={button.name}
            onClick={button.action}
            className={buttonClass}
            aria-label={button.name}
          >
            {button.icon}
          </button>
        ))}
        {socialButtons.map((button) => (
          <a
            key={button.name}
            href={button.url}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass}
            aria-label={`${button.name}でシェア`}
          >
            {button.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default ShareButtons;
