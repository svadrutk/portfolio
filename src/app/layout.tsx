import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Space_Mono } from "next/font/google";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter', display: "swap"});
const spaceMonoBold = Space_Mono({ subsets: ["latin"], weight: "700", variable: '--font-space-mono-bold', display: "swap"});
const spaceMonoRegular = Space_Mono({ subsets: ["latin"], weight: "400", variable: '--font-space-mono-regular', display: "swap"});
const spaceGroteskBold = Space_Grotesk({ subsets: ["latin"], weight: "700", variable: '--font-space-grotesk-bold', display: "swap"});
const spaceGroteskRegular = Space_Grotesk({ subsets: ["latin"], weight: "400", variable: '--font-space-grotesk-regular', display: "swap"});

export const metadata: Metadata = {
  title: "swad k.",
  description: "svadrut's personal website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGroteskBold.variable} ${spaceMonoBold.variable}`}>{children}</body>
    </html>
  );
}
