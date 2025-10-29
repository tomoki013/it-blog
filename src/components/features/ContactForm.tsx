"use client";

import { useFormState, useFormStatus } from "react-dom";
import { submitContactForm, type ContactFormState } from "@/actions/contact";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const initialState: ContactFormState = {
  message: "",
  isSuccess: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full font-bold text-lg tracking-widest uppercase"
      variant="primary"
    >
      {pending ? "送信中..." : "メッセージを送信"}
    </Button>
  );
}

const ContactForm = () => {
  const [state, formAction] = useFormState(submitContactForm, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message) {
      if (state.isSuccess) {
        toast.success(state.message);
        formRef.current?.reset();
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="space-y-8">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
          お名前
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="block w-full bg-background/50 border-2 border-primary/30 focus:border-primary focus:ring-primary rounded-md shadow-sm py-3 px-4 transition-all duration-300 placeholder:text-foreground/50"
          placeholder="Taro Yamada"
        />
        {state.errors?.name && (
          <p className="text-red-500 text-sm mt-1">{state.errors.name[0]}</p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
          メールアドレス
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="block w-full bg-background/50 border-2 border-primary/30 focus:border-primary focus:ring-primary rounded-md shadow-sm py-3 px-4 transition-all duration-300 placeholder:text-foreground/50"
          placeholder="your.email@example.com"
        />
        {state.errors?.email && (
          <p className="text-red-500 text-sm mt-1">{state.errors.email[0]}</p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
          お問い合わせ内容
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className="block w-full bg-background/50 border-2 border-primary/30 focus:border-primary focus:ring-primary rounded-md shadow-sm py-3 px-4 transition-all duration-300 placeholder:text-foreground/50"
          placeholder="プロジェクトに関するご相談..."
        />
        {state.errors?.message && (
          <p className="text-red-500 text-sm mt-1">{state.errors.message[0]}</p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <SubmitButton />
      </motion.div>
    </form>
  );
};

export default ContactForm;
