import { getLatestPosts, Post } from "@/lib/posts";
import HeroSection from "@/components/pages/home/HeroSection";
import FeaturedTopicsSection from "@/components/pages/home/FeaturedTopicsSection";
import LatestArticlesSection from "@/components/pages/home/LatestArticlesSection";

const Home = async () => {
  const latestArticles: Post[] = await getLatestPosts();

  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <FeaturedTopicsSection />
      <LatestArticlesSection articles={latestArticles} />
    </main>
  );
};

export default Home;
