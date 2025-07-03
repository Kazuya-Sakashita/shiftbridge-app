"use client";

import * as React from "react";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { Alert, AlertDescription } from "@/app/_components/ui/alert";
import { Eye, EyeOff, Loader2, Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { useSession } from "@/app/_hooks/useSession";

export function LoginForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const { mutateSession } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("すべての項目を入力してください");
      return;
    }

    setIsLoading(true);
    const supabase = createPagesBrowserClient();
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError(loginError.message || "ログインに失敗しました");
      setIsLoading(false);
      return;
    }

    await mutateSession(); // SWRセッションを更新
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertDescription className="text-red-700">{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        {/* メールアドレス */}
        <div>
          <Label htmlFor="email" className="text-gray-700">
            メールアドレス
          </Label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@example.com"
              className="pl-10 border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400 bg-white rounded-xl shadow-sm"
              required
            />
          </div>
        </div>

        {/* パスワード */}
        <div>
          <Label htmlFor="password" className="text-gray-700">
            パスワード
          </Label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="パスワードを入力"
              className="pl-10 pr-10 border-gray-200 focus:border-primary focus:ring-primary bg-white"
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Link
          href="/auth/reset-password"
          className="text-sm text-primary hover:text-primary/80 underline"
        >
          パスワードを忘れた方
        </Link>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg rounded-xl transition-all duration-200 btn-modern"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ログイン中...
          </>
        ) : (
          "ログイン"
        )}
      </Button>

      <div className="text-center">
        <span className="text-sm text-gray-600">
          アカウントをお持ちでない方は{" "}
          <Link
            href="/auth/register"
            className="text-primary hover:text-primary/80 underline"
          >
            新規登録
          </Link>
        </span>
      </div>

      {/* デモログイン情報 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-900 mb-2">
          デモ用ログイン情報
        </h4>
        <div className="text-xs text-blue-700 space-y-1">
          <p>
            <strong>学生:</strong> student@example.com
          </p>
          <p>
            <strong>卒業生:</strong> graduate@example.com
          </p>
          <p>
            <strong>講師:</strong> instructor@example.com
          </p>
          <p>
            <strong>管理者:</strong> admin@example.com
          </p>
          <p>
            <strong>パスワード:</strong> password123
          </p>
        </div>
      </div>
    </form>
  );
}
