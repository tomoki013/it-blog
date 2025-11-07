import { use } from "react";
import NewsArticleDetail from "@/components/pages/news/NewsArticleDetail";
import { getNewsBySlug, getAllNewsSlugs } from "@/lib/news";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  const slugs = getAllNewsSlugs();
  return slugs;
}

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

// 非同期処理を担う新しいコンポーネント
async function NewsArticleContent({ slug }: { slug: string }) {
  const article = await getNewsBySlug(slug);

  if (!article) {
    notFound();
  }

  return <NewsArticleDetail article={article} />;
}

// ページコンポーネントは同期的にする
const NewsArticlePage = ({ params }: Props) => {
  const resolvedParams = use(params);
  return <NewsArticleContent slug={resolvedParams.slug} />;
};

export default NewsArticlePage;
