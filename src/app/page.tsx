'use client';

import { ArrowUpRight } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import NowPlaying from '@/components/NowPlaying';
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
        <div className="min-h-screen flex items-center justify-center relative">
      <div 
        className="absolute inset-0 opacity-50" 
        style={{ backgroundImage: 'url(/paper-texture.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 md:px-4">
        <div className="grid gap-5 font-serif py-8 md:py-0">
          {/* First row - full width */}
          <AnimatedSection delay={0.2} className="border-b border-gray-200">
            <div className="flex justify-between h-6 mb-4">
              <h1 className="text-3xl leading-6">Swad&apos;s Home</h1>
              <span className="text-xs font-mono text-gray-400 leading-6">[1]</span>
            </div>
            <p className="text-md mb-5">I like building products that make people&apos;s lives easier.
I studied Computer Science and Data Science @ UW–Madison and co-founded Campusfy — a platform helping students discover the right classes and plan their degrees with confidence. I care about fast feedback loops, intuitive user experiences, and turning scrappy ideas into real, working software.
I currently work on the Knowledge Management team @ Wayfair, designing and implementing agents that help teams find and share information more effectively.</p>
          </AnimatedSection>
          
          {/* Second row - split into two columns */}
          <AnimatedSection delay={0.4} className="grid md:grid-cols-2 sm:grid-cols-1 gap-5 relative">
            {/* Left column */}
            <AnimatedSection delay={0.6} className="flex flex-col">
              <div className="flex justify-between h-6">
                <h2 className="text-sm font-mono leading-6">LINKS</h2>
                <span className="text-xs font-mono text-gray-400 leading-6">[2]</span>
              </div>
              <div className="mt-2">
                <a href="https://linkedin.com/in/svadrut" target="_blank" rel="noopener noreferrer" className="flex justify-between items-center group">
                  <span className="font-[&apos;Goudy_Bookletter_1911&apos;]">Linkedin</span>
                  <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </a>
                <a href="https://campusfy.app" target="_blank" rel="noopener noreferrer" className="flex justify-between items-center group">
                  <span className="font-[&apos;Goudy_Bookletter_1911&apos;]">Campusfy</span>
                  <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </a>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="flex justify-between items-center group">
                  <span className="font-[&apos;Goudy_Bookletter_1911&apos;]">Resumé</span>
                  <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </a>
                <a href="/blog" onClick={handleBlogClick} className="flex justify-between items-center group">
                  <span className={`font-[&apos;Goudy_Bookletter_1911&apos;] ${isPending ? 'opacity-50' : ''} transition-opacity duration-200`}>Blog</span>
                  <ArrowUpRight className={`w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-all ${isPending ? 'opacity-50' : ''}`} />
                </a>
              </div>
            </AnimatedSection>
            
            {/* Right column */}
            <AnimatedSection delay={0.8} className="flex flex-col">
              <div className="flex justify-between h-6 items-center">
                <h2 className="text-sm font-mono leading-6">TEAMS</h2>
                <span className="text-xs font-mono text-gray-400 leading-6">[3]</span>
              </div>
              <div className="mt-2">
                <div className="flex justify-between h-6 items-center">
                  <span className="font-[&apos;Goudy_Bookletter_1911&apos;] leading-6">Campusfy <span className="text-sm font-mono leading-6">(2025-)</span></span>
                  <div className="w-2 h-2 bg-red-500 border border-black border-1 mr-1"></div>
                </div>
                <div className="flex justify-between h-6 items-center">
                  <span className="font-[&apos;Goudy_Bookletter_1911&apos;]">Wayfair <span className="text-sm font-mono leading-6">(2024-)</span></span>
                  <div className="w-2 h-2 bg-purple-500 border border-black border-1 mr-1"></div>
                </div>
                <div className="flex justify-between h-6 items-center">
                  <span className="font-[&apos;Goudy_Bookletter_1911&apos;] leading-6">SkyWater Technology <span className="text-sm font-mono leading-6">(2023)</span></span>
                  <div className="w-2 h-2 bg-lime-600 border border-black border-1 mr-1"></div>
                </div>
              </div>
            </AnimatedSection>
          </AnimatedSection>

          {/* Third row - Now Playing widget */}
          <AnimatedSection delay={1.0} className="border-t border-gray-200 pt-5">
            <NowPlaying />
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
