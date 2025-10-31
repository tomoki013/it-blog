import { Post } from "@/types/post";
import ArticleHeader from "./ArticleHeader";
import TableOfContents from "./TableOfContents";
import ArticleLoader from "./ArticleLoader";
import RecentPosts from "./RecentPosts";
import PostNavigation from "./PostNavigation";
import ShareButtons from "./ShareButtons";
import { MDXRemoteProps } from "next-mdx-remote";

type Props = {
  article: Post;
  recentPosts: Omit<Post, "content" | "headings">[];
  prevPost: Omit<Post, "content" | "headings"> | null;
  nextPost: Omit<Post, "content" | "headings"> | null;
};

const ArticleDetail = ({ article, recentPosts, prevPost, nextPost }: Props) => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-4 lg:gap-12">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <ArticleHeader frontmatter={article.frontmatter} />

          {/* Mobile ToC */}
          <div className="lg:hidden my-8">
            <TableOfContents headings={article.headings} />
          </div>

          {article.source && (
            <ArticleLoader source={article.source as MDXRemoteProps} />
          )}

          <ShareButtons title={article.frontmatter.title} />
          <PostNavigation prevPost={prevPost} nextPost={nextPost} />

          {/* Mobile Recent Posts */}
          <div className="lg:hidden mt-12">
            <RecentPosts posts={recentPosts} />
          </div>
        </div>

        {/* Desktop Sidebar */}
        <aside className="hidden lg:block lg:col-span-1 space-y-8">
          <div className="sticky top-24">
            <TableOfContents headings={article.headings} />
            <div className="mt-8">
              <RecentPosts posts={recentPosts} />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ArticleDetail;
