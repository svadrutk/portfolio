'use client';

import React, { useState } from 'react';

interface Post {
  slug: string;
  title: string;
  date: string;
  content: string;
}

interface BlogClientProps {
  posts: Post[];
}


export default function BlogClient({ posts }: BlogClientProps) {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  return (
    <div className="blog-container flex min-h-screen">
      {/* Column for the list of blog posts */}
      <div className="titles-column w-1/3 border-r border-slate-800 p-4 font-grotesk">
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.slug} className="cursor-pointer">
              <div
                className="border-b border-slate-800 pb-2 group"
                onClick={() => setSelectedPost(post)} // Update the state with the selected post
              >
                <h2 className="text-xl font-medium text-gray-800 group-hover:text-indigo-600 transition">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 group-hover:text-blue-600 transition">{post.date}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Column for displaying the blog content */}
      <div className="content-column w-2/3 p-6 font-sans">
        {selectedPost ? (
          <div>
            <h1 className="text-8xl font-bold mb-4 text-indigo-600">{selectedPost.title}</h1>
            <div className="w-16 h-1 bg-slate-500 mb-8 mt-8"></div>
            <article
              className="prose max-w-none font-groteskRegular  text-3xl"
              dangerouslySetInnerHTML={{ __html: selectedPost.content }}
            ></article>
          </div>
        ) : (
          <p className="text-gray-600">Select a blog post to view its content.</p>
        )}
      </div>
    </div>
  );
}
