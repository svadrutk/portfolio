import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { NextRequest } from 'next/server';
import { calculateReadTime } from '@/utils/readTime';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

export async function GET(
  request: NextRequest
) {
  const slug = request.nextUrl.pathname.split('/').pop();

  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = await fs.readFile(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return Response.json({
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      tags: data.tags || [],
      readTime: calculateReadTime(content),
      content,
    });
  } catch (error) {
    console.error('Error reading post:', error);
    return Response.json(null, { status: 404 });
  }
} 