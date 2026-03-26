'use client';

import { ArrowUpRight } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTransition, useState, useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "Hi, I'm Swad";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorTimer);
  }, []);

  const handleBlogClick = (e: React.MouseEvent) => {
    e.preventDefault();
    startTransition(() => {
      router.push('/blog');
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto px-6">
        <div className="grid gap-8 py-8">
          <AnimatedSection delay={0.2}>
            <h1 className="text-2xl mb-4 font-mono">
              {displayedText}
              <span className={`inline-block w-3 h-6 bg-white ml-0.5 align-middle ${showCursor ? 'opacity-100' : 'opacity-0'}`}></span>
            </h1>
            <p className="text-gray-400 leading-relaxed">
              Building products that make people&apos;s lives easier. I studied CS and Data Science at UW–Madison, where I co-founded{' '}
              <a href="https://campusfy.app" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">
                Campusfy
              </a>{' '}
              — helping students discover classes and plan degrees. I also built{' '}
              <a href="https://trackhuntr.com" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">
                TrackHuntr
              </a>{' '}
              for EDM fans and{' '}
              <a href="https://chorusboard.app" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">
                Chorusboard
              </a>{' '}
              for song rankings. Currently an FDE at{' '}
              <a href="https://endeavor.ai" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">
                Endeavor
              </a>
              .
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.4} className="grid grid-cols-2 gap-8">
            <div>
              <h2 className="text-lg text-gray-500 mb-3 font-mono">LINKS</h2>
              <div className="space-y-1">
                <a href="https://linkedin.com/in/svadrut" target="_blank" rel="noopener noreferrer" className="flex justify-between items-center group">
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-gray-400 transition-colors" />
                </a>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="flex justify-between items-center group">
                  <span>Resumé</span>
                  <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-gray-400 transition-colors" />
                </a>
                <a href="/blog" onClick={handleBlogClick} className="flex justify-between items-center group">
                  <span className={isPending ? 'opacity-50' : ''}>Blog</span>
                  <ArrowUpRight className={`w-4 h-4 text-gray-600 group-hover:text-gray-400 transition-colors ${isPending ? 'opacity-50' : ''}`} />
                </a>
              </div>
            </div>

            <div>
              <h2 className="text-lg text-gray-500 mb-3 font-mono">TEAMS</h2>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span>Endeavor</span>
                  <span className="text-gray-600">2026-</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Wayfair</span>
                  <span className="text-gray-600">2024-2026</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Campusfy</span>
                  <span className="text-gray-600">2025-</span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.6} className="border-t border-gray-800 pt-6">
            <p className="text-sm text-gray-600 text-center font-mono">
              kukunoorusvadrut [at] gmail [dot] com
            </p>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
