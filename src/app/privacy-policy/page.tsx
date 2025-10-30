import LegalDoc from "@/components/ui/LegalDoc";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー | ともきちのエンジニア成長記",
  description: "当サイトのプライバシーポリシーについて説明します。",
};

export default function PrivacyPolicyPage() {
  return <LegalDoc fileName="privacy-policy" />;
}
