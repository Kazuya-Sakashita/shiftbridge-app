"use client";

import type * as React from "react";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { Book } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export function AuthLayout({ children, title, description }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-xl">
              <Book className="h-8 w-8" />
            </div>
          </div>
          <h2 className="mt-6 text-4xl font-bold bg-gradient-to-r from-emerald-700 to-green-700 bg-clip-text text-transparent">
            ShiftB Q&A Forum
          </h2>
          <p className="mt-2 text-sm text-emerald-600 font-medium">
            {description}
          </p>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm border-emerald-200 shadow-2xl rounded-2xl">
          <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-t-2xl">
            <h3 className="text-2xl font-bold text-center text-emerald-800">
              {title}
            </h3>
          </CardHeader>
          <CardContent className="p-8">{children}</CardContent>
        </Card>
      </div>
    </div>
  );
}
