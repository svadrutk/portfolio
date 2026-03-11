import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const POSTS_DIR = path.join(process.cwd(), 'src', 'content', 'posts');
const OUTPUT_FILE = path.join(process.cwd(), 'src', 'lib', 'posts-data.ts');

function generate() {
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.mdx'));

  const posts = files.map(file => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8');
    const { data, content } = matter(raw);
    const slug = file.replace(/\.mdx$/, '');

    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      tags: data.tags,
      content: content.trim(),
    };
  });

  const output = `// AUTO-GENERATED — do not edit manually.
// Edit MDX files in src/content/posts/ and run: npm run generate-posts

import { calculateReadTime } from '@/utils/readTime';

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  content: string;
  readTime: string;
}

const POSTS_DATA: Omit<Post, 'readTime'>[] = ${JSON.stringify(posts, null, 2)};

// Add read time calculation and return full posts
export function getAllPosts(): Post[] {
  return POSTS_DATA.map(post => ({
    ...post,
    readTime: calculateReadTime(post.content)
  })).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  const post = POSTS_DATA.find(p => p.slug === slug);
  if (!post) return null;
  
  return {
    ...post,
    readTime: calculateReadTime(post.content)
  };
}
`;

  fs.writeFileSync(OUTPUT_FILE, output, 'utf-8');
  console.log(`Generated posts-data.ts with ${posts.length} posts`);
}

generate();
