import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import { Goudy_Bookletter_1911 } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
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
  description: "Swad's home on the internet.",
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
