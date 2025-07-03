import { AuthLayout } from "@/app/signup/_components/auth-layout";
import { RegisterForm } from "@/app/signup/_components/register-form";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="新規登録"
      description="新しいアカウントを作成して学習コミュニティに参加しましょう"
    >
      <RegisterForm />
    </AuthLayout>
  );
}
