import { Post } from "@/types/post";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

type Props = {
  prevPost: Omit<Post, "content" | "headings"> | null;
  nextPost: Omit<Post, "content" | "headings"> | null;
};

const PostNavigation = ({ prevPost, nextPost }: Props) => {
  const navLinkClasses =
    "group flex items-center justify-between p-4 rounded-md bg-white/5 transition-all duration-300 ease-in-out hover:bg-white/10 border border-transparent hover:border-cyan-400/50";
  const textContainer = "flex flex-col";
  const labelClasses = "text-sm text-gray-400";
  const titleClasses =
    "font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300";
  const iconClasses =
    "text-cyan-400 transition-transform duration-300 ease-in-out";

  return (
    <div className="mt-12 pt-8 border-t border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          {prevPost ? (
            <Link href={`/blog/${prevPost.slug}`} className={navLinkClasses}>
              <FaArrowLeft
                className={`${iconClasses} group-hover:-translate-x-1`}
              />
              <div className={`${textContainer} text-right`}>
                <span className={labelClasses}>前の記事</span>
                <span className={titleClasses}>
                  {prevPost.frontmatter.title}
                </span>
              </div>
            </Link>
          ) : (
            <div className="text-center p-4 text-gray-500">前の記事はありません</div>
          )}
        </div>
        <div>
          {nextPost ? (
            <Link href={`/blog/${nextPost.slug}`} className={navLinkClasses}>
              <div className={`${textContainer} text-left`}>
                <span className={labelClasses}>次の記事</span>
                <span className={titleClasses}>
                  {nextPost.frontmatter.title}
                </span>
              </div>
              <FaArrowRight
                className={`${iconClasses} group-hover:translate-x-1`}
              />
            </Link>
          ) : (
            <div className="text-center p-4 text-gray-500">次の記事はありません</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostNavigation;
