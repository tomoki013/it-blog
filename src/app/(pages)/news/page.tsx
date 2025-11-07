import NewsArticleList from "@/components/pages/news/NewsArticleList";
import { getAllNews } from "@/lib/news";

export default async function NewsPage() {
  const news = await getAllNews();
  return <NewsArticleList news={news} />;
}
