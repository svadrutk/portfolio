import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import { Goudy_Bookletter_1911 } from "next/font/google";
import "./globals.css";

const goudyBookletter = Goudy_Bookletter_1911({
  variable: "--font-goudy-bookletter",
  weight: "400",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Swad's Home",
  description: "Software engineer who loves building products that make people's lives easier.",
  icons: {
    icon: [
      {
        url: '/favicon.gif',
        type: 'image/gif',
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${goudyBookletter.variable} ${spaceMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
