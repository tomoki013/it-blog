import { getAllPosts } from "@/lib/posts";
import { getAllNews } from "@/lib/news";
import HeroSection from "@/components/pages/home/HeroSection";
import FeaturedTopicsSection from "@/components/pages/home/FeaturedTopicsSection";
import LatestNewsSection from "@/components/pages/home/LatestNewsSection";
import LatestArticlesSection from "@/components/pages/home/LatestArticlesSection";
import { Post } from "@/types/post";
import { News } from "@/types/news";

const Home = async () => {
  const articles: Omit<Post, "content" | "headings">[] = await getAllPosts(6);
  const news: Omit<News, "content" | "headings">[] = await getAllNews(5);

  return (
    <div className="min-h-screen relative">
      <HeroSection />
      <FeaturedTopicsSection />
      <LatestNewsSection news={news} />
      <LatestArticlesSection articles={articles} />
    </div>
  );
};

export default Home;
