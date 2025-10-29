"use server";

import { z } from "zod";

export interface ContactFormState {
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
  isSuccess: boolean;
}

const ContactSchema = z.object({
  name: z.string().min(2, { message: "お名前は2文字以上で入力してください。" }),
  email: z.string().email({ message: "有効なメールアドレスを入力してください。" }),
  message: z.string().min(10, { message: "お問い合わせ内容は10文字以上で入力してください。" }),
});

export const submitContactForm = async (
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> => {
  const validatedFields = ContactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      message: "入力内容にエラーがあります。",
      errors: validatedFields.error.flatten().fieldErrors,
      isSuccess: false,
    };
  }

  // ここでメール送信などの処理を行う (今回はシミュレーション)
  try {
    console.log("フォームデータを受信しました:", validatedFields.data);
    // await sendEmail(validatedFields.data);
    return {
      message: "お問い合わせありがとうございます。メッセージは正常に送信されました。",
      isSuccess: true,
     };
  } catch (error) {
    console.error("お問い合わせフォームの処理中にエラーが発生しました:", error);
    return {
      message: "メッセージの送信に失敗しました。サーバーエラーが発生しました。",
      isSuccess: false,
     };
  }
};
