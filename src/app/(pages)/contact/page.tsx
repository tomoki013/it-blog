import ContactForm from "@/components/features/ContactForm";
import type { Metadata } from "next";
import ContactClientPage from "./ContactClientPage";

export const metadata: Metadata = {
  title: "お問い合わせ | ともきちのエンジニア成長記",
  description: "プロジェクトのご相談、技術的なご質問など、お気軽にお問い合わせください。",
};

const ContactPage = () => {
  return <ContactClientPage />;
};

export default ContactPage;
