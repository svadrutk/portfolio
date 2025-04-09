import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import KursorComponent from "./components/KursorComponent";

const geistMono = Geist_Mono({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Svadrut Kukunooru",
  description: "Svadrut Kukunooru's Portfolio",
  icons: {
    icon: '/cat1.gif',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={geistMono.className}>
        <KursorComponent />
        {children}
      </body>
    </html>
  );
}
