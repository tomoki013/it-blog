import { Post } from "@/types/post";
import ArticleHeader from "./ArticleHeader";
import TableOfContents from "./TableOfContents";
import ArticleLoader from "./ArticleLoader";
import { MDXRemoteProps } from "next-mdx-remote";

type Props = {
  article: Post;
};

const ArticleDetail = ({ article }: Props) => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-4 lg:gap-12">
        {/* Mobile ToC */}
        <div className="lg:hidden">
          <TableOfContents headings={article.headings} />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <ArticleHeader frontmatter={article.frontmatter} />
          {article.source && (
            <ArticleLoader source={article.source as MDXRemoteProps} />
          )}
        </div>

        {/* Desktop ToC */}
        <div className="hidden lg:block lg:col-span-1">
          <TableOfContents headings={article.headings} />
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
