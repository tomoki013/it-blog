export type Frontmatter = {
  title: string;
  date: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  tags: string[];
};

export type Post = {
  frontmatter: Frontmatter;
  slug: string;
  content: string;
};
