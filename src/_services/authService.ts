import { prisma } from "@/_lib/prisma";
import { supabase } from "@/_services/supabase-server";

export const signup = async ({
  email,
  password,
  nickname,
  roleId,
}: {
  email: string;
  password: string;
  nickname: string;
  roleId: number;
}) => {
  // Supabase Auth登録
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (error) {
    throw new Error(`Supabase signup error: ${error.message}`);
  }

  const supabaseUserId = data.user?.id;
  if (!supabaseUserId) {
    throw new Error("Supabase user creation failed");
  }

  // Prisma User登録
  const user = await prisma.user.create({
    data: {
      id: supabaseUserId,
      email,
      nickname,
      roleId,
    },
  });

  return user;
};
