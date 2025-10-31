"use client";

import { Heading, Post } from "@/types/post";
import TableOfContents from "./TableOfContents";
import RecentPosts from "./RecentPosts";

type Props = {
  headings: Heading[];
  posts: Omit<Post, "content" | "headings">[];
};

const Sidebar = ({ headings, posts }: Props) => {
  return (
    <aside className="hidden lg:block lg:col-span-1">
      <div className="sticky top-24 space-y-8 max-h-[calc(100vh-6rem)] overflow-y-auto pr-4 py-4">
        <TableOfContents headings={headings} />
        <RecentPosts posts={posts} />
      </div>
    </aside>
  );
};

export default Sidebar;
