import type { Metadata } from "next";
import { Ubuntu_Mono } from "next/font/google";
import "./globals.css";
import { METADATA } from "@/config/const";

const font = Ubuntu_Mono({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: METADATA.TITLE,
  description: METADATA.DESC,
  keywords: METADATA.KEYWORDS
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <main className="lg:max-w-5xl m-auto">
          {children}
          <p className="text-center text-xs mt-2">Copyright © 2024 HexWei </p>
        </main>
      </body>
    </html>
  );
}
