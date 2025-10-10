import { getAllPosts } from '@/lib/posts-data';

export async function GET() {
  try {
    const posts = getAllPosts();
    return Response.json(posts);
  } catch (error) {
    console.error('Error reading posts:', error);
    return Response.json([], { status: 500 });
  }
} 