"use client";

import { useFormState } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { sendEmail } from "@/actions/sendEmail";
import type { FormState } from "@/types/contact";
import { toast } from "react-hot-toast";
import { FaPaperPlane } from "react-icons/fa6";

const initialState: FormState = {
  status: "idle",
  message: "",
};

export const ContactForm = () => {
  const [state, formAction] = useFormState(sendEmail, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    agreement: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === "checkbox";
    const inputValue = isCheckbox
      ? (e.target as HTMLInputElement).checked
      : value;
    setFormData((prev) => ({ ...prev, [name]: inputValue }));
  };
  const { name, email, message, agreement } = formData;
  const isFormValid = !!(name && email && message && agreement);

  const handleReset = () => {
    setFormData({ name: "", email: "", message: "", agreement: false }); // stateもリセット
  };

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
      formRef.current?.reset(); // 成功時にフォームをリセット
    } else if (state.status === "error" && state.message && !state.errors) {
      // Zod以外のサーバーエラーなどをトーストで表示
      toast.error(state.message);
    }
  }, [state]);

  const submitButtonClasses = isFormValid
    ? "group relative inline-flex items-center gap-3 overflow-hidden border-2 border-cyan-400 px-8 py-3 text-lg font-bold text-cyan-400 transition-all duration-300 hover:border-cyan-300 hover:text-cyan-300 hover:shadow-lg hover:shadow-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:ring-offset-2 focus:ring-offset-[var(--background)]"
    : "group relative inline-flex items-center gap-3 overflow-hidden border-2 border-gray-600 px-8 py-3 text-lg font-bold text-gray-600 transition-all duration-300 cursor-not-allowed";

  return (
    <form
      ref={formRef}
      action={formAction}
      onReset={handleReset}
      className="w-full max-w-lg space-y-8"
    >
      <div className="relative">
        <label
          htmlFor="name"
          className="absolute -top-3 left-4 bg-[var(--background)] px-1 text-sm text-cyan-400 transition-colors duration-300"
        >
          お名前
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          aria-describedby="name-error"
          className="peer w-full appearance-none border-2 border-cyan-500 bg-transparent px-4 py-3 text-gray-200 placeholder-gray-500 shadow-lg shadow-cyan-500/10 transition-all duration-300 focus:border-cyan-300 focus:shadow-cyan-300/30 focus:outline-none"
          value={formData.name}
          onChange={handleInputChange}
        />
        {state.errors?.name && (
          <p id="name-error" className="mt-2 text-sm text-red-400">
            {state.errors.name.join(", ")}
          </p>
        )}
      </div>

      <div className="relative">
        <label
          htmlFor="email"
          className="absolute -top-3 left-4 bg-[var(--color-dark-bg)] px-1 text-sm text-cyan-400 transition-colors duration-300"
        >
          メールアドレス
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          aria-describedby="email-error"
          className="peer w-full appearance-none border-2 border-cyan-500 bg-transparent px-4 py-3 text-gray-200 placeholder-gray-500 shadow-lg shadow-cyan-500/10 transition-all duration-300 focus:border-cyan-300 focus:shadow-cyan-300/30 focus:outline-none"
          value={formData.email}
          onChange={handleInputChange}
        />
        {state.errors?.email && (
          <p id="email-error" className="mt-2 text-sm text-red-400">
            {state.errors.email.join(", ")}
          </p>
        )}
      </div>

      <div className="relative">
        <label
          htmlFor="message"
          className="absolute -top-3 left-4 bg-[var(--color-dark-bg)] px-1 text-sm text-cyan-400 transition-colors duration-300"
        >
          メッセージ
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          aria-describedby="message-error"
          className="peer w-full appearance-none border-2 border-cyan-500 bg-transparent px-4 py-3 text-gray-200 placeholder-gray-500 shadow-lg shadow-cyan-500/10 transition-all duration-300 focus:border-cyan-300 focus:shadow-cyan-300/30 focus:outline-none"
          value={formData.message}
          onChange={handleInputChange}
        />
        {state.errors?.message && (
          <p id="message-error" className="mt-2 text-sm text-red-400">
            {state.errors.message.join(", ")}
          </p>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <input
            id="agreement"
            name="agreement"
            type="checkbox"
            className="h-5 w-5 rounded border-2 border-cyan-400 bg-transparent text-cyan-500 shadow-cyan-500/20 transition-all duration-300 focus:ring-2 focus:ring-cyan-500/50 focus:ring-offset-2 focus:ring-offset-[var(--color-dark-bg)]"
            checked={formData.agreement}
            onChange={handleInputChange}
          />
          <label htmlFor="agreement" className="ml-3 text-sm text-gray-300">
            <a href="/terms" className="underline hover:text-cyan-400">
              利用規約
            </a>
            と
            <a href="/privacy" className="underline hover:text-cyan-400">
              プライバシーポリシー
            </a>
            に同意します。
          </label>
        </div>
        {state.errors?.agreement && (
          <p id="agreement-error" className="mt-2 text-sm text-red-400">
            {state.errors.agreement.join(", ")}
          </p>
        )}
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className={submitButtonClasses}
          disabled={!isFormValid}
        >
          <span className="absolute -left-full top-0 h-full w-full -skew-x-45 bg-cyan-400/20 transition-all duration-500 group-hover:left-full"></span>
          <FaPaperPlane />
          <span>送信</span>
        </button>
      </div>
    </form>
  );
};
