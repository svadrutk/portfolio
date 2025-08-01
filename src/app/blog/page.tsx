'use client';

import { useState } from 'react';
import { ArrowLeftFromLine } from 'lucide-react';
import BlogList from '@/components/BlogList';
import BlogContent from '@/components/BlogContent';
import AnimatedSection from '@/components/AnimatedSection';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function BlogPage() {
  const [selectedSlug, setSelectedSlug] = useState<string | undefined>();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleBackClick = () => {
    startTransition(() => {
      router.push('/');
    });
  };

  return (
    <>
      <button 
        onClick={handleBackClick}
        className="fixed bottom-4 left-4 p-3 text-gray-400 transition-all hover:text-gray-600 z-50 hover:cursor-pointer bg-white/80 backdrop-blur-sm rounded-full shadow-sm"
        style={{ opacity: isPending ? 0.5 : 1 }}
      >
        <ArrowLeftFromLine className="w-6 h-6" />
      </button>

      <div className="min-h-screen w-full">
        <div className="h-screen flex flex-col md:grid md:grid-cols-[30%_70%]">
          <AnimatedSection delay={0.4} className="border-b md:border-b-0 md:border-r border-gray-200 p-4 md:p-6 overflow-y-auto">
            <div className="w-full">
              <BlogList 
                onSelectPost={setSelectedSlug} 
                selectedSlug={selectedSlug}
              />
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.6} className="flex-1 p-4 md:p-6 overflow-auto">
            <BlogContent slug={selectedSlug} />
          </AnimatedSection>
        </div>
      </div>
    </>
  );
} 