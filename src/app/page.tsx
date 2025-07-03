"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/_hooks/useUser"; // 認証情報取得のカスタムフック（仮）

export default function HomePage() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    // ログインしていない場合はログイン画面へ
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <p>読み込み中...</p>;
  }

  if (!user) {
    return null; // ログイン前は何も表示しない（リダイレクト待ち）
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        ようこそ、{user.nickname} さん！
      </h1>
      <p className="text-gray-600">こちらがあなたのホーム画面です。</p>
      {/* ダッシュボード要素やメニューをここに追加 */}
    </main>
  );
}
