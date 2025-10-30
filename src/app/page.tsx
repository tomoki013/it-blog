import { getAllPosts } from "@/lib/posts";
import HeroSection from "@/components/pages/home/HeroSection";
import FeaturedTopicsSection from "@/components/pages/home/FeaturedTopicsSection";
import LatestArticlesSection from "@/components/pages/home/LatestArticlesSection";
import { Post } from "@/types/post";

const Home = async () => {
  const articles: Omit<Post, "content" | "headings">[] = await getAllPosts();

  return (
    <main className="min-h-screen relative">
      <HeroSection />
      <FeaturedTopicsSection />
      <LatestArticlesSection articles={articles} />
    </main>
  );
};

export default Home;
