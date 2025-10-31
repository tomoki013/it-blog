/**
 * お問い合わせフォームの入力データ
 */
export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

/**
 * Server Actionから返されるフォームの状態
 */
export type FormState = {
  status: 'idle' | 'success' | 'error';
  message: string;
  errors?: Partial<Record<keyof ContactFormData, string[]>>;
};
