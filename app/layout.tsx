import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "聖誕探索號｜12 格聖誕派對遊戲",
  description: "歡迎搭乘聖誕探索號，與大家一起分享聖誕喜樂！",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className={notoSansTC.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
