import { LoginForm } from "./_components/login-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-6">
        <LoginForm />
      </div>
    </div>
  );
}
