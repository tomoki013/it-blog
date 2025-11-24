import { Post } from "@/types/post";
import ArticleCard from "./ArticleCard";

type Props = {
  posts: Omit<Post, "content" | "headings">[];
};

const RecentPosts = ({ posts }: Props) => {
  return (
    <div className="space-y-4">
      <h2 className="font-display text-lg font-bold text-primary border-b border-primary/30 pb-2 flex items-center gap-2">
        <span className="text-xs font-mono text-primary/50">02.</span>
        LATEST LOGS
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
