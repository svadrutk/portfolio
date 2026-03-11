'use client';

import { ArrowUpRight } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function Home() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleBlogClick = (e: React.MouseEvent) => {
    e.preventDefault();
    startTransition(() => {
      router.push('/blog');
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto px-6 md:px-4">
        <div className="grid gap-5 font-cooper py-8 md:py-0">
          {/* First row - full width */}
          <AnimatedSection delay={0.2} className="border-b border-gray-700">
            <div className="flex justify-between h-6 mb-4">
              <h1 className="text-4xl leading-6 font-cooper">👋 Hi, I&apos;m Swad</h1>
              <span className="text-xs font-cooper text-gray-500 leading-6 -mt-1">[0]</span>
            </div>
            <p className="text-md mb-5">Building products that make people&apos;s lives easier. I studied Computer Science and Data Science at UW–Madison, where I co-founded <span className="text-red-400"><a href="https://campusfy.app" target="_blank" rel="noopener noreferrer" className="inline gap-1"><Image src="/campusfy.svg" alt="Campusfy logo" width={26} height={26} className="inline-block pr-1 align-middle mb-1 drop-shadow-[0_0_4px_rgba(248,113,113,0.6)]" />Campusfy</a></span> — a platform that helps students discover the right classes and plan their degrees with confidence. That same itch to solve real problems led to <span className="text-green-400"><a href="https://trackhuntr.com" target="_blank" rel="noopener noreferrer" className="inline gap-1"><Image src="/trackhuntr.svg" alt="TrackHuntr logo" width={26} height={26} className="inline-block rounded-full pr-1 align-middle mb-1 drop-shadow-[0_0_4px_rgba(74,222,128,0.6)]" />TrackHuntr</a></span>, a Chrome extension for EDM fans and DJs to surface the best tracks straight from the source, and <span className="text-amber-400"><a href="https://chorusboard.app" target="_blank" rel="noopener noreferrer" className="inline gap-1"><Image src="/chorusboard.svg" alt="Chorusboard logo" width={26} height={26} className="inline-block pr-1 align-middle mb-1 drop-shadow-[0_0_4px_rgba(251,191,36,0.6)]" />Chorusboard</a></span>, a song-ranking tool powered by pairwise comparisons. Today I&apos;m on the Knowledge Management team at <span className="text-purple-400"><a href="https://wayfair.com" target="_blank" rel="noopener noreferrer">Wayfair</a></span>, designing and implementing agents that help teams find and share information more effectively. What ties it all together: fast feedback loops, intuitive experiences, and turning scrappy ideas into real, working software.</p>
          </AnimatedSection>
          
          {/* Second row - split into two columns */}
          <AnimatedSection delay={0.4} className="grid md:grid-cols-2 sm:grid-cols-1 gap-5 relative items-start">
            {/* Left column */}
            <AnimatedSection delay={0.6} className="flex flex-col">
              <div className="flex justify-between h-6 items-baseline">
                <h2 className="text-sm font-mono leading-6">LINKS</h2>
                <span className="text-xs font-cooper text-gray-500 leading-6 relative -top-0.5">[1]</span>
              </div>
              <div className="mt-2">
                <a href="https://linkedin.com/in/svadrut" target="_blank" rel="noopener noreferrer" className="flex justify-between items-center group">
                  <span className="font-cooper">Linkedin</span>
                  <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-gray-300 transition-colors" />
                </a>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="flex justify-between items-center group">
                  <span className="font-cooper">Resumé</span>
                  <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-gray-300 transition-colors" />
                </a>
                <a href="/blog" onClick={handleBlogClick} className="flex justify-between items-center group">
                  <span className={`font-cooper ${isPending ? 'opacity-50' : ''} transition-opacity duration-200`}>Blog</span>
                  <ArrowUpRight className={`w-4 h-4 text-gray-500 group-hover:text-gray-300 transition-all ${isPending ? 'opacity-50' : ''}`} />
                </a>
              </div>
            </AnimatedSection>
            
            {/* Right column */}
            <AnimatedSection delay={0.8} className="flex flex-col">
              <div className="flex justify-between h-6 items-baseline">
                <h2 className="text-sm font-mono leading-6">TEAMS</h2>
                <span className="text-xs font-cooper text-gray-500 leading-6 relative -top-0.5">[2]</span>
              </div>
              <div className="mt-2">
                <div className="flex justify-between h-6 items-center">
                  <span className="font-cooper leading-6">Campusfy <span className="text-sm font-mono leading-6">(2025-)</span></span>
                  <div className="w-2 h-2 bg-red-500 mr-1"></div>
                </div>
                <div className="flex justify-between h-6 items-center">
                  <span className="font-cooper">Wayfair <span className="text-sm font-mono leading-6">(2024-)</span></span>
                  <div className="w-2 h-2 bg-purple-500 mr-1"></div>
                </div>
                <div className="flex justify-between h-6 items-center">
                  <span className="font-cooper leading-6">Skywater Technology <span className="text-sm font-mono leading-6">(2023)</span></span>
                  <div className="w-2 h-2 bg-lime-600 mr-1"></div>
                </div>
              </div>
            </AnimatedSection>
          </AnimatedSection>

          {/* Third row - Contact */}
          <AnimatedSection delay={1.0} className="border-t border-gray-700 pt-5">
            <div className="flex">
              <span className="text-sm font-mono text-gray-500 mx-auto block text-center">
                kukunoorusvadrut [at] gmail [dot] com
              </span>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
