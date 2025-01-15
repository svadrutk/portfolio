'use client';

import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from "react-icons/fa";

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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', () => {
      setIsMobile(window.innerWidth < 640);
    });
  }, []);

  console.log(isMobile);

  {/* Check size of screen */}
  return (
    <div className="blog-container flex min-h-screen">
      {/* Conditionally render the titles column */}
      {(isMobile && !selectedPost || !isMobile ) && (
        <div className="titles-column w-full lg:w-1/3  border-r border-slate-800 p-4 font-grotesk">
          <ul className="space-y-4">
            {posts.map((post) => (
              <li key={post.slug} className="cursor-pointer">
                <div
                  className="border-b border-slate-800 pb-2 group"
                  onClick={() => setSelectedPost(post)} // Update the state with the selected post
                >
                  <h2 className="text-md lg:text-xl font-medium text-gray-800 group-hover:text-indigo-600 transition">
                    {post.title}
                  </h2>
                  <p className="text-md lg:text-xl text-gray-500 group-hover:text-blue-600 transition">{post.date}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Conditionally render the content column based on size of screen */}
      {(selectedPost && isMobile || !isMobile && selectedPost) &&  (
        <div className="content-column w- lg:w-2/3 p-6 font-sans">
          <div>
            <h1 className="text-8xl font-bold mb-4 text-indigo-600">{selectedPost.title}</h1>
            <div className="w-16 h-1 bg-slate-500 mb-8 mt-8"></div>
            <article
              className="prose max-w-none font-groteskRegular text-3xl"
              dangerouslySetInnerHTML={{ __html: selectedPost.content }}
            ></article>
          </div>
          {/* Render button conditionally based on mobile */}
          {isMobile && (
            <button
              className="mt-8 px-4 py-2 border-2 border-slate-500 text-white  transition shadow-custom"
              onClick={() => setSelectedPost(null)} // Go back to the titles column
            >
             { /* Render the back button */}
             <FaArrowLeft className="inline-block text-slate-500" />

            
            </button>
          )}
          
        </div>
      )}
    
    </div>
  );
}
