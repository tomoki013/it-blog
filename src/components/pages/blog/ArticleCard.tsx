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
      className={`group relative overflow-hidden rounded-md bg-white/5 p-4 transition-all duration-300 ease-in-out hover:bg-white/10 border border-transparent hover:border-cyan-400/50
      ${
        orientation === "vertical"
          ? "flex flex-col"
          : "flex flex-col sm:flex-row items-center gap-4"
      }`}
    >
      {showImage && image && (
        <div
          className={`relative ${
            orientation === "vertical"
              ? "w-full h-40 mb-4"
              : "w-full sm:w-1/3 h-24 sm:h-full"
          }`}
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div
        className={`flex flex-col justify-center ${
          showImage && orientation !== "vertical" ? "w-full sm:w-2/3" : "w-full"
        }`}
      >
        <h3 className="font-bold text-md text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">
          {title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
          <FaRegClock />
          <time dateTime={date}>
            {new Date(date).toLocaleDateString("ja-JP")}
          </time>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
