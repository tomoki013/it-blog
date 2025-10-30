import { MDXRemoteProps } from 'next-mdx-remote';

export type Frontmatter = {
  title: string;
  date: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  tags: string[];
};

export type Heading = {
  level: number;
  text: string;
  slug: string;
};

export type Post = {
  frontmatter: Frontmatter;
  slug: string;
  content: string;
  headings: Heading[];
  source?: MDXRemoteProps;
};
