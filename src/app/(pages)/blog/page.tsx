import LatestArticlesSection from "@/components/pages/home/LatestArticlesSection";
import { getAllPosts } from "@/lib/posts";

export default async function BlogPage() {
  const posts = await getAllPosts();
  return <LatestArticlesSection articles={posts} />;
}
