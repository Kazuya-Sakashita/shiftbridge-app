import { NextResponse } from "next/server";
import { signup } from "@/_services/authService";

export async function POST(req: Request) {
  console.log("✅ サインアップリクエスト受信");

  const body = await req.json();
  const { email, password, nickname, roleId } = body;

  console.log("📨 リクエスト内容:", { email, nickname, roleId });

  try {
    const user = await signup({ email, password, nickname, roleId });

    console.log("✅ サインアップ成功:", user);

    return NextResponse.json({ success: true, user });
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error("❌ サインアップエラー:", e.message);
      return NextResponse.json(
        { success: false, error: e.message },
        { status: 500 }
      );
    }

    console.error("❌ 不明なエラーが発生しました");
    return NextResponse.json(
      { success: false, error: "不明なエラーが発生しました。" },
      { status: 500 }
    );
  }
}
