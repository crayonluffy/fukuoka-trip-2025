import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// 👇 修改這裡
export const metadata: Metadata = {
  title: "福岡熊本跨年之旅", // 這裡改成你要的標題
  description: "2025-2026 Fukuoka & Kumamoto Trip Plan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW"> 
      <body className={inter.className}>{children}</body>
    </html>
  );
}