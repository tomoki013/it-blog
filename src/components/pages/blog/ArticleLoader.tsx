"use client";

import dynamic from "next/dynamic";
import { MDXRemoteProps } from "next-mdx-remote";

const ArticleBody = dynamic(() => import("./ArticleBody"), { ssr: false });

type Props = {
  source: MDXRemoteProps;
};

const ArticleLoader = ({ source }: Props) => {
  return <ArticleBody {...source} />;
};

export default ArticleLoader;
