// import { ContactForm } from '@/components/features/ContactForm';
import { GlitchText } from "@/components/ui/GlitchText";
import { NextPage } from "next";
import Link from "next/link";

const ContactPage: NextPage = () => {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">
          <GlitchText text="Contact" />
        </h1>
        <p className="text-lg text-gray-400">
          ご依頼、ご質問、ご感想など、お気軽にお問い合わせください。
        </p>
      </header>

      <main className="flex justify-center">
        {/* <ContactForm /> */}
        <Link href="mailto:gaomuyouxi81@gmail.com">
          お問い合わせはこちらからメールでお送りください。
        </Link>
      </main>
    </div>
  );
};

export default ContactPage;
