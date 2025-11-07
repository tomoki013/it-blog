import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { NewsFrontmatter, News, Heading } from "@/types/news";
import { serialize } from "next-mdx-remote/serialize";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import { slugify } from "./utils";

// 'posts/news-posts' ディレクトリへのパス
const newsDirectory = path.join(process.cwd(), "posts/news-posts");

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
 * すべてのニュースのメタデータ（Frontmatter）を日付の降順で取得します。
 * @returns {Promise<Omit<News, 'content' | 'headings'>[]>} ソート済みのニュースメタデータ配列
 */
export const getAllNews = async (limit?: number): Promise<Omit<News, "content" | "headings">[]> => {
  const fileNames = fs.readdirSync(newsDirectory);

  const allNewsData = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(newsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const matterResult = matter(fileContents);
      const frontmatter = matterResult.data as NewsFrontmatter;

      return {
        slug,
        frontmatter,
      };
    });

  // ニュースを日付でソート
  const sortedNews = allNewsData.sort((a, b) => {
    if (a.frontmatter.date < b.frontmatter.date) {
      return 1;
    } else {
      return -1;
    }
  });

  if (limit) {
    return sortedNews.slice(0, limit);
  }

  return sortedNews;
};

/**
 * 指定されたslugに基づいて単一のニュースデータを取得します。
 * MDXコンテンツはシリアライズされます。
 * @param {string} slug - ニュースのslug（ファイル名）
 * @returns {Promise<News | null>} ニュースデータ。見つからない場合はnull。
 */
export const getNewsBySlug = async (slug: string): Promise<News | null> => {
    const fullPath = path.join(newsDirectory, `${slug}.mdx`);
    if (fs.existsSync(fullPath)) {
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);
        const frontmatter = data as NewsFrontmatter;
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
    // ニュースが見つからなかった場合
    return null;
};


/**
 * すべてのニュースのslugを取得します。
 * これはgenerateStaticParamsで使用されます。
 * @returns {{ slug: string }[]}
 */
export const getAllNewsSlugs = () => {
  const fileNames = fs.readdirSync(newsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      return {
        slug: fileName.replace(/\.mdx$/, ""),
      };
    });
};
