"use server";

import { getAllPostsForSearch } from "@/lib/posts";
import { Post } from "@/types/post";

export type SearchResult = Pick<Post, "slug" | "frontmatter">;

export const searchPostsAction = async (
  query: string
): Promise<SearchResult[]> => {
  if (!query || query.trim() === "") {
    return [];
  }

  const allPosts = await getAllPostsForSearch();

  const lowerCaseQuery = query.toLowerCase();

  const searchResults = allPosts.filter((post) => {
    const titleMatch = post.frontmatter.title.toLowerCase().includes(lowerCaseQuery);
    const excerptMatch = post.frontmatter.excerpt.toLowerCase().includes(lowerCaseQuery);
    const contentMatch = post.content.toLowerCase().includes(lowerCaseQuery);
    const tagMatch = post.frontmatter.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery));


    return titleMatch || excerptMatch || contentMatch || tagMatch;
  });

  // 返すデータをフロントマターとスラグに限定する
  return searchResults.map(({ slug, frontmatter }) => ({
    slug,
    frontmatter,
  }));
};
