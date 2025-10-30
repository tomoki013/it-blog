import LegalDoc from "@/components/ui/LegalDoc";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "利用規約 | ともきちのエンジニア成長記",
  description: "当サイトの利用規約について説明します。",
};

export default function TermsOfServicePage() {
  return <LegalDoc fileName="terms-of-service" />;
}
