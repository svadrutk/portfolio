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
    <div className="container mx-auto px-4 py-8">
      {children}
    </div>
  );
}


