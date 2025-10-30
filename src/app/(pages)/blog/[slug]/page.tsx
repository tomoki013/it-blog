import ArticleDetail from "@/components/pages/blog/ArticleDetail";
import { getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";

const ArticlePage = async (props: { params: Promise<{ slug: string }> }) => {
  const params = await props.params;
  const article = await getPostBySlug(params.slug);

  if (!article) {
    notFound();
  }

  return <ArticleDetail article={article} />;
};

export default ArticlePage;
