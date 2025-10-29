import { getAllPosts } from "@/lib/posts";
import HeroSection from "@/components/pages/home/HeroSection";
import FeaturedTopicsSection from "@/components/pages/home/FeaturedTopicsSection";
import LatestArticlesSection from "@/components/pages/home/LatestArticlesSection";
import { Post } from "@/types/post";

const Home = async () => {
  const latestArticles: Omit<Post, "content">[] = await getAllPosts();

  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <FeaturedTopicsSection />
      <LatestArticlesSection articles={latestArticles} />
    </main>
  );
};

export default Home;
