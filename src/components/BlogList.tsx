'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Post {
  slug: string;
  title: string;
  date: string;
  readTime: string;
}

interface BlogListProps {
  onSelectPost: (slug: string) => void;
  selectedSlug?: string;
}

export default function BlogList({ onSelectPost, selectedSlug }: BlogListProps) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error loading posts:', error);
      }
    };
    loadPosts();
  }, []);

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${parseInt(month)}/${parseInt(day)}/${year}`;
  };

  return (
    <div className="h-full flex flex-col justify-center">
      <div className="flex md:flex-col md:space-y-0 md:space-x-0 snap-x snap-mandatory overflow-x-auto scrollbar-hide">
        {posts.map((post) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`cursor-pointer p-4 min-w-full md:min-w-0 snap-center ${
              selectedSlug === post.slug ? 'text-black border-r-2 border-black md:border-r-2' : 'text-gray-500'
            }`}
            onClick={() => onSelectPost(post.slug)}
          >
            <h2 className="text-2xl font-light tracking-tight mb-2 text-left md:text-right">
              {post.title}
            </h2>
            <div className="flex items-center gap-4 text-sm justify-start md:justify-end">
              <span>{formatDate(post.date)}</span>
              <span>•</span>
              <span>{post.readTime} min read</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 