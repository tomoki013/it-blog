"use client";

import { MDXRemote, MDXRemoteProps } from "next-mdx-remote";
import { slugify } from "@/lib/utils"; // Assuming slugify is moved to utils

const CustomH2 = ({ children }: { children?: React.ReactNode }) => {
  const text = typeof children === 'string' ? children : '';
  const slug = slugify(text);
  return <h2 id={slug}>{children}</h2>;
};

const CustomH3 = ({ children }: { children?: React.ReactNode }) => {
  const text = typeof children === 'string' ? children : '';
  const slug = slugify(text);
  return <h3 id={slug}>{children}</h3>;
};

const components = {
  h2: CustomH2,
  h3: CustomH3,
};

const ArticleBody = (props: MDXRemoteProps) => {
  return (
    <div className="prose max-w-none prose-p:text-[var(--color-text-light)] prose-headings:text-[var(--color-primary)] prose-a:text-[var(--color-secondary)] prose-strong:text-[var(--color-text-light)] prose-blockquote:text-[var(--color-text-muted)] prose-code:text-[var(--color-secondary)] dark:prose-p:text-[var(--color-text-light)] dark:prose-headings:text-[var(--color-primary)] dark:prose-a:text-[var(--color-secondary)] dark:prose-strong:text-[var(--color-text-light)] dark:prose-blockquote:text-[var(--color-text-muted)] dark:prose-code:text-[var(--color-secondary)]">
      <MDXRemote {...props} components={{...components, ...(props.components || {})}} />
    </div>
  );
};

export default ArticleBody;
