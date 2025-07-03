"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { Alert, AlertDescription } from "@/app/_components/ui/alert";
import {
  Eye,
  EyeOff,
  Loader2,
  Mail,
  Lock,
  User,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { register } from "@/app/_lib/auth"; // ここは適切なパスに修正

type Role = {
  id: number;
  name: string;
  label: string; // ← 追加
};

export function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [role, setRole] = useState<number | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Role一覧を取得
  useEffect(() => {
    const fetchRoles = async () => {
      const res = await fetch("/api/role");
      const data = await res.json();
      setRoles(data);
      if (data.length > 0) {
        setRole(data[0].id); // 初期選択
      }
    };
    fetchRoles();
  }, []);

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return "パスワードは8文字以上で入力してください";
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return "パスワードは大文字、小文字、数字を含む必要があります";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (!email || !password || !confirmPassword || !nickname || !role) {
        setError("すべての項目を入力してください");
        return;
      }

      const passwordError = validatePassword(password);
      if (passwordError) {
        setError(passwordError);
        return;
      }

      if (password !== confirmPassword) {
        setError("パスワードが一致しません");
        return;
      }

      const result = await register({
        email,
        password,
        confirmPassword,
        nickname,
        roleId: role,
      });

      if (result.success) {
        router.push("/");
      } else {
        setError(result.error || "登録に失敗しました");
      }
    } catch (e) {
      console.error(e);
      setError("エラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertDescription className="text-red-700">{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        {/* ニックネーム */}
        <div>
          <Label htmlFor="name">ニックネーム</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              id="name"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
              className="pl-10"
            />
          </div>
        </div>

        {/* メール */}
        <div>
          <Label htmlFor="email">メールアドレス</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-10"
            />
          </div>
        </div>

        {/* ユーザー種別 */}
        <div>
          <Label htmlFor="role">ユーザー種別</Label>
          <div className="relative">
            <GraduationCap className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 z-10" />
            <Select
              value={role?.toString()}
              onValueChange={(value) => setRole(Number(value))}
            >
              <SelectTrigger className="pl-10 bg-white border border-gray-300">
                <SelectValue placeholder="ユーザー種別を選択" />
              </SelectTrigger>
              <SelectContent className="bg-white ">
                {roles.map((role) => (
                  <SelectItem key={role.id} value={role.id.toString()}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* パスワード */}
        <div>
          <Label htmlFor="password">パスワード</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pl-10 pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-1 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* 確認パスワード */}
        <div>
          <Label htmlFor="confirmPassword">パスワード（確認）</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="pl-10 pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-1 top-1/2 -translate-y-1/2"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            登録中...
          </>
        ) : (
          "アカウントを作成"
        )}
      </Button>

      <div className="text-center">
        <span className="text-sm">
          既にアカウントをお持ちの方は{" "}
          <Link href="/login" className="underline">
            ログイン
          </Link>
        </span>
      </div>
    </form>
  );
}
