import { MDXRemoteProps } from 'next-mdx-remote';

export type NewsFrontmatter = {
  id: string;
  date: string;
  title: string;
  link: string;
  tags: string[];
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
