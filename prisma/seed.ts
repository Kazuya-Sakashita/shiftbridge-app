import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Role（ラベル追加）
  await prisma.role.createMany({
    data: [
      { name: "student", label: "学生" },
      { name: "graduate", label: "卒業生" },
      { name: "instructor", label: "講師" },
      { name: "admin", label: "管理者" },
    ],
    skipDuplicates: true,
  });

  // Chapter（14章まで）
  await prisma.chapter.createMany({
    data: [
      { name: "【1章】事前準備" },
      { name: "【2章】Webアプリケーション概要" },
      { name: "【3章】JavaScript基礎＋演習" },
      { name: "【4章】Reactの基礎学習" },
      { name: "【5章】Web APIの基礎" },
      { name: "【6章】React実践演習" },
      { name: "【7章】TypeScript基礎学習+演習" },
      { name: "【8章】Next.js基礎学習＋課題" },
      { name: "【9章】microCMS導入演習" },
      { name: "【10章】NextJSでのバックエンド開発演習（前半）" },
      { name: "【11章】NextJSでのバックエンド開発演習（後半）" },
      { name: "【12章】オリジナルアプリ制作" },
      { name: "【13章】実案件タスクの体験" },
      { name: "【14章】AI駆動開発" },
    ],
    skipDuplicates: true,
  });

  // Question Category（質問のカテゴリ）
  await prisma.questionCategory.createMany({
    data: [
      { name: "学習方法" },
      { name: "モチベーション" },
      { name: "キャリア相談" },
      { name: "技術全般" },
      { name: "その他" },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(() => {
    console.log("✅ Seeding completed successfully");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
