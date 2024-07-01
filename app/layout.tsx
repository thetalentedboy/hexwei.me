import type { Metadata } from "next";
import { Ubuntu_Mono } from "next/font/google";
import "./globals.css";

const font = Ubuntu_Mono({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "hexwei",
  description: "hexwei record",
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
          <p className="text-center text-xs">Copyright © 2024 HexWei </p>
        </main>
      </body>
    </html>
  );
}
