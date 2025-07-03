import { NextResponse } from "next/server";
import { prisma } from "@/_lib/prisma";

export async function GET() {
  const roles = await prisma.role.findMany({
    select: {
      id: true,
      name: true,
      label: true,
    },
  });

  return NextResponse.json(roles);
}
