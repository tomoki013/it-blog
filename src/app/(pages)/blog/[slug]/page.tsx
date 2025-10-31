import ArticleDetail from "@/components/pages/blog/ArticleDetail";
import { getAllPosts, getPostBySlug, getAdjacentPosts } from "@/lib/posts";
import { notFound } from "next/navigation";

const ArticlePage = async (props: { params: Promise<{ slug: string }> }) => {
  const params = await props.params;
  const article = await getPostBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const { prevPost, nextPost } = await getAdjacentPosts(params.slug);
  const recentPosts = await getAllPosts();

  return (
    <ArticleDetail
      article={article}
      recentPosts={recentPosts}
      prevPost={prevPost}
      nextPost={nextPost}
    />
  );
};

export default ArticlePage;
