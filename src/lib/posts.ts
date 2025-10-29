import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Frontmatter, Post } from "@/types/post";

// postsディレクトリへのパス
const postsDirectory = path.join(process.cwd(), "posts");

/**
 * すべての記事のメタデータ（Frontmatter）を日付の降順で取得します。
 * @returns {Promise<Omit<Post, 'content'>[]>} ソート済みの記事メタデータ配列
 */
export const getAllPosts = async (): Promise<Omit<Post, "content">[]> => {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      // ファイル名から '.mdx' を削除してslugを取得
      const slug = fileName.replace(/\.mdx$/, "");

      // Markdownファイルを文字列として読み込む
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // gray-matterでfrontmatterをパース
      const matterResult = matter(fileContents);
      const frontmatter = matterResult.data as Frontmatter;

      return {
        slug,
        frontmatter,
      };
    });

  // 記事を日付でソート
  return allPostsData.sort((a, b) => {
    if (a.frontmatter.date < b.frontmatter.date) {
      return 1;
    } else {
      return -1;
    }
  });
};

/**
 * 指定されたslugに基づいて単一の記事データを取得します。
 * @param {string} slug - 記事のslug（ファイル名）
 * @returns {Promise<Post>} 記事のFrontmatter、slug、および本文コンテンツ
 */
export const getPostBySlug = async (slug: string): Promise<Post> => {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // gray-matterでfrontmatterと本文をパース
  const matterResult = matter(fileContents);
  const frontmatter = matterResult.data as Frontmatter;

  return {
    slug,
    frontmatter,
    content: matterResult.content,
  };
};

/**
 * すべての記事のslugを取得します。
 * これはgetStaticPathsで使用されます。
 * @returns {{ params: { slug: string } }[]}
 */
export const getAllPostSlugs = () => {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      return {
        params: {
          slug: fileName.replace(/\.mdx$/, ""),
        },
      };
    });
};
