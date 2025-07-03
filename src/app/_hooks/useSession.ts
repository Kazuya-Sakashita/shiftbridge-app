"use client";

import useSWR from "swr";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { Session } from "@supabase/auth-helpers-nextjs";

const fetchSession = async (): Promise<Session | null> => {
  const supabase = createPagesBrowserClient();
  const { data } = await supabase.auth.getSession();
  return data.session;
};

export const useSession = () => {
  const { data, error, isLoading, mutate } = useSWR("session", fetchSession);

  return {
    session: data,
    isLoading,
    error,
    isAuthenticated: !!data,
    mutateSession: mutate, // セッション再取得したい場合に使う
  };
};
