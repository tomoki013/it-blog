import { NextPage } from "next";
import { Share_Tech_Mono } from "next/font/google";

const techMono = Share_Tech_Mono({
  subsets: ["latin"],
  weight: "400",
});

const CareersPage: NextPage = () => {
  return (
    <div className={`min-h-screen pt-20 bg-[var(--color-light-bg)] dark:bg-[var(--color-dark-bg)] text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] ${techMono.className}`}>
      <header className="relative h-[40vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 opacity-50 bg-gradient-to-r from-green-400 via-cyan-500 to-blue-600" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 text-white">
          <h1 className="text-5xl font-bold mb-6 glitch" data-text="Join Our Team">
            Join Our Team
          </h1>
          <p className="text-xl">
            We are looking for talented individuals to help us shape the future of technology.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-16">
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 glitch" data-text="Open Positions">
            Open Positions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Position 1 */}
            <div className="border border-cyan-500 rounded-lg p-6 shadow-[0_0_15px_rgba(0,255,255,0.7)] bg-[var(--color-light-bg-secondary)] dark:bg-[var(--color-dark-bg-secondary)]">
              <h3 className="text-2xl font-bold mb-4">Frontend Developer</h3>
              <p className="text-gray-400 mb-4">
                We are looking for a skilled Frontend Developer to join our team...
              </p>
              <a href="/" className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-black font-bold">
                Apply Now
              </a>
            </div>

            {/* Position 2 */}
            <div className="border border-purple-500 rounded-lg p-6 shadow-[0_0_15px_rgba(128,0,128,0.7)] bg-[var(--color-light-bg-secondary)] dark:bg-[var(--color-dark-bg-secondary)]">
              <h3 className="text-2xl font-bold mb-4">Backend Developer</h3>
              <p className="text-gray-400 mb-4">
                We are seeking a Backend Developer to manage the server-side...
              </p>
              <a href="/" className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-black font-bold">
                Apply Now
              </a>
            </div>

            {/* Position 3 */}
            <div className="border border-green-500 rounded-lg p-6 shadow-[0_0_15px_rgba(0,255,0,0.7)] bg-[var(--color-light-bg-secondary)] dark:bg-[var(--color-dark-bg-secondary)]">
              <h3 className="text-2xl font-bold mb-4">UX/UI Designer</h3>
              <p className="text-gray-400 mb-4">
                Join our team as a UX/UI Designer to create intuitive and engaging...
              </p>
              <a href="/" className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 bg-green-500 hover:bg-green-600 text-black font-bold">
                Apply Now
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CareersPage;
