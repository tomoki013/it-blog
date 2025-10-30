import { getPostBySlug } from "@/lib/posts";

const ArticlePage = async (props: { params: Promise<{ slug: string }> }) => {
  const params = await props.params;
  const article = await getPostBySlug(params.slug);

  if (!article) {
    return { notFound: true };
  }

  return <div>{article.frontmatter.title}</div>;
};

export default ArticlePage;
