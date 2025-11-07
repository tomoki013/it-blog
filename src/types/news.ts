import { MDXRemoteProps } from 'next-mdx-remote';

export type NewsFrontmatter = {
  title: string;
  date: string;
  description: string;
  category: string;
};

export type Heading = {
  level: number;
  text: string;
  slug: string;
};

export type News = {
  frontmatter: NewsFrontmatter;
  slug: string;
  content: string;
  headings: Heading[];
  source?: MDXRemoteProps;
};
