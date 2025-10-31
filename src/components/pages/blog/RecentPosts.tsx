import { Post } from "@/types/post";
import ArticleCard from "./ArticleCard";

type Props = {
  posts: Omit<Post, "content" | "headings">[];
};

const RecentPosts = ({ posts }: Props) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-cyan-400 border-b-2 border-cyan-400/50 pb-2">
        最新の記事
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {posts.slice(0, 3).map((post) => (
          <ArticleCard key={post.slug} post={post} orientation="horizontal" />
        ))}
      </div>
    </div>
  );
};

export default RecentPosts;
