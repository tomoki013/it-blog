"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const About = () => {
  const stats = [
    { label: "Articles Published", value: "500+" },
    { label: "Monthly Readers", value: "100K+" },
    { label: "Expert Writers", value: "50+" },
    { label: "Countries Reached", value: "120+" },
  ];

  const team = [
    {
      name: "Alex Johnson",
      role: "Editor in Chief",
      image: "/images/",
    },
    {
      name: "Sarah Chen",
      role: "Technical Editor",
      image: "/images/",
    },
    {
      name: "Marcus Rodriguez",
      role: "Lead Developer",
      image: "/images/",
    },
  ];

  return (
    <div className="min-h-screen pt-20 bg-background">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-black"
      >
        <motion.div
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 opacity-50 bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400"
        />
        <div className="relative z-10 text-white text-center max-w-4xl mx-auto px-4">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-bold mb-6"
          >
            About TechBlog
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl"
          >
            Dedicated to bringing you the latest insights in technology
          </motion.p>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="text-4xl font-bold mb-2"
                >
                  {stat.value}
                </motion.div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-center mb-12"
          >
            Meet Our Team
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-card rounded-xl p-6 text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden"
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
