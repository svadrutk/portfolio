import { ArrowUpRight } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto px-6 md:px-4">
        <div className="grid grid-rows-2 gap-8 md:gap-5 font-serif py-8 md:py-0">
          {/* First row - full width */}
          <AnimatedSection delay={0.2} className="border-b border-gray-200">
            <div className="flex justify-between h-6 mb-4">
              <h1 className="text-3xl leading-6">Swad&apos;s Home</h1>
              <span className="text-xs font-mono text-gray-400 leading-6">[1]</span>
            </div>
            <p className="text-md mb-5">I&apos;m a software engineer and entrepreneur who loves building products that make people&apos;s lives easier.
I studied Computer Science and Data Science at UW–Madison and co-founded Campusfy — a platform helping students discover the right classes and plan their degrees with confidence. I care about fast feedback loops, intuitive user experiences, and turning scrappy ideas into real, working software.
I currently work on the Knowledge Management team at Wayfair, designing and building AI-powered tools that help teams find and share information more effectively.</p>
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
              </div>
            </AnimatedSection>
            
            {/* Right column */}
            <AnimatedSection delay={0.8} className="flex flex-col">
              <div className="flex justify-between h-6">
                <h2 className="text-sm font-mono leading-6">TEAMS</h2>
                <span className="text-xs font-mono text-gray-400 leading-6">[3]</span>
              </div>
              <div className="mt-2">
                <div className="flex justify-between h-6 items-center">
                  <span className="font-[&apos;Goudy_Bookletter_1911&apos;] leading-6">Campusfy <span className="text-sm font-mono leading-6">(2025-)</span></span>
                  <div className="w-2 h-2 bg-red-500 border border-black border-1"></div>
                </div>
                <div className="flex justify-between h-6 items-center">
                  <span className="font-[&apos;Goudy_Bookletter_1911&apos;]">Wayfair <span className="text-sm font-mono leading-6">(2024-)</span></span>
                  <div className="w-2 h-2 bg-purple-500 border border-black border-1"></div>
                </div>
                <div className="flex justify-between h-6 items-center">
                  <span className="font-[&apos;Goudy_Bookletter_1911&apos;] leading-6">SkyWater Technology <span className="text-sm font-mono leading-6">(2023)</span></span>
                  <div className="w-2 h-2 bg-lime-600 border border-black border-1"></div>
                </div>
              </div>
            </AnimatedSection>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
