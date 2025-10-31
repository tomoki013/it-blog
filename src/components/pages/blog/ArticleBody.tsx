"use client";

import { MDXRemote, MDXRemoteProps } from "next-mdx-remote";
import { slugify } from "@/lib/utils"; // Assuming slugify is moved to utils
import ExternalLinkCard from "@/components/features/ExternalLinkCard";

const CustomH2 = ({ children }: { children?: React.ReactNode }) => {
  const text = typeof children === "string" ? children : "";
  const slug = slugify(text);
  return <h2 id={slug}>{children}</h2>;
};

const CustomH3 = ({ children }: { children?: React.ReactNode }) => {
  const text = typeof children === "string" ? children : "";
  const slug = slugify(text);
  return <h3 id={slug}>{children}</h3>;
};

const components = {
  h2: CustomH2,
  h3: CustomH3,
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
