import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import { promises as fs } from "fs";
import path from "path";
import { Share_Tech_Mono } from "next/font/google";

const techMono = Share_Tech_Mono({
  subsets: ["latin"],
  weight: "400",
});

async function DocumentationPage() {
  const filePath = path.join(
    process.cwd(),
    "legal",
    "documentation-user-manual.md",
  );
  const source = await fs.readFile(filePath, "utf8");

  const { content, data } = matter(source);

  const { content: mdxContent } = await compileMDX({
    source: content,
    options: { parseFrontmatter: false },
  });

  return (
    <div className="bg-background text-foreground py-12 md:py-20">
      <div className="container mx-auto px-4">
        <article
          className={`
            prose prose-invert
            prose-headings:text-cyan-300 prose-headings:font-bold prose-headings:tracking-widest
            prose-h1:text-4xl prose-h1:md:text-5xl prose-h1:mb-8 prose-h1:border-b-2 prose-h1:border-cyan-700 prose-h1:pb-4
            prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-l-4 prose-h2:border-cyan-600 prose-h2:pl-4
            prose-p:text-gray-300 prose-p:leading-loose
            prose-a:text-teal-400 prose-a:underline hover:prose-a:text-teal-200 transition-colors
            prose-strong:text-cyan-200 prose-strong:font-bold
            prose-ul:list-disc prose-ul:pl-6 prose-li:text-gray-300
            prose-ol:list-decimal prose-ol:pl-6 prose-li:text-gray-300
            max-w-4xl mx-auto
            ${techMono.className}
          `}
        >
          <h1>{data.title}</h1>
          {mdxContent}
        </article>
      </div>
    </div>
  );
};

export default DocumentationPage;
