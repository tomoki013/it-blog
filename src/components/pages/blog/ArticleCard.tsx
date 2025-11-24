import { Post } from "@/types/post";
import Image from "next/image";
import Link from "next/link";
import { FaRegClock } from "react-icons/fa6";

type Props = {
  post: Omit<Post, "content" | "headings">;
  orientation?: "vertical" | "horizontal";
  showImage?: boolean;
};

const ArticleCard = ({
  post,
  orientation = "vertical",
  showImage = true,
}: Props) => {
  const { slug, frontmatter } = post;
  const { title, date, image } = frontmatter;

  return (
    <Link
      href={`/blog/${slug}`}
      className={`group relative overflow-hidden rounded-xl bg-dark-card/50 backdrop-blur-sm border border-white/5 p-3 transition-all duration-300 ease-in-out hover:bg-white/5 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(0,240,255,0.1)]
      ${
        orientation === "vertical"
          ? "flex flex-col"
          : "flex flex-col sm:flex-row items-center gap-4"
      }`}
    >
      {showImage && image && (
        <div
          className={`relative overflow-hidden rounded-lg ${
            orientation === "vertical"
              ? "w-full h-40 mb-4"
              : "w-full sm:w-24 h-24 shrink-0"
          }`}
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
        </div>
      )}
      <div
        className={`flex flex-col justify-center ${
          showImage && orientation !== "vertical" ? "w-full" : "w-full"
        }`}
      >
        <h3 className="font-bold text-sm md:text-base text-text-primary group-hover:text-primary transition-colors duration-300 line-clamp-2 mb-2">
          {title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-text-secondary font-mono">
          <FaRegClock className="text-primary/70" />
          <time dateTime={date}>
            {new Date(date).toLocaleDateString("en-CA")}
          </time>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
