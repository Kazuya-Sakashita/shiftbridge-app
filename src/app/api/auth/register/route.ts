import { NextResponse } from "next/server";
import { signup } from "@/_services/authService";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password, nickname, roleId } = body;

  try {
    const user = await signup({ email, password, nickname, roleId });
    return NextResponse.json({ success: true, user });
  } catch (e: unknown) {
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
