// src/hooks/useUser.ts
import useSWR from "swr";

export const useUser = () => {
  const { data, error, isLoading } = useSWR("/api/session", async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error("ユーザー取得失敗");
    return res.json();
  });

  return {
    user: data?.user ?? null,
    isLoading,
    isError: error,
  };
};
