import { ThemeProvider } from "@/components/layouts/Theme-Provider";
import "./globals.css";
import { Orbitron, Outfit } from "next/font/google";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import PageTransition from "@/components/layouts/PageTransition";
import CookieBanner from "@/components/features/CookieBanner";

// 2. フォントを設定 (Inter は削除)
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-orbitron",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "ともきちのエンジニア成長記",
  description: "技術の備忘録とポートフォリオ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body
        className={`${orbitron.variable} ${outfit.variable} font-sans flex flex-col min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1 text-sm md:text-base">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <Toaster position="top-right" />
          <CookieBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
