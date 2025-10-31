'use server';

import { z } from 'zod';
import nodemailer from 'nodemailer';
import type { FormState } from '@/types/contact';

// Zodスキーマを定義
const contactFormSchema = z.object({
  name: z.string().min(1, 'お名前は必須です。'),
  email: z.string().email('有効なメールアドレスを入力してください。'),
  message: z.string().min(1, 'メッセージを入力してください。'),
  agreement: z.preprocess(
    (val) => val === 'on',
    z.boolean().refine((val) => val === true, {
      message: '利用規約とプライバシーポリシーに同意してください。',
    }),
  ),
});

/**
 * フォームの入力データを検証し、メールを送信するServer Action
 * @param prevState フォームの以前の状態
 * @param formData フォームから送信されたデータ
 * @returns 新しいフォームの状態
 */
export async function sendEmail(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  // FormDataをプレーンなオブジェクトに変換
  const data = Object.fromEntries(formData.entries());

  // バリデーションを実行
  const validatedFields = contactFormSchema.safeParse(data);

  // バリデーション失敗
  if (!validatedFields.success) {
    return {
      status: 'error',
      message: '入力内容にエラーがあります。',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 環境変数のチェック
  const { GMAIL_ADDRESS, GMAIL_APP_PASSWORD } = process.env;
  if (!GMAIL_ADDRESS || !GMAIL_APP_PASSWORD) {
    console.error('Gmailの認証情報が環境変数に設定されていません。');
    return {
      status: 'error',
      message: 'サーバーエラーが発生しました。管理者にお問い合わせください。',
    };
  }

  // Nodemailerのトランスポーターを設定
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: GMAIL_ADDRESS,
      pass: GMAIL_APP_PASSWORD,
    },
  });

  try {
    // 管理者向けのメールを送信
    await transporter.sendMail({
      from: `"${validatedFields.data.name}" <${GMAIL_ADDRESS}>`,
      to: GMAIL_ADDRESS,
      subject: `ブログからのお問い合わせ: ${validatedFields.data.name}様`,
      text: `名前: ${validatedFields.data.name}\nメールアドレス: ${validatedFields.data.email}\n\nメッセージ:\n${validatedFields.data.message}`,
      html: `
        <p><strong>名前:</strong> ${validatedFields.data.name}</p>
        <p><strong>メールアドレス:</strong> ${validatedFields.data.email}</p>
        <hr>
        <p><strong>メッセージ:</strong></p>
        <p>${validatedFields.data.message.replace(/\n/g, '<br>')}</p>
      `,
    });

    return {
      status: 'success',
      message: 'お問い合わせありがとうございます。メッセージは正常に送信されました。',
    };
  } catch (error) {
    console.error('メール送信中にエラーが発生しました:', error);
    return {
      status: 'error',
      message: 'メールの送信に失敗しました。時間をおいて再度お試しください。',
    };
  }
}
