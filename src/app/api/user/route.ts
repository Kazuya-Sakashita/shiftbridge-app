import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { prisma } from "@/_lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { id, email, nickname, roleId } = await req.json();

    const user = await prisma.user.create({
      data: {
        id, // SupabaseのUUID
        email,
        nickname,
        roleId,
      },
    });

    return NextResponse.json({ success: true, user });
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
      return NextResponse.json(
        { success: false, error: e.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: false, error: "不明なエラーが発生しました。" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user?.id) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  return NextResponse.json({ user });
}
