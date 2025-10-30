import { ThemeProvider } from "@/components/layouts/Theme-Provider";
import "./globals.css";
import { Share_Tech_Mono } from "next/font/google";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import PageTransition from "@/components/layouts/PageTransition";
import CookieBanner from "@/components/features/CookieBanner";

// 2. フォントを設定 (Inter は削除)
const techMono = Share_Tech_Mono({
  subsets: ["latin"],
  weight: "400",
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
      <body className={`${techMono.className} flex flex-col min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1 text-sm md:text-base pt-16">
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
