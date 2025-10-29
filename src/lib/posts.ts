import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Frontmatter, Post } from "@/types/post";

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
 * すべての記事のメタデータ（Frontmatter）を日付の降順で取得します。
 * @returns {Promise<Omit<Post, 'content'>[]>} ソート済みの記事メタデータ配列
 */
export const getAllPosts = async (): Promise<Omit<Post, "content">[]> => {
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
 * @returns {Promise<Post | null>} 記事データ。見つからない場合はnull。
 */
export const getPostBySlug = async (slug: string): Promise<Post | null> => {
    const postDirs = getPostDirectories();
    for (const dir of postDirs) {
        const fullPath = path.join(postsRootDirectory, dir, `${slug}.mdx`);
        if (fs.existsSync(fullPath)) {
            const fileContents = fs.readFileSync(fullPath, "utf8");
            const matterResult = matter(fileContents);
            const frontmatter = matterResult.data as Frontmatter;

            return {
                slug,
                frontmatter,
                content: matterResult.content,
            };
        }
    }
    // どのディレクトリにも記事が見つからなかった場合
    return null;
};


/**
 * すべての記事のslugを取得します。
 * これはgetStaticPathsで使用されます。
 * @returns {{ params: { slug: string } }[]}
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
          params: {
            slug: fileName.replace(/\.mdx$/, ""),
          },
        };
      });
  });
  return allSlugs;
};
