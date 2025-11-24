import BlogList from "@/components/pages/blog/BlogList";
import { getAllPosts } from "@/lib/posts";

export default async function BlogPage() {
  const posts = await getAllPosts();
  return <BlogList posts={posts} />;
}
