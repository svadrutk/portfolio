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
        className="fixed top-4 left-4 p-2 text-gray-400 transition-all hover:text-gray-600 z-50 hover:cursor-pointer"
        style={{ opacity: isPending ? 0.5 : 1 }}
      >
        <ArrowLeftFromLine className="w-6 h-6" />
      </button>

      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-7xl w-full bg-white overflow-hidden">
          <div className="flex flex-col md:grid md:grid-cols-[30%_70%] h-[80vh]">
            <AnimatedSection delay={0.4} className="border-b md:border-b-0 md:border-r border-gray-200 p-4 md:p-6 overflow-x-auto md:overflow-y-auto">
              <div className="w-max md:w-auto">
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
      </div>
    </>
  );
} 