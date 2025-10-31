import AboutClientContent from "@/components/pages/about/AboutClientContent";

const AboutPage = () => {
  const stats = [
    { label: "Development Style", value: "AI-Driven" },
    { label: "Framework", value: "Next.js v16" },
    { label: "UI Library", value: "React v19" },
    { label: "Styling", value: "Tailwind CSS v4" },
  ];

  const techStack = [
    { name: "Next.js", version: "16.0.1" },
    { name: "React", version: "19.2.0" },
    { name: "Tailwind CSS", version: "v4" },
    { name: "Framer Motion", version: "12.23.24" },
    { name: "TypeScript", version: "v5" },
    { name: "next-mdx-remote", version: "5.0.0" },
  ];

  return (
    <div className="min-h-screen pt-20 bg-background">
      <AboutClientContent stats={stats} techStack={techStack} />
    </div>
  );
};

export default AboutPage;
