import { use } from "react";
import ArticleDetail from "@/components/pages/blog/ArticleDetail";
import {
  getAllPosts,
  getPostBySlug,
  getAdjacentPosts,
  getAllPostSlugs,
} from "@/lib/posts";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs;
}

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

// 非同期処理を担う新しいコンポーネント
async function ArticleContent({ slug }: { slug: string }) {
  const article = await getPostBySlug(slug);

  if (!article) {
    notFound();
  }

  const { prevPost, nextPost } = await getAdjacentPosts(slug);
  const recentPosts = await getAllPosts();

  return (
    <ArticleDetail
      article={article}
      recentPosts={recentPosts}
      prevPost={prevPost}
      nextPost={nextPost}
    />
  );
}

// ページコンポーネントは同期的にする
const ArticlePage = ({ params }: Props) => {
  const resolvedParams = use(params);
  return <ArticleContent slug={resolvedParams.slug} />;
};

export default ArticlePage;
