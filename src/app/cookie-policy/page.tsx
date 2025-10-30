import LegalDoc from "@/components/ui/LegalDoc";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "クッキーポリシー | ともきちのエンジニア成長記",
  description: "当サイトのクッキーポリシーについて説明します。",
};

export default function CookiePolicyPage() {
  return <LegalDoc fileName="cookie-policy" />;
}
