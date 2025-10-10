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
    <div className="h-full font-geist">
      <div className="flex flex-col space-y-4 pb-4">
        {posts.map((post) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`cursor-pointer p-4 rounded-lg hover:bg-gray-800/50 transition-colors ${
              selectedSlug === post.slug 
                ? 'bg-gray-800/70 border-l-4 border-gray-400 md:border-l-0 md:border-r-4' 
                : 'text-gray-400'
            }`}
            onClick={() => onSelectPost(post.slug)}
          >
            <h2 className={`text-xl md:text-2xl font-light tracking-tight mb-2 ${
              selectedSlug === post.slug ? 'text-gray-200' : 'text-gray-300'
            }`}>
              {post.title}
            </h2>
            <div className="flex items-center gap-4 text-sm text-gray-500">
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