"use client";

import { MDXRemote, MDXRemoteProps } from "next-mdx-remote";
import ExternalLinkCard from "@/components/features/ExternalLinkCard";

const components = {
  ExternalLinkCard,
};

const ArticleBody = (props: MDXRemoteProps) => {
  return (
    <div
      className="prose max-w-none dark:prose-invert
        prose-li:marker:text-[var(--color-text-muted)]
        prose-headings:text-[var(--color-primary)]
        prose-a:text-[var(--color-secondary)]
        prose-blockquote:text-[var(--color-text-muted)]
        prose-code:text-[var(--color-secondary)]
      "
    >
      <MDXRemote
        {...props}
        components={{ ...components, ...(props.components || {}) }}
      />
    </div>
  );
};

export default ArticleBody;
