import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  content: string;
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    const fileNames = await fs.readdir(postsDirectory);
    const allPostsData = await Promise.all(
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
            content,
          };
        })
    );

    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch (error) {
    console.error('Error reading posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = await fs.readFile(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      tags: data.tags || [],
      content,
    };
  } catch (error) {
    console.error('Error reading post:', error);
    return null;
  }
} 