import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Swad's Blog",
  description: "Book reviews, thoughts on life, and other random stuff.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}


