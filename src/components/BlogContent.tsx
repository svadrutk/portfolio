'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { calculateReadTime } from '@/utils/readTime';
import 'highlight.js/styles/github-dark.css';

interface Post {
  slug: string;
  title: string;
  date: string;
  content: string;
}

interface BlogContentProps {
  slug: string | undefined;
}

export default function BlogContent({ slug }: BlogContentProps) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/posts/${slug}`);
        if (!response.ok) {
          throw new Error('Post not found');
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        console.error('Error loading post:', err);
        setError('Failed to load post');
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${parseInt(month)}/${parseInt(day)}/${year}`;
  };

  if (!slug) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-full flex items-center justify-center"
      >
        <p className="text-gray-400">Select a post to read</p>
      </motion.div>
    );
  }

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-full flex items-center justify-center"
      >
        <p className="text-gray-400">Loading...</p>
      </motion.div>
    );
  }

  if (error || !post) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-full flex items-center justify-center"
      >
        <p className="text-red-400">Post not found</p>
      </motion.div>
    );
  }

  const readTime = calculateReadTime(post.content);

  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="prose prose-lg max-w-none mx-auto px-4 py-8"
    >
      <h1 className="text-4xl font-light tracking-tight mb-4">{post.title}</h1>
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
        <span>{formatDate(post.date)}</span>
        <span>•</span>
        <span>{readTime} min read</span>
      </div>
      <div className="prose prose-xl text-xl prose-headings:font-light prose-p:text-gray-700 prose-li:text-gray-700 prose-ol:text-gray-700 prose-ul:text-gray-700">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight, rehypeRaw]}
          components={{
            p: ({ children }) => (
              <p className="mb-6">{children}</p>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal pl-6 mb-6">{children}</ol>
            ),
            ul: ({ children }) => (
              <ul className="list-disc pl-6 mb-6">{children}</ul>
            ),
            li: ({ children }) => (
              <li className="mb-2">{children}</li>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-gray-200 pl-4 italic my-6">{children}</blockquote>
            ),
            br: () => <br className="mb-6" />
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </motion.article>
  );
} 