import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/Header";

const josefinSans = Josefin_Sans({ weight: ["400", "700"], preload: false });

export const metadata: Metadata = {
  title: "ToDo Next App",
  description: "ToDo App",
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
         <div>{children}</div>
        </Providers>
      </body>
    </html>
  );
}
