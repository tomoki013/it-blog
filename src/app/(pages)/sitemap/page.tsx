import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "サイトマップ",
  description: "ともきちのエンジニア成長記のサイトマップです。すべてのページと記事へのリンクを網羅しています。",
};

async function SitemapContents() {
  const allPosts = await getAllPosts();

  const staticPages = [
    { title: "ホーム", href: "/" },
    { title: "このブログについて", href: "/about" },
    { title: "すべての記事", href: "/blog" },
    { title: "ドキュメント", href: "/documentation" },
    { title: "ソーシャル", href: "/social" },
    { title: "経歴", href: "/careers" },
    { title: "お問い合わせ", href: "/contact" },
  ];

  const legalPages = [
    { title: "プライバシーポリシー", href: "/privacy-policy" },
    { title: "利用規約", href: "/terms-of-service" },
    { title: "クッキーポリシー", href: "/cookie-policy" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-primary tracking-tighter mb-4 glitch">
          サイトマップ
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
          このサイトのすべてのコンテンツへの道しるべ。
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Static Pages */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-cyan-400 border-b-2 border-cyan-400/50 pb-2">
            主要ページ
          </h2>
          <ul className="space-y-3">
            {staticPages.map((page) => (
              <li key={page.href}>
                <Link href={page.href} className="text-foreground hover:text-primary transition-colors duration-300 text-lg hover:underline underline-offset-4 decoration-primary decoration-2">
                    {page.title}
                </Link>
              </li>
            ))}
          </ul>
            <h2 className="text-2xl font-bold text-cyan-400 border-b-2 border-cyan-400/50 pb-2 pt-8">
            規約など
          </h2>
          <ul className="space-y-3">
            {legalPages.map((page) => (
              <li key={page.href}>
                <Link href={page.href} className="text-foreground hover:text-primary transition-colors duration-300 text-lg hover:underline underline-offset-4 decoration-primary decoration-2">
                    {page.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Blog Posts */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-cyan-400 border-b-2 border-cyan-400/50 pb-2">
            すべての記事
          </h2>
          <ul className="space-y-3 columns-1 sm:columns-2">
            {allPosts.map((post) => (
              <li key={post.slug} className="break-inside-avoid">
                <Link href={`/blog/${post.slug}`} className="text-foreground hover:text-primary transition-colors duration-300 text-lg hover:underline underline-offset-4 decoration-primary decoration-2">
                    {post.frontmatter.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

const SitemapPage = () => {
  return (
    <main className="min-h-screen pt-24 sm:pt-32">
      <SitemapContents />
    </main>
  );
};

export default SitemapPage;
