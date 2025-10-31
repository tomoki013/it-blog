"use client";

import { usePathname } from "next/navigation";
import {
  FaTwitter,
  FaFacebook,
  FaLine,
  FaShare,
} from "react-icons/fa";

type Props = {
  title: string;
};

const ShareButtons = ({ title }: Props) => {
  const pathname = usePathname();
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}${pathname}`;

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: "Twitter",
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: <FaTwitter />,
      color: "bg-[#1DA1F2] hover:bg-[#1A91DA]",
    },
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <FaFacebook />,
      color: "bg-[#1877F2] hover:bg-[#166FE5]",
    },
    {
      name: "LINE",
      url: `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`,
      icon: <FaLine />,
      color: "bg-[#00B900] hover:bg-[#00A300]",
    },
  ];

  return (
    <div className="mt-8 py-8 border-t border-white/10">
      <h2 className="text-xl font-bold text-cyan-400 mb-4 text-center flex items-center justify-center gap-2">
        <FaShare />
        この記事をシェアする
      </h2>
      <div className="flex justify-center gap-4">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition-colors duration-300 ${link.color}`}
          >
            {link.icon}
            <span>{link.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ShareButtons;
