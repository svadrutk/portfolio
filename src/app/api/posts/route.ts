import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { calculateReadTime } from '@/utils/readTime';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

export async function GET() {
  try {
    const fileNames = await fs.readdir(postsDirectory);
    const posts = await Promise.all(
      fileNames
        .filter((fileName) => fileName.endsWith('.mdx'))
        .map(async (fileName) => {
          const slug = fileName.replace(/\.mdx$/, '');
          const fullPath = path.join(postsDirectory, fileName);
          const fileContents = await fs.readFile(fullPath, 'utf8');
          const { data, content } = matter(fileContents);

          return {
            slug,
            title: data.title,
            description: data.description,
            date: data.date,
            tags: data.tags || [],
            readTime: calculateReadTime(content),
            content,
          };
        })
    );

    const sortedPosts = posts.sort((a, b) => (a.date < b.date ? 1 : -1));
    return Response.json(sortedPosts);
  } catch (error) {
    console.error('Error reading posts:', error);
    return Response.json([], { status: 500 });
  }
} 