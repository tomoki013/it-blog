"use client";

import { useFormState, useFormStatus } from "react-dom";
import { submitContactForm, type ContactFormState } from "@/actions/contact";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const initialState: ContactFormState = {
  message: "",
  isSuccess: false,
};

function SubmitButton({ isFormValid }: { isFormValid: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending || !isFormValid}
      className="w-full font-bold text-lg tracking-widest uppercase"
      variant="primary"
      aria-disabled={pending || !isFormValid}
    >
      {pending ? "送信中..." : "メッセージを送信"}
    </Button>
  );
}

const ContactForm = () => {
  const [state, formAction] = useFormState(submitContactForm, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
    consent: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormValues({
        ...formValues,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const isFormValid =
    formValues.name &&
    formValues.email &&
    formValues.message &&
    formValues.consent;

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
          onChange={handleInputChange}
          value={formValues.name}
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
          onChange={handleInputChange}
          value={formValues.email}
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
          onChange={handleInputChange}
          value={formValues.message}
        />
        {state.errors?.message && (
          <p className="text-red-500 text-sm mt-1">{state.errors.message[0]}</p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="flex items-start space-x-3"
      >
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          className="h-5 w-5 rounded border-primary/50 text-primary focus:ring-primary/50 bg-transparent mt-1"
          onChange={handleInputChange}
          checked={formValues.consent}
        />
        <div className="text-sm">
          <label htmlFor="consent" className="font-medium text-foreground">
            <Link
              href="/terms-of-service"
              className="text-primary hover:underline"
              target="_blank"
            >
              利用規約
            </Link>
            と
            <Link
              href="/privacy-policy"
              className="text-primary hover:underline"
              target="_blank"
            >
              プライバシーポリシー
            </Link>
            に同意します。
          </label>
        </div>
      </motion.div>

      {state.errors?.consent && (
        <p className="text-red-500 text-sm">{state.errors.consent[0]}</p>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
      >
        <SubmitButton isFormValid={isFormValid} />
      </motion.div>
    </form>
  );
};

export default ContactForm;
