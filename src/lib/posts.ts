import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Frontmatter, Post, Heading } from "@/types/post";
import { serialize } from "next-mdx-remote/serialize";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import { slugify } from "./utils";

// 'posts' ディレクトリへのベースパス
const postsRootDirectory = path.join(process.cwd(), "posts");

/**
 * it-blog.config.jsonから記事ディレクトリのリストを取得します。
 * @returns {string[]} 記事が格納されているディレクトリ名の配列
 */
const getPostDirectories = (): string[] => {
  const configPath = path.join(postsRootDirectory, "it-blog.config.json");
  try {
    const configFile = fs.readFileSync(configPath, "utf8");
    const config = JSON.parse(configFile);
    // 設定ファイルに "directories" があり、それが配列であることを確認
    if (config.directories && Array.isArray(config.directories)) {
      return config.directories;
    }
    return [];
  } catch (error) {
    console.error("it-blog.config.jsonの読み込みまたは解析に失敗しました。", error);
    // 設定ファイルが読めない場合は空の配列を返す
    return [];
  }
};
/**
 * MDXコンテンツから見出しを抽出します。
 * @param {string} content - MDXコンテンツの文字列
 * @returns {Heading[]} 抽出された見出しの配列
 */
const extractHeadings = (content: string): Heading[] => {
    const headings: Heading[] = [];
    const lines = content.split('\n');
    for (const line of lines) {
        const match = line.match(/^(##+)\s+(.*)/);
        if (match) {
            const level = match[1].length;
            const text = match[2];
            const slug = slugify(text);
            headings.push({ level, text, slug });
        }
    }
    return headings;
};
/**
 * すべての記事のメタデータ（Frontmatter）を日付の降順で取得します。
 * @returns {Promise<Omit<Post, 'content'>[]>} ソート済みの記事メタデータ配列
 */
export const getAllPosts = async (limit?: number): Promise<Omit<Post, "content" | "headings">[]> => {
  const postDirs = getPostDirectories();
  const allPostsData = postDirs.flatMap((dir) => {
    const absoluteDir = path.join(postsRootDirectory, dir);
    // ディレクトリが存在するか確認
    if (!fs.existsSync(absoluteDir)) {
      return [];
    }
    const fileNames = fs.readdirSync(absoluteDir);

    return fileNames
      .filter((fileName) => fileName.endsWith(".mdx"))
      .map((fileName) => {
        const slug = fileName.replace(/\.mdx$/, "");
        const fullPath = path.join(absoluteDir, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const matterResult = matter(fileContents);
        const frontmatter = matterResult.data as Frontmatter;

        return {
          slug,
          frontmatter,
        };
      });
  });

  // 記事を日付でソート
  const sortedPosts = allPostsData.sort((a, b) => {
    if (a.frontmatter.date < b.frontmatter.date) {
      return 1;
    } else {
      return -1;
    }
  });

  if (limit) {
    return sortedPosts.slice(0, limit);
  }

  return sortedPosts;
};

/**
 * 指定されたslugに基づいて単一の記事データを取得します。
 * MDXコンテンツはシリアライズされます。
 * @param {string} slug - 記事のslug（ファイル名）
 * @returns {Promise<Post | null>} 記事データ。見つからない場合はnull。
 */
export const getPostBySlug = async (slug: string): Promise<Post | null> => {
    const postDirs = getPostDirectories();
    for (const dir of postDirs) {
        const fullPath = path.join(postsRootDirectory, dir, `${slug}.mdx`);
        if (fs.existsSync(fullPath)) {
            const fileContents = fs.readFileSync(fullPath, "utf8");
            const { data, content } = matter(fileContents);
            const frontmatter = data as Frontmatter;
            const headings = extractHeadings(content);
            const mdxSource = await serialize(content, {
                mdxOptions: {
                    rehypePlugins: [
                        rehypeSlug,
                        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
                        [rehypePrettyCode, { theme: 'one-dark-pro' }],
                    ],
                },
                parseFrontmatter: false,
            });

            return {
                slug,
                frontmatter,
                content, // raw content
                headings,
                source: mdxSource, // serialized content
            };
        }
    }
    // どのディレクトリにも記事が見つからなかった場合
    return null;
};


/**
 * すべての記事のslugを取得します。
 * これはgenerateStaticParamsで使用されます。
 * @returns {{ slug: string }[]}
 */
export const getAllPostSlugs = () => {
  const postDirs = getPostDirectories();
  const allSlugs = postDirs.flatMap((dir) => {
    const absoluteDir = path.join(postsRootDirectory, dir);
     if (!fs.existsSync(absoluteDir)) {
      return [];
    }
    const fileNames = fs.readdirSync(absoluteDir);
    return fileNames
      .filter((fileName) => fileName.endsWith(".mdx"))
      .map((fileName) => {
        return {
          slug: fileName.replace(/\.mdx$/, ""),
        };
      });
  });
  return allSlugs;
};

/**
 * 現在の記事の前後の記事を取得します。
 * @param {string} slug - 現在の記事のslug
 * @returns {Promise<{prevPost: Omit<Post, 'content' | 'headings'> | null, nextPost: Omit<Post, 'content' | 'headings'> | null}>}
 */
export const getAdjacentPosts = async (slug: string): Promise<{
  prevPost: Omit<Post, 'content' | 'headings'> | null;
  nextPost: Omit<Post, 'content' | 'headings'> | null;
}> => {
  const allPosts = await getAllPosts();
  const currentIndex = allPosts.findIndex((post) => post.slug === slug);

  if (currentIndex === -1) {
    return { prevPost: null, nextPost: null };
  }

  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return { prevPost, nextPost };
};

/**
 * 検索用にすべての記事のデータを取得します。
 * slug, frontmatter, content を含みます。
 * @returns {Promise<Pick<Post, 'slug' | 'frontmatter' | 'content'>[]>}
 */
export const getAllPostsForSearch = async (): Promise<Pick<Post, 'slug' | 'frontmatter' | 'content'>[]> => {
  const postDirs = getPostDirectories();
  const allPostsData = postDirs.flatMap((dir) => {
    const absoluteDir = path.join(postsRootDirectory, dir);
    if (!fs.existsSync(absoluteDir)) {
      return [];
    }
    const fileNames = fs.readdirSync(absoluteDir);

    return fileNames
      .filter((fileName) => fileName.endsWith(".mdx"))
      .map((fileName) => {
        const slug = fileName.replace(/\.mdx$/, "");
        const fullPath = path.join(absoluteDir, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);
        const frontmatter = data as Frontmatter;

        return {
          slug,
          frontmatter,
          content,
        };
      });
  });

  // 日付でソート
  return allPostsData.sort((a, b) => {
    if (a.frontmatter.date < b.frontmatter.date) {
      return 1;
    } else {
      return -1;
    }
  });
};
