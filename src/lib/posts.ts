// import fs from "fs";
// import path from "path";
// import matter from "gray-matter";

// const postsDirectory = path.join(process.cwd(), "posts");

// TODO: Implement actual data fetching from markdown files
export const getLatestPosts = async () => {
  // For now, return the same dummy data
  return [
    {
      slug: "future-of-web-development-2025",
      image: "/images/placeholder-1.jpg",
      category: "Development",
      title: "The Future of Web Development in 2025",
      excerpt: "Exploring upcoming trends and technologies shaping the web",
    },
    {
      slug: "understanding-large-language-models",
      image: "/images/placeholder-2.jpg",
      category: "AI & ML",
      title: "Understanding Large Language Models",
      excerpt: "A deep dive into the technology behind AI language models",
    },
    {
      slug: "kubernetes-best-practices",
      image: "/images/placeholder-3.jpg",
      category: "DevOps",
      title: "Kubernetes Best Practices",
      excerpt: "Essential tips for managing container orchestration",
    },
  ];
};

export type Post = {
  slug: string;
  image: string;
  category: string;
  title: string;
  excerpt: string;
};
