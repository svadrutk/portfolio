export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  content: string;
}

// This would be populated at build time
let postsCache: BlogPost[] | null = null;

export function getAllPosts(): BlogPost[] {
  if (postsCache) {
    return postsCache;
  }

  // This will be replaced with actual posts at build time
  postsCache = [
    {
      slug: 'first-post',
      title: 'My First Blog Post',
      date: '2024-04-21',
      description: 'Welcome to my first blog post where I share my thoughts and experiences.',
      tags: ['blog', 'first-post'],
      content: `# My First Blog Post

Welcome to my first blog post! This is where I'll share my thoughts and experiences.

## A Section

Here's some content in a section. I can write about anything I want here.

### A Subsection

And here's a subsection with even more content.

- List item 1
- List item 2
- List item 3

\`\`\`javascript
// Some code example
function hello() {
  console.log('Hello, world!');
}
\`\`\``,
    },
    {
      slug: 'second-post',
      title: 'Another Interesting Topic',
      date: '2024-04-20',
      description: 'Exploring another interesting topic in detail.',
      tags: ['blog', 'technology'],
      content: `# Another Interesting Topic

This is another blog post about something interesting.

## More Content

Here's some more content to read and enjoy.`,
    },
  ];

  return postsCache;
}

export function getPostBySlug(slug: string): BlogPost | null {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug) || null;
} 