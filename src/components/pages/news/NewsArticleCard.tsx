import { News } from "@/types/news";
import Link from "next/link";
import { FaRegClock } from "react-icons/fa6";

type Props = {
  news: Omit<News, "content" | "headings">;
};

const NewsArticleCard = ({ news }: Props) => {
  const { slug, frontmatter } = news;
  const { title, date } = frontmatter;

  return (
    <Link
      href={`/news/${slug}`}
      className="group relative block overflow-hidden rounded-md bg-white/5 p-4 transition-all duration-300 ease-in-out hover:bg-white/10 border border-transparent hover:border-cyan-400/50"
    >
      <div className="flex flex-col justify-center w-full">
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

export default NewsArticleCard;
