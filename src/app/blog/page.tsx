import { getAllPosts, Post } from '@/lib/posts';
import BlogClient from '@/app/blog/BlogClient';

export default async function BlogPage() {
  const posts = await getAllPosts(); // Server-side fetching

  return <BlogClient posts={posts} />; // Pass posts to a client component
}
