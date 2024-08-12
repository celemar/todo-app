import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/Header";

const josefinSans = Josefin_Sans({ weight: ["400", "700"], preload: false });

export const metadata: Metadata = {
  title: "Todo Next App",
  description: "Todo App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${josefinSans.className} bg`}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
