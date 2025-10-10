import { NextRequest } from 'next/server';
import { getPostBySlug } from '@/lib/posts-data';

export async function GET(
  request: NextRequest
) {
  const slug = request.nextUrl.pathname.split('/').pop();

  try {
    if (!slug) {
      return Response.json(null, { status: 404 });
    }

    const post = getPostBySlug(slug);
    
    if (!post) {
      return Response.json(null, { status: 404 });
    }

    return Response.json(post);
  } catch (error) {
    console.error('Error reading post:', error);
    return Response.json(null, { status: 404 });
  }
} 