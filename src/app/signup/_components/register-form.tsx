"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import { register as registerUser } from "@/app/_lib/auth";

type Role = {
  id: number;
  name: string;
  label: string;
};

// ===========================
// 🔐 Zod スキーマ定義
// ===========================
const registerSchema = z
  .object({
    email: z
      .string()
      .email({ message: "有効なメールアドレスを入力してください" }),
    password: z
      .string()
      .min(8, { message: "8文字以上で入力してください" })
      .regex(/[a-z]/, { message: "小文字を含めてください" })
      .regex(/[A-Z]/, { message: "大文字を含めてください" })
      .regex(/[0-9]/, { message: "数字を含めてください" }),
    confirmPassword: z.string(),
    nickname: z.string().min(1, "ニックネームは必須です"),
    roleId: z.number(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "パスワードが一致しません",
  });

type RegisterFormInputs = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const [roles, setRoles] = useState<Role[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // ロール一覧取得
  useEffect(() => {
    const fetchRoles = async () => {
      const res = await fetch("/api/role");
      const data = await res.json();
      setRoles(data);
      if (data.length > 0) {
        setValue("roleId", data[0].id);
      }
    };
    fetchRoles();
  }, [setValue]);

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    setIsLoading(true);
    setError("");

    try {
      const result = await registerUser(data);

      if (result.success) {
        router.push("/");
      } else {
        setError(result.error || "登録に失敗しました");
      }
    } catch (e) {
      console.error(e);
      setError("サーバーエラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertDescription className="text-red-700">{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        {/* ニックネーム */}
        <div>
          <Label htmlFor="nickname">ニックネーム</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input id="nickname" {...register("nickname")} className="pl-10" />
          </div>
          {errors.nickname && (
            <p className="text-red-500 text-sm mt-1">
              {errors.nickname.message}
            </p>
          )}
        </div>

        {/* メール */}
        <div>
          <Label htmlFor="email">メールアドレス</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              id="email"
              type="email"
              {...register("email")}
              className="pl-10"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* ユーザー種別 */}
        <div>
          <Label htmlFor="role">ユーザー種別</Label>
          <div className="relative">
            <GraduationCap className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 z-10" />
            <Select
              onValueChange={(value) => setValue("roleId", Number(value))}
              defaultValue={watch("roleId")?.toString()}
            >
              <SelectTrigger className="pl-10 bg-white border border-gray-300">
                <SelectValue placeholder="ユーザー種別を選択" />
              </SelectTrigger>
              <SelectContent className="bg-white">
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
              {...register("password")}
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
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* 確認パスワード */}
        <div>
          <Label htmlFor="confirmPassword">パスワード（確認）</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
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
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
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
