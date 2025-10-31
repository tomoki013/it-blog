import { Post } from "@/types/post";
import Image from "next/image";
import Link from "next/link";
import { FaRegClock } from "react-icons/fa6";

type Props = {
  post: Omit<Post, "content" | "headings">;
  orientation?: "vertical" | "horizontal";
};

const ArticleCard = ({ post, orientation = "vertical" }: Props) => {
  const { slug, frontmatter } = post;
  const { title, date, image } = frontmatter;

  return (
    <Link
      href={`/blog/${slug}`}
      className={`group overflow-hidden rounded-lg bg-white bg-opacity-5 border border-white border-opacity-10 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-opacity-30 hover:shadow-cyan-400/10 ${
        orientation === "vertical"
          ? "flex flex-col"
          : "flex flex-col sm:flex-row items-center gap-4"
      }`}
    >
      <div
        className={`relative ${
          orientation === "vertical"
            ? "w-full h-40"
            : "w-full sm:w-1/3 h-40 sm:h-full"
        }`}
      >
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <div
        className={`p-4 ${
          orientation === "vertical" ? "w-full" : "w-full sm:w-2/3"
        }`}
      >
        <h3 className="font-bold text-lg text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">
          {title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-400 mt-2">
          <FaRegClock />
          <time dateTime={date}>{new Date(date).toLocaleDateString("ja-JP")}</time>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
