import { Post } from "@/types/post";
import ArticleCard from "./ArticleCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

type Props = {
  prevPost: Omit<Post, "content" | "headings"> | null;
  nextPost: Omit<Post, "content" | "headings"> | null;
};

const PostNavigation = ({ prevPost, nextPost }: Props) => {
  return (
    <div className="mt-12 pt-8 border-t border-white/10">
      <h2 className="text-xl font-bold text-cyan-400 mb-4 text-center">
        他の記事も読む
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="text-center">
          {prevPost ? (
            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center justify-center gap-2">
                <FaArrowLeft />
                前の記事
              </h3>
              <ArticleCard post={prevPost} orientation="vertical" />
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              前の記事はありません
            </div>
          )}
        </div>
        <div className="text-center">
          {nextPost ? (
            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center justify-center gap-2">
                次の記事
                <FaArrowRight />
              </h3>
              <ArticleCard post={nextPost} orientation="vertical" />
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              次の記事はありません
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostNavigation;
