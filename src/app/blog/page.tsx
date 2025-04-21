'use client';

import { useState } from 'react';
import BlogList from '@/components/BlogList';
import BlogContent from '@/components/BlogContent';

export default function BlogPage() {
  const [selectedSlug, setSelectedSlug] = useState<string | undefined>();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-7xl w-full bg-white overflow-hidden">
        <div className="flex flex-col md:grid md:grid-cols-[30%_70%] h-[80vh]">
          <div className="border-b md:border-b-0 md:border-r border-gray-200 p-4 md:p-6 overflow-x-auto md:overflow-y-auto">
            <div className="w-max md:w-auto">
              <BlogList 
                onSelectPost={setSelectedSlug} 
                selectedSlug={selectedSlug}
              />
            </div>
          </div>
          <div className="flex-1 p-4 md:p-6 overflow-auto">
            <BlogContent slug={selectedSlug} />
          </div>
        </div>
      </div>
    </div>
  );
} 