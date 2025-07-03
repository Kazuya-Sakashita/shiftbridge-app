import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

const supabase = createPagesBrowserClient();

type RegisterParams = {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  roleId: number;
};

export const register = async ({
  email,
  password,
  nickname,
  roleId,
}: RegisterParams): Promise<{ success: boolean; error?: string }> => {
  try {
    // 1. Supabase Auth でユーザー作成
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      return { success: false, error: signUpError.message };
    }

    const user = data.user;
    if (!user) {
      return { success: false, error: "ユーザー情報が取得できませんでした" };
    }

    // 2. Next.js API経由でPrismaのUserテーブルに保存
    const res = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: user.id, // Supabaseのauth.users.id
        email,
        nickname,
        roleId,
      }),
    });

    if (!res.ok) {
      const apiError = await res.json();
      return {
        success: false,
        error: apiError.error || "ユーザー情報の保存に失敗しました。",
      };
    }

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "不明なエラーが発生しました" };
  }
};
