import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import TargetCursor from '@/components/TargetCursor';
import "./globals.css";

const departureMono = localFont({
  src: '../../public/fonts/departure-mono/DepartureMono-Regular.woff2',
  variable: '--font-departure-mono',
  weight: '400',
  display: 'swap',
});

const inter = Inter({
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const cooperBT = localFont({
  src: [
    {
      path: "../../public/cooper_bt/Cooper Lt BT W08 Regular/Cooper Lt BT W08 Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/cooper_bt/Cooper BT W03 Light It/Cooper BT W03 Light It.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/cooper_bt/Cooper BT W03 Md It/Cooper BT W03 Md It.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/cooper_bt/Cooper Md BT W08 Italic/Cooper Md BT W08 Italic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../public/cooper_bt/Cooper Lt BT W08 Bold/Cooper Lt BT W08 Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/cooper_bt/Cooper Lt BT W08 Bold Italic/Cooper Lt BT W08 Bold Italic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-cooper",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Swad K.",
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
        className={`${cooperBT.variable} ${departureMono.variable} ${inter.variable} antialiased`}
      >
        <TargetCursor targetSelector="a[href], [role='link']" parallaxOn={false} />
        <div className="min-h-screen">
          {children}
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
